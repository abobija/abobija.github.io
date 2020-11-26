const logger = require('gulplog');
const fs = require('fs');
const { execSync } = require('child_process');
const package = require('./../../package.json');
const { OUT_DIR } = require('./../constants');

module.exports = function cloneGhPages(done) {
    if(fs.existsSync(OUT_DIR)) {
        logger.info(`Directory "${OUT_DIR}" exists. Skipping.`);
        return done();
    }

    logger.info(`Directory "${OUT_DIR}" does not exists. Cloning branch...`);

    if(package.repository == null || package.repository.url == null) {
        throw new Error("Git repository missing in package.json");
    }
    
    const { url } = package.repository;
    
    execSync(`git clone --single-branch --branch gh-pages ${url.substr(4)} ${OUT_DIR}`);
    
    logger.info('Cloning done.');

    done();
};