var fs = require('fs');
var path = require('path');

function isDirectory() {
    var dir = path.join.apply(path, arguments);
    return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

function isFile() {
    var file = path.join.apply(path, arguments);
    return fs.existsSync(file) && fs.statSync(file).isFile();
}

module.exports = {
    isFile: isFile,
    isDirectory: isDirectory
};