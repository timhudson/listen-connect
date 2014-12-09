var listenConnect = require('./')

rpcServerStream.listen = listenConnect.createListen(rpcServerStream)
rpcClientStream.connect = listenConnect.createConnect(rpcClientStream)

rpcServerStream.listen(4000, function() {
  console.log('RPC server listening on port 4000')
})

rpcClientStream.connect(4000, function() {
  console.log('RPC client connected to 4000')
})
