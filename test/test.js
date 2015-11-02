'use strict';

const path = require('path');
const assert = require('power-assert');
const isHTML = require('is-html');
const GitHubMarkdown = require('../');

it('should out html', function (callback) {

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
