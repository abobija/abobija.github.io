const { OUT_DIR } = require('./../constants');
const { dest } = require('gulp');
const vinyl = require('vinyl-source-stream');

module.exports = function generateGitIgnore() {
    const stream = vinyl('.gitignore');
    stream.end("*.map");

    return stream.pipe(dest(OUT_DIR));
};