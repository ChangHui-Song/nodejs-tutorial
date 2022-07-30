const timeout = setTimeout(() => {
  console.log('after 1.5s');
}, 1500);

const interval = setInterval(() => {
  console.log('interval 1s');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('none timeout');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearInterval(interval);
}, 2999);

const immediate = setImmediate(() => {
  console.log('immediate');
});

const immediate2 = setImmediate(() => {
  console.log('none immediate');
});

clearImmediate(immediate2);