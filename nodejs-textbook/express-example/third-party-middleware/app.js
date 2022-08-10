const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));

app.use('/', (req, res, next) => {
  console.log('middleware');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/about', (req, res) => {
  res.send('<h1>hello Node</h1>');
});

app.listen(app.get('port'), () => {
  console.log(`open ${app.get('port')}`);
});
