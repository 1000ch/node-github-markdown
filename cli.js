#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var minimist = require('minimist');
var glob = require('glob');
var async = require('async');
var GHMD = require('./');

var argv = minimist(process.argv.slice(2));

if (argv._.length === 0) {
  throw new Error('There is no arguments.');
}

var targets = [];

argv._.filter(function (arg) {
  return fs.existsSync(arg);
}).forEach(function (arg) {
  if (fs.statSync(arg).isFile()) {
    targets.push(arg);
  } else if (fs.statSync(arg).isDirectory()) {
    fs.readdirSync(arg).forEach(function (file) {
      targets.push(file);
    });
  } else {
    glob(arg, function (error, files) {
      files.forEach(function (file) {
        targets.push(file);
      });
    });
  }
});

if (targets.length === 0) {
  throw new Error('There is no markdown files.');
}

async.each(targets, function (file, index, files) {

  var config = {
    title: argv.title || path.basename(file, '.md'),
    file: file,
    template: argv.template
  };

  var dest;
  if (argv.dest) {
    dest = path.join(path.dirname(argv.dest), path.basename(file, '.md') + '.html');
  } else {
    dest = path.join(process.cwd(), path.basename(file, '.md') + '.html');
  }

  new GHMD(config).render(function (html) {
    fs.writeFileSync(dest, html, {
      encoding: 'utf8',
      flag: 'w'
    });
  });

}, function (error, result) {
  if (error) {
    throw error;
  }
  console.log(result);
});

