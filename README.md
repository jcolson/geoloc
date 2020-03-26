<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Geocode Service](#geocode-service)
  - [run tests](#run-tests)
  - [run load tests](#run-load-tests)
  - [compile](#compile)
  - [Docker Information](#docker-information)
    - [Run the docker image](#run-the-docker-image)
    - [Check the docker container's health](#check-the-docker-containers-health)
      - [Health response](#health-response)
    - [Docker images built automatically from github](#docker-images-built-automatically-from-github)
    - [Manually Build and push the docker image](#manually-build-and-push-the-docker-image)
  - [Run the server or service natively](#run-the-server-or-service-natively)
  - [Interpret Results](#interpret-results)
    - [Example for Houston, Texas](#example-for-houston-texas)
    - [Example Response - Houston Texas](#example-response---houston-texas)
    - [Example for Texas](#example-for-texas)
      - [Example Response - Texas](#example-response---texas)
    - [Example for France](#example-for-france)
      - [Example Response - France](#example-response---france)
    - [Example for Somewhere off the coast of Ireland](#example-for-somewhere-off-the-coast-of-ireland)
      - [Example Response - Ireland](#example-response---ireland)
  - [Logs](#logs)
  - [Metrics](#metrics)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Geocode Service

This service returns what location that point is in, if the geodata is aware of it.

There is bundled data in the executable, this microservice is not dependant on anything else.

The bundled data set default is noted by the ```DATASET="ne_10m_admin_1_states_provinces.json"``` in build.sh

## run tests

```sh
#if you need dependencies installed
go get ./...

go test -v
```

## run load tests

```sh
rm -Rf jmeter-report; rm -Rf geoloc.res; jmeter -n -t geoloc.jmx -l geoloc.res -e -o jmeter-report
```

if you'd like to target a different FQDN

```sh
rm -Rf jmeter-report; rm -Rf geoloc.res; jmeter -n -t geoloc.jmx -l geoloc.res -e -o jmeter-report -J targethost=some.server.override.if.not.localhost
```

## compile

```sh
#creates the geojson.go static file (from json file) as well as building the binary
./build.sh
```

for linux target (if you're building on windows/mac/etc)
note: this will skip running tests, as we check the environment prior and won't be able to execute tests locally if the arch is different

```sh
env GOOS=linux GOARCH=amd64 ./build.sh
```
## Docker Information

### Run the docker image

```sh
docker run --name geoloc -p 8080:8080 -d sncrpc/geoloc
```

### Check the docker container's health

```sh
docker inspect --format='{{json .State.Health}}' geoloc
```

#### Health response
```
{"Status":"healthy","FailingStreak":0,"Log":[{"Start":"2020-03-24T09:01:56.048962417Z","End":"2020-03-24T09:01:56.129634823Z","ExitCode":0,"Output":""}]}
```

### Docker images built automatically from github

<https://hub.docker.com/repository/docker/sncrpc/geoloc/builds>

### Manually Build and push the docker image

<https://hub.docker.com/repository/docker/sncrpc/geoloc>

```sh
env GOOS=linux GOARCH=amd64 ./build.sh
docker build -t sncrpc/geoloc .
docker login docker.io
docker push sncrpc/geoloc
```

## Run the server or service natively

to run the service on port 8080

```sh
PORT=8080 ./geoloc
```

to run the service on port 8080 and also load external geo json data (geocombined.json in this instance)

There are several json data files in the repository, they all end with json.  The geocombined.json file is a combination of the geousa.json and the geoworld.json file, which contains Poly's of the United States individual states as well as the rest of world country polygons.

If you decide to use externaldata, then the built-in enriched data will not be used either, so you'll need to pass EXTERNALENRICHEDDATA if you'd like a second data set to enrich the first.

Enriched data sets prepend ENRICHED_ to their property names to avoid collisions.

```sh
PORT=8080 EXTERNALDATA=geocombined.json ./geoloc
```

```sh
PORT=8080 EXTERNALDATA=geoworld.json EXTERNALENRICHEDDATA=geousa.json ./geoloc
```

## Interpret Results

the simple service takes a geojson formatted 'point' at the endpoint of /sncr/geo/point

the service returns what location that point is in, if the geodata is aware of it

responses are of type Properties from Feature from geojson a FeatureCollection and can be different based on the json files configured runtime (or builtin via build.sh).

### Example for Houston, Texas

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -95.356004,29.744175 ]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```
### Example Response - Houston Texas

```sh
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> POST /sncr/geo/point HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 136
> 
* upload completely sent off: 136 out of 136 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Thu, 26 Mar 2020 18:11:07 GMT
< Content-Length: 784
< 
{"CityName":"HOUSTON","Shape_Area":65.109247789,"Shape_Leng":63.5254179122,"abbrev":"Tex.","adm0_sr":4,"adm1_code":"USA-3536","adm1_code_":"USA-3536","admin":"United States of America","admin0_lab":2,"area_sqkm":0,"big_code":null,"check_me":0,"code_hasc":"US.TX","code_local":"US48","datarank":1,"diss_me":3536,"featurecla":"Admin-1 scale rank","gadm_level":1,"hasc_maybe":null,"iso_3166_2":"US-TX","iso_a2":"US","labelrank":0,"mapcolor13":1,"mapcolor9":1,"name":"Texas","name_alt":"TX|Tex.","name_len":5,"name_local":null,"note":null,"postal":"TX","provnum_ne":0,"region":"South","region_big":"West South Central","region_cod":null,"sameascity":-99,"scalerank":2,"sr_adm0_a3":"USA","sr_sov_a3":"US1","type":"State","type_en":"State","wikipedia":"http://en.wikipedia.org/wiki/Texas"}
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for Texas

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -100.000000, 31.000000 ]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```

#### Example Response - Texas

```sh
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> POST /sncr/geo/point HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 138
> 
* upload completely sent off: 138 out of 138 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Thu, 26 Mar 2020 18:12:43 GMT
< Content-Length: 784
< 
{"CityName":"HOUSTON","Shape_Area":65.109247789,"Shape_Leng":63.5254179122,"abbrev":"Tex.","adm0_sr":4,"adm1_code":"USA-3536","adm1_code_":"USA-3536","admin":"United States of America","admin0_lab":2,"area_sqkm":0,"big_code":null,"check_me":0,"code_hasc":"US.TX","code_local":"US48","datarank":1,"diss_me":3536,"featurecla":"Admin-1 scale rank","gadm_level":1,"hasc_maybe":null,"iso_3166_2":"US-TX","iso_a2":"US","labelrank":0,"mapcolor13":1,"mapcolor9":1,"name":"Texas","name_alt":"TX|Tex.","name_len":5,"name_local":null,"note":null,"postal":"TX","provnum_ne":0,"region":"South","region_big":"West South Central","region_cod":null,"sameascity":-99,"scalerank":2,"sr_adm0_a3":"USA","sr_sov_a3":"US1","type":"State","type_en":"State","wikipedia":"http://en.wikipedia.org/wiki/Texas"}
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for France

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [2.318219, 48.852513]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```

#### Example Response - France

```sh
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> POST /sncr/geo/point HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 133
> 
* upload completely sent off: 133 out of 133 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Thu, 26 Mar 2020 18:13:00 GMT
< Content-Length: 727
< 
{"CityName":"PARIS","Shape_Area":1.47914248773,"Shape_Leng":6.15489690733,"abbrev":null,"adm0_sr":1,"adm1_code":"FRA-2680","adm1_code_":"FRA-2680","admin":"France","admin0_lab":2,"area_sqkm":0,"big_code":null,"check_me":0,"code_hasc":null,"code_local":null,"datarank":3,"diss_me":2680,"featurecla":"Admin-1 scale rank","gadm_level":1,"hasc_maybe":null,"iso_3166_2":"FR-","iso_a2":"FR","labelrank":3,"mapcolor13":11,"mapcolor9":9,"name":"Île-de-France","name_alt":null,"name_len":13,"name_local":null,"note":null,"postal":null,"provnum_ne":10,"region":"Île-de-France","region_big":null,"region_cod":null,"sameascity":-99,"scalerank":3,"sr_adm0_a3":"FRA","sr_sov_a3":"FR1","type":"Région","type_en":"Region","wikipedia":null}
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for Somewhere off the coast of Ireland

as there is no geolocation data bundled for random oceans, it will fail to resolve and return 400 error

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -5.945750, 53.312652 ]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```

#### Example Response - Ireland

```sh
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> POST /sncr/geo/point HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 136
>
* upload completely sent off: 136 out of 136 bytes
< HTTP/1.1 400 Bad Request
< Content-Type: text/plain; charset=utf-8
< X-Content-Type-Options: nosniff
< Date: Sat, 21 Mar 2020 12:54:55 GMT
< Content-Length: 8
<
Failure
* Connection #0 to host localhost left intact
* Closing connection 0
```

## Logs

Logs are written to standard out in format:

```sh
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
2020/03/22 17:28:48  POST /sncr/geo/point
```

## Metrics

Metrics for the service are handled by the standard PROMETHEUS library

Metrics are available at /metrics

example output:

```sh
# HELP geoserver_http_metric_handler_requests_total Total number of geoserver requests by HTTP code.
# TYPE geoserver_http_metric_handler_requests_total counter
geoserver_http_metric_handler_requests_total{code="200"} 127986
# HELP go_gc_duration_seconds A summary of the pause duration of garbage collection cycles.
# TYPE go_gc_duration_seconds summary
go_gc_duration_seconds{quantile="0"} 3.9938e-05
go_gc_duration_seconds{quantile="0.25"} 0.000375231
go_gc_duration_seconds{quantile="0.5"} 0.000421356
go_gc_duration_seconds{quantile="0.75"} 0.000476344
go_gc_duration_seconds{quantile="1"} 0.00126344
go_gc_duration_seconds_sum 0.044591943
go_gc_duration_seconds_count 105
# HELP go_goroutines Number of goroutines that currently exist.
# TYPE go_goroutines gauge
go_goroutines 8
# HELP go_info Information about the Go environment.
# TYPE go_info gauge
go_info{version="go1.14"} 1
# HELP go_memstats_alloc_bytes Number of bytes allocated and still in use.
# TYPE go_memstats_alloc_bytes gauge
go_memstats_alloc_bytes 9.53176e+06
# HELP go_memstats_alloc_bytes_total Total number of bytes allocated, even if freed.
# TYPE go_memstats_alloc_bytes_total counter
go_memstats_alloc_bytes_total 6.92188e+08
# HELP go_memstats_buck_hash_sys_bytes Number of bytes used by the profiling bucket hash table.
# TYPE go_memstats_buck_hash_sys_bytes gauge
go_memstats_buck_hash_sys_bytes 1.474099e+06
# HELP go_memstats_frees_total Total number of frees.
# TYPE go_memstats_frees_total counter
go_memstats_frees_total 8.780266e+06
# HELP go_memstats_gc_cpu_fraction The fraction of this program's available CPU time used by the GC since the program started.
# TYPE go_memstats_gc_cpu_fraction gauge
go_memstats_gc_cpu_fraction 0.0015098549051506148
# HELP go_memstats_gc_sys_bytes Number of bytes used for garbage collection system metadata.
# TYPE go_memstats_gc_sys_bytes gauge
go_memstats_gc_sys_bytes 3.74196e+06
# HELP go_memstats_heap_alloc_bytes Number of heap bytes allocated and still in use.
# TYPE go_memstats_heap_alloc_bytes gauge
go_memstats_heap_alloc_bytes 9.53176e+06
# HELP go_memstats_heap_idle_bytes Number of heap bytes waiting to be used.
# TYPE go_memstats_heap_idle_bytes gauge
go_memstats_heap_idle_bytes 4.4949504e+07
# HELP go_memstats_heap_inuse_bytes Number of heap bytes that are in use.
# TYPE go_memstats_heap_inuse_bytes gauge
go_memstats_heap_inuse_bytes 1.7965056e+07
# HELP go_memstats_heap_objects Number of allocated objects.
# TYPE go_memstats_heap_objects gauge
go_memstats_heap_objects 55441
# HELP go_memstats_heap_released_bytes Number of heap bytes released to OS.
# TYPE go_memstats_heap_released_bytes gauge
go_memstats_heap_released_bytes 3.95264e+07
# HELP go_memstats_heap_sys_bytes Number of heap bytes obtained from system.
# TYPE go_memstats_heap_sys_bytes gauge
go_memstats_heap_sys_bytes 6.291456e+07
# HELP go_memstats_last_gc_time_seconds Number of seconds since 1970 of last garbage collection.
# TYPE go_memstats_last_gc_time_seconds gauge
go_memstats_last_gc_time_seconds 1.584896605400845e+09
# HELP go_memstats_lookups_total Total number of pointer lookups.
# TYPE go_memstats_lookups_total counter
go_memstats_lookups_total 0
# HELP go_memstats_mallocs_total Total number of mallocs.
# TYPE go_memstats_mallocs_total counter
go_memstats_mallocs_total 8.835707e+06
# HELP go_memstats_mcache_inuse_bytes Number of bytes in use by mcache structures.
# TYPE go_memstats_mcache_inuse_bytes gauge
go_memstats_mcache_inuse_bytes 34720
# HELP go_memstats_mcache_sys_bytes Number of bytes used for mcache structures obtained from system.
# TYPE go_memstats_mcache_sys_bytes gauge
go_memstats_mcache_sys_bytes 49152
# HELP go_memstats_mspan_inuse_bytes Number of bytes in use by mspan structures.
# TYPE go_memstats_mspan_inuse_bytes gauge
go_memstats_mspan_inuse_bytes 438872
# HELP go_memstats_mspan_sys_bytes Number of bytes used for mspan structures obtained from system.
# TYPE go_memstats_mspan_sys_bytes gauge
go_memstats_mspan_sys_bytes 475136
# HELP go_memstats_next_gc_bytes Number of heap bytes when next garbage collection will take place.
# TYPE go_memstats_next_gc_bytes gauge
go_memstats_next_gc_bytes 1.6150864e+07
# HELP go_memstats_other_sys_bytes Number of bytes used for other system allocations.
# TYPE go_memstats_other_sys_bytes gauge
go_memstats_other_sys_bytes 4.958661e+06
# HELP go_memstats_stack_inuse_bytes Number of bytes in use by the stack allocator.
# TYPE go_memstats_stack_inuse_bytes gauge
go_memstats_stack_inuse_bytes 4.194304e+06
# HELP go_memstats_stack_sys_bytes Number of bytes obtained from system for stack allocator.
# TYPE go_memstats_stack_sys_bytes gauge
go_memstats_stack_sys_bytes 4.194304e+06
# HELP go_memstats_sys_bytes Number of bytes obtained from system.
# TYPE go_memstats_sys_bytes gauge
go_memstats_sys_bytes 7.7807872e+07
# HELP go_threads Number of OS threads created.
# TYPE go_threads gauge
go_threads 85
# HELP promhttp_metric_handler_requests_in_flight Current number of scrapes being served.
# TYPE promhttp_metric_handler_requests_in_flight gauge
promhttp_metric_handler_requests_in_flight 1
# HELP promhttp_metric_handler_requests_total Total number of scrapes by HTTP status code.
# TYPE promhttp_metric_handler_requests_total counter
promhttp_metric_handler_requests_total{code="200"} 8
promhttp_metric_handler_requests_total{code="500"} 0
promhttp_metric_handler_requests_total{code="503"} 0
```
