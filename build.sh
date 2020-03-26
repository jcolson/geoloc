#!/usr/bin/env bash
#DATASET="geocombined.json"
# Data set from data.world
DATASET="ne_10m_admin_1_states_provinces.json"
PREPEND="package main

// GEODATA is the default geojson data built into the binary
const GEODATA string = \`"
POSTPEND="\`"
cat <(echo "${PREPEND}") <(cat "${DATASET}" | sed 's/\`/` + "`" + `/g') <(echo "${POSTPEND}") > geojson.go

go get ./...
if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
    go test -v
fi
go build -o geoloc
