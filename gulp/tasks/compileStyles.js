const { OUT_DIR, DEV, envp } = require('./../constants');
const gulp = require('gulp');
const concat = require('gulp-concat');
const { sassCompiler } = require('./../extensions');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = function compileStyles() {
    return gulp.src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/milligram/dist/milligram.min.css',
            'src/styles/**/*.scss'
        ])
        .pipe(envp(DEV, sourcemaps.init()))
            .pipe(concat('style.scss'))
            .pipe(sassCompiler())
            .pipe(postcss([ autoprefixer, cssnano ]))
        .pipe(envp(DEV, sourcemaps.write('.')))
        .pipe(gulp.dest(OUT_DIR));
};