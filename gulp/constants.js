const gulp = require('gulp');
const { noop, env } = require('./extensions');

module.exports = {
    DEV: 'dev',
    PROD: 'prod',
    OUT_DIR: 'build',
    // Environment conditional pipe
    envp: (_env, cb) => _env == env.env ? cb : noop(),
    // Environment conditional task
    envt: (_env, t) => cb => _env == env.env ? gulp.series(t)(cb) : cb()
};