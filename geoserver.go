package main

import (
	"encoding/json"
	"errors"
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

var HASENRICHED bool = len(GEODATAENRICHED) > 3

var externalData string

var externalEnrichedData string

var findFast bool

func getenvBool(key string) (bool, error) {
	s := os.Getenv(key)
	if s == "" {
		return false, errors.New("getenv: environment variable empty")
	}
	v, err := strconv.ParseBool(s)
	if err != nil {
		return false, err
	}
	return v, nil
}

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
	// if we're using external data, then use it for enriched as well
	if externalData != "" && externalEnrichedData == "" {
		HASENRICHED = false
	}
	findFast, _ = getenvBool("FINDFAST")
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
func matcher(r *http.Request) (resp []geojson.Properties, err error) {
	objectType := r.URL.Path[len(Endpoint):]
	switch objectType {
	case "point":
		returnProperties := make([]geojson.Properties, 0, 3)
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return returnProperties, err
		}
		fc, err := geojson.UnmarshalFeatureCollection(body)
		if err != nil {
			return returnProperties, err
		}
		geoDataFc, err := sfcMap.getFeatureCollection("", false)
		if err != nil {
			return returnProperties, err
		}
		pointInside, feature := isPointInsidePolygon(geoDataFc, fc.Features[0].Point())
		if !pointInside {
			return returnProperties, fmt.Errorf("Failure")
		}
		// if we've pre-embedded enriched data
		if HASENRICHED {
			fcEnriched, err := sfcMap.getFeatureCollection("", true)
			if err != nil {
				log.Printf("Could not enrich data: %v", err)
			} else {
				pointInsideEnriched, featureEnriched := isPointInsidePolygon(fcEnriched, fc.Features[0].Point())
				if pointInsideEnriched {
					for _, anFcFeature := range featureEnriched {
						for keyFcFeature, valueFcFeature := range anFcFeature.Properties {
							for _, anFeature := range feature {
								anFeature.Properties["ENRICHED_"+keyFcFeature] = valueFcFeature
							}
						}
					}
				}
			}
		}
		for _, anFeature := range feature {
			returnProperties = append(returnProperties, anFeature.Properties)
		}
		return returnProperties, nil
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
func isPointInsidePolygon(fc *geojson.FeatureCollection, point orb.Point) (pointInside bool, feature []*geojson.Feature) {
	found := false
	returnFeatures := make([]*geojson.Feature, 0, 3)
	for _, feature := range fc.Features {
		// Try on a MultiPolygon to begin
		multiPoly, isMulti := feature.Geometry.(orb.MultiPolygon)
		if isMulti {
			if planar.MultiPolygonContains(multiPoly, point) {
				found = true
				returnFeatures = append(returnFeatures, feature)
				if findFast {
					return found, returnFeatures
				}
			}
		} else {
			// Fallback to Polygon
			polygon, isPoly := feature.Geometry.(orb.Polygon)
			if isPoly {
				if planar.PolygonContains(polygon, point) {
					found = true
					returnFeatures = append(returnFeatures, feature)
					if findFast {
						return found, returnFeatures
					}
				}
			}
		}
	}
	return found, returnFeatures
}
