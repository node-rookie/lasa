import setFavicon from './favicon';
import staticFilesServer from './static';
import controllers from '../controllers';
var routes = function(app){
    setFavicon(app);
    staticFilesServer(app);
    controllers(app);
    //app.keys = ['keys', 'keykeys'];
    //app.use(require('../middlewares/session')());
    //require('./wechat-platform')(app);
    //require('./auth-wechat')(app);
    //require('./auth')(app);
    //require('../controllers')(app);
}

export default routes;
