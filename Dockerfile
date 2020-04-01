ARG BASE=alpine:latest
FROM $BASE AS builder

RUN apk add --no-cache \
    bash \
    go \
    git

COPY . /geoloc/src

# compile
RUN cd /geoloc/src && ./build.sh

# runtime image
FROM $BASE

COPY --from=builder /geoloc/src/geoloc /geoloc

HEALTHCHECK CMD wget --quiet --tries=1 --post-data '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -95.356004,29.744175 ]}}]}' -O - http://localhost:8080/sncr/geo/point | grep HOUSTON 2>&1 > /dev/null || false

CMD PORT=8080 /geoloc