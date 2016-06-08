import pathToRegExp from 'path-to-regexp';

export default class Layer{
    /**
     * Initialize a new routing Layer with given, `path`, and `middleware`.
     *
     * @param {String|RegExp} path Path string or regular expression.
     * @param {Array} middleware Layer callback/middleware or series of.
     * @param {Object=} opts
     * @param {String=} opts.name route name
     * @param {String=} opts.sensitive case sensitive (default: false)
     * @param {String=} opts.strict require the trailing slash (default: false)
     * @returns {Layer}
     * @private
     */
    constructor(path, middleware, opts){
        this.opts = opts || {};
        this.name = this.opts.name || null;
        this.tag = opts.tag || {};
        this.paramNames = [];
        this.stack = Array.isArray(middleware) ? middleware : [middleware];

        // ensure middleware is a function
        this.stack.forEach(function(fn) {
            var type = (typeof fn);
            if (type !== 'function') {
                throw new Error(
                    " `" + (this.opts.name || path) +"`: `middleware` "
                    + "must be a function, not `" + type + "`"
                );
            }
        }, this);

        this.path = path;
        this.regexp = pathToRegExp(path, this.paramNames, this.opts);
    }

    /**
     * Returns whether request `path` matches route.
     *
     * @param {String} path
     * @returns {Boolean}
     * @private
     */

    match(path) {
        return this.regexp.test(path);
    };

    /**
     * Returns map of URL parameters for given `path` and `paramNames`.
     *
     * @param {String} path
     * @param {Array.<String>} captures
     * @param {Object=} existingParams
     * @returns {Object}
     * @private
     */

    params(path, captures, existingParams) {
        var params = existingParams || {};

        for (var len = captures.length, i=0; i<len; i++) {
            if (this.paramNames[i]) {
                var c = captures[i];
                params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
            }
        }

        return params;
    };

    /**
     * Returns array of regexp url path captures.
     *
     * @param {String} path
     * @returns {Array.<String>}
     * @private
     */

    captures(path) {
        return path.match(this.regexp).slice(1);
    };

    /**
     * Generate URL for route using given `params`.
     *
     * @example
     *
     * ```javascript
     * var route = new Layer(['GET'], '/users/:id', fn);
     *
     * route.url({ id: 123 }); // => "/users/123"
     * ```
     *
     * @param {Object} params url parameters
     * @returns {String}
     * @private
     */

    url(params) {
        var args = params;
        var url = this.path;

        // argument is of form { key: val }
        if (typeof params != 'object') {
            args = Array.prototype.slice.call(arguments);
        }

        if (args instanceof Array) {
            for (var len = args.length, i=0; i<len; i++) {
                url = url.replace(/:[^\/]+/, args[i]);
            }
        }
        else {
            for (var key in args) {
                url = url.replace(':' + key, args[key]);
            }
        }

        url.split('/').forEach(function (component) {
            url = url.replace(component, encodeURIComponent(component));
        });

        return url;
    };

    /**
     * Prefix route path.
     *
     * @param {String} prefix
     * @returns {Layer}
     * @private
     */

    setPrefix(prefix) {
        if (this.path) {
            this.path = prefix + this.path;
            this.paramNames = [];
            this.regexp = pathToRegExp(this.path, this.paramNames, this.opts);
        }

        return this;
    };
}

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @returns {String} URL decode original string.
 * @private
 */

function safeDecodeURIComponent(text) {
    try {
        return decodeURIComponent(text);
    } catch (e) {
        return text;
    }
}
