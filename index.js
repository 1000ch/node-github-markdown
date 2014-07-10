#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var minimist = require('minimist');
var glob = require('glob');
var async = require('async');

var GFM = require('./gfm');
var util = require('./lib/util');

var argv = minimist(process.argv.slice(2));

if (argv._.length === 0) {
  throw new Error('There is no arguments.');
}

var targetFiles = [];

argv._.filter(function (arg) {
  return fs.existsSync(arg);
}).forEach(function (arg) {
  if (util.isFile(arg)) {
    targetFiles.push(arg);
  } else if (util.isDirectory(arg)) {
    fs.readdirSync(arg).forEach(function (file) {
      targetFiles.push(file);
    });
  } else {
    glob(arg, function (error, files) {
      files.forEach(function (file) {
        targetFiles.push(file);
      });
    });
  }
});

if (targetFiles.length === 0) {
  throw new Error('There is no markdown files.');
}

async.each(targetFiles, function (file, index, files) {

  var name = path.basename(file, '.md') + '.html';
  var dest;
  if (argv.dest) {
    dest = path.join(path.dirname(argv.dest), name);
  } else {
    dest = path.join(process.cwd(), name);
  }

  new GFM(file).render(argv.template, function (html) {
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

