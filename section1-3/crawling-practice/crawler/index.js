import puppeteer from 'puppeteer';
import mongoose from 'mongoose';

import { Stock } from './models/stock.model.js';

mongoose.set('strictQuery', false);
mongoose
  .connect('mongodb://localhost:27017/stocks')
  .then(() => console.log('connect db'));

export const startCrawling = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://finance.naver.com/item/sise.naver?code=035720');
  await new Promise((page) => setTimeout(page, 1000));
  const framePage = page
    .frames()
    .find((iframe) =>
      iframe.url().includes('/item/sise_day.naver?code=035720')
    );

  for (let i = 3; i <= 7; i++) {
    const elementArray = [];
    for (let j = 1; j <= 2; j++) {
      const element = await framePage.$eval(
        `body > table.type2 > tbody > tr:nth-child(${i}) > td:nth-child(${j}) > span`,
        (el) => el.textContent
      );
      elementArray.push(element);
    }
    await Stock.createCollection();
    const stock = new Stock({
      name: '카카오',
      price: Number(elementArray[1].replace(',', '')),
      date: elementArray[0],
    });
    await stock.save();
  }
  await browser.close();
  mongoose.connection.close().then(() => console.log('disconnect db'));
};

startCrawling();
