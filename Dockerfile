ARG BASE=alpine:latest
FROM $BASE AS builder

RUN apk add --no-cache \
    bash \
    go \
    git

# setup repo
RUN mkdir /geoloc && git clone https://github.com/jcolson/geoloc /geoloc/src

# compile
RUN cd /geoloc/src && ./build.sh

# runtime image
FROM $BASE

COPY --from=builder /geoloc/src/geoloc /geoloc

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/metrics || exit 1

CMD PORT=8080 /geoloc