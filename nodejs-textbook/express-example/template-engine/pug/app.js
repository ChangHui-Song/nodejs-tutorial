const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use('/', express.static(__dirname));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.locals.title = 'Express';
  res.render('index');
});

app.get('/about', (req, res) => {
  res.send('<h1>Hello, About<h1>');
});

app.listen(app.get('port'));
