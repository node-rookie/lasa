require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3']
});
require("babel-polyfill");

module.exports = require('./src/app');