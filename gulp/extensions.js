const through = require('through2');
const extend = require('extend-object');
const sass = require('sass');

exports.sassCompiler = function (outFileName, sassOpts) {
    return through.obj((vinylFile, encoding, cb) => {
        const css = vinylFile.clone();

        css.contents = sass.renderSync(extend(sassOpts || {}, {
            data: vinylFile.contents.toString()
        })).css;

        if(outFileName == null) {
            css.extname = '.css';
        } else {
            css.basename = outFileName;
        }

        cb(null, css);
    });
};