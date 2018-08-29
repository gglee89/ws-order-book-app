## Order Book Web App

`Order Book` data renderer

## APIs

- BitMEX: wss://www.bitmex.com/realtime

## Environment

Node (LTS/Carbon)

```
$ node -v
v8.10.0
```

## Main Modules

- Server:

  - nodejs
  - express
  - bitmex-realtime-api

- Client:
  - react
  - redux
  - webpack 3.12
  - socket.io-client
  - redux-thunk
  - sass

## How to start

- Server:

  - `node server.js OR nodemon server.js`
  - Basic express server setup with the intent to fetch and feed the client with the stream of data originated from third-party libraries (eg.: BitMEX Websocket)

- Client:
  - `npm run start`

## Implementation obstacle(s):

The greatest difficulty was to find possible solutions for a direct connection from the client to third-party websocket services (e.g: BitMEX Websocket). After several attempts, I have decided on implementing a basic ezpress server setup making usage of the `bitmex-realtime-api` module to fetch and feed the data to the client.

## How it should look

![screen shot 2018-08-29 at 4 59 49 pm](https://user-images.githubusercontent.com/16644017/44774019-ffd9f980-abac-11e8-9ab1-da4a29734af6.png)
