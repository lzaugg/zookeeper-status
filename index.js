var restify = require('restify')
var net = require('net')

var configuration = {
  host: process.env.ZK_STATUS_ZK_HOST || 'localhost',
  port: process.env.ZK_STATUS_ZK_PORT || 2181,
  listen: process.env.ZK_STATUS_LISTEN_PORT || 8080
}

var parse = output => {
  var lines = output.split('\n')
  var status = {}
  lines.forEach(line => {
    var keyValue = line.split(':')
    switch (keyValue[0]) {
      case 'Zookeeper version':
        status.version = keyValue[1]
        break
      case 'Latency min/avg/max':
        var latency = keyValue[1].split('/')
        status.latency = {
          min: parseInt(latency[0]),
          avg: parseInt(latency[1]),
          max: parseInt(latency[2])
        }
        break
      case 'Received':
        status.received = parseInt(keyValue[1])
        break
      case 'Sent':
        status.sent = parseInt(keyValue[1])
        break
      case 'Connections':
        status.connections = parseInt(keyValue[1])
        break
      case 'Outstanding':
        status.outstanding = parseInt(keyValue[1])
        break
      case 'Zxid':
        status.zxid = keyValue[1]
        break
      case 'Mode':
        status.mode = keyValue[1]
        break
      case 'Node count':
        status.nodeCount = parseInt(keyValue[1])
        break
    }
  })
  return status
}

function respond (req, res, next) {
  var client = new net.Socket()
  client.connect(configuration.port, configuration.host, () => { client.write('stats') })

  client.on('data', data => {
    var out = data.toString()
    var stats = parse(out)
    stats.zookeeperHost = configuration.host
    stats.zookeeperPort = configuration.port
    res.send(stats)
    client.end()
    return next()
  })

  client.on('error', err => {
    return next(err)
  })
}

var server = restify.createServer()
server.get('/status', respond)

server.listen(configuration.listen, () => {
  console.log('listening at %s with configuration %s', server.url, JSON.stringify(configuration))
})
