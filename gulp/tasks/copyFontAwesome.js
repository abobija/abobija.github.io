const { OUT_DIR } = require('./../constants');
const { src, dest } = require('gulp');

module.exports = function copyFontAwesome() {
    return src([
            'node_modules/@fortawesome/fontawesome-free/webfonts/*solid-900*',
            'node_modules/@fortawesome/fontawesome-free/webfonts/*brands-400*'
        ])
        .pipe(dest(`${OUT_DIR}/webfonts`));
};