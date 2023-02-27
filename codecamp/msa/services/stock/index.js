import express from 'express';

const app = express();

app.get('/stocks', (req, res) => {
  return res.send('주식 가격 조회');
});

app.get('/stocks/max', (req, res) => {
  return res.send('최대 주식 가격 조회');
});

app.post('/stocks', (req, res) => {
  return res.send('주식 가격 등록');
});

app.listen(3002);
