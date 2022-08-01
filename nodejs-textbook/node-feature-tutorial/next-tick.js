setImmediate(() => { // 4
  console.log('immediate');
});

Promise.resolve().then(() => console.log('promise')); // 2

setTimeout(() => { // 3
  console.log('setTimeout');
}, 0);

process.nextTick(() => console.log('nextTick')); // 1