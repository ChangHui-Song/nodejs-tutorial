import express, { application } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { options } from './api-docs/config.js';
import userRouter from './routes/user.js';
import starbucksRouter from './routes/starbucks.js';

const app = express();
const swaggerSpec = swaggerJSDoc(options);

app.set('port', 3000);
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/users', userRouter);
app.use('/starbucks', starbucksRouter);

app.get('/', (req, res) => {
  res.send('main router');
});

app.listen(app.get('port'), () => {
  console.log('hello subject');
});
