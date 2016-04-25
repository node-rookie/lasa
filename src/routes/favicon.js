import path from 'path';
import fs from 'fs';
import readFileAsync from '../framework/readFileAsync';

var setFavicon = function (app){
    app.use(async (ctx, next) => {
        if('/favicon.ico' !== ctx.path) return await next();

        var icon = await readFileAsync(path.join(__dirname, '../../public/favicon.ico'));
        ctx.set('Cache-Control', 'max-age = 3600');
        ctx.type = 'image/x-icon';
        ctx.response.body = icon;
    })
};

export default setFavicon;