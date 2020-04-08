package main

import (
	"bufio"
	"bytes"
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/http/httptest"
	"os"
	"strconv"
	"strings"
	"testing"

	"github.com/paulmach/orb"
)

const EXTGEODATA string = "geocombined.json"

const CSVTESTDATA string = "geoserver_test.csv"

var locationTestMap = map[string]orb.Point{}

var locationTestMapFalse = map[string]orb.Point{
	"Somewhere off the coast of Ireland": orb.Point{-5.945750, 53.312652},
}

func loadTestData(t *testing.T) {
	f, err := os.Open(CSVTESTDATA)
	defer f.Close()
	if err != nil {
		t.Errorf("loadTestData() = %v; want no f'n error", err)
		return
	}
	fileReader := bufio.NewReader(f)
	r := csv.NewReader(fileReader)
	//read header line first and ignore it
	r.Read()
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			t.Errorf("loadTestData() = %v; want no f'n error", err)
			return
		}
		location := record[0]
		long, err := strconv.ParseFloat(record[1], 64)
		lat, err := strconv.ParseFloat(record[2], 64)
		locationTestMap[location] = orb.Point{long, lat}
	}
}

func TestGetFeatureCollection(t *testing.T) {
	loadTestData(t)
	featureCollection, err := sfcMap.getFeatureCollection(EXTGEODATA, false)
	if err != nil {
		t.Errorf("getFeatureCollection() = %v; want no f'n error", err)
	}

	for key, loc := range locationTestMap {
		log.Printf("Testing: %s", key)
		found, feature := isPointInsidePolygon(featureCollection, loc)
		if !found || len(feature) < 1 {
			t.Errorf("didn't find features for %s\n", key)
		}
		locationName := feature[0].Properties.MustString("NAME", feature[0].Properties.MustString("subunit", "UNKNOWN"))
		if locationName != key {
			t.Errorf("found = %t; want true -- getFeatureCollection() = '%s'; want '%s'\n", found, locationName, key)
		}
	}

	for key, loc := range locationTestMapFalse {
		log.Printf("False Testing: %s", key)
		found, feature := isPointInsidePolygon(featureCollection, loc)
		if found || len(feature) > 0 {
			t.Errorf("Found features that we shouldn't have for %s\n", key)
		}
	}
}
func TestHandlerNeg(t *testing.T) {
	externalData = EXTGEODATA
	loadTestData(t)
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
	externalData = EXTGEODATA
	loadTestData(t)
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

		if strings.Contains(rr.Body.String(), expected) {
			t.Errorf("handler returned unexpected body: got '%v' want %v",
				rr.Body.String(), expected)
		}
	}
}
