const fs = require('fs');

console.log('before:', process.memoryUsage().rss);

const data1 = fs.readFileSync('./bigFile.txt');
fs.writeFileSync('./bigFile2.txt', data1);
console.log('buffer:', process.memoryUsage().rss);
