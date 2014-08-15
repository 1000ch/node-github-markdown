# [node-github-markdown](https://npmjs.org/package/github-markdown)

## About

Parse GitHub flavored markdown to static html.

[![NPM version](https://badge.fury.io/js/github-markdown.svg)](http://badge.fury.io/js/github-markdown)
[![Dependency Status](https://david-dm.org/1000ch/node-github-markdown.svg)](https://david-dm.org/1000ch/node-github-markdown)
[![devDependency Status](https://david-dm.org/1000ch/node-github-markdown/dev-status.svg)](https://david-dm.org/1000ch/node-github-markdown#info=devDependencies)

## Usage

Install.

```sh
$ npm install -g github-markdown
```

Parse markdowns.

```sh
$ ghmd readme.md
```

### `--title`

Specify HTML title.

```sh
$ ghmd --title Target target.md
```

### `--dest`

Specify the destination file.

```sh
$ ghmd --dest index.html readme.md
```

### `--template`

Specify custom template (defaults to standard template)

```sh
$ ghmd --template custom.jade markdown.md
```

## License

MIT
