#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var argv = require('optimist').argv;
var jade = require('jade');
var marked = require('marked');
var glob = require('glob');
var async = require('async');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});

if (argv._.length === 0) {
  throw new Error('There is no arguments.');
}

var targetFiles = [];

argv._.filter(function(arg) {
  return fs.existsSync(arg);
}).forEach(function(arg) {
  if (_isFile(arg)) {
    targetFiles.push(arg);
  } else if (_isDir) {
    fs.readdirSync(arg).forEach(function(file) {
      targetFiles.push(file);
    });
  } else {
    glob(arg, function(error, files) {
      files.forEach(function(file) {
        targetFiles.push(file);
      });
    });
  }
});

if (targetFiles.length === 0) {
  throw new Error('There is no markdown files');
}

async.each(targetFiles, function(file, index, files) {
  fs.readFile(file, {encoding: 'utf8'}, function(error, data) {
    if (error) {
      throw error;
    }
    
    var html = marked(data);
    fs.writeFileSync('assets/temporary.html', html, {
      encoding: 'utf8',
      flag: 'w'
    });

    var basename = path.basename(file, '.md');
    jade.renderFile('assets/template.jade', {
      pretty: true
    }, function(error, html) {
      if (error) {
        throw error;
      }
      fs.writeFileSync(basename + '.html', html, {
        encoding: 'utf8',
        flag: 'w'
      });
      fs.unlinkSync('assets/temporary.html');
    });
  });
}, function(error, result) {
  if (error) {
    throw error;
  }
  console.log(result);
});

function _isDir() {
  var dir = path.join.apply(path, arguments);
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

function _isFile() {
  var file = path.join.apply(path, arguments);
  return fs.existsSync(file) && fs.statSync(file).isFile();
}