var test = require('tape')
var duplexify = require('duplexify')
var through = require('through2')
var listenConnect = require('./')

test('listen-connect', function(t) {
  t.plan(6)

  var serverStream, clientStream

  var listen = listenConnect.createListen(function() {
    t.ok(true, 'initialized listen stream')
    return serverStream = duplexCache()
  })

  var connect = listenConnect.createConnect(function() {
    t.ok(true, 'initialized connect stream')
    return clientStream = duplexCache()
  })

  var server = listen(4000)
  var client = connect(4000, function() {
    clientStream.send('ZOK!')
    serverStream.send('THWACKE!')

    setTimeout(function() {
      t.equal(clientStream.reads[0], 'ZOK!')
      t.equal(serverStream.writes[0], 'ZOK!')
      t.equal(serverStream.reads[0], 'THWACKE!')
      t.equal(clientStream.writes[0], 'THWACKE!')

      client.destroy()
      server.close()
    }, 10)
  })
})

function duplexCache() {
  var dup = duplexify()
  dup.reads = []
  dup.writes = []

  var readable = through(function(data, enc, cb) {
    dup.reads.push(data.toString())
    this.push(data)
    cb()
  })

  var writable = through(function(data, enc, cb) {
    dup.writes.push(data.toString())
    this.push(data)
    cb()
  })

  dup.setReadable(readable)
  dup.setWritable(writable)

  dup.send = function(data) {
    readable.write(data)
  }

  return dup
}
