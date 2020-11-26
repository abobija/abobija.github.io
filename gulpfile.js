const { parallel, series } = require('gulp');
const cloneGhPages = require('./gulp/tasks/cloneGhPages');
const clean = require('./gulp/tasks/clean');
const generateCname = require('./gulp/tasks/generateCname');
const compressImages = require('./gulp/tasks/compressImages');
const compilePages = require('./gulp/tasks/compilePages');
const compileScripts = require('./gulp/tasks/compileScripts');
const compileStyles = require('./gulp/tasks/compileStyles');
const copyFontAwesome = require('./gulp/tasks/copyFontAwesome');
const serve = require('./gulp/tasks/serve');
const publish = require('./gulp/tasks/publish');

exports.ghpages = cloneGhPages;

exports.clean = clean;

exports.build = series(
    clean,
    cloneGhPages,
    parallel(
        generateCname,
        compilePages,
        compressImages,
        copyFontAwesome,
        compileScripts,
        compileStyles
    )
);

exports.serve = serve;

exports.publish = publish;

exports.default = exports.build;