package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/paulmach/orb"
	"github.com/paulmach/orb/geojson"
	"github.com/paulmach/orb/planar"
)

// Endpoint is  the name of the geojson handler endpoint
const Endpoint = "/sncr/geo/"

var externalData string

// SafeVisitor to be used to determine if url has been visited
type SafeFeatureCollectionMap struct {
	fcMap map[string]*geojson.FeatureCollection
	mux   *sync.Mutex
}

var sfcMap SafeFeatureCollectionMap = SafeFeatureCollectionMap{fcMap: make(map[string]*geojson.FeatureCollection), mux: &sync.Mutex{}}

func (sfcMap SafeFeatureCollectionMap) getFeatureCollection(geoFileName string) (*geojson.FeatureCollection, error) {
	sfcMap.mux.Lock()
	defer sfcMap.mux.Unlock()
	fc, ok := sfcMap.fcMap[geoFileName]
	if !ok {
		// load geo map, this one isn't cached
		var err error
		fc, err = loadGeoDataFromFile(geoFileName)
		if err != nil {
			return nil, err
		}
		sfcMap.fcMap[geoFileName] = fc
	}
	return fc, nil
}

func main() {
	sncrGeoHandler := http.HandlerFunc(Handler)
	http.Handle(Endpoint, sncrGeoHandler)
	// server
	port := os.Getenv("PORT")
	externalData = os.Getenv("EXTERNALDATA")
	addr := fmt.Sprintf(":%v", port)
	log.Printf("listening on :%v", port)
	http.ListenAndServe(addr, nil)
}

//Handler handles a request for point
func Handler(w http.ResponseWriter, r *http.Request) {
	// log.Printf("Request received %s from %s", r.URL.String(), r.RemoteAddr)
	// request
	resp, err := matcher(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// response
	encoder := json.NewEncoder(w)
	w.Header().Set("Content-Type", "application/json")
	err = encoder.Encode(resp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

// Matcher exctract from the url witch geoJSON object we want
func matcher(r *http.Request) (resp string, err error) {
	objectType := r.URL.Path[len(Endpoint):]
	// fmt.Printf("objecttype: %s\n", objectType)
	switch objectType {
	case "point":
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			return "", err
		}
		fc, err := geojson.UnmarshalFeatureCollection(body)
		if err != nil {
			return "", err
		}
		// fmt.Printf("point passed %v", fc.Features[0].Point())
		// geoDataFc, err := loadGeoDataDefault()
		geoDataFc, err := sfcMap.getFeatureCollection("")
		if err != nil {
			return "", err
		}
		pointInside, locationName := isPointInsidePolygon(geoDataFc, fc.Features[0].Point())
		if !pointInside {
			return "", fmt.Errorf("Failure")
		}
		return locationName, nil
	default:
		err = fmt.Errorf("Bad object type")
	}
	return
}

// loadGeoDataFromFile retrieves the FeatureCollection json objects for a file geoDataFile
// if the file passed is an empty string, try to use the environment variable
// if the environment variable is empty, then try and use the "build in" GEODATA variable
func loadGeoDataFromFile(geoDataFile string) (*geojson.FeatureCollection, error) {
	if geoDataFile == "" && externalData == "" {
		fc, err := geojson.UnmarshalFeatureCollection([]byte(GEODATA))
		return fc, err
	} else if geoDataFile == "" && externalData != "" {
		geoDataFile = externalData
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
func isPointInsidePolygon(fc *geojson.FeatureCollection, point orb.Point) (pointInside bool, locationName string) {
	for _, feature := range fc.Features {
		// Try on a MultiPolygon to begin
		multiPoly, isMulti := feature.Geometry.(orb.MultiPolygon)
		if isMulti {
			if planar.MultiPolygonContains(multiPoly, point) {
				return true, feature.Properties.MustString("NAME", feature.Properties.MustString("subunit", "UNKNOWN"))
			}
		} else {
			// Fallback to Polygon
			polygon, isPoly := feature.Geometry.(orb.Polygon)
			if isPoly {
				if planar.PolygonContains(polygon, point) {
					return true, feature.Properties.MustString("NAME", feature.Properties.MustString("subunit", "UNKNOWN"))
				}
			}
		}
	}
	return false, ""
}
