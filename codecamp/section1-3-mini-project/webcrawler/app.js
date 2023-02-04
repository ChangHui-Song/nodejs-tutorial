import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.set('port', 3001);

app.use(express.json());

app.get('/', (req, res) => {
  res.send('open crawler server');
});

app.post('/', async (req, res) => {
  const url = req.body.url;
  const result = {};

  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  $('meta').each((_, el) => {
    if ($(el).attr('property')) {
      const key = $(el).attr('property').split(':')[1];
      const value = $(el).attr('content');
      result[key] = value;
    }
  });

  res.send(result);
});

app.listen(app.get('port'), () => {
  console.log(`connect crawler server ${app.get('port')} port`);
});
