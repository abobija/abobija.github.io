const gulp = require('gulp');
const gulpClean = require('gulp-clean');
const { OUT_DIR } = require('./../constants');

module.exports = function clean() {
    return gulp.src(`${OUT_DIR}/**/*.map`, {
            read: false,
            allowEmpty: true
        })
        .pipe(gulpClean());
};