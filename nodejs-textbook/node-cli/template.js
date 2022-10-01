#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;
const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4];
const htmlTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Template</title>
  </head>
  <body>
    <h1>Hello</h1>
    <p>CLI</p>
  </body>
</html>
`;

const routerTemplate = `
const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  try{
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
`;

const exist = (dir) => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const mkdirp = (dir) => {
  const dirname = path
    .relative('.', path.normalize(dir))
    .split(path.sep)
    .filter((p) => !!p);
  dirname.forEach((d, idx) => {
    const pathBuilder = dirname.slice(0, idx + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  });
};

const dirAnswer = (answer) => {
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
};

const nameAnswer = (answer) => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('You must enter a name');
    return rl.question('Set your file name. ', nameAnswer);
  }
  name = answer;
  return rl.question('Set the save path (Default is current path)', dirAnswer);
};

const typeAnswer = (answer) => {
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.log('Only html or express-router are supported');
    return rl.question('What template do you need?', typeAnswer);
  }
  type = answer;
  return rl.question('Set your file name', nameAnswer);
};

const makeTemplate = () => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);

    if (exist(pathToFile)) {
      console.error('The file already exists');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, 'file creation is complete.');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);

    if (exist(pathToFile)) {
      console.error('The file already exists');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, 'file creation is complete.');
    }
  } else {
    console.error('Enter either html or router.');
  }
};

const program = () => {
  if (!type || !name) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question('What template do you need?', typeAnswer);
  } else {
    makeTemplate();
  }
};

program();
