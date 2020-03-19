package main

import (
	"fmt"
	"testing"
)

func TestLoadGeoData(t *testing.T) {
	got, err := loadGeoData("geo.json")
	if err != nil {
		t.Errorf("loadGeoData() = %v; want no f'n error", err)
	}
	fmt.Printf("len of coords location 0 coords: %d; polygon coords 0 0 0: %v\n", len(got.Locations[0].Geometry.Coordinates),
		got.Locations[0].Geometry.Coordinates[0][0][0])
	if got.Locations[0].Properties.Name != "Maine" {
		t.Errorf("loadGeoData() = '%s'; want Maine", got.Locations[0].Properties.Name)
	}
}

func TestGeometrySides(t *testing.T) {
	got, err := loadGeoData("geo.json")
	if err != nil {
		t.Errorf("loadGeoData() = %v; want no f'n error", err)
	}
	fmt.Printf("sides: %v\n", len(got.Locations[0].Geometry.sides()))

}
