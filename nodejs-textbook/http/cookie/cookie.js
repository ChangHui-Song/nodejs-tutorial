const http = require('http');

http
  .createServer((req, res) => {
    console.log(req.headers.cookie);
    res.writeHead(200, { 'set-cookie': 'test' });
    res.end('hello cookie');
  })
  .listen(8083, () => {
    console.log('open 8083');
  });
