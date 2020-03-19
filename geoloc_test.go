package main

import "testing"

func TestLoadGeoData(t *testing.T) {
	got, err := loadGeoData("geo.json")
	if err != nil {
		t.Errorf("loadGeoData() = %v; want no f'n error", err)
	}
	if got.Locations[0].Properties.Name != "Maine" {
		t.Errorf("loadGeoData() = '%s'; want Maine", got.Locations[0].Properties.Name)
	}
}
