const { OUT_DIR } = require('./../constants');
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');

module.exports = function compilePages() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(OUT_DIR));
};