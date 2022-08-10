const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      HttpOnly: true,
      secure: false,
    },
    name: 'session-cookie',
  })
);

app.get('/about', (req, res) => {
  res.send('<h1>This is About Page</h1>');
});

app.get('/category/:name', (req, res) => {
  res.send('<h1>Hello Wildcard</h1>');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.send('<h1>error</h1>');
});

app.listen(app.get('port'), () => {
  console.log(`open ${app.get('port')}`);
});
