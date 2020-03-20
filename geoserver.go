package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/paulmach/orb"
	"github.com/paulmach/orb/geojson"
	"github.com/paulmach/orb/planar"
)

// Endpoint is  the name of the geojson handler endpoint
const Endpoint = "/sncr/geo/"

func main() {
	sncrGeoHandler := http.HandlerFunc(Handler)
	http.Handle(Endpoint, sncrGeoHandler)
	// server
	port := os.Getenv("PORT")
	addr := fmt.Sprintf(":%v", port)
	fmt.Printf("listening on :%v", port)
	http.ListenAndServe(addr, nil)
}

//Handler handles a request for point
func Handler(w http.ResponseWriter, r *http.Request) {
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
		geoDataFc, err := loadGeoDataDefault()
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

func loadGeoDataFromFile(geoDataFile string) (*geojson.FeatureCollection, error) {
	f, err := ioutil.ReadFile(geoDataFile)
	if err != nil {
		log.Print(err)
		return &geojson.FeatureCollection{}, err
	}
	fc, err := geojson.UnmarshalFeatureCollection(f)
	return fc, err
}

func loadGeoDataDefault() (*geojson.FeatureCollection, error) {
	fc, err := geojson.UnmarshalFeatureCollection([]byte(GEODATA))
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
				return true, feature.Properties.MustString("NAME")
			}
		} else {
			// Fallback to Polygon
			polygon, isPoly := feature.Geometry.(orb.Polygon)
			if isPoly {
				if planar.PolygonContains(polygon, point) {
					return true, feature.Properties.MustString("NAME")
				}
			}
		}
	}
	return false, ""
}
