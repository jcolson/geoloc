package main

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/paulmach/orb"
)

const EXTGEODATA string = "geocombined.json"

var locationTestMap = map[string]orb.Point{
	"Alaska":               orb.Point{-154.493062, 63.588753},
	"Alabama":              orb.Point{-86.902298, 32.318231},
	"Arkansas":             orb.Point{-91.831833, 35.20105},
	"Arizona":              orb.Point{-111.093731, 34.048928},
	"California":           orb.Point{-119.417932, 36.778261},
	"Colorado":             orb.Point{-105.782067, 39.550051},
	"Connecticut":          orb.Point{-73.087749, 41.603221},
	"District of Columbia": orb.Point{-77.033418, 38.905985},
	"Delaware":             orb.Point{-75.52767, 38.910832},
	"Florida":              orb.Point{-81.515754, 27.664827},
	"Georgia":              orb.Point{-82.907123, 32.157435},
	"Hawaii":               orb.Point{-155.665857, 19.898682},
	"Iowa":                 orb.Point{-93.097702, 41.878003},
	"Idaho":                orb.Point{-114.742041, 44.068202},
	"Illinois":             orb.Point{-89.398528, 40.633125},
	"Indiana":              orb.Point{-85.602364, 40.551217},
	"Kansas":               orb.Point{-98.484246, 39.011902},
	"Kentucky":             orb.Point{-84.270018, 37.839333},
	"Louisiana":            orb.Point{-92.145024, 31.244823},
	"Massachusetts":        orb.Point{-71.382437, 42.407211},
	"Maryland":             orb.Point{-76.641271, 39.045755},
	"Maine":                orb.Point{-69.445469, 45.253783},
	"Michigan":             orb.Point{-85.602364, 44.314844},
	"Minnesota":            orb.Point{-94.6859, 46.729553},
	"Missouri":             orb.Point{-91.831833, 37.964253},
	"Mississippi":          orb.Point{-89.398528, 32.354668},
	"Montana":              orb.Point{-110.362566, 46.879682},
	"North Carolina":       orb.Point{-79.0193, 35.759573},
	"North Dakota":         orb.Point{-101.002012, 47.551493},
	"Nebraska":             orb.Point{-99.901813, 41.492537},
	"New Hampshire":        orb.Point{-71.572395, 43.193852},
	"New Jersey":           orb.Point{-74.405661, 40.058324},
	"New Mexico":           orb.Point{-105.032363, 34.97273},
	"Nevada":               orb.Point{-116.419389, 38.80261},
	"New York":             orb.Point{-74.217933, 43.299428},
	"Ohio":                 orb.Point{-82.907123, 40.417287},
	"Oklahoma":             orb.Point{-97.092877, 35.007752},
	"Oregon":               orb.Point{-120.554201, 43.804133},
	"Pennsylvania":         orb.Point{-77.194525, 41.203322},
	"Puerto Rico":          orb.Point{-66.590149, 18.220833},
	"Rhode Island":         orb.Point{-71.477429, 41.580095},
	"South Carolina":       orb.Point{-81.163725, 33.836081},
	"South Dakota":         orb.Point{-99.901813, 43.969515},
	"Tennessee":            orb.Point{-86.580447, 35.517491},
	"Texas":                orb.Point{-99.901813, 31.968599},
	"Utah":                 orb.Point{-111.093731, 39.32098},
	"Virginia":             orb.Point{-78.656894, 37.431573},
	"Vermont":              orb.Point{-72.577841, 44.558803},
	"Washington":           orb.Point{-120.740139, 47.751074},
	"Wisconsin":            orb.Point{-88.787868, 43.78444},
	"West Virginia":        orb.Point{-80.454903, 38.597626},
	"Wyoming":              orb.Point{-107.290284, 43.075968},
	"Ireland":              orb.Point{-6.207248, 53.305834},
	"India":                orb.Point{78.962883, 20.5936832},
	"France":               orb.Point{2.318219, 48.852513},
}
var locationTestMapFalse = map[string]orb.Point{
	"Somewhere off the coast of Ireland": orb.Point{-5.945750, 53.312652},
}

func TestGetFeatureCollection(t *testing.T) {
	featureCollection, err := sfcMap.getFeatureCollection(EXTGEODATA)
	if err != nil {
		t.Errorf("getFeatureCollection() = %v; want no f'n error", err)
	}

	for key, loc := range locationTestMap {
		found, locationName := isPointInsidePolygon(featureCollection, loc)
		if !found || locationName != key {
			t.Errorf("found = %t; want true -- getFeatureCollection() = '%s'; want '%s'\n", found, locationName, key)
		}
	}

	for key, loc := range locationTestMapFalse {
		found, locationName := isPointInsidePolygon(featureCollection, loc)
		if found {
			t.Errorf("found = %t; want true -- getFeatureCollection() = '%s'; want '%s'\n", found, locationName, key)
		}
	}
}
func TestHandlerNeg(t *testing.T) {
	// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
	// pass 'nil' as the third parameter.
	req, err := http.NewRequest("POST", Endpoint, nil)
	if err != nil {
		t.Fatal(err)
	}

	// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(Handler)

	// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
	// directly and pass in our Request and ResponseRecorder.
	handler.ServeHTTP(rr, req)

	// Check the status code is what we expect.
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}

	// Check the response body is what we expect.
	expected := "Bad object type\n"
	if rr.Body.String() != expected {
		t.Errorf("handler returned unexpected body: got '%v' want %v",
			rr.Body.String(), expected)
	}
}
func TestHandlerPos(t *testing.T) {
	handler := http.HandlerFunc(Handler)
	for key, point := range locationTestMap {
		jsonStr := fmt.Sprintf(`{ "type": "FeatureCollection",
		"features": [
		  { "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [%f, %f]}
		  }
		]
	  }`, point.X(), point.Y())

		req, err := http.NewRequest("POST", Endpoint+"point", bytes.NewBuffer([]byte(jsonStr)))
		if err != nil {
			t.Fatal(err)
		}

		// We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
		rr := httptest.NewRecorder()

		// Our handlers satisfy http.Handler, so we can call their ServeHTTP method
		// directly and pass in our Request and ResponseRecorder.
		handler.ServeHTTP(rr, req)

		// Check the status code is what we expect.
		if status := rr.Code; status != http.StatusOK {
			t.Errorf("handler returned wrong status code: got %v want %v",
				status, http.StatusOK)
		}

		// Check the response body is what we expect.
		expected := "\"" + key + "\"\n"
		if rr.Body.String() != expected {
			t.Errorf("handler returned unexpected body: got '%v' want %v",
				rr.Body.String(), expected)
		}
	}
}
