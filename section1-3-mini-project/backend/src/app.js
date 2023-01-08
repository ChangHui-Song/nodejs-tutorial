import express from 'express';

const app = express();
app.set('port', 3000);

app.use(express.json());

app.get('/', (_, res) => {
  res.send('hello mini project');
});

app.listen(app.get('port'), () => {
  console.log(`open http://localhost:${app.get('port')}`);
});
