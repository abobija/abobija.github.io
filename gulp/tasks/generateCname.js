const { OUT_DIR } = require('./../constants');
const { dest } = require('gulp');
const vinyl = require('vinyl-source-stream');

module.exports = function generateCname() {
    const stream = vinyl('CNAME');
    stream.end('abobija.com');

    return stream.pipe(dest(OUT_DIR));
};