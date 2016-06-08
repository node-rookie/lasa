'use strict'
import riot from 'riot';
import Router from './router';

export default class Spa{
    constructor(){
        this._init();
        this.middleware = [];
        this.context = {};
        this.tags = [];
    }
    _init(){
        if(!window.riot){
            window.riot = riot;
        }
        this._parseRoute();
        riot.route(this._doRoute());
        riot.route.start(true);
        riot.mixin({router: this.router.bind(this)});
    }

    router(){
        var router = new Router();
        this.use(router.routes());
        return router;
    }

    use(fn){
        this.middleware.push(fn);
        return this;
    }

    mount(selector = '*', opts = {}){
        try {
            var tags = riot.mount(selector, opts);
            this.tags = tags;
            return tags;
        }catch(e){
            console.log(e.stack);
        }
    }
    _parseRoute(){
        riot.route.parser(function(path){
            let req = {};
            let [uri, queryString] = path.split('?');
            req.path = '/' + path;
            req.url = uri;

            req.query = {};
            if(queryString){
                queryString.split('&').map(i=>req.query[i.split('=')[0]] = i.split('=')[1]);
            }
            return req;
        });
    };

    _doRoute(){
        let self = this;
        return req => {
            self.context.request = req;
            self.context.query = req.query;
            let i = 0;
            next();
            function next(){
                var layer = self.middleware[i];
                i++;
                if(i <= self.middleware.length) {
                    layer.call(self.context, next);
                }
            }
        };
    };
}