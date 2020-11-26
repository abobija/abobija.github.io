const { parallel, series } = require('gulp');
const { DEV, PROD, envt } = require('./gulp/constants');
const clean = require('./gulp/tasks/clean');
const compressImages = require('./gulp/tasks/compressImages');
const compilePages = require('./gulp/tasks/compilePages');
const compileScripts = require('./gulp/tasks/compileScripts');
const compileStyles = require('./gulp/tasks/compileStyles');
const copyFontAwesome = require('./gulp/tasks/copyFontAwesome');
const serve = require('./gulp/tasks/serve');

exports.default = series(
    envt(PROD, clean),
    parallel(
        compilePages,
        compressImages,
        copyFontAwesome,
        compileScripts,
        compileStyles
    ),
    envt(DEV, serve)
);