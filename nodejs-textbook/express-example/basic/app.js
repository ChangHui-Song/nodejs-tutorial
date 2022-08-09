const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(
  (req, res, next) => {
    console.log('middleware');
    next();
  },
  (req, res, next) => {
    throw new Error('Error');
  }
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.send('<h1>hello express</h1>');
});

app.get('/category/:name', (req, res) => {
  res.send('<h1>Hello Wildcard</h1>');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('<h1>error</h1>');
});

app.listen(app.get('port'), () => {
  console.log('open 3000');
});
