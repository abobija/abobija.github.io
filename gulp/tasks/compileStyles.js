const { OUT_DIR, DEV, envp } = require('./../constants');
const gulp = require('gulp');
const { sassCompiler } = require('./../extensions');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const rename = require('gulp-rename');

module.exports = function compileStyles() {
    return gulp.src([
            'src/styles/**/*.scss'
        ])
        .pipe(envp(DEV, sourcemaps.init()))
            .pipe(sassCompiler())
            .pipe(postcss([ autoprefixer, cssnano ]))
        .pipe(envp(DEV, sourcemaps.write('.')))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(`${OUT_DIR}/css`));
};