const { execSync } = require('child_process');
const { OUT_DIR } = require('./../constants');

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

module.exports = function cloneGhPages(done) {
    rl.question('Are you sure that you want to publish?\
        \nThis command will commit and push output directory to the github pages.\
        \n(yes/no): ', answer => {

            if(answer !== 'yes') {
                rl.close();
                return done();
            }

            console.log('Publishing...');

            execSync(`cd ${OUT_DIR} && git add . && git commit -m "Publish" && git push`);

            console.log('Publish done.');

            rl.close();
            done();
    });
};