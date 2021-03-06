var restify = require('restify')
var net = require('net')
var url = require('url')

var zkUrl = url.parse(process.env.ZK_STATUS_ZK_URL || process.env.ZOOKEEPER_PORT || 'tcp://localhost:2181')
var statsTimeout = parseInt(process.env.ZK_STATUS_ZK_TIMEOUT) || 1000
var configuration = {
  zookeeperPort: zkUrl.port || 2181,
  zookeeperHost: zkUrl.hostname || 'localhost',
  listen: process.env.ZK_STATUS_LISTEN_PORT || 8080,
  zookeeperStatsTimeout: statsTimeout
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
  client.connect(configuration.zookeeperPort, configuration.zookeeperHost, () => { client.write('stats') })

  var reponseTimeout = setTimeout(() => {
    client.end()
    client.destroy()
    return next(new Error('did not get stats from zookeeper in acceptable time'))
  }, configuration.zookeeperStatsTimeout)

  client.on('data', data => {
    clearTimeout(reponseTimeout)
    var out = data.toString()
    var stats = parse(out)
    if (!stats.mode) {
      return next(new Error('zookeeper does not serve requests :('))
    }
    stats.configuration = configuration
    res.send(stats)
    client.end()
    return next()
  })

  client.on('error', err => {
    clearTimeout(reponseTimeout)
    client.destroy()
    return next(err)
  })
}

var server = restify.createServer()
server.get('/status', respond)

server.listen(configuration.listen, () => {
  console.log('listening at %s with configuration %s', server.url, JSON.stringify(configuration))
})
