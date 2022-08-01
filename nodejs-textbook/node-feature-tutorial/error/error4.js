process.on('uncaughtException', (error) => {
  console.log('예기치 못한 에러', error);
});

setInterval(() => {
  throw new Error('서버를 고장내주마');
}, 1000);

setInterval(() => {
  console.log('정상 코드');
}, 1001);
