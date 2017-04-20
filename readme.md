# [node-github-markdown](https://npmjs.org/package/github-markdown)

[![Build Status](https://travis-ci.org/1000ch/node-github-markdown.svg?branch=master)](https://travis-ci.org/1000ch/node-github-markdown)
[![NPM version](https://badge.fury.io/js/github-markdown.svg)](http://badge.fury.io/js/github-markdown)
[![Dependency Status](https://david-dm.org/1000ch/node-github-markdown.svg)](https://david-dm.org/1000ch/node-github-markdown)
[![devDependency Status](https://david-dm.org/1000ch/node-github-markdown/dev-status.svg)](https://david-dm.org/1000ch/node-github-markdown#info=devDependencies)

Parse GitHub flavored markdown to static html.

## Install

Install via npm.

```bash
$ npm install [--global] github-markdown
```

## Usage

Parse stdin.

```bash
$ cat readme.md | ghmd --stdin
```

Parse a markdown file.

```bash
# readme.html
$ ghmd readme.md
```

### `--dest`

Specify the destination.

```bash
# foo/readme.html
$ ghmd --dest foo readme.md
```

### `--template`

Specify custom template (defaults to standard template)

```bash
$ ghmd --template custom.jade markdown.md
```

### `--help`

Show help message.

### `--version`

Show package version.

## License

MIT: http://1000ch.mit-license.org
