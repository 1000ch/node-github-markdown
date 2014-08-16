var fs = require('fs');
var path = require('path');

var _ = require('underscore');
var jade = require('jade');
var marked = require('marked');
var hljs = require('highlight.js');

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

function GHMD(config) {

  this.config = config || {};
  this.title = this.config.title || path.basename(this.file);
  this.file = this.config.file;
  this.template = this.config.template ? path.join(process.cwd(), this.config.template) : __dirname + '/assets/template.jade';

  if (!fs.existsSync(this.file) || !fs.statSync(this.file).isFile() || path.extname(this.file) !== '.md') {
    throw new Error(this.file + ' is not a markdown file.');
  }
}

GHMD.prototype.render = function (callback) {

  var title = this.title;
  var template = this.template;
  var buffer = fs.readFileSync(this.file, {
    encoding: 'utf8'
  });

  marked(buffer, function (error, content) {
    if (error) {
      throw error;
    }
    jade.renderFile(template, {
      pretty: true,
      title: title,
      content: content
    }, function (error, html) {
      if (error) {
        throw error;
      }
      callback(html);
    });
  });
};

module.exports = GHMD;