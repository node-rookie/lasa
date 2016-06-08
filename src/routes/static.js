import staticServer from 'koa-static2';
import path from 'path';

var staticFilesServer = function(app){
    app.use(staticServer('public', path.join(__dirname, '../../public')));
    app.use(staticServer('web', path.join(__dirname, '../../web')));

    //app.use(staticServer(path.join(__dirname, '../../web')));
    //app.use(mount('/public', staticServer(path.join(__dirname, '../../public'))));
    //app.use(mount('/web', staticServer(path.join(__dirname, '../../web'))));

}

export default staticFilesServer;