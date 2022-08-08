const http = require('http');

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node</h1>');
    res.end('<p>Hello Server</p>');
  })
  .listen(8080);

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-type': 'text/html; charset=utf-8' });
    res.write('<h1>Hello Node</h1>');
    res.end('<p>Hello Server</p>');
  })
  .listen(8081);
