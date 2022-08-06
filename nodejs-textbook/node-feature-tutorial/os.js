const os = require('os');

console.log('-------------------------os 정보---------------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime());
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release());

console.log('------------------------- 경로 ----------------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('------------------------- cpu 정보 ----------------------');
console.log('os.cpus():', os.cpus());
console.log('os.cpus.length:', os.cpus.length);

console.log('------------------------- mem 정보 ----------------------');
console.log('os.freemem():', os.freemem());
console.log('os.totalmem():', os.totalmem());
