# geocode service

This service returns what location that point is in, if the geodata is aware of it.

There is bundled data in the executable, this microservice is not dependant on anything else.

## compile

```
go build
```

## run it

```
PORT=8080; ./geoloc
```

## get results

the simple service takes a geojson formatted 'point' at the endpoint of /sncr/geo/point

the service returns what location that point is in, if the geodata is aware of it

### Example for Texas

```
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ -100.000000, 31.000000 ]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```

### example response:

```
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
< Date: Fri, 20 Mar 2020 17:48:46 GMT
< Content-Length: 8
< 
"Texas"
* Connection #0 to host localhost left intact
* Closing connection 0
```

### Example for India

```
curl -v -d '{ "type": "FeatureCollection","features": [{ "type": "Feature","geometry": {"type": "Point", "coordinates": [ 78.962883, 20.5936832 ]}}]}' -H "Content-Type: application/json" http://localhost:8080/sncr/geo/point
```

### example response:

```
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8080 (#0)
> POST /sncr/geo/point HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.64.1
> Accept: */*
> Content-Type: application/json
> Content-Length: 137
> 
* upload completely sent off: 137 out of 137 bytes
< HTTP/1.1 400 Bad Request
< Content-Type: text/plain; charset=utf-8
< X-Content-Type-Options: nosniff
< Date: Fri, 20 Mar 2020 17:48:08 GMT
< Content-Length: 8
< 
Failure
* Connection #0 to host localhost left intact
* Closing connection 0
```