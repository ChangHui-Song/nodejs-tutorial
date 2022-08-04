console.log('top');

module.exports = 'module test';

require('./var');
require('./func');

console.log('require cache');
console.log(require.cache);
console.log(require.main === module);
console.log(require.main.filename);
