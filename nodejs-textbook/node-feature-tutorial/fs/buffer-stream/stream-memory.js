const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const readStream = fs.createReadStream('./bigFile.txt');
const writeStream = fs.createWriteStream('./bigFile3.txt');
readStream.pipe(writeStream);
readStream.on('end', () => {
  console.log('stream:', process.memoryUsage().rss);
});
