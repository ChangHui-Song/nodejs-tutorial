const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

const min = 2;
const max = 10_000_000;
const primes = [];

function generatePrime(start, range) {
  let isPrime = true;
  const end = start + range;

  for (let i = start; i < end; i++) {
    for (let j = min; j < Math.sqrt(end); j++) {
      if (i !== j && i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(i);
    }
    isPrime = true;
  }
}

console.time('primes');
generatePrime(min, max);
console.timeEnd('primes');
console.log('primes.length', primes.length);
