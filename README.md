README
=======
A simple node app for checking the health of a zookeeper server. It provides the most important status information (like the "stats" command) trough an HTTP API as JSON.


Quick Start
----------
```
$ npm start
  listening at http://[::]:8080 with configuration {"zookeeperPort":"2181","zookeeperHost":"localhost","listen":8080}
```

```
$ curl http://localhost:8080/status
```

Status
-------
Either you get an HTTP 200 or an HTTP 500.

- 200: Zookeeper server is reachable
- 500: Zookeeper server is not reachable.

```
$ curl http://localhost:8080/status
{
    "version": " 3.4.6-1569965, built on 02/20/2014 09",
    "latency": {
        "min": 0,
        "avg": 0,
        "max": 30
    },
    "received": 41722,
    "sent": 41824,
    "connections": 2,
    "outstanding": 0,
    "zxid": " 0x2bb",
    "mode": " standalone",
    "nodeCount": 33,
	"configuration": {
		"zookeeperPort": "2181",
		"zookeeperHost": "localhost",
		"listen": 8080,
		"zookeeperStatsTimeout": 1000
	}
}
```



Configuration / Environment 
------------

- `ZK_STATUS_ZK_URL`: zookeeper server url, default `tcp://localhost:2181`
- `ZOOKEEPER_PORT`: same as `ZK_STATUS_ZK_URL`. Useful for linking to zookeeper container with alias `ZOOKEEPER`
- `ZK_STATUS_LISTEN_PORT`: server listening port for HTTP API, default `8080`
- `ZK_STATUS_ZK_TIMEOUT`: zookeeper status timeout in ms, default `1000`

Docker
------
```
docker run -d -e ZK_STATUS_ZK_URL=tcp://192.168.1.66:2181 -p 8080:8080 lzaugg/zookeeper-status
```

Important Changes
---------

`master`

`1.3.x`
- ENV: `ZK_STATUS_ZK_TIMEOUT`: zookeeper status timeout in ms, default `1000`

`1.2.x`
- ENV: `ZK_STATUS_ZK_URL`: zookeeper server url, default `tcp://localhost:2181`
- ENV: `ZOOKEEPER_PORT`: same as `ZK_STATUS_ZK_URL`. Useful for linking to zookeeper container with alias `ZOOKEEPER`
- ENV: `ZK_STATUS_LISTEN_PORT`: server listening port for HTTP API, default `8080`

`1.1.x`
- ENV: `ZK_STATUS_ZK_HOST`: zookeeper server, default `localhost`
- ENV: `ZK_STATUS_ZK_PORT`: zookeeper port, default `2181`
- ENV: `ZK_STATUS_LISTEN_PORT`: server listening port for HTTP API, default `8080`

`1.0.x`
- ENV: `ZOOKEEPER_HOST`: zookeeper server, default `localhost`
- ENV: `ZOOKEEPER_PORT`: zookeeper port, default `2181`
- ENV: `LISTEN_PORT`: server listening port for HTTP API, default `8080`



