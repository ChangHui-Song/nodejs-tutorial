import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { checkValidationPhone, getToken, sendTokenToSMS } from './phone.js';
import {
  checkValidationEamil,
  getWelcomeTemplate,
  sendTemplateToEmail,
} from './email.js';
import { options } from './api-docs/config.js';

const app = express();
const port = 3000;
const swaggerSpec = swaggerJsdoc(options);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('hello express!!');
});

app.get('/boards', (req, res) => {
  const result = [
    {
      number: 1,
      writer: 'user1',
      title: 'title1',
      content: 'content1',
    },
    {
      number: 2,
      writer: 'user2',
      title: 'title2',
      content: 'content2',
    },
    {
      number: 3,
      writer: 'user3',
      title: 'title3',
      content: 'content3',
    },
  ];
  res.send(result);
});

app.post('/boards', (req, res) => {
  console.log(req.body);
  // data 등록하는 로직

  res.send('success!');
});

app.post('/users', (req, res) => {
  const user = req.body.user;

  const isValid = checkValidationEamil(user.email);
  if (isValid) {
    const template = getWelcomeTemplate(user);

    sendTemplateToEmail(user.email, template);
    return res.send('가입 완료');
  }
  return res.send('이메일이 올바르지 않습니다.');
});

app.post('/tokens/phone', (req, res) => {
  console.log(req.body);
  const phone = req.body.phone;

  const isValid = checkValidationPhone(phone);

  if (isValid) {
    const token = getToken();

    sendTokenToSMS(phone, token);
    return res.send('success!');
  }
  return res.send('failed!');
});

app.listen(port, () => {
  console.log(`${port} hello world!`);
});
