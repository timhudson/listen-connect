var test = require('tape')
var duplexify = require('duplexify')
var through = require('through2')
var listenConnect = require('./')

test('listen-connect', function(t) {
  t.plan(4)

  var server = duplexCache()
  server.listen = listenConnect.createListen(server)
  server.listen(4000)

  var client = duplexCache()
  client.connect = listenConnect.createConnect(client)
  client.connect(4000, function() {
    client.send('ZOK!')
    server.send('THWACKE!')

    setTimeout(function() {
      t.equal(client.reads[0], 'ZOK!')
      t.equal(server.writes[0], 'ZOK!')
      t.equal(server.reads[0], 'THWACKE!')
      t.equal(client.writes[0], 'THWACKE!')

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
