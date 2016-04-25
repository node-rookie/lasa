import staticServer from 'koa-static';
import mount from 'koa-mount';
import path from 'path';

var staticFilesServer = function(app){
    //app.use(staticServer(path.join(__dirname, '../../public')));
    //app.use(staticServer(path.join(__dirname, '../../web')));
    app.use(mount('/public', staticServer(path.join(__dirname, '../../public'))));
    //app.use(mount('/web', staticServer(path.join(__dirname, '../../web'))));

}

export default staticFilesServer;