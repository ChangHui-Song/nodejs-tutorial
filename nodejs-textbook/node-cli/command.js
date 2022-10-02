#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('./package.json');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const htmlTemplate = `<!DOCTYPE html>
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
const routerTemplate = `const express = require('express');

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

const makeTemplate = (type, name, directory) => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);

    if (exist(pathToFile)) {
      console.error(chalk.bold.red('The file already exists'));
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(chalk.green(pathToFile, 'file creation is complete.'));
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);

    if (exist(pathToFile)) {
      console.error(chalk.bold.red('The file already exists'));
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(chalk.green(pathToFile, 'file creation is complete!'));
    }
  } else {
    console.error(chalk.bold.red('Enter either html or router.'));
  }
};

program.version(version, '-v, --version').name('cli');

program
  .command('template <type>')
  .usage('<type> --filename [filename] --path [path]')
  .description('creating template')
  .alias('tmpl')
  .option('-f, --filename [filename]', 'Enter the file name.', 'index')
  .option('-d, --directory [path]', 'Enter the file path.', '.')
  .action((type, options) => {
    makeTemplate(type, options.filename, options.directory);
  });

program
  .action((cmd, args) => {
    if (args) {
      console.log(chalk.bold.red('command not found.'));
      program.help();
    } else {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'type',
            message: 'Choose a template type.',
            choices: ['html', 'express-router'],
          },
          {
            type: 'input',
            name: 'name',
            message: 'Enter the file name.',
            default: 'index',
          },
          {
            type: 'input',
            name: 'directory',
            message: 'Enter the path to the file.',
            default: '.',
          },
          {
            type: 'confirm',
            name: 'confirm',
            message: 'Create?',
          },
        ])
        .then((answers) => {
          if (answers.confirm) {
            makeTemplate(answers.type, answers.name, answers.directory);
            console.log(chalk.rgb(128, 128, 128)('Done!'));
          }
        });
    }
  })
  .parse(process.argv);
