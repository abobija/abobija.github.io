const gulp = require('gulp');
const { noop } = require('gulp-util');
const gulpClean = require('gulp-clean');
const { OUT_DIR } = require('./../constants');

module.exports = function clean() {
    return gulp.src(OUT_DIR)
        .pipe(noop());
};