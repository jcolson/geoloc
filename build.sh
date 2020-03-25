#!/usr/bin/env bash
DATASET="geocombined.json"
PREPEND="package main

// GEODATA is the default geojson data built into the binary
const GEODATA string = \`"
POSTPEND="\`"
cat <(echo "${PREPEND}") ${DATASET} <(echo "${POSTPEND}") > geojson.go

go get ./...
if [[ "${GOOS}" == "" ]] && [[ "${GOARCH}" == "" ]]; then
    go test -v
fi
go build
