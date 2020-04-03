ARG BASE=alpine:latest
FROM $BASE AS builder

RUN apk add --no-cache \
    bash \
    go \
    jq \
    git-lfs

#https://dist.whosonfirst.org/bundles/whosonfirst-data-localadmin-latest.tar.bz2

#https://www.whosonfirst.org/docs/placetypes/
#locality
#https://dist.whosonfirst.org/bundles/whosonfirst-data-locality-latest.tar.bz2
#region
#https://dist.whosonfirst.org/bundles/whosonfirst-data-region-latest.tar.bz2
#country
# https://dist.whosonfirst.org/bundles/whosonfirst-data-country-latest.tar.bz2
ARG locality=whosonfirst-data-locality-latest
ARG region=whosonfirst-data-region-latest
ARG country=whosonfirst-data-country-latest
#C
RUN mkdir -p /wof/data/C && cd /wof/data/C && (wget https://dist.whosonfirst.org/bundles/${country}.tar.bz2 && tar xvfj ${country}.tar.bz2 && rm ${country}.tar.bz2)
#B
RUN mkdir -p /wof/data/B && cd /wof/data/B && (wget https://dist.whosonfirst.org/bundles/${region}.tar.bz2 && tar xvfj ${region}.tar.bz2 && rm ${region}.tar.bz2)
#A
RUN mkdir -p /wof/data/A && cd /wof/data/A && (wget https://dist.whosonfirst.org/bundles/${locality}.tar.bz2 && tar xvfj ${locality}.tar.bz2 && rm ${locality}.tar.bz2)

# can't use this COPY, but will try to checkout the exact same revision from github, due to lfs
COPY . /geoloc/src-orig

#concatenate all the whosonfirst data into one huge json
RUN cd /geoloc/src-orig && /geoloc/src-orig/jsonconcat.sh /wof/data > whosonfirst.geojson

RUN cd /geoloc/src-orig && git remote set-url origin https://github.com/jcolson/geoloc && git pull
#RUN cd /geoloc/src-orig && export REVISION=`git rev-parse HEAD` && git clone https://github.com/jcolson/geoloc /geoloc/src && cd /geoloc/src && git checkout ${REVISION}

# compile
RUN cd /geoloc/src-orig && ./build.sh

# runtime image
FROM $BASE

COPY --from=builder /geoloc/src-orig/geoloc /geoloc
COPY --from=builder /geoloc/src-orig/whosonfirst.geojson /whosonfirst.geojson

HEALTHCHECK CMD wget --quiet --tries=1 --post-data '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -95.356004,29.744175 ]}}]}' -O - http://localhost:8080/sncr/geo/point | grep HOUSTON 2>&1 > /dev/null || false

CMD PORT=8080 EXTERNALDATA=/whosonfirst.geojson /geoloc