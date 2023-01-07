import express from 'express';
import mongoose from 'mongoose';

import { Stock } from './models/stock.model.js';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://crawling-practice-database-1:27017/stocks')
  .then(() => console.log('connect database'));

const app = express();
app.set('port', 4000);

app.use(express.json());

app.get('/stocks', async (req, res) => {
  const stocks = await Stock.find();
  res.send(stocks);
});

app.listen(app.get('port'), () => {
  console.log(`app listening on port ${app.get('port')}`);
});
