var Router = require('koa-router');
var oauth = require('../modules/auth/oauth-wechat');

module.exports = function(app){
    var router = new Router();

    router.get('/auth/callback', function*(next){
        yield oauth.exchange(this, next);
    });
    app.use(router.routes());
};