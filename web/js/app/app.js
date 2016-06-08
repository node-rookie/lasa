import {util as _} from './util';

export var app = riot.observable();

app.entry = null;

app.routesMap = {};

app.defaultRoute = null;

app.init = function(){
    app._parseRoute();
    riot.route.start();
    riot.route(this._doRoute());
    setTimeout(function(){
        riot.route.exec();
    }, 0)
    app._doActionBinding();
};

app._parseRoute = function(){
    riot.route.parser(function(path){
        let req = {};
        let [uri, queryString] = path.split('?');
        let uriParts = uri.split('/');

        req.params = {};
        req.paramList = [];
        if(uri.match(/_(\w+)/g)){
            req.paramList = uriParts.filter(p => p.match(/_(\w+)/g)).map(o => o.slice(1));
        }

        req.query = {};
        if(queryString){
            queryString.split('&').map(i=>req.query[i.split('=')[0]] = i.split('=')[1]);
        }

        req.hints = [];
        if(uriParts.length){
            req.hints = uriParts.map((i, index)=>{
                if(index === 0){
                    return i;
                }
                return combineUriParts(uriParts, index, i);

            });
            function combineUriParts(parts, i, combined){
                if(!parts.length || i<=0){
                    return combined;
                }
                let uri = parts[i-1] + '/' + combined;
                return combineUriParts(parts, --i, uri);
            }
        }
        return req;
    })
};

app.registerRoute = function({path, name, before}, container){
    app.routesMap[path] = {
        before,
        tag: container.tags[name]};
    return this;
};

app._doRoute = function(){
    return req => {
        let me = this;
        let isFounded = false;
        function recursiveHints(hints){
            if(!hints.length){
                return;
            }
            let path = hints[0];
            let request = {};
            let {route, params} = me._getMetaDataFromRouteMap(path);

            if(!route){
                return recursiveHints(hints.slice(1));
            }
            let tag = route.tag;
            isFounded = true;
            request.params = params;
            request.query = req.query;
            let ctx = {
                request
            };
            if(route.before){
                route.before.apply(tag, [done]);
                return;
            }
            done();
            function done(){
                if(tag.hasOwnProperty('hidden') && tag.hidden){
                    tag.one('ready', ()=>{
                        app._routeTo(tag);
                        recursiveHints(hints.slice(1));
                    });
                    tag.trigger('open', ctx);
                    return;
                }
                recursiveHints(hints.slice(1));
            }
        }
        recursiveHints(req.hints);
        if(!isFounded){
            let url = app.defaultRoute.path;

            let paramsParts = url.match(/_[a-zA-Z0-9:]+/g);
            if(paramsParts && paramsParts.length){
                paramsParts.map(part=>{
                    let key = part.slice(2);
                    let value = app.defaultRoute.defaultRoute.params
                        && app.defaultRoute.defaultRoute.params[key]
                        || "";
                    url = url.replace(new RegExp('_:' + key + '+'), '_' + value);
                });
            }
            riot.route('/' + url);
        }
    };
};

app._routeTo = function(tag){
    tag.hidden = !tag.hidden;
    tag.update();
    _.values(tag.parent.tags).filter(t=>t!=tag).forEach(t=>{
        if(tag.hasOwnProperty('hidden')){
            t.hidden = true;
            t.update();
        }
    });
};

app._getMetaDataFromRouteMap = function(routeKey){
    routeKey = '/' + routeKey;
    let keys = Object.keys(this.routesMap);
    for(let i=0, len=keys.length; i<len; i++){
        let k = keys[i];
        let route = this.routesMap[k];
        if(toPattern(k) === toPattern(routeKey)){
            let paramKeys = (extractParams(k) || []).map(i=>i.slice(2));
            let paramValues = (extractParams(routeKey) || []).map(i=>i.slice(1));
            return {
                route,
                params: _.object(paramKeys, paramValues)
            };
        }
    }
    return {
        tag: null,
        params: null
    };
    function extractParams(path){
        return path.match(/_[a-zA-Z0-9:]+/g);
    }
    function toPattern(route){
        return route.replace(/_[a-zA-Z0-9:]+/g, "*");
    }
};

app._doActionBinding = function(){
    app.off('action').on('action', action=>{
        app.entry.trigger(action.name, action.res);
        recursiveOnAction(app.entry, action);
    });
    function recursiveOnAction(tag, action){
        if(!Object.keys(tag.tags).length){
            return;
        }
        Object.keys(tag.tags).forEach(k=>{
            let childTag = tag.tags[k];
            if(!childTag){
                return;
            }
            if(!Array.isArray(childTag)){
                childTag.trigger(action.name, action.res);
                recursiveOnAction(childTag, action);
            }else{
                childTag.forEach(t=>{
                    t.trigger(action.name, action.res);
                    recursiveOnAction(t, action);
                });
            }
        })
    }
};