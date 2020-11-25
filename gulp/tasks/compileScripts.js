const { OUT_DIR, PROD, DEV, envp } = require('./../constants');
const gulp = require('gulp');
const browserify = require('browserify');
const tsify = require('tsify');
const vinyl = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');

module.exports = function compileScripts() {
    return browserify({
        basedir: '.',
        debug: false,
        entries: [ 'src/scripts/main.ts' ],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(vinyl('script.js'))
    .pipe(buffer())
    .pipe(envp(DEV, sourcemaps.init()))
    .pipe(envp(PROD, uglify()))
    .pipe(envp(DEV, sourcemaps.write('.')))
    .pipe(gulp.dest(OUT_DIR));
};