const express = require('express');
const path = require('path');
const morgan = require('morgan');

const { sequelize } = require('./models');

const app = express();
app.set(app.get(process.env.PORT) || 3000);
app.set('view engine', 'pug');

sequelize
  .sync({ force: false })
  .then(() => {
    console.log('connect success!');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const error = new Error(`not found ${req.method} ${req.url}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(`listening ${app.get('port')}`);
});
