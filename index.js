require("babel-core/register")({
    presets: ['es2015-node5', 'stage-3']
});

module.exports = require('./src/app');