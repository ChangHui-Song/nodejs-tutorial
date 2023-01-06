import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import 'dotenv/config';

import { options } from './api-docs/config.js';
import phoneRouter from './routes/phone.js';

const app = express();
const swaggerSpec = swaggerJSDoc(options);

app.set('port', 3000);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('welcome docker practice!');
});

app.use('/tokens/phone', phoneRouter);

mongoose
  .connect('mongodb://database-practice:27017/phone')
  .then(() => console.log('database connected!'));

app.listen(app.get('port'), () => {
  console.log(`created server ${app.get('port')}`);
});
