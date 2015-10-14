'use strict';

const fs         = require('fs');
const path       = require('path');
const isAbsolute = require('path-is-absolute');
const jade       = require('jade');
const markdown   = require('markdown-it');
const hljs       = require('highlight.js');

let md = markdown({
  langPrefix: 'hljs ',
  highlight: (string, lang) => {
    try {
      if (lang) {
        return hljs.highlight(lang, string).value;
      } else {
        return hljs.highlightAuto(code).value;
      }
    } catch (e) {
      console.error(e);
    }
    return '';
  }
});

class GitHubMarkdown {

  constructor(config) {

    config = config || {}

    this.file = config.file;
    this.title = config.title || path.basename(this.file);
    this.template = config.template || path.join(__dirname, './template.jade');

    if (!isAbsolute(this.template)) {
      this.template = path.join(process.cwd(), this.config.template);
    }

    if (!fs.existsSync(this.file)) {
      throw new Error(`${this.file} does not exist`);
    }

    if (!fs.statSync(this.file).isFile()) {
      throw new Error(`${this.file} is not a markdown file`);
    }
  }

  render() {

    return new Promise((resolve, reject) => {

      let string = fs.readFileSync(this.file).toString();
      let html = md.render(string);

      let options = {
        pretty: true,
        title: this.title,
        content: html
      };

      jade.renderFile(this.template, options, (error, html) => {

        if (error) {
          reject(error);
        }

        resolve(html);
      });
    });
  }
}

module.exports = GitHubMarkdown;
