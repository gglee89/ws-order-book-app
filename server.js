const app = require('express')();
const socket = require('socket.io');

const server = app.listen(4001, () => {
  console.log('Listening to port 4001');
});

const BitMEXClient = require('bitmex-realtime-api');
const client = new BitMEXClient({ testnet: true });

// Socket IO
const io = socket(server);

io.on('connection', socket => {
  console.log('made socket connection', socket.id);

  socket.on('subscribe', (symbol = 'XBTUSD', stream = 'orderBook10') => {
    client.addStream('XBTUSD', 'orderBook10', function(
      data,
      symbol,
      tableName
    ) {
      socket.emit('Data', data);
    });
  });
});
