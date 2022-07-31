const fs = require('fs');
const fs2 = require('fs').promises;

// Asyncronous
fs.readFile('./readme.txt', (error, data) => {
  if (error) {
    throw error;
  }
  console.log('1 data.toString()=>', data.toString());
});
fs.readFile('./readme.txt', (error, data) => {
  if (error) {
    throw error;
  }
  console.log('2 data.toString()=>', data.toString());
});
fs.readFile('./readme.txt', (error, data) => {
  if (error) {
    throw error;
  }
  console.log('3 data.toString()=>', data.toString());
});
fs.readFile('./readme.txt', (error, data) => {
  if (error) {
    throw error;
  }
  console.log('4 data.toString()=>', data.toString());
});

// Syncronous Callback
fs.readFile('./readme.txt', (error, data) => {
  if (error) {
    throw error;
  }
  console.log('1 data.toString()=>', data.toString());
  fs.readFile('./readme.txt', (error, data) => {
    if (error) {
      throw error;
    }
    console.log('2 data.toString()=>', data.toString());
    fs.readFile('./readme.txt', (error, data) => {
      if (error) {
        throw error;
      }
      console.log('3 data.toString()=>', data.toString());
      fs.readFile('./readme.txt', (error, data) => {
        if (error) {
          throw error;
        }
        console.log('4 data.toString()=>', data.toString());
      });
    });
  });
});

// Syncronous Promiss
fs2
  .readFile('./readme.txt')
  .then((data) => {
    console.log('1 data.toString()=>', data.toString());
    return fs2.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('2 data.toString()=>', data.toString());
    return fs2.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('3 data.toString()=>', data.toString());
    return fs2.readFile('./readme.txt');
  })
  .then((data) => {
    console.log('4 data.toString()=>', data.toString());
    return fs2.readFile('./readme.txt');
  })
  .catch((error, data) => {
    if (error) {
      throw error;
    }
  });

// Syncronous async
async function main() {
  let data = await fs2.readFile('./readme.txt');
  console.log('1 data.toString()=>', data.toString());
  data = await fs2.readFile('./readme.txt');
  console.log('2 data.toString()=>', data.toString());
  data = await fs2.readFile('./readme.txt');
  console.log('3 data.toString()=>', data.toString());
  data = await fs2.readFile('./readme.txt');
  console.log('4 data.toString()=>', data.toString());
}
main();
