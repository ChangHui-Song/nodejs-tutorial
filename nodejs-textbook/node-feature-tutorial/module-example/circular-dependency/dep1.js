const dep2 = require('./dep1');
console.log(dep2);
module.exports = () => {
  console.log('dep2', dep2);
};
