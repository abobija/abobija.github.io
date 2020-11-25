const { OUT_DIR } = require('./../constants');
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const compilePages = require('./compilePages');
const compileScripts = require('./compileScripts');
const compileStyles = require('./compileStyles');

module.exports = function serve(done) {
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
        gulp.watch([ pathPattern ], { interval: 1000 }, gulp.series(
            task,
            reloadBrowser
        ));
    };

    watcher('src/**/*.html', compilePages);
    watcher('src/**/*.ts', compileScripts);
    watcher('src/**/*.scss', compileStyles);

    done();
};