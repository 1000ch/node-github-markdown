var fs = require('fs');
var path = require('path');

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

var GHMD = module.exports = function (config) {

  this.config = config || {};
  this.title = this.config.title || path.basename(this.file);
  this.file = this.config.file;
  this.template = this.config.template || path.join(__dirname, '/assets/template.jade');

  if (!path.isAbsolute(this.template)) {
    this.template = path.join(process.cwd(), this.config.template);
  }

  if (!fs.existsSync(this.file) || 
      !fs.statSync(this.file).isFile() || 
      path.extname(this.file) !== '.md') {
    throw new Error(this.file + ' is not a markdown file.');
  }
};

GHMD.prototype.render = function () {

  var title = this.title;
  var template = this.template;
  var buffer = fs.readFileSync(this.file, {
    encoding: 'utf8'
  });

  var promise = new Promise(function (resolve, reject) {

    marked(buffer, function (error, content) {

      if (error) {
        reject(error);
      }

      jade.renderFile(template, {
        pretty: true,
        title: title,
        content: content
      }, function (error, html) {

        if (error) {
          reject(error);
        }

        resolve(html);
      });
    });
  });

  return promise;
};