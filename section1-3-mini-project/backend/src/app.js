import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import menuRouter from './routes/menu.route.js';
import tokensRouter from './routes/tokens.route.js';
import userRouter from './routes/user.route.js';

const app = express();
app.set('port', 3000);

app.use(express.json());
app.use(cors());

// app.use('/user', userRouter);
app.use('/tokens', tokensRouter);
// app.use('/', menuRouter);

app.get('/', (_, res) => {
  res.send('hello mini project');
});

mongoose
  .connect('mongodb://database:27017/phone')
  .then(() => console.log('connected database'));

app.listen(app.get('port'), async () => {
  console.log(`open http://localhost:${app.get('port')}`);
});
