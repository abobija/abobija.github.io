const { parallel, series } = require('gulp');
const cloneGhPages = require('./gulp/tasks/cloneGhPages');
const generateGitIgnore = require('./gulp/tasks/generateGitIgnore');
const generateCname = require('./gulp/tasks/generateCname');
const compressImages = require('./gulp/tasks/compressImages');
const compilePages = require('./gulp/tasks/compilePages');
const compileScripts = require('./gulp/tasks/compileScripts');
const compileStyles = require('./gulp/tasks/compileStyles');
const copyFontAwesome = require('./gulp/tasks/copyFontAwesome');
const serve = require('./gulp/tasks/serve');
const publish = require('./gulp/tasks/publish');

exports.build = series(
    cloneGhPages,
    parallel(
        generateGitIgnore,
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