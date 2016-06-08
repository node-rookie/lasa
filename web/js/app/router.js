import Layer from './layer';
export default class Router {
    constructor(opts){
        this.opts = opts || {};
        this.params = {};
        this.stack = [];
    }

    /***
     * config route
     * @param path
     * @param opts {name, default...}
     * @param middleware
     * @returns {Router}
     */
    config(path, opts, middleware) {
        var middleware;
        if(opts.tag){
            opts.tag.hidden = true;
        }

        if (typeof opts === 'object') {
            middleware = Array.prototype.slice.call(arguments, 2);
        } else {
            middleware = Array.prototype.slice.call(arguments, 1);
            opts = {};
        }

        this.register(path, middleware, opts);

        return this;
    };

    /**
     * Create and register a route.
     *
     * @param {String} path Path string or regular expression.
     * @param {Array.<String>} methods Array of HTTP verbs.
     * @param {Function} middleware Multiple middleware also accepted.
     * @returns {Layer}
     * @private
     */
    register(path, middleware, opts) {
        opts = opts || {};

        var stack = this.stack;

        // create route
        var route = new Layer(path, middleware, {
            end: opts.end === false ? opts.end : true,
            name: opts.name,
            tag: opts.tag,
            sensitive: opts.sensitive || this.opts.sensitive || false,
            strict: opts.strict || this.opts.strict || false,
            prefix: opts.prefix || this.opts.prefix || "",
        });

        if (this.opts.prefix) {
            route.setPrefix(this.opts.prefix);
        }

        // register route with router
        stack.push(route);

        return route;
    };

    /**
     * Use given middleware(s) before route callback.
     *
     * Only runs if any route is matched. If a path is given, the middleware will
     * run for any routes that include that path.
     *
     * @example
     *
     * ```javascript
     * router.use(session(), authorize());
     *
     * // use middleware only with given path
     * router.use('/users', userAuth());
     *
     * app.use(router.routes());
     * ```
     *
     * @param {String=} path
     * @param {Function} middleware
     * @param {Function=} ...
     * @returns {Router}
     */
    use(){
        var router = this;
        var middleware = Array.prototype.slice.call(arguments);
        var path;

        // support array of paths
        if (Array.isArray(middleware[0]) && typeof middleware[0][0] === 'string') {
            middleware[0].forEach(function (p) {
                router.use.apply(router, [p].concat(middleware.slice(1)));
            });

            return this;
        }

        if (typeof middleware[0] === 'string') {
            path = middleware.shift();
        }

        // filter out nested routers from filter
        middleware = middleware.filter(function (fn) {
            if (fn.router) {
                fn.router.stack.forEach(function (layer) {
                    if (path) layer.setPrefix(path);
                    if (router.opts.prefix) layer.setPrefix(router.opts.prefix);
                    router.stack.push(layer);
                });

                if (router.params) {
                    Object.keys(router.params).forEach(function (key) {
                        fn.router.param(key, router.params[key]);
                    });
                }

                return false;
            }

            return true;
        });

        if (middleware.length) {
            router.register(path || '(.*)', middleware, {
                end: false
            });
        }

        return this;
    };

    /**
     * Set the path prefix for a Router instance that was already initialized.
     *
     * @example
     *
     * ```javascript
     * router.prefix('/things/:thing_id')
     * ```
     *
     * @param {String} prefix
     * @returns {Router}
     */

    prefix(prefix) {
        prefix = prefix.replace(/\/$/, '');

        this.opts.prefix = prefix;

        this.stack.forEach(function (route) {
            route.setPrefix(prefix);
        });

        return this;
    };

    /**
     * Returns router middleware which dispatches a route matching the request.
     *
     * @returns {Function}
     */

    routes() {
        var router = this;

        var dispatch = function dispatch(next) {
            var self = this;
            var path = router.opts.routerPath || this.routerPath || this.request.path;
            var matched = router.match(path);
            if (this.matched) {
                this.matched.push.apply(this.matched, matched.path);
            } else {
                this.matched = matched.path;
            }
            if (matched.pathAndMethod.length) {
                let i = 0;
                while (matched.route && i < matched.pathAndMethod.length) {
                    let layer = matched.pathAndMethod[i];
                    i++;
                    let ii = 0;
                    this.captures = layer.captures(path, this.captures);
                    this.params = layer.params(path, this.captures, this.params);
                    var tag = layer.tag;
                    function display(tag){

                        tag.update({hidden: false});
                        Object.keys(tag.parent.tags)
                            .map(k=>tag.parent.tags[k])
                            .filter(t=>t!=tag)
                            .forEach(t=>{
                                if(t.hasOwnProperty('hidden')){
                                    t.update({hidden: true});
                                }
                            });
                        if(tag.parent.parent){
                            display(tag.parent);
                        }
                    }
                    layer.stack.push(function(){
                        display(tag);
                    })
                    run();
                    function run(){
                        var fn = layer.stack[ii];
                        ii++;
                        if(ii <= layer.stack.length) {
                            fn.call(self, run);
                        }
                    }
                }
            }

            next();
        };

        dispatch.router = this;
        return dispatch;
    };

    /**
     * Match given `path` and return corresponding routes.
     *
     * @param {String} path
     * @param {String} method
     * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
     * path and method.
     * @private
     */

    match(path) {
        var layers = this.stack;
        var layer;
        var matched = {
            path: [],
            pathAndMethod: [],
            route: false
        };

        for (var len = layers.length, i = 0; i < len; i++) {
            layer = layers[i];
            if (layer.match(path)) {
                matched.path.push(layer);
                matched.pathAndMethod.push(layer);
                if (layer.opts.end) matched.route = true;
            }
        }

        return matched;
    };
}