import io from 'socket.io-client';

import {
  RESPONSE_SUCCESS,
  RESPONSE_ERROR,
  RESPONSE_DATA,
} from '../actions/orderBook';

/**
 * @description Subscribe to the given 'topic' and 'currency'
 *  Websocket responses may be of the following three types:
        - Success: (Emitted upon a successful subscription to a topic)
            {"subscribe": subscriptionName, "success": true}
        - Error: (Emitted upon a malformed request or an attempt to request a locked resource)
            {"error": errorMessage}
        - Data: (Emitted when data is available or requested)
            {
                "table": string, // Table Name
                "action": 'partial' | 'update' | 'insert' | 'delete',
                "data": Object[],
                "keys"?: string[],
                "foreignKeys"?: {[key: string]: string},
                "types"?: {[key: string]: string},
                "filter"?: {account?: number, symbol?: string},
                "attributes"?: {[key: string]: string},
            }
 * @param {Func} listener
 * @param {String} topic
 * @param {String} currency
 */
export function subscribeOrderBook(listener, symbol, stream) {
  const socket = io.connect('http://localhost:4001');

  const connectListener = res => {
    console.log('connected to WS');

    // Subscribe as soon as connection is established
    socket.emit('subscribe', { symbol, stream });
  };

  const successListener = res => {
    listener(RESPONSE_SUCCESS, res);
  };

  const errorListener = res => {
    listener(RESPONSE_ERROR, res);
  };

  const dataListener = res => {
    listener(RESPONSE_DATA, res);
  };

  const disconnectListener = res => {
    console.log('disconnected to WS');
    console.log('res', res);
  };

  socket.on('connect', connectListener);
  socket.on('disconnect', disconnectListener);
  socket.on(RESPONSE_SUCCESS, successListener);
  socket.on(RESPONSE_ERROR, errorListener);
  socket.on(RESPONSE_DATA, dataListener);

  return () => {
    socket.emit('unsubscribe');
  };
}
