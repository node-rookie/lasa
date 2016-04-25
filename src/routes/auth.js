var Router = require('koa-router');
var context = require('../context/context');
var securityService = context.services.securityService;
var authResults = securityService.authResults;

module.exports = function(app){
    var router = new Router();

    var mockUsers = [{
            "openid": "okvXqs_VftHruzwFV9rx4Pbd_fno",
            "nickname": "小小星星妹",
            "headimgurl": "http://wx.qlogo.cn/mmopen/CyYbk1vmHvYCTpBHH4UiblXdxyuNYN2BX7E8fVw1kUAASwIrlS0nMfMIrsbby4oILcMYic2tCJLJTuhTbngb2hhtTbiaAic3mBFY/0"
        },
        {
            "openid": "okvXqswFmgRwEV0YrJ-h5YvKhdUk",
            "nickname": "祺天大剩",
            "headimgurl": "http://wx.qlogo.cn/mmopen/WiaGzvINYibQIsdezmic0kKrPrcTFhFOYfzcfzzUFUkWwj3xwibxO5tiabxuwgRdStwG8sPfuNynfHDnY6vNuEbSqQg/0"
        },
        {
            "openid": "okvXqs4vtB5JDwtb8Gd6Rj26W6mE",
            "nickname": "独自等待",
            "headimgurl": "http://wx.qlogo.cn/mmopen/CJ35Z2cnZA2r9iaUDwhRq0ic5oHTgXLallotFS8O5yEvdOglsSCe6icKk5ZlCmSM0JiarWme9yW0esKiaPRGLMABIAg/0"
        },
        {
            "openid": "okvXqsw1VG76eVVJrKivWDgps_gA",
            "nickname": "包三哥",
            "headimgurl": "http://wx.qlogo.cn/mmopen/CyYbk1vmHvYCTpBHH4UiblcOM6IEMibm2VweVnbTm5tnWib1rQG5v6t7779AEnDSkFf212MXOVXX29JvZlKicjhUxjpRYDnTPTES/0"
        }
    ];

    var qaMockUsers = [{
        "openid": "oO9zsw0jiq8hTtNDHi9ZepJ6zSPQ",
        "nickname": "独自等待",
        "headimgurl": "http://wx.qlogo.cn/mmopen/I1OPdTuWhEicbjlIqx1ibgjtbHcOG1Q95dXPrDNP2OIfxvtftOakR75AquTzLJgN5taLicichOnrKyPN8H4HbFf3GQ/0"
    },
        {
            "openid": "oO9zswxhJsRd_9f8DlpzfZrWnjRk",
            "nickname": "包三哥",
            "headimgurl": "http://wx.qlogo.cn/mmopen/MIbgLNjILzicjoS7yEMSdqfTunl9bmyeqHs2SHzicExaQC3iaibIfLoPYRUPNyQlTXuDFLTCzz5jukurmibCibbFCxY1ZCRibp5QibHb/0"
        },
        {
            "openid": "oO9zsw2WAGehKPCUTbTxxLAm9DWQ",
            "nickname": "酒剑仙",
            "headimgurl": "http://wx.qlogo.cn/mmopen/Q3auHgzwzM4vvB2o4cciaYF9Qbk7n9xw1DklbqEiakPLkn8FBLcWcDPicqEvh3y2GRysr2LogRmw9CkDEgZ0q9UBg/0"
        },
        {
            "openid": "oO9zsww3I9LWFN9AWf0RP9myCjsQ",
            "nickname": "Rupert",
            "headimgurl": "http://wx.qlogo.cn/mmopen/MIbgLNjILzicjoS7yEMSdqdiaVibaoqAfia9Whhp6jqb54gJFEaricTyTxjiaG0pZdg9us37bQVSgmIDicqVWYfw80C1PWfbs577HcK/0"
        },
        {
            "openid": "oO9zsw5FiytqnSFzBIYlRTnshyGI",
            "nickname": "小小星星妹",
            "headimgurl": "http://wx.qlogo.cn/mmopen/MIbgLNjILzicjoS7yEMSdqeTrXGLqRKbsiaLd528BITNubKMMZIEgUpsKd5fShE9eiagnDbcBUmOYf2vXx9xaLljDvMMLsOcYDS/0"
        }
    ];
    router.get('/mock-login-list', function *(){
        //var users = yield securityService.loadAllTenantAdminUsersAsync();
        yield this.render('mock-login-list', {users: mockUsers, qaUsers: qaMockUsers});
    });

    router.get('/mock-login', function *(){
        var openid = this.query.openid;
        var sceneId = this.query.sceneId;
        if(!openid){
            this.redirect('/login');
            return;
        }
        var auth = null;
        try{
            auth = yield securityService.authenticateAsync(openid);
        }
        catch(err){
            console.error(err);
        }
        context.logger.debug(auth);
        if(!auth){
            this.redirect('/login');
            return;
        }
        else if(auth.result != authResults.OK && auth.result != authResults.NO_BOUND_BOT){
            this.redirect('/login');
            return;
        }

        this.session.auth = auth;
        this.cookies.set('sceneId', sceneId, {maxAge: 3600000*24*30});
        if(auth.platform){
            this.redirect('/boss');
        }
        else{
            if(auth.privileges && auth.privileges['recontent']){
                this.redirect('/tenant-recontent-'+auth.tenantId+'#adlink-index');
            }
            else{
                this.redirect('/boss/tenant/_' + auth.tenantId);
            }
        }
    });

    //for wechat web
    router.get('/login-feedback', function *(){
        yield this.render('login-feedback', {});
    });

    //permission deny page
    router.get('/permission-deny', function *(){
        yield this.render('error', {error: {message: '您没有访问该页面的权限,请联系管理员'}});
    });
    app.use(router.routes());
};