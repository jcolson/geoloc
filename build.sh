#!/usr/bin/env bash
#DATASET="geocombined.json"
# Data set from data.world
DATASET="ne_10m_admin_1_states_provinces.json"
DATASET_ENRICHED="cities.json"
PREPEND="package main

// GEODATA is the default geojson data built into the binary
const GEODATA string = \`"

PREPEND_ENRICHED="// GEODATAENRICHED is the default enriched geojson data built into the binary
const GEODATAENRICHED string = \`"

POSTPEND="\`"

# to compare how slow the enriched is
BUILDBOTH="true"

## ADD THE ENRICHEMENT VARIABLE (cities)
if [[ "${DATASET_ENRICHED}" == "" ]] || [[ "${BUILDBOTH}" == "true" ]]; then
    cat <(echo "${PREPEND}") <(cat "${DATASET}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(echo "${POSTPEND}") > geojson.go
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v
    fi
fi
if [[ "${DATASET_ENRICHED}" != "" ]]; then
    cat <(echo "${PREPEND}") <(cat "${DATASET}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(cat "${DATASET_ENRICHED}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") > geojson.go
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v
    fi
fi

go build -o geoloc
