#!/usr/bin/env bash
#DATASET="geocombined.json"
# Data set from data.world
DATASET="cities+ne_10m.geojson"
# DATASET_ENRICHED="cities.json"
PREPEND="package main

// GEODATA is the default geojson data built into the binary
const GEODATA string = \`"

PREPEND_ENRICHED="// GEODATAENRICHED is the default enriched geojson data built into the binary
const GEODATAENRICHED string = \`"

POSTPEND="\`"

# to compare how slow the enriched is
#BUILDBOTH="true"

## ADD THE ENRICHEMENT VARIABLE (cities)
if [[ "${DATASET_ENRICHED}" == "" ]] || [[ "${BUILDBOTH}" == "true" ]]; then
    cat <(echo "${PREPEND}") <(cat "${DATASET}.gz" | gzip -d | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(echo "${POSTPEND}") > geojson.go
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v || exit 1
    fi
fi
if [[ "${DATASET_ENRICHED}" != "" ]]; then
    cat <(echo "${PREPEND}") <(cat "${DATASET}.gz" | gzip -d | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(cat "${DATASET_ENRICHED}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") > geojson.go
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v || exit 1
    fi
fi

go build -o geoloc || exit 1
