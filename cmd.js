#!/usr/bin/env node

var fs             = require('fs');
var path           = require('path');
var minimist       = require('minimist');
var glob           = require('glob');
var async          = require('async');
var GitHubMarkdown = require('./');
var package        = require('./package');

var argv = minimist(process.argv.slice(2), {
  alias: {
    t: 'title',
    d: 'dest',
    T: 'template',
    h: 'help',
    v: 'version'
  }
});

if (argv.version) {
  process.stdout.write(package.version + '\n');
  process.exit();
} else if (argv._.length === 0 || argv.help) {
  process.stdout.write(fs.readFileSync(path.join(__dirname, 'usage.txt')));
  process.exit();
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

async.each(targets, function (file, index, files) {

  var config = {
    title: argv.title || path.basename(file, '.md'),
    file: file,
    template: argv.template
  };

  var dest;
  if (argv.dest) {
    dest = path.join(
      path.dirname(argv.dest), 
      path.basename(file, '.md') + '.html'
    );
  } else {
    dest = path.join(
      process.cwd(),
      path.basename(file, '.md') + '.html'
    );
  }

  var ghmd = new GitHubMarkdown(config);
  ghmd.render().then(function (html) {
    fs.writeFileSync(dest, html, {
      encoding: 'utf8',
      flag: 'w'
    });
  });

}, function (error, result) {
  if (error) {
    throw error;
  }
});

