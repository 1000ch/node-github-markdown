#!/usr/bin/env node

var fs             = require('fs');
var path           = require('path');
var minimist       = require('minimist');
var lspath         = require('ls-path');
var isMarkdown     = require('is-md');
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

lspath(argv._, function (error, paths) {

  var markdowns = paths.filter(function (p) {
    return isMarkdown(p);
  });

  async.each(markdowns, function (file, index, files) {

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
});