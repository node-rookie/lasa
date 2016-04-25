import setFavicon from './favicon';
import staticFilesServer from './static';
var routes = function(app){
    setFavicon(app);
    staticFilesServer(app);
    //app.keys = ['keys', 'keykeys'];
    //app.use(require('../middlewares/session')());
    //require('./wechat-platform')(app);
    //require('./auth-wechat')(app);
    //require('./auth')(app);
    //require('../controllers')(app);
}

export default routes;
