const crypto = require('crypto');

// sha512 => base64 encoding
console.log(
  'base64:',
  crypto.createHash('sha512').update('비밀번호').digest('base64'),
);
// sha512 => hex encoding
console.log(
  'hex:',
  crypto.createHash('sha512').update('비밀번호').digest('hex'),
);
// sha512 => base64 encoding
console.log(
  'base64:',
  crypto.createHash('sha512').update('비밀번호1').digest('base64'),
);
