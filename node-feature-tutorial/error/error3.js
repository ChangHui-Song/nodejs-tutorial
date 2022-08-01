const fs = require('fs');

setInterval(() => {
  fs.unlink('./asfnjag.js');
}, 2000);
