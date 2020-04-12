<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Geocode Service](#geocode-service)
  - [WhosonFirst Data](#whosonfirst-data)
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
    - [Example for Philadelphia, Pennsylvania](#example-for-philadelphia-pennsylvania)
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

This service returns what location (reverse geocoding) that point is in, if the geodata is aware of it.

There is bundled data in the executable, this microservice is not dependant on anything else.

The bundled data set default is noted by the ```DATASET="whosonfirst.geojson"```.  This was built with the below mentioned jsonconcat.sh.

## WhosonFirst Data

You can refresh all the data listed in the whosonfirstlist.txt which comes from here -> [Github repo](https://github.com/whosonfirst-data/whosonfirst-data) <- into a fresh new ```whosonfirst.geojson``` file by running the below.  BEWARE this will take a long time.  (More than an hour with a stellar internet connection).

The local [whosonfirst.geojson.gz](./whosonfirst.geojson.gz) in this repository was created on it's commit date, so you could just be happy using that for now as well.

```sh
jsonconcat.sh [name of directory to process files in] [name of new whosonfirst.geojson combined file] -wof
jsonconcat.sh wof whosonfirst.geojson -wof
```

[Github repo](https://github.com/whosonfirst-data/whosonfirst-data)
saved locally [here](./whosonfirstlist.txt)

## run tests

(this is also done in the build.sh by default)

testing uses the local uncompressed dataset [geocombined.json](./geocombined.json) that was created for testing purposes.

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

You can also have the docker image download all the data from whosonfirst when built.  (just uncomment the jsonconcat.sh line)

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

Set the FINDFAST boolean value to true in order to return the first value found in the dataset and not iterate over the entire dataset

```sh
PORT=8080 FINDFAST=true EXTERNALDATA=whosonfirst.geojson ./geoloc
```

```sh
PORT=8080 EXTERNALDATA=geoworld.json EXTERNALENRICHEDDATA=geousa.json ./geoloc
```

## Interpret Results

the simple service takes a geojson formatted 'point' at the endpoint of /sncr/geo/point

the service returns what location that point is in, if the geodata is aware of it

responses are of type Properties from Feature from geojson a FeatureCollection and can be different based on the json files configured runtime (or builtin via build.sh).

todo: in progress: joining data  
qgis - vector - join attributes by location


### Example for Philadelphia, Pennsylvania

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -75.136060,39.995016 ]}}]}' http://localhost:8080/sncr/geo/point
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
> Content-Length: 136
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 136 out of 136 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Tue, 07 Apr 2020 20:37:20 GMT
< Transfer-Encoding: chunked
< 
[{"gn:elevation":12,"gn:population":1526006,"ne:ADM0CAP":0,"ne:ADM0NAME":"United States of America","ne:ADM0_A3":"USA","ne:ADM1NAME":"Pennsylvania","ne:ADMIN1_COD":0,"ne:CAPALT":0,"ne:CAPIN":null,"ne:CHANGED":5,"ne:CHECKME":0,"ne:CITYALT":null,"ne:COMPARE":0,"ne:DIFFASCII":0,"ne:DIFFNOTE":"Changed scale rank.","ne:ELEVATION":12,"ne:FEATURECLA":"Populated place","ne:FEATURE_CL":"P","ne:FEATURE_CO":"PPL","ne:GEONAMEID":4560349,"ne:GEONAMESNO":"Geonames ascii name + lat.d + long.d matching.","ne:GN_ASCII":"Philadelphia","ne:GN_POP":1517550,"ne:GTOPO30":8,"ne:ISO_A2":"US","ne:LABELRANK":1,"ne:LATITUDE":39.999973,"ne:LONGITUDE":-75.169996,"ne:LS_MATCH":1,"ne:LS_NAME":"Philadelphia","ne:MAX_AREAKM":3692,"ne:MAX_AREAMI":1426,"ne:MAX_BBXMAX":-74.591667,"ne:MAX_BBXMIN":-75.483484,"ne:MAX_BBYMAX":40.4,"ne:MAX_BBYMIN":39.641667,"ne:MAX_NATSCA":100,"ne:MAX_PERKM":2336,"ne:MAX_PERMI":1452,"ne:MAX_POP10":3540970,"ne:MAX_POP20":4271303,"ne:MAX_POP300":5146328,"ne:MAX_POP310":0,"ne:MAX_POP50":5146328,"ne:MEAN_BBXC":-75.15709,"ne:MEAN_BBYC":40.009312,"ne:MEGACITY":1,"ne:MEGANAME":"Philadelphia","ne:MIN_AREAKM":2119,"ne:MIN_AREAMI":818,"ne:MIN_BBXMAX":-74.816745,"ne:MIN_BBXMIN":-75.866667,"ne:MIN_BBYMAX":40.383333,"ne:MIN_BBYMIN":39.55,"ne:MIN_PERKM":1106,"ne:MIN_PERMI":687,"ne:NAME":"Philadelphia","ne:NAMEALT":null,"ne:NAMEASCII":"Philadelphia","ne:NAMEDIFF":0,"ne:NAMEPAR":null,"ne:NATSCALE":200,"ne:NOTE":null,"ne:POP1950":3128,"ne:POP1955":3511,"ne:POP1960":3930,"ne:POP1965":4161,"ne:POP1970":4396,"ne:POP1975":4467,"ne:POP1980":4540,"ne:POP1985":4629,"ne:POP1990":4725,"ne:POP1995":4938,"ne:POP2000":5160,"ne:POP2005":5396,"ne:POP2010":5492,"ne:POP2015":5630,"ne:POP2020":5835,"ne:POP2025":6003,"ne:POP2050":6133,"ne:POP_MAX":5492000,"ne:POP_MIN":1517550,"ne:POP_OTHER":3463016,"ne:RANK_MAX":13,"ne:RANK_MIN":12,"ne:SCALERANK":2,"ne:SOV0NAME":"United States","ne:SOV_A3":"USA","ne:TIMEZONE":"America/New_York","ne:UN_ADM0":"United States of America","ne:UN_FID":558,"ne:UN_LAT":39.92,"ne:UN_LONG":-75.21,"ne:WORLDCITY":0,"reversegeo:latitude":39.990821,"reversegeo:longitude":-75.168428,"wof:country":"US","wof:geom_alt":["quattroshapes_pg","quattroshapes"],"wof:id":101718083,"wof:lang":["eng"],"wof:lastmodified":1582338319,"wof:megacity":1,"wof:name":"Philadelphia","wof:placetype":"locality","wof:population":1526006,"wof:population_rank":12,"wof:scale":1}]
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
< Date: Tue, 07 Apr 2020 09:33:23 GMT
< Content-Length: 1699
< 
[{"abrv:eng_x_preferred":["TX"],"ne:abbrev":"Tex.","ne:adm0_a3":"USA","ne:adm0_label":"2","ne:adm0_sr":"4","ne:adm1_cod_1":"USA-3536","ne:adm1_code":"USA-3536","ne:admin":"United States of America","ne:area_sqkm":"0.00000000000","ne:check_me":"20","ne:code_hasc":"US.TX","ne:code_local":"US48","ne:datarank":"1","ne:diss_me":"3536","ne:featurecla":"Admin-1 scale rank","ne:fips":"US48","ne:fips_alt":"","ne:gadm_level":"1","ne:geonunit":"United States of America","ne:gn_a1_code":"US.TX","ne:gn_id":"4736286","ne:gn_level":"1","ne:gn_name":"Texas","ne:gn_region":"","ne:gns_adm1":"","ne:gns_id":"-1","ne:gns_lang":"","ne:gns_level":"-1","ne:gns_name":"Upper Nile State","ne:gns_region":"","ne:gu_a3":"USA","ne:hasc_maybe":"","ne:iso_3166_2":"US-TX","ne:iso_a2":"US","ne:labelrank":"0","ne:latitude":"31.13100000000","ne:longitude":"-98.76070000000","ne:mapcolor13":1,"ne:mapcolor9":1,"ne:name":"Texas","ne:name_alt":"TX|Tex.","ne:name_len":5,"ne:name_local":"","ne:note":"","ne:postal":"TX","ne:provnum_ne":"0","ne:region":"South","ne:region_cod":"","ne:region_sub":"West South Central","ne:sameascity":"-99","ne:scalerank":"2","ne:sov_a3":"US1","ne:sub_code":"","ne:type":"State","ne:type_en":"State","ne:wikipedia":"http://en.wikipedia.org/wiki/Texas","ne:woe_id":2347602,"ne:woe_label":"Texas, US, United States","ne:woe_name":"Texas","unlc:subdivision":"US-TX","wof:country":"US","wof:id":85688753,"wof:lang_x_official":["eng"],"wof:lang_x_spoken":["eng","spa","haw"],"wof:lastmodified":1536617323,"wof:name":"Texas","wof:placetype":"region","wof:placetype_alt":[],"wof:placetype_local":"state","wof:population":25145561,"wof:population_rank":14,"wof:shortcode":"TX","wof:subdivision":"US-TX"}]
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for France

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [2.359418,48.840086]}}]}'  http://localhost:8080/sncr/geo/point
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
> Content-Length: 132
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 132 out of 132 bytes
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Tue, 07 Apr 2020 09:35:16 GMT
< Content-Length: 1626
< 
[{"ne:abbrev":"","ne:adm0_a3":"FRA","ne:adm0_label":"2","ne:adm0_sr":"1","ne:adm1_cod_1":"FRA-5333","ne:adm1_code":"FRA-5333","ne:admin":"France","ne:area_sqkm":"0.00000000000","ne:check_me":"20","ne:code_hasc":"FR.VP","ne:code_local":"","ne:datarank":"3","ne:diss_me":"5333","ne:featurecla":"Admin-1 scale rank","ne:fips":"FRA8","ne:fips_alt":"","ne:gadm_level":"1","ne:geonunit":"France","ne:gn_a1_code":"FR.75","ne:gn_id":"2968815","ne:gn_level":"2","ne:gn_name":"Paris","ne:gn_region":"","ne:gns_adm1":"","ne:gns_id":"-1476677","ne:gns_lang":"","ne:gns_level":"2","ne:gns_name":"Ville-de-Paris, Departement de","ne:gns_region":"FRA8","ne:gu_a3":"FXX","ne:hasc_maybe":"","ne:iso_3166_2":"FR-","ne:iso_a2":"FR","ne:labelrank":"3","ne:latitude":"48.85940000000","ne:longitude":"2.34347000000","ne:mapcolor13":11,"ne:mapcolor9":9,"ne:name":"Paris","ne:name_alt":"Ville de Paris","ne:name_len":5,"ne:name_local":"","ne:note":"","ne:postal":"","ne:provnum_ne":"10","ne:region":"Île-de-France","ne:region_cod":"FR-J","ne:region_sub":"","ne:sameascity":"-99","ne:scalerank":"5","ne:sov_a3":"FR1","ne:sub_code":"","ne:type":"Metropolitan département","ne:type_en":"Metropolitan department","ne:wikipedia":"","ne:woe_id":12597155,"ne:woe_label":"","ne:woe_name":"Paris","unlc:subdivision":"FR-75","wof:coterminous":[101751119],"wof:country":"FR","wof:id":85683497,"wof:lang_x_official":["fra"],"wof:lang_x_spoken":["fra"],"wof:lastmodified":1537304035,"wof:name":"Paris","wof:placetype":"region","wof:placetype_local":"department","wof:population":2268265,"wof:population_rank":12,"wof:shortcode":"VP","wof:subdivision":"FR-75"}]
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for Somewhere off the coast of Ireland

as there is no geolocation data bundled for random oceans, it will fail to resolve and return 400 error

```sh
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -5.945750, 53.312652 ]}}]}' http://localhost:8080/sncr/geo/point
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
