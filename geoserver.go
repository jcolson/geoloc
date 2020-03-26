package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"sync"

	"github.com/paulmach/orb"
	"github.com/paulmach/orb/geojson"
	"github.com/paulmach/orb/planar"

	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"github.com/prometheus/client_golang/prometheus/promhttp"
)

// Endpoint is  the name of the geojson handler endpoint
const Endpoint = "/sncr/geo/"

const MetricsEndpoint = "/metrics"

const HASENRICHED bool = len(GEODATAENRICHED) > 3

var externalData string

var externalEnrichedData string

// SafeVisitor to be used to determine if url has been visited
type SafeFeatureCollectionMap struct {
	fcMap map[string]*geojson.FeatureCollection
	mux   *sync.Mutex
}

var sfcMap SafeFeatureCollectionMap = SafeFeatureCollectionMap{fcMap: make(map[string]*geojson.FeatureCollection), mux: &sync.Mutex{}}

func (sfcMap SafeFeatureCollectionMap) getFeatureCollection(geoFileName string, enriched bool) (*geojson.FeatureCollection, error) {
	sfcMap.mux.Lock()
	defer sfcMap.mux.Unlock()
	geoFileKey := geoFileName + strconv.FormatBool(enriched)
	fc, ok := sfcMap.fcMap[geoFileKey]
	if !ok {
		// load geo map, this one isn't cached
		var err error
		fc, err = loadGeoDataFromFile(geoFileName, enriched)
		if err != nil {
			return nil, err
		}
		sfcMap.fcMap[geoFileKey] = fc
	}
	return fc, nil
}

func main() {
	sncrGeoHandler := http.HandlerFunc(Handler)
	// handle geoserver endpoint
	http.Handle(Endpoint,
		promhttp.InstrumentHandlerCounter(
			promauto.NewCounterVec(
				prometheus.CounterOpts{
					Name: "geoserver_http_metric_handler_requests_total",
					Help: "Total number of geoserver requests by HTTP code.",
				},
				[]string{"code"},
			),
			sncrGeoHandler,
		))
	// handle mertics endpoint
	http.Handle(MetricsEndpoint, promhttp.Handler())

	// server
	port := os.Getenv("PORT")
	externalData = os.Getenv("EXTERNALDATA")
	externalEnrichedData = os.Getenv("EXTERNALENRICHEDDATA")
	addr := fmt.Sprintf(":%v", port)
	log.Printf("listening on :%v", port)
	http.ListenAndServe(addr, nil)
}

//Handler handles a request for point
func Handler(w http.ResponseWriter, r *http.Request) {
	log.Printf("%s %s %s\n", r.RemoteAddr, r.Method, r.URL)
	// request
	properties, err := matcher(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// response
	encoder := json.NewEncoder(w)
	w.Header().Set("Content-Type", "application/json")
	err = encoder.Encode(properties)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// Matcher exctract from the url witch geoJSON object we want
func matcher(r *http.Request) (resp geojson.Properties, err error) {
	objectType := r.URL.Path[len(Endpoint):]
	// fmt.Printf("objecttype: %s\n", objectType)
	switch objectType {
	case "point":
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return geojson.Properties{}, err
		}
		fc, err := geojson.UnmarshalFeatureCollection(body)
		if err != nil {
			return geojson.Properties{}, err
		}
		// fmt.Printf("point passed %v", fc.Features[0].Point())
		geoDataFc, err := sfcMap.getFeatureCollection("", false)
		if err != nil {
			return geojson.Properties{}, err
		}
		pointInside, feature := isPointInsidePolygon(geoDataFc, fc.Features[0].Point())
		if !pointInside {
			return geojson.Properties{}, fmt.Errorf("Failure")
		}
		// if we've pre-embedded enriched data
		if HASENRICHED {
			fcEnriched, err := sfcMap.getFeatureCollection("", true)
			if err != nil {
				log.Printf("Could not enrich data: %v", err)
			} else {
				pointInsideEnriched, featureEnriched := isPointInsidePolygon(fcEnriched, fc.Features[0].Point())
				if pointInsideEnriched {
					for key, value := range featureEnriched.Properties {
						feature.Properties["ENRICHED_"+key] = value
					}
				}
			}
		}
		return feature.Properties, nil
	default:
		err = fmt.Errorf("Bad object type")
	}
	return
}

// loadGeoDataFromFile retrieves the FeatureCollection json objects for a file geoDataFile
// if the file passed is an empty string, try to use the environment variable
// if the environment variable is empty, then try and use the "build in" GEODATA or GEODATAENRICHED variable
func loadGeoDataFromFile(geoDataFile string, enriched bool) (*geojson.FeatureCollection, error) {
	if geoDataFile == "" && externalData == "" && !enriched {
		fc, err := geojson.UnmarshalFeatureCollection([]byte(GEODATA))
		return fc, err
	} else if geoDataFile == "" && externalEnrichedData == "" && enriched {
		fc, err := geojson.UnmarshalFeatureCollection([]byte(GEODATAENRICHED))
		return fc, err
	} else if geoDataFile == "" && externalData != "" && !enriched {
		geoDataFile = externalData
	} else if geoDataFile == "" && externalEnrichedData != "" && enriched {
		geoDataFile = externalEnrichedData
	}
	f, err := ioutil.ReadFile(geoDataFile)
	if err != nil {
		log.Printf("Error encountered reading file %v", err)
		return &geojson.FeatureCollection{}, err
	}
	fc, err := geojson.UnmarshalFeatureCollection(f)
	return fc, err
}

// isPointInsidePolygon runs through the MultiPolygon and Polygons within a
// feature collection and checks if a point (long/lat) lies within it.
func isPointInsidePolygon(fc *geojson.FeatureCollection, point orb.Point) (pointInside bool, feature *geojson.Feature) {
	for _, feature := range fc.Features {
		// Try on a MultiPolygon to begin
		multiPoly, isMulti := feature.Geometry.(orb.MultiPolygon)
		if isMulti {
			if planar.MultiPolygonContains(multiPoly, point) {
				return true, feature //.MustString("NAME", feature.Properties.MustString("subunit", "UNKNOWN"))
			}
		} else {
			// Fallback to Polygon
			polygon, isPoly := feature.Geometry.(orb.Polygon)
			if isPoly {
				if planar.PolygonContains(polygon, point) {
					return true, feature //.MustString("NAME", feature.Properties.MustString("subunit", "UNKNOWN"))
				}
			}
		}
	}
	return false, &geojson.Feature{}
}
