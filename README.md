# listen-connect

listen and connect methods for exposing a duplex stream to the network

[![build status](http://img.shields.io/travis/timhudson/listen-connect.svg?style=flat)](http://travis-ci.org/timhudson/listen-connect)

This was extracted from [dnode](https://www.npmjs.org/package/dnode)

## Example

``` js
var listenConnect = require('listen-connect')

rpcServer.listen = listenConnect.createListen(rpcServer.createStream)
rpcClient.connect = listenConnect.createConnect(rpcClient.createStream)

rpcServer.listen(4000, function() {
  console.log('RPC server listening on port 4000')
})

rpcClient.connect(4000, function() {
  console.log('RPC client connected to 4000')
})

```

## Usage

port/host/path arguments parsed with [parse-connection-args](https://www.npmjs.org/package/parse-connection-args)

### listenConnect.createListen(fn)

Returns a `listen` function that accepts port/host/path arguments. When called it will create a new server with [`net.createServer`](http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener) and expose the stream on the provided port/host/path.

``` js
var listen = listenConnect.createListen(function() {
  return someDuplexStream()
})

var server = listen(4000)

// Clean up server with close
server.close()
```

### listenConnect.createConnect(fn)

Returns a `connect` function that accepts port/host/path arguments. When called it will create a new connection, with [`net.connect`](http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener), to the provided port/host/path.

``` js
var connect = listenConnect.createConnect(function() {
  return someDuplexStream()
})

var client = connect('localhost:4000')

// Clean up client with destroy
client.destroy()
```

## License

MIT
