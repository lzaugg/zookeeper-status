README
=======
A simple node app for checking the health of a zookeeper server. It provides the most important status information (like the "stats" command) trough an HTTP API as JSON.

Run
------
```
docker run -d -e ZOOKEEPER_HOST=192.168.1.66 -p 8080:8080 lzaugg/zookeeper-status
```

Status
-------

```
$ curl localhost:8080/status
```

Environment
------------

- `ZOOKEEPER_HOST`: zookeeper server, default `localhost`

- `ZOOKEEPER_PORT`: zookeeper port, default `2181`

- `LISTEN_PORT`: server listening port for HTTP API, default `8080`


Example
--------

### zookeeper status through HTTP API
```
$ curl localhost:8080/status
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
    "zookeeperHost": "localhost",
	"zookeeperPort": 2181
}
```

### zookeeper status through telnet (`stats`)

```
$ echo stat | nc localhost 2181 
Zookeeper version: 3.4.6-1569965, built on 02/20/2014 09
Clients:
 /172.31.13.34:41192[0](queued=0,recved=1,sent=0)

Latency min/avg/max: 0/0/30
Received: 41722
Sent: 41824
Connections: 2
Outstanding: 0
Zxid: 0x2bb
Mode: standalone
Node count: 33
```