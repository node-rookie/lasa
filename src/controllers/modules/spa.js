import Router from 'koa-router';

module.exports = ()=>{
    let router = new Router();
    router.get('/', async ctx => {
        await ctx.render('index');
    });

    return router.routes();
};