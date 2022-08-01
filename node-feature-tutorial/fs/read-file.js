const fs = require('fs').promises;

// callback
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('data:', data);
  console.log('data.toString()', data.toString());
});

// promiss read
fs.readFile('./readme.txt')
  .then((data) => {
    console.log('data.toString() =>', data.toString());
  })
  .catch((error, data) => {
    throw error;
  });

// promiss write
fs.writeFile('./writeme.txt', '안녕하세요!')
  .then(() => {
    return fs.readFile('./writeme.txt');
  })
  .then((data) => {
    console.log('data=>', data);
    console.log('data.toString()=>', data.toString());
  })
  .catch((error, data) => {
    throw error;
  });
