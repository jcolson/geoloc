#!/usr/bin/env bash
#DATASET="geocombined.json"
# Data set from data.world
DATASET="cities+ne_10m.geojson"
# data set from whosonfirst
#DATASET=/Users/jcolson/Downloads/whosonfirst.geojson
#DATASET=whosonfirst.geojson
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
    if [[ -f "${DATASET}" ]]; then 
        cat <(echo "${PREPEND}") <(cat "${DATASET}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(echo "${POSTPEND}") > geojson.go        
    else
        cat <(echo "${PREPEND}") <(gzip -cd "${DATASET}.gz" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(echo "${POSTPEND}") > geojson.go
    fi
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v || exit 1
    fi
fi
if [[ "${DATASET_ENRICHED}" != "" ]]; then
    if [[ -f "${DATASET}" ]]; then 
        cat <(echo "${PREPEND}") <(cat "${DATASET}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(cat "${DATASET_ENRICHED}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") > geojson.go
    else
        cat <(echo "${PREPEND}") <(gzip -cd "${DATASET}.gz" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") <(echo "${PREPEND_ENRICHED}") <(cat "${DATASET_ENRICHED}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") > geojson.go
    fi
    go get ./...
    if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
        go test -v || exit 1
    fi
fi

go build -o geoloc || exit 1
