// Extracted from https://github.com/substack/dnode

var net = require('net')
var parseArgs = require('parse-connection-args')

module.exports.createListen = function(createStream) {
  if (typeof createStream !== 'function') {
    throw new Error('Must provide a function that returns a stream instance')
  }

  return function() {
    var stream = createStream()
    var params = parseArgs(arguments)

    var server = net.createServer(function(netStream) {
      netStream.pipe(stream).pipe(netStream)
    })

    stream.close = server.close.bind(server)

    if (typeof params.port === 'number' && params.port >= 0) {
      server.listen(params.port, params.host)
    }
    else if (params.path) {
      server.listen(params.path)
    }
    else {
      throw new Error('no port or path provided')
    }

    if (params.callback) server.on('listening', params.callback)

    return server
  }
}

module.exports.createConnect = function(createStream) {
  if (typeof createStream !== 'function') {
    throw new Error('Must provide a function that returns a stream instance')
  }

  return function() {
    var stream = createStream()
    var params = parseArgs(arguments)

    var client

    if (params.path) {
      client = net.connect(params.path)
    }
    else if (params.port) {
      client = net.connect(params.port, params.host)
    }
    else {
      throw new Error('no port or unix path given')
    }

    if (params.callback) client.on('connect', params.callback)

    client.on('error', function(err) {
      if (err && err.code === 'EPIPE') return // eat EPIPEs
      stream.emit('error', err)
    })

    var destroy = stream.destroy

    stream.destroy = function() {
      destroy.apply(stream, arguments)
      client.destroy()
    }

    client.pipe(stream)
    stream.pipe(client)

    return client
  }
}
