package main

import (
	"bytes"
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/paulmach/orb"
)

const EXTGEODATA string = "geo.json"

var locationTestMap = map[string]orb.Point{
	"Virginia":   orb.Point{-78.024902, 37.926868},
	"California": orb.Point{-119.417931, 36.778259},
	"Texas":      orb.Point{-100.000000, 31.000000},
}
var locationTestMapFalse = map[string]orb.Point{
	"India": orb.Point{78.962883, 20.5936832},
}

func TestLoadGeoData(t *testing.T) {
	featureCollection, err := loadGeoDataFromFile(EXTGEODATA)
	if err != nil {
		t.Errorf("loadGeoData() = %v; want no f'n error", err)
	}

	for key, loc := range locationTestMap {
		found, locationName := isPointInsidePolygon(featureCollection, loc)
		if !found || locationName != key {
			t.Errorf("found = %t; want true -- loadGeoData() = '%s'; want '%s'\n", found, locationName, key)
		}
	}
	for key, loc := range locationTestMapFalse {
		found, locationName := isPointInsidePolygon(featureCollection, loc)
		if found {
			t.Errorf("found = %t; want true -- loadGeoData() = '%s'; want '%s'\n", found, locationName, key)
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
	// Create a request to pass to our handler.
	// pass a point as the third parameter.
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
		handler := http.HandlerFunc(Handler)

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
