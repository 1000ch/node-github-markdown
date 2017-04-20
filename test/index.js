'use strict';

const fs = require('fs');
const path = require('path');
const pify = require('pify');
const test = require('ava');
const isHTML = require('is-html');
const execa = require('execa');
const ghmd = require('..');

const fsP = pify(fs);
const cmd = path.resolve(__dirname, '../cmd.js');
const input = path.resolve(__dirname, '../readme.md');

test('should out html', async t => {
  const buffer = await fsP.readFile(input);
  const markdown = buffer.toString();
  const html = ghmd(markdown);

  t.true(isHTML(html));
});

test('should out html from stdin', async t => {
  const result = await execa.shell(`cat ${input} | node ${cmd} --stdin`);

  t.true(isHTML(result.stdout));
});
