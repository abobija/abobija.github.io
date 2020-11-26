const { execSync } = require('child_process');
const { OUT_DIR } = require('./../constants');

module.exports = function publish(done) {
    console.log('Publishing...');
    
    execSync(`cd ${OUT_DIR} && git add . && git commit --allow-empty -m "Publish" && git push`);

    console.log('Published.');
    done();
};