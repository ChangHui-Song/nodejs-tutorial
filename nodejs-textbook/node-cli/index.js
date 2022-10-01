#!/usr/bin/env node

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();
const answerCallback = (answer) => {
  if (answer === 'y') {
    console.log('you entered y');
    rl.close();
  } else if (answer === 'n') {
    console.log('you entered n');
    rl.close();
  } else {
    console.clear();
    console.log('Please enter only y or n');
    rl.question('Are the examples interesting? (y/n)', answerCallback);
  }
};

rl.question('Are the examples interesting? (y/n)', answerCallback);
