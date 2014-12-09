# listen-connect

listen and connect methods for exposing a duplex stream to the network

[![build status](http://img.shields.io/travis/timhudson/listen-connect.svg?style=flat)](http://travis-ci.org/timhudson/listen-connect)

This was extracted from [dnode](https://www.npmjs.org/package/dnode)

## Example

``` js
var listenConnect = require('listen-connect')

rpcServerStream.listen = listenConnect.createListen(rpcServerStream)
rpcClientStream.connect = listenConnect.createConnect(rpcClientStream)

rpcServerStream.listen(4000, function() {
  console.log('RPC server listening on port 4000')
})

rpcClientStream.connect(4000, function() {
  console.log('RPC client connected to 4000')
})
```

## Usage

port/host/path arguments parsed with [parse-connection-args](https://www.npmjs.org/package/parse-connection-args)

### listenConnect.createListen(stream)

Returns a new `listen` function that accepts port/host/path arguments. When called it will create a new server with [`net.createServer`](http://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener) and expose the stream on the provided port/host/path.

A `close` method will be added to the provided stream for closing the underlying [`net.Server`](http://nodejs.org/api/net.html#net_class_net_server).

``` js
var server = someDuplexStream()
server.listen = listenConnect.createListen(server)

server.listen('localhost:4000')

// Clean up server with close
server.close()

```

### listenConnect.createConnect(stream)

Returns a new 'connect' function that accepts port/host/path arguments. When called it will create a new connection with [`net.connect`](http://nodejs.org/api/net.html#net_net_connect_options_connectionlistener) to the provided port/host/path.

``` js
var client = someDuplexStream()
client.connect = listenConnect.createConnect(client)

client.connect('localhost:4000')

// Clean up client with destroy
client.destroy()
```

`destroy` calls the destroy method on both the provided stream and the underlying `net.Socket`.

## License

MIT
