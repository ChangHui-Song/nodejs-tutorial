import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => {
  const coffees = [
    { name: '아메리카노', kcal: 5 },
    { name: '카페라떼', kcal: 10 },
    { name: '콜드블루', kcal: 15 },
    { name: '카페모카', kcal: 20 },
    { name: '돌체라떼', kcal: 25 },
    { name: '카라멜라떼', kcal: 30 },
    { name: '바닐라라떼', kcal: 35 },
    { name: '에스프레소', kcal: 40 },
    { name: '디카페인', kcal: 45 },
    { name: '오트라떼', kcal: 50 },
  ];

  res.json(coffees);
});

export default Router;
