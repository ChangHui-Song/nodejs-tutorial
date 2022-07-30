const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require('worker_threads');

let primes = [];

function generatePrimes(start, range) {
  let isPrime = true;
  const initStart = 2;
  const end = start + range;
  for (let i = start; i < end; i++) {
    for (let j = initStart; j < Math.sqrt(i) + 1; j++) {
      if (j !== i && i % j === 0) {
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

if (isMainThread) {
  const initStart = 2;
  const maxRange = 10_000_000;
  const threads = new Set();
  const threadCount = 8;
  const range = Math.ceil((maxRange - initStart) / threadCount);
  let currentStart = initStart;

  console.time('time');
  for (let i = 0; i < threadCount - 1; i++) {
    const wStart = currentStart;
    threads.add(
      new Worker(__filename, { workerData: { currentStart: wStart, range } })
    );
    currentStart += range;
  }
  threads.add(
    new Worker(__filename, {
      workerData: {
        currentStart,
        range: range + ((maxRange - initStart + 1) % threadCount),
      },
    })
  );
  for (let worker of threads) {
    worker.on('message', (msg) => {
      primes = primes.concat(msg);
    });
    worker.on('exit', () => {
      threads.delete(worker);
      if (threads.size === 0) {
        console.timeEnd('time');
        console.log(primes.length);
      }
    });
    worker.on('error', (error) => {
      throw error;
    });
  }
} else {
  generatePrimes(workerData.currentStart, workerData.range);
  parentPort.postMessage(primes);
}
