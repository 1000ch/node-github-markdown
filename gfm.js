var fs = require('fs');
var path = require('path');

var _ = require('underscore');
var jade = require('jade');
var marked = require('marked');
var hljs = require('highlight.js');

var util = require('./lib/util');

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }
});

function GFM(file) {

  // markdown files
  if (util.isFile(file) && path.extname(file) === '.md') {
    this.file = file;
  } else {
    throw new Error(file + ' is not a markdown file.');
  }
}

GFM.prototype.render = function (callback) {
  var name = path.basename(this.file);
  var buffer = fs.readFileSync(this.file, {
    encoding: 'utf8'
  });
  marked(buffer, function (error, content) {
    if (error) {
      throw error;
    }
    jade.renderFile(__dirname + '/assets/template.jade', {
      pretty: true,
      title: name,
      content: content
    }, function (error, html) {
      if (error) {
        throw error;
      }
      callback(html);
    });
  });
};

module.exports = GFM;