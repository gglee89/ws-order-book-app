const app = require('express')();
const socket = require('socket.io');

const server = app.listen(4001, () => {
  console.log('Listening to port 4001');
});

// BitMEX client configuration
// Ref.: https://github.com/BitMEX/api-connectors/tree/master/official-ws/nodejs
const BitMEXClient = require('bitmex-realtime-api');
const client = new BitMEXClient({ testnet: true });

// Socket IO
const io = socket(server);

/**
 * @description Handle events for socket.io 'connection'
 */
io.on('connection', socket => {
  // Listens for the 'subscribe' event
  socket.on('subscribe', params => {
    stream = params.stream || 'orderBook10';
    symbol = params.symbol || 'XBTUSD';
    client.addStream(symbol, stream, function(data, symbol, tableName) {
      socket.emit('Data', data);
    });

    // handle errors here. If no 'error' callback is attached. errors will crash the client.
    client.on('error', error => socket.emit('Error', `Socket Error: ${error}`));
    client.on('open', () => console.log('Connection opened.'));
    client.on('close', () => console.log('Connection closed.'));
    client.on('initialize', () =>
      console.log('Client initialized, data is flowing.')
    );
  });
});
