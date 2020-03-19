package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

//Coordinates is a set of coordinate
type Coordinates [][]Coordinate

//Coordinate is a [longitude, latitude]
type Coordinate [2]float64

// Point rapresent a geojson point geometry object
type Point struct {
	Type       string `json:"type"`
	Coordinate `json:"coordinates"`
}

func (p *Point) parseJSON(r io.Reader) (err error) {
	decoder := json.NewDecoder(r)
	err = decoder.Decode(&p)
	return err
}

// Polygon rapresent a geojson polygon geometry object
type Polygon struct {
	Type        string `json:"type"`
	Coordinates `json:"coordinates"`
}

func (p *Polygon) parseJSON(r io.Reader) (err error) {
	decoder := json.NewDecoder(r)
	err = decoder.Decode(&p)
	return err
}

// MultiPolygon rapresent a geojson mulitpolygon  geometry object
type MultiPolygon struct {
	Type        string        `json:"type"`
	Coordinates []Coordinates `json:"coordinates"`
}

func (p *MultiPolygon) parseJSON(r io.Reader) (err error) {
	decoder := json.NewDecoder(r)
	err = decoder.Decode(&p)
	return err
}

// LocationCollection represents a collection of features
type LocationCollection struct {
	Type      string     `json:"type"`
	Locations []Location `json:"features"`
}

func (p *LocationCollection) parseJSON(r io.Reader) (err error) {
	decoder := json.NewDecoder(r)
	err = decoder.Decode(&p)
	return err
}

// Location represents a feature and it's properties
type Location struct {
	Type       string     `json:"type"`
	Properties Properties `json:"properties"`
	Geometry   Geometry   `json:"geometry"`
}

// Properties represents a Properties and it's properties
type Properties struct {
	GeoID      string  `json:"GEO_ID"`
	State      string  `json:"STATE"`
	Name       string  `json:"NAME"`
	LSAD       string  `json:"LSAD"`
	CensusArea float64 `json:"CENSUSAREA"`
}

// Geometry represents a geometric shape (Multipolygon)
type Geometry struct {
	Type        string        `json:"type"`
	Coordinates []Coordinates `json:"coordinates"`
}

type geojson interface {
	parseJSON(io.Reader) error
}

// Endpoint is  the name of the geojson handler endpoint
const Endpoint = "/tos2/geojson/"

//Handler handles a request for a geojsonPoint
func Handler(w http.ResponseWriter, r *http.Request) {
	// request
	resp, err := matcher(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
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
func matcher(r *http.Request) (resp geojson, err error) {
	objectType := r.URL.Path[len(Endpoint):]
	switch objectType {
	case "polygon":
		p := Polygon{}
		err = p.parseJSON(r.Body)
		return &p, err
	case "point":
		p := Point{}
		err = p.parseJSON(r.Body)
		return &p, err
	case "multipolygon":
		p := MultiPolygon{}
		err = p.parseJSON(r.Body)
		return &p, err
	default:
		err = fmt.Errorf("Bad geoJSON object type")
	}
	return
}

func loadGeoData(geoDataFile string) (LocationCollection, error) {
	f, err := os.Open(geoDataFile)
	if err != nil {
		log.Print(err)
		return LocationCollection{}, err
	}
	fileReader := bufio.NewReader(f)
	decoder := json.NewDecoder(fileReader)
	locationColl := LocationCollection{}
	err = decoder.Decode(&locationColl)
	// return fmt.Sprintf("%s", locationColl.Locations[0].Properties.Name), nil
	return locationColl, nil
}

func main() {
	// geojson
	geoJSONHandler := http.HandlerFunc(Handler)
	http.Handle(Endpoint, geoJSONHandler)
	// server
	port := os.Getenv("PORT")
	addr := fmt.Sprintf(":%v", port)
	fmt.Printf(":%v", port)
	http.ListenAndServe(addr, nil)
}
