var fs = require('fs');
var path = require('path');

var jade = require('jade');
var markdown = require('markdown-it');
var hljs = require('highlight.js');

var md = markdown({
  langPrefix: 'hljs ',
  highlight: function (string, lang) {
    try {
      if (lang) {
        return hljs.highlight(lang, string).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    } catch (e) {
      console.log(e);
    }
    return '';
  }
});

var GitHubMarkdown = module.exports = function (config) {

  var config = config || {};
  this.file = config.file;
  this.title = config.title || path.basename(this.file);
  this.template = config.template || path.join(__dirname, '/template.jade');

  if (!path.isAbsolute(this.template)) {
    this.template = path.join(process.cwd(), this.config.template);
  }

  if (!fs.existsSync(this.file) || 
      !fs.statSync(this.file).isFile() || 
      path.extname(this.file) !== '.md') {
    throw new Error(this.file + ' is not a markdown file.');
  }
};

GitHubMarkdown.prototype.render = function () {

  var title = this.title;
  var template = this.template;
  var buffer = fs.readFileSync(this.file, {
    encoding: 'utf8'
  });

  return new Promise(function (resolve, reject) {

    var result = md.render(buffer);

    jade.renderFile(template, {
      pretty: true,
      title: title,
      content: result
    }, function (error, html) {

      if (error) {
        reject(error);
      }

      resolve(html);
    });
  });
};