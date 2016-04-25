 const settings = {
    env: {
        name: 'dev',
        mode: 'develop',
        host: '127.0.0.1',
        port: 3000,
        bindIp: "0.0.0.0"
    },

    security: {
        salt: 'quick'
    },

    app: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 3000,
        domain: 'dev.www.wenode.org',
        domainPort: 80,
        context: '/'
    },

    api: {
        url: 'http://dev.www.wenode.org/api'
    },

    logging: {
        reloadSecs: 0, //INFO: set 0 could let nodeunit tests which use log4js exit properly
        level: 'DEBUG'
    },

    redis: {
        mode: 'single',
        host: '127.0.0.1',
        port: 6379,
        auth: ''
    },

    mongo: {
        host: "127.0.0.1",
        port: 27017,
        db: "note",
        username: '',
        password: ''
    },

    session: {
        secretKey: 'quick',
        expires: 60 // minutes
    },

    wechat: {
        appKey: 'wx23f1709f7727051f',
        appSecret: '977f6080e128d465b673deb79e3d31b8',
        token: 'trillers',
        encodingAESKey: '9zYRktc6N1WPyqH6hXq38tJC2CVDaLjHIkxRpihzmx3',
        siteId: 'gh_afc333104d2a',
        siteName: '错题本'
    },

    platform: {
        name: 'lasa',
        desc: 'lasa'
    }
};
 export default settings;