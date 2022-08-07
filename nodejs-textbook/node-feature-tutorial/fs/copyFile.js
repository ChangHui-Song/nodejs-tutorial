const fs = require('fs').promises;

fs.copyFile('./readme.txt', './copy.txt')
  .then(() => {
    console.log('complete');
  })
  .catch((error) => {
    console.error(error);
  });
