var listenConnect = require('./')

rpcServer.listen = listenConnect.createListen(rpcServer.createStream)
rpcClient.connect = listenConnect.createConnect(rpcClient.createStream)

rpcServer.listen(4000, function() {
  console.log('RPC server listening on port 4000')
})

rpcClient.connect(4000, function() {
  console.log('RPC client connected to 4000')
})
