const { OUT_DIR } = require('./../constants');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

module.exports = function compressImages() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest(`${OUT_DIR}/img`));
};