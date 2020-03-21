#!/usr/bin/env bash
PREPEND="package main

// GEODATA is the default geojson data built into the binary
const GEODATA string = \`"
POSTPEND="\`"
cat <(echo "${PREPEND}") geocombined.json <(echo "${POSTPEND}") > geojson.go

go get ./...
go test -v
go build
