FROM alpine:3.11

COPY geoloc /

HEALTHCHECK CMD wget --quiet --tries=1 --spider http://localhost:8080/metrics || exit 1

CMD PORT=8080 nohup /geoloc