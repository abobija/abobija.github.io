const { env, noop } = require('gulp-util');
const gulp = require('gulp');
const { src, dest, parallel, series } = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const DEV = 'dev';
const PROD = 'prod';
const outDir = 'build';

// Environment conditional pipe
const envp = (_env, cb) => _env == env.env ? cb : noop();

// Environment conditional task
const envt = (_env, t) => cb => _env == env.env ? series(t)(cb) : cb();

function clean() {
    return src('build', { read: false })
        .pipe(require('gulp-clean')());
}

function compressImgs() {
    return src('src/images/*')
        .pipe(imagemin())
        .pipe(dest(`${outDir}/img`));
}

function minifyHtml() {
    return src('src/*.html')
        .pipe(require('gulp-htmlmin')({ collapseWhitespace: true }))
        .pipe(dest(outDir));
}

function mergeAndMinifyJs() {
    return src([
            'src/js/**/*.js'
        ])
        .pipe(envp(DEV, sourcemaps.init()))
            .pipe(concat('script.js'))
            .pipe(terser())
        .pipe(envp(DEV, sourcemaps.write('.')))
        .pipe(dest(outDir));
}

function mergeAndMinifyCss() {
    return src([
            'src/css/**/*.css'
        ])
        .pipe(envp(DEV, sourcemaps.init()))
            .pipe(concat('style.css'))
            .pipe(require('gulp-postcss')([
                require('autoprefixer'),
                require('cssnano')
            ]))
        .pipe(envp(DEV, sourcemaps.write('.')))
        .pipe(dest(outDir));
}

function serve() {
    browserSync.init({
        server: {
            baseDir: `./${outDir}`
        },
        notify: false
    });
    
    gulp
    .watch([
        'src/**/*.html',
        'src/**/*.js',
        'src/**/*.css'
    ], { interval: 1000 } , parallel(
        minifyHtml,
        mergeAndMinifyJs,
        mergeAndMinifyCss,
        done => { browserSync.reload(); done(); }
    ));
}

exports.default = series(
    envt(PROD, clean),
    parallel(
        minifyHtml,
        compressImgs,
        mergeAndMinifyJs,
        mergeAndMinifyCss
    ),
    envt(DEV, serve)
);