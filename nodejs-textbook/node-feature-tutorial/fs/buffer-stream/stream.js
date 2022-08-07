const fs = require('fs');

const readStream = fs.createReadStream('../readme.txt', { highWaterMark: 16 });
const data = [];

readStream.on('data', (chunk) => {
  console.log('data:', chunk, chunk.length);
  data.push(chunk);
});

readStream.on('end', () => {
  console.log('end:', Buffer.concat(data).toString());
});

readStream.on('error', (error) => {
  console.error(error);
});
