'use strict';

const fs = require('fs');
const path = require('path');
const pug = require('pug');
const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

module.exports = (markdown, config = {}) => {
  const title = config.title || '';
  const template = config.template || path.resolve(__dirname, './template.pug');

  const markdownIt = new MarkdownIt({
    langPrefix: 'hljs ',
    highlight: (string, lang) => {
      try {
        if (lang) {
          return hljs.highlight(lang, string).value;
        }

        return hljs.highlightAuto(string).value;
      } catch (err) {
        console.error(err);
      }
      return '';
    }
  });

  return pug.renderFile(template, {
    pretty: true,
    title,
    content: markdownIt.render(markdown),
    flattenedDeps: fs.existsSync(path.join(__dirname, '..', 'primer-css', 'build', 'build.css'))
  });
};
