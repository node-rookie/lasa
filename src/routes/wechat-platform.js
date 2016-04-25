var settings = require('@private/vmark-settings');
var Router = require('koa-router');
var oauth = require('../modules/auth/oauth-wechat');
var bus = require('../modules/tenant/wechat/oauth-bus-config');

module.exports = function(app){
    var router = new Router();

    var wechatPlatformChecker = function* (next){
        this.wechatId = this.params.wechatId;
        yield next;
    };

    router.get('/wechat/:wechatId/oauth/callback', wechatPlatformChecker, function*(next){
        //var wechatInfo = settings.wechat;
        yield bus.exchange(this, next);
    });

    router.get('/auth/:wechatId/authorize', wechatPlatformChecker, function*(next){
        yield bus.authorize(this);
    });

    app.use(router.routes());
};