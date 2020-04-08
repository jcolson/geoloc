ARG BASE=alpine:latest
FROM $BASE AS builder

RUN apk add --no-cache \
    bash \
    go \
    jq \
    git-lfs

# can't use this COPY, but will try to checkout the exact same revision from github, due to lfs
COPY . /geoloc/src-orig

RUN cd /geoloc/src-orig && git remote set-url origin https://github.com/jcolson/geoloc && git pull && git lfs fetch && git lfs checkout && gzip -d whosonfirst.geojson.gz
#could re-check out the whole project if lfs isn't supported in the copy and the above git pull doesn't work
#RUN cd /geoloc/src-orig && export REVISION=`git rev-parse HEAD` && git clone https://github.com/jcolson/geoloc /geoloc/src && cd /geoloc/src && git checkout ${REVISION}

#if you want the docker container to concatenate all the whosonfirst data into one huge json every build uncomment this
#RUN /geoloc/src-orig/jsonconcat.sh /wof /geoloc/src-orig/whosonfirst.geojson -wof

# compile
RUN cd /geoloc/src-orig && ./build.sh

# runtime image
FROM $BASE

COPY --from=builder /geoloc/src-orig/geoloc /geoloc
COPY --from=builder /geoloc/src-orig/whosonfirst.geojson /whosonfirst.geojson

HEALTHCHECK --start-period=10m CMD wget --quiet --tries=1 --post-data '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -95.356004,29.744175 ]}}]}' -O - http://localhost:8080/sncr/geo/point | grep -i HOUSTON 2>&1 > /dev/null || false

EXPOSE 8080

ENTRYPOINT PORT=8080 EXTERNALDATA=/whosonfirst.geojson /geoloc