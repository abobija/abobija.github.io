const { env, noop } = require('gulp-util');
const gulp = require('gulp');
const { src, dest, parallel, series } = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const tsify = require('tsify');
const vinyl = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const { sassCompiler } = require('./gulp/extensions');

const DEV = 'dev';
const PROD = 'prod';
const OUT_DIR = 'build';

// Environment conditional pipe
const envp = (_env, cb) => _env == env.env ? cb : noop();

// Environment conditional task
const envt = (_env, t) => cb => _env == env.env ? series(t)(cb) : cb();

function clean() {
    return src(OUT_DIR, { read: false, allowEmpty: true })
        .pipe(require('gulp-clean')());
}

function compressImages() {
    return src('src/images/*')
        .pipe(require('gulp-imagemin')())
        .pipe(dest(`${OUT_DIR}/img`));
}

function compilePages() {
    return src('src/*.html')
        .pipe(require('gulp-htmlmin')({ collapseWhitespace: true }))
        .pipe(dest(OUT_DIR));
}

function compileScripts() {
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
    .pipe(dest(OUT_DIR));
}

function compileStyles() {
    return src([
            'src/styles/**/*.scss'
        ])
        .pipe(envp(DEV, sourcemaps.init()))
            .pipe(concat('style.scss'))
            .pipe(sassCompiler())
            .pipe(require('gulp-postcss')([
                require('autoprefixer'),
                require('cssnano')
            ]))
        .pipe(envp(DEV, sourcemaps.write('.')))
        .pipe(dest(OUT_DIR));
}

function serve(done) {
    browserSync.init({
        server: {
            baseDir: `./${OUT_DIR}`
        },
        notify: false
    });

    function reloadBrowser(done) {
        browserSync.reload();
        done();
    }

    const watcher = (pathPattern, task) => {
        gulp.watch([ pathPattern ], { interval: 1000 }, series(
            task,
            reloadBrowser
        ));
    };

    watcher('src/**/*.html', compilePages);
    watcher('src/**/*.ts', compileScripts);
    watcher('src/**/*.scss', compileStyles);

    done();
}

exports.default = series(
    envt(PROD, clean),
    parallel(
        compilePages,
        compressImages,
        compileScripts,
        compileStyles
    ),
    envt(DEV, serve)
);