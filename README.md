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

## License

MIT
