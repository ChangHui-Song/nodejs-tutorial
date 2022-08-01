const fs = require('fs');

setInterval(() => {
  fs.unlink('./asfkang.js', (error) => {
    if (error) {
      console.log(error);
    }
  });
}, 2000);
