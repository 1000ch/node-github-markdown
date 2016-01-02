'use strict';

const fs = require('fs');
const path = require('path');
const assert = require('power-assert');
const isHTML = require('is-html');
const GitHubMarkdown = require('../');
const exec = require('child_process').exec;

it('should out html', function(callback) {
  this.timeout(5000);

  let file = path.join(__dirname, '../readme.md');
  let ghmd = new GitHubMarkdown({
    title: path.basename(file, '.md'),
    file: file
  });

  ghmd.render().then(html => {
    assert(isHTML(html));
    callback();
  });
});

it('should out html', function(callback) {
  this.timeout(5000);

  let cmd = path.join(__dirname, '../cmd.js');
  let file = path.join(__dirname, '../readme.md');
  let expected = path.join(__dirname, '../readme.html');

  exec(`node ${cmd} ${file}`, function(error, stdout, stderr) {
    assert(fs.existsSync(expected));
    fs.unlink(expected);
    callback();
  });
});
