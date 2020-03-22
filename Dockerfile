FROM alpine:3.11

COPY geoloc /

CMD PORT=8080 nohup /geoloc