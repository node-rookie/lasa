import log4js from 'log4js';
import util from 'util';
log4js.configure(__dirname + '/logging.json', { reloadSecs: 0 });
var logger = log4js.getLogger('app');

async function logMiddlerware(ctx, next){
    logger.setLevel('DEBUG');
    var DEFAULT = "%s %s -- %s %s HTTP/%s, %s %s";
    var req = ctx.request, header = req.header, nodeReq = ctx.req;
    var str = util.format(DEFAULT, new Date().toLocaleString(), req.ip, req.method, req.url, nodeReq.httpVersion, req.length || null, header['user-agent']);

    logger.debug(str);
    await next();
}
export {logger, logMiddlerware};
