import Koa from 'koa';
const app = new Koa();
import views from 'koa-views';
import {logger, logMiddlerware} from './logging';
import path from 'path';
import settings from '../configs/settings';
import bodyParser from 'koa-bodyparser';
import routes from '../routes';

app.env = process.env.NODE_ENV || settings.env.mode;
app.proxy = true;
app.port =  process.env.PORT || settings.env.port;
app.bindip =  process.env.BINDIP || settings.env.bindIp;

app.use(logMiddlerware);
app.use(views(path.join(__dirname, '../views'), { map: { html: 'swig' }}));
app.use(bodyParser({jsonLimit: '50mb', formLimit: '10mb', textLimit: '10mb', multipart:true, formidable:{keepExtensions: true, uploadDir: path.join(__dirname, '../../public/uploads')}}));

//router
routes(app);

//test
app.use(async ctx => {
    await ctx.render('test', {message: 'this is a test message'});
})
//404
app.use(async ctx => {
    await ctx.render('404');
});

//error
app.on('error', err => {
    console.error(err);
});

app.listen(app.port, app.bindip, () => {
    logger.info('Http server is binding on '+ app.bindip +' and listening on port ' + app.port + ' in ' + app.env );
});

export {app}