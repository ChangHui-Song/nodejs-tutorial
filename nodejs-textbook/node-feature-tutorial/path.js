const path = require('path');

const string = __filename;

console.log('path.sep:', path.sep);
console.log('path.delimiter:', path.delimiter);
console.log('-------------------------------------------------------------');
console.log('path.dirname(string):', path.dirname(string));
console.log('path.extname(string):', path.extname(string));
console.log('path.basename(string):', path.basename(string));
console.log('basename - extname', path.basename(string, path.extname(string)));
console.log('------------------------------------------------------------');
console.log('path.parse(string):', path.parse(string));
console.log(
  'path.format()',
  path.format({
    dir: '/User/sch//dev//node',
    name: 'path',
    ext: '.js',
  })
);
console.log('path.normalize():', path.normalize('/User/sch/dev/path.js'));
console.log('-----------------------------------------------------------');
console.log("path.isAbsolute('/User'):", path.isAbsolute('/User'));
console.log('path.isAbsolute(./process)):', path.isAbsolute('../process'));
console.log('-----------------------------------------------------------');
console.log(
  'path.relative()',
  path.relative('/User/sch/dev/study/nodejs-tutorial/path.js', '/User/')
);
console.log(
  'path.join()',
  path.join(__dirname, '..', '..', '/Users', '.', 'songs')
);
console.log('path.resolve()', path.resolve(__dirname, '..', '.', '/songs'));
