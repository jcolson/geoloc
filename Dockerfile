ARG BASE=alpine:latest
FROM $BASE AS builder

RUN apk add --no-cache \
    bash \
    go \
    git-lfs

# can't use this COPY, but will try to checkout the exact same revision from github, due to lfs
COPY . /geoloc/src-orig
RUN cd /geoloc/src-orig && export REVISION=`git rev-parse HEAD` && git clone https://github.com/jcolson/geoloc /geoloc/src && cd /geoloc/src && git checkout ${REVISION}

# compile
RUN cd /geoloc/src && ./build.sh

# runtime image
FROM $BASE

COPY --from=builder /geoloc/src/geoloc /geoloc

HEALTHCHECK CMD wget --quiet --tries=1 --post-data '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -95.356004,29.744175 ]}}]}' -O - http://localhost:8080/sncr/geo/point | grep HOUSTON 2>&1 > /dev/null || false

CMD PORT=8080 /geoloc