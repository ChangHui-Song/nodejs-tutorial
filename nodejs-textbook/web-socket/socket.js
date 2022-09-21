const WebSocket = require('ws');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log('new client connected', ip);

    ws.on('message', (message) => {
      console.log(message.toString());
    });
    ws.on('close', () => {
      console.log('client disconnected', ip);
      clearInterval(ws.interval);
    });

    ws.interval = setInterval(() => {
      if (ws.readyState === ws.OPEN) {
        ws.send('server to client');
      }
    }, 3000);
  });
};
