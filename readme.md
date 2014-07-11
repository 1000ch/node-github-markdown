# [node-github-markdown](https://npmjs.org/package/github-markdown)

## About

Parse GitHub flavored markdown to html.

[![NPM version](https://badge.fury.io/js/github-markdown.svg)](http://badge.fury.io/js/github-markdown)
[![Dependency Status](https://david-dm.org/1000ch/node-github-markdown.svg)](https://david-dm.org/1000ch/node-github-markdown)
[![devDependency Status](https://david-dm.org/1000ch/node-github-markdown/dev-status.svg)](https://david-dm.org/1000ch/node-github-markdown#info=devDependencies)

[![NPM](https://nodei.co/npm/github-markdown.png)](https://nodei.co/npm/github-markdown/)

## Usage

Install.

```sh
$ npm install -g github-markdown
```

Parse markdowns.

```sh
$ githubmd readme.md
```

### `--title`

Specify HTML title.

```sh
$ githubmd --title Target target.md
```

### `--dest`

Specify the destination file.

```sh
$ githubmd --dest index.html readme.md
```

### `--template`

Specify custom template (defaults to standard template)

```sh
$ githubmd --template custom.jade markdown.md
```

## License

MIT
