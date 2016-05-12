README
=======
Zookeeper Status Server.

Example
--------
```
$ echo stat | nc zookeeper.server 2181 
Zookeeper version: 3.4.8--1, built on 02/06/2016 03:18 GMT
Clients:
 /172.31.13.34:41192[0](queued=0,recved=1,sent=0)

Latency min/avg/max: 0/0/0
Received: 1
Sent: 0
Connections: 1
Outstanding: 0
Zxid: 0x100000002
Mode: follower
Node count: 4
```

Output
-------
```
{
	"version":"3.4.8--1",
	"latency": {
		"min":0,
		"max":0,
		"avg":0
	},
	"received":1,
	"sent":0,
	"connections":1
	"outstanding":0,
	"zxid":"0x100000002",
	"mode":"follower",
	"nodeCount":4
}
```