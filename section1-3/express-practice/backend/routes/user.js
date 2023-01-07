import express from 'express';

const Router = express.Router();

Router.get('/', (req, res) => {
  const users = [
    {
      email: 'email1@email.com',
      name: 'name1',
      phone: '010-1234-1234',
      personal: '220000-1111111',
      prefer: 'https://naver.com',
    },
    {
      email: 'email2@email.com',
      name: 'name2',
      phone: '010-1234-1234',
      personal: '220000-1111111',
      prefer: 'https://naver.com',
    },
    {
      email: 'email3@email.com',
      name: 'name3',
      phone: '010-1234-1234',
      personal: '220000-1111111',
      prefer: 'https://naver.com',
    },
    {
      email: 'email4@email.com',
      name: 'name4',
      phone: '010-1234-1234',
      personal: '220000-1111111',
      prefer: 'https://naver.com',
    },
    {
      email: 'email5@email.com',
      name: 'name5',
      phone: '010-1234-1234',
      personal: '220000-1111111',
      prefer: 'https://naver.com',
    },
  ];

  res.json(users);
});

export default Router;
