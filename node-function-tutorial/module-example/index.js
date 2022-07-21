const value = require('./var');
const checkNumber = require('./func');

function checkStringOddOrEven(string) {
  if (string.length % 2) {
    return value.odd;
  }
  return value.even;
}

console.log(checkStringOddOrEven(10), checkStringOddOrEven(11));
console.log(checkNumber(10), checkNumber(11));