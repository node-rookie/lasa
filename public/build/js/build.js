webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	__webpack_require__(1);

	__webpack_require__(9);

	var _index = __webpack_require__(10);

	var actions = _interopRequireWildcard(_index);

	var _reduxMixin = __webpack_require__(11);

	var _reduxMixin2 = _interopRequireDefault(_reduxMixin);

	var _configureStore = __webpack_require__(12);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	var _spa = __webpack_require__(32);

	var _spa2 = _interopRequireDefault(_spa);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var store = (0, _configureStore2.default)();

	var application = new _spa2.default();

	__webpack_require__(40);

	// Every time the state changes, log it
	// Note that subscribe() returns a function for unregistering the listener
	var unsubscribe = store.subscribe(function () {
	    return console.log(store.getState());
	});

	riot.mixin((0, _reduxMixin2.default)(store));
	window.actions = actions;
	application.mount();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _fetchMonkeyPatch = __webpack_require__(2);

	var fetch = _interopRequireWildcard(_fetchMonkeyPatch);

	var _util = __webpack_require__(8);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	;(function (root, undefined) {
	    'use strict';

	    var _jQuery = root.jQuery;
	    if (_jQuery) {
	        return _jQuery;
	    }

	    var domify = function domify(obj) {
	        if (!obj) {
	            return;
	        }
	        var polyfills = {

	            append: function append(str) {
	                var me = this;
	                var div = document.createElement('div');
	                div.innerHTML = str;
	                while (div.children.length > 0) {
	                    me.appendChild(div.children[0]);
	                }
	                return this;
	            },

	            css: function css(opts) {
	                if (typeof opts === 'string') {
	                    return this.style[opts];
	                }
	                for (var p in opts) {
	                    this.style[p] = opts[p];
	                }
	                return this;
	            },

	            parent: function parent() {
	                return domify(this.parentNode);
	            },

	            next: function next() {
	                return domify(this.nextSbiling);
	            },

	            remove: function remove() {
	                if (!this.parentNode) {
	                    return;
	                }
	                this.parentNode.removeChild(this);
	            },

	            addClass: function addClass(cls) {
	                if (!this.hasClass(cls)) this.className += " " + cls;
	            },

	            removeClass: function removeClass(cls) {
	                if (this.hasClass(cls)) {
	                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	                    this.className = this.className.replace(reg, ' ');
	                }
	            },

	            hasClass: function hasClass(cls) {
	                return this.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	            },

	            outerWidth: function outerWidth() {
	                if (this.css && (this.css('marginLeft') || this.css('marginRight'))) {
	                    return this.offsetWidth + parseInt(this.css('marginLeft') || 0, 10) + parseInt(this.css('marginRight') || 0, 10);
	                }
	                return this.offsetWidth;
	            },

	            height: function height() {
	                return this.offsetHeight;
	            }
	        };
	        if (Array.isArray(obj)) {
	            obj.each = obj.forEach;
	            return obj.map(function (o) {
	                return _util.util.mixin(o, polyfills);
	            });
	        }
	        return _util.util.mixin(obj, polyfills);
	    };

	    var jQuery = function jQuery(selector) {
	        if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
	            return domify(selector);
	        }
	        var nodes = document.querySelectorAll(selector);
	        nodes = [].slice.apply(nodes);
	        return nodes.length === 1 ? domify(nodes[0]) : domify(nodes);
	    };

	    jQuery = _util.util.mixin(jQuery, fetch);

	    root.$ = jQuery;
	})(window);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.del = exports.put = exports.post = exports.get = undefined;

	var _es6Promise = __webpack_require__(3);

	__webpack_require__(6);

	(0, _es6Promise.polyfill)();


	function post(url, json) {
	    return fetch(url, {
	        method: 'post',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(json)
	    }).then(function (res) {
	        return checkStatus(res);
	    }).then(function (res) {
	        return parseJSON(res);
	    });
	}

	function get(url) {
	    return fetch(url, { method: 'get' }).then(function (res) {
	        return checkStatus(res);
	    }).then(function (res) {
	        return parseJSON(res);
	    });
	}

	function put(url, json) {
	    return fetch(url, {
	        method: 'put',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(json)
	    }).then(function (res) {
	        return checkStatus(res);
	    }).then(function (res) {
	        return parseJSON(res);
	    });
	}

	function del(url) {
	    return fetch(url, { method: 'delete' }).then(function (res) {
	        return checkStatus(res);
	    }).then(function (res) {
	        return parseJSON(res);
	    });
	}

	function checkStatus(response) {
	    if (response.status >= 200 && response.status < 300) {
	        return response;
	    } else {
	        var error = new Error(response.statusText);
	        error.response = response;
	        throw error;
	    }
	}

	function parseJSON(response) {
	    try {
	        return response.json();
	    } catch (e) {
	        var error = new Error('parse json error');
	        error.response = response;
	        throw error;
	    }
	}

	exports.get = get;
	exports.post = post;
	exports.put = put;
	exports.del = del;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global) {"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function () {
	  "use strict";
	  function t(t) {
	    return "function" == typeof t || "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && null !== t;
	  }function e(t) {
	    return "function" == typeof t;
	  }function n(t) {
	    G = t;
	  }function r(t) {
	    Q = t;
	  }function o() {
	    return function () {
	      process.nextTick(a);
	    };
	  }function i() {
	    return function () {
	      B(a);
	    };
	  }function s() {
	    var t = 0,
	        e = new X(a),
	        n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
	      n.data = t = ++t % 2;
	    };
	  }function u() {
	    var t = new MessageChannel();return t.port1.onmessage = a, function () {
	      t.port2.postMessage(0);
	    };
	  }function c() {
	    return function () {
	      setTimeout(a, 1);
	    };
	  }function a() {
	    for (var t = 0; J > t; t += 2) {
	      var e = tt[t],
	          n = tt[t + 1];e(n), tt[t] = void 0, tt[t + 1] = void 0;
	    }J = 0;
	  }function f() {
	    try {
	      var t = require,
	          e = __webpack_require__(5);return B = e.runOnLoop || e.runOnContext, i();
	    } catch (n) {
	      return c();
	    }
	  }function l(t, e) {
	    var n = this,
	        r = new this.constructor(p);void 0 === r[rt] && k(r);var o = n._state;if (o) {
	      var i = arguments[o - 1];Q(function () {
	        x(o, r, i, n._result);
	      });
	    } else E(n, r, t, e);return r;
	  }function h(t) {
	    var e = this;if (t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.constructor === e) return t;var n = new e(p);return g(n, t), n;
	  }function p() {}function _() {
	    return new TypeError("You cannot resolve a promise with itself");
	  }function d() {
	    return new TypeError("A promises callback cannot return that same promise.");
	  }function v(t) {
	    try {
	      return t.then;
	    } catch (e) {
	      return ut.error = e, ut;
	    }
	  }function y(t, e, n, r) {
	    try {
	      t.call(e, n, r);
	    } catch (o) {
	      return o;
	    }
	  }function m(t, e, n) {
	    Q(function (t) {
	      var r = !1,
	          o = y(n, e, function (n) {
	        r || (r = !0, e !== n ? g(t, n) : S(t, n));
	      }, function (e) {
	        r || (r = !0, j(t, e));
	      }, "Settle: " + (t._label || " unknown promise"));!r && o && (r = !0, j(t, o));
	    }, t);
	  }function b(t, e) {
	    e._state === it ? S(t, e._result) : e._state === st ? j(t, e._result) : E(e, void 0, function (e) {
	      g(t, e);
	    }, function (e) {
	      j(t, e);
	    });
	  }function w(t, n, r) {
	    n.constructor === t.constructor && r === et && constructor.resolve === nt ? b(t, n) : r === ut ? j(t, ut.error) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n);
	  }function g(e, n) {
	    e === n ? j(e, _()) : t(n) ? w(e, n, v(n)) : S(e, n);
	  }function A(t) {
	    t._onerror && t._onerror(t._result), T(t);
	  }function S(t, e) {
	    t._state === ot && (t._result = e, t._state = it, 0 !== t._subscribers.length && Q(T, t));
	  }function j(t, e) {
	    t._state === ot && (t._state = st, t._result = e, Q(A, t));
	  }function E(t, e, n, r) {
	    var o = t._subscribers,
	        i = o.length;t._onerror = null, o[i] = e, o[i + it] = n, o[i + st] = r, 0 === i && t._state && Q(T, t);
	  }function T(t) {
	    var e = t._subscribers,
	        n = t._state;if (0 !== e.length) {
	      for (var r, o, i = t._result, s = 0; s < e.length; s += 3) {
	        r = e[s], o = e[s + n], r ? x(n, r, o, i) : o(i);
	      }t._subscribers.length = 0;
	    }
	  }function M() {
	    this.error = null;
	  }function P(t, e) {
	    try {
	      return t(e);
	    } catch (n) {
	      return ct.error = n, ct;
	    }
	  }function x(t, n, r, o) {
	    var i,
	        s,
	        u,
	        c,
	        a = e(r);if (a) {
	      if (i = P(r, o), i === ct ? (c = !0, s = i.error, i = null) : u = !0, n === i) return void j(n, d());
	    } else i = o, u = !0;n._state !== ot || (a && u ? g(n, i) : c ? j(n, s) : t === it ? S(n, i) : t === st && j(n, i));
	  }function C(t, e) {
	    try {
	      e(function (e) {
	        g(t, e);
	      }, function (e) {
	        j(t, e);
	      });
	    } catch (n) {
	      j(t, n);
	    }
	  }function O() {
	    return at++;
	  }function k(t) {
	    t[rt] = at++, t._state = void 0, t._result = void 0, t._subscribers = [];
	  }function Y(t) {
	    return new _t(this, t).promise;
	  }function q(t) {
	    var e = this;return new e(I(t) ? function (n, r) {
	      for (var o = t.length, i = 0; o > i; i++) {
	        e.resolve(t[i]).then(n, r);
	      }
	    } : function (t, e) {
	      e(new TypeError("You must pass an array to race."));
	    });
	  }function F(t) {
	    var e = this,
	        n = new e(p);return j(n, t), n;
	  }function D() {
	    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
	  }function K() {
	    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	  }function L(t) {
	    this[rt] = O(), this._result = this._state = void 0, this._subscribers = [], p !== t && ("function" != typeof t && D(), this instanceof L ? C(this, t) : K());
	  }function N(t, e) {
	    this._instanceConstructor = t, this.promise = new t(p), this.promise[rt] || k(this.promise), I(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && S(this.promise, this._result))) : j(this.promise, U());
	  }function U() {
	    return new Error("Array Methods must be provided an Array");
	  }function W() {
	    var t;if ("undefined" != typeof global) t = global;else if ("undefined" != typeof self) t = self;else try {
	      t = Function("return this")();
	    } catch (e) {
	      throw new Error("polyfill failed because global object is unavailable in this environment");
	    }var n = t.Promise;(!n || "[object Promise]" !== Object.prototype.toString.call(n.resolve()) || n.cast) && (t.Promise = pt);
	  }var z;z = Array.isArray ? Array.isArray : function (t) {
	    return "[object Array]" === Object.prototype.toString.call(t);
	  };var B,
	      G,
	      H,
	      I = z,
	      J = 0,
	      Q = function Q(t, e) {
	    tt[J] = t, tt[J + 1] = e, J += 2, 2 === J && (G ? G(a) : H());
	  },
	      R = "undefined" != typeof window ? window : void 0,
	      V = R || {},
	      X = V.MutationObserver || V.WebKitMutationObserver,
	      Z = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
	      $ = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
	      tt = new Array(1e3);H = Z ? o() : X ? s() : $ ? u() : void 0 === R && "function" == "function" ? f() : c();var et = l,
	      nt = h,
	      rt = Math.random().toString(36).substring(16),
	      ot = void 0,
	      it = 1,
	      st = 2,
	      ut = new M(),
	      ct = new M(),
	      at = 0,
	      ft = Y,
	      lt = q,
	      ht = F,
	      pt = L;L.all = ft, L.race = lt, L.resolve = nt, L.reject = ht, L._setScheduler = n, L._setAsap = r, L._asap = Q, L.prototype = { constructor: L, then: et, "catch": function _catch(t) {
	      return this.then(null, t);
	    } };var _t = N;N.prototype._enumerate = function () {
	    for (var t = this.length, e = this._input, n = 0; this._state === ot && t > n; n++) {
	      this._eachEntry(e[n], n);
	    }
	  }, N.prototype._eachEntry = function (t, e) {
	    var n = this._instanceConstructor,
	        r = n.resolve;if (r === nt) {
	      var o = v(t);if (o === et && t._state !== ot) this._settledAt(t._state, e, t._result);else if ("function" != typeof o) this._remaining--, this._result[e] = t;else if (n === pt) {
	        var i = new n(p);w(i, t, o), this._willSettleAt(i, e);
	      } else this._willSettleAt(new n(function (e) {
	        e(t);
	      }), e);
	    } else this._willSettleAt(r(t), e);
	  }, N.prototype._settledAt = function (t, e, n) {
	    var r = this.promise;r._state === ot && (this._remaining--, t === st ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r, this._result);
	  }, N.prototype._willSettleAt = function (t, e) {
	    var n = this;E(t, void 0, function (t) {
	      n._settledAt(it, e, t);
	    }, function (t) {
	      n._settledAt(st, e, t);
	    });
	  };var dt = W,
	      vt = { Promise: pt, polyfill: dt }; true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return vt;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" != typeof module && module.exports ? module.exports = vt : "undefined" != typeof this && (this.ES6Promise = vt), dt();
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	// the whatwg-fetch polyfill installs the fetch() function
	// on the global object (window or self)
	//
	// Return that as the export for use in Webpack, Browserify etc.
	__webpack_require__(7);
	module.exports = self.fetch.bind(self);

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	(function (self) {
	  'use strict';

	  if (self.fetch) {
	    return;
	  }

	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name);
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name');
	    }
	    return name.toLowerCase();
	  }

	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value);
	    }
	    return value;
	  }

	  function Headers(headers) {
	    this.map = {};

	    if (headers instanceof Headers) {
	      headers.forEach(function (value, name) {
	        this.append(name, value);
	      }, this);
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function (name) {
	        this.append(name, headers[name]);
	      }, this);
	    }
	  }

	  Headers.prototype.append = function (name, value) {
	    name = normalizeName(name);
	    value = normalizeValue(value);
	    var list = this.map[name];
	    if (!list) {
	      list = [];
	      this.map[name] = list;
	    }
	    list.push(value);
	  };

	  Headers.prototype['delete'] = function (name) {
	    delete this.map[normalizeName(name)];
	  };

	  Headers.prototype.get = function (name) {
	    var values = this.map[normalizeName(name)];
	    return values ? values[0] : null;
	  };

	  Headers.prototype.getAll = function (name) {
	    return this.map[normalizeName(name)] || [];
	  };

	  Headers.prototype.has = function (name) {
	    return this.map.hasOwnProperty(normalizeName(name));
	  };

	  Headers.prototype.set = function (name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)];
	  };

	  Headers.prototype.forEach = function (callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function (name) {
	      this.map[name].forEach(function (value) {
	        callback.call(thisArg, value, name, this);
	      }, this);
	    }, this);
	  };

	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'));
	    }
	    body.bodyUsed = true;
	  }

	  function fileReaderReady(reader) {
	    return new Promise(function (resolve, reject) {
	      reader.onload = function () {
	        resolve(reader.result);
	      };
	      reader.onerror = function () {
	        reject(reader.error);
	      };
	    });
	  }

	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader();
	    reader.readAsArrayBuffer(blob);
	    return fileReaderReady(reader);
	  }

	  function readBlobAsText(blob) {
	    var reader = new FileReader();
	    reader.readAsText(blob);
	    return fileReaderReady(reader);
	  }

	  var support = {
	    blob: 'FileReader' in self && 'Blob' in self && function () {
	      try {
	        new Blob();
	        return true;
	      } catch (e) {
	        return false;
	      }
	    }(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  };

	  function Body() {
	    this.bodyUsed = false;

	    this._initBody = function (body) {
	      this._bodyInit = body;
	      if (typeof body === 'string') {
	        this._bodyText = body;
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body;
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body;
	      } else if (!body) {
	        this._bodyText = '';
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	          throw new Error('unsupported BodyInit type');
	        }

	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8');
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type);
	        }
	      }
	    };

	    if (support.blob) {
	      this.blob = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob');
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]));
	        }
	      };

	      this.arrayBuffer = function () {
	        return this.blob().then(readBlobAsArrayBuffer);
	      };

	      this.text = function () {
	        var rejected = consumed(this);
	        if (rejected) {
	          return rejected;
	        }

	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob);
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text');
	        } else {
	          return Promise.resolve(this._bodyText);
	        }
	      };
	    } else {
	      this.text = function () {
	        var rejected = consumed(this);
	        return rejected ? rejected : Promise.resolve(this._bodyText);
	      };
	    }

	    if (support.formData) {
	      this.formData = function () {
	        return this.text().then(decode);
	      };
	    }

	    this.json = function () {
	      return this.text().then(JSON.parse);
	    };

	    return this;
	  }

	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase();
	    return methods.indexOf(upcased) > -1 ? upcased : method;
	  }

	  function Request(input, options) {
	    options = options || {};
	    var body = options.body;
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read');
	      }
	      this.url = input.url;
	      this.credentials = input.credentials;
	      if (!options.headers) {
	        this.headers = new Headers(input.headers);
	      }
	      this.method = input.method;
	      this.mode = input.mode;
	      if (!body) {
	        body = input._bodyInit;
	        input.bodyUsed = true;
	      }
	    } else {
	      this.url = input;
	    }

	    this.credentials = options.credentials || this.credentials || 'omit';
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers);
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET');
	    this.mode = options.mode || this.mode || null;
	    this.referrer = null;

	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests');
	    }
	    this._initBody(body);
	  }

	  Request.prototype.clone = function () {
	    return new Request(this);
	  };

	  function decode(body) {
	    var form = new FormData();
	    body.trim().split('&').forEach(function (bytes) {
	      if (bytes) {
	        var split = bytes.split('=');
	        var name = split.shift().replace(/\+/g, ' ');
	        var value = split.join('=').replace(/\+/g, ' ');
	        form.append(decodeURIComponent(name), decodeURIComponent(value));
	      }
	    });
	    return form;
	  }

	  function headers(xhr) {
	    var head = new Headers();
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n');
	    pairs.forEach(function (header) {
	      var split = header.trim().split(':');
	      var key = split.shift().trim();
	      var value = split.join(':').trim();
	      head.append(key, value);
	    });
	    return head;
	  }

	  Body.call(Request.prototype);

	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {};
	    }

	    this.type = 'default';
	    this.status = options.status;
	    this.ok = this.status >= 200 && this.status < 300;
	    this.statusText = options.statusText;
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
	    this.url = options.url || '';
	    this._initBody(bodyInit);
	  }

	  Body.call(Response.prototype);

	  Response.prototype.clone = function () {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    });
	  };

	  Response.error = function () {
	    var response = new Response(null, { status: 0, statusText: '' });
	    response.type = 'error';
	    return response;
	  };

	  var redirectStatuses = [301, 302, 303, 307, 308];

	  Response.redirect = function (url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code');
	    }

	    return new Response(null, { status: status, headers: { location: url } });
	  };

	  self.Headers = Headers;
	  self.Request = Request;
	  self.Response = Response;

	  self.fetch = function (input, init) {
	    return new Promise(function (resolve, reject) {
	      var request;
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input;
	      } else {
	        request = new Request(input, init);
	      }

	      var xhr = new XMLHttpRequest();

	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL;
	        }

	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL');
	        }

	        return;
	      }

	      xhr.onload = function () {
	        var status = xhr.status === 1223 ? 204 : xhr.status;
	        if (status < 100 || status > 599) {
	          reject(new TypeError('Network request failed'));
	          return;
	        }
	        var options = {
	          status: status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        };
	        var body = 'response' in xhr ? xhr.response : xhr.responseText;
	        resolve(new Response(body, options));
	      };

	      xhr.onerror = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.ontimeout = function () {
	        reject(new TypeError('Network request failed'));
	      };

	      xhr.open(request.method, request.url, true);

	      if (request.credentials === 'include') {
	        xhr.withCredentials = true;
	      }

	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob';
	      }

	      request.headers.forEach(function (value, name) {
	        xhr.setRequestHeader(name, value);
	      });

	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
	    });
	  };
	  self.fetch.polyfill = true;
	})(typeof self !== 'undefined' ? self : undefined);

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var util = exports.util = {
	    querystring: {
	        parse: function parse(search) {
	            var o = {};
	            search.replace(/\?/g, '').split('&').map(function (pair) {
	                return o[pair.split('=')[0]] = pair.split('=')[1];
	            });
	            return o;
	        },
	        stringify: function stringify(o) {
	            return Object.keys(o).reduce(function (acc, curr) {
	                return acc + curr + '=' + o[curr] + '&';
	            }, '?').slice(0, -1);
	        }
	    },
	    values: function values(o) {
	        return Object.keys(o).map(function (k) {
	            return o[k];
	        });
	    },
	    object: function object(ks, vs) {
	        var o = {};
	        if (!Array.isArray(ks) || !Array.isArray(vs) || ks.length != vs.length) {
	            return o;
	        }
	        ks.forEach(function (k, index) {
	            o[k] = vs[index];
	        });
	        return o;
	    },
	    assign: function assign() {
	        var cloneSingleValue = function cloneSingleValue(t, s) {
	            var o = {};
	            for (var ps in s) {
	                o[ps] = s[ps];
	            }
	            for (var pt in t) {
	                o[pt] = t[pt];
	            }
	            return o;
	        };

	        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	            args[_key] = arguments[_key];
	        }

	        return args.reduceRight(function (acc, curr) {
	            if (acc) return cloneSingleValue(curr, acc);
	        }, {});
	    },
	    mixin: function mixin() {
	        var cloneSingleValue = function cloneSingleValue(t, s) {
	            for (var p in s) {
	                t[p] = s[p];
	            }
	            return t;
	        };

	        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	            args[_key2] = arguments[_key2];
	        }

	        return args.reduceRight(function (acc, curr) {
	            if (acc) return cloneSingleValue(curr, acc);
	        }, {});
	    },
	    nextTick: function () {
	        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
	        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

	        if (canSetImmediate) {
	            return function (f) {
	                return window.setImmediate(f);
	            };
	        }

	        if (canPost) {
	            var queue = [];
	            window.addEventListener('message', function (ev) {
	                var source = ev.source;
	                if ((source === window || source === null) && ev.data === 'process-tick') {
	                    ev.stopPropagation();
	                    if (queue.length > 0) {
	                        var fn = queue.shift();
	                        fn();
	                    }
	                }
	            }, true);

	            return function nextTick(fn) {
	                queue.push(fn);
	                window.postMessage('process-tick', '*');
	            };
	        }

	        return function nextTick(fn) {
	            setTimeout(fn, 0);
	        };
	    }()
	};

	if (!window._) {
	    window._ = util;
	}

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	;(function (a, b) {
	    var wx = b(a);
	    a.wx = a.jWeixin = wx;
	    module.exports = null;
	})(window, function (a, b) {
	    function c(b, c, d) {
	        a.WeixinJSBridge ? WeixinJSBridge.invoke(b, e(c), function (a) {
	            g(b, a, d);
	        }) : j(b, d);
	    }
	    function d(b, c, d) {
	        a.WeixinJSBridge ? WeixinJSBridge.on(b, function (a) {
	            d && d.trigger && d.trigger(a), g(b, a, c);
	        }) : d ? j(b, d) : j(b, c);
	    }
	    function e(a) {
	        return a = a || {}, a.appId = z.appId, a.verifyAppId = z.appId, a.verifySignType = 'sha1', a.verifyTimestamp = z.timestamp + '', a.verifyNonceStr = z.nonceStr, a.verifySignature = z.signature, a;
	    }
	    function f(a) {
	        return {
	            timeStamp: a.timestamp + '',
	            nonceStr: a.nonceStr,
	            'package': a.package,
	            paySign: a.paySign,
	            signType: a.signType || 'SHA1'
	        };
	    }
	    function g(a, b, c) {
	        var d, e, f;
	        switch (delete b.err_code, delete b.err_desc, delete b.err_detail, d = b.errMsg, d || (d = b.err_msg, delete b.err_msg, d = h(a, d, c), b.errMsg = d), c = c || {}, c._complete && (c._complete(b), delete c._complete), d = b.errMsg || '', z.debug && !c.isInnerInvoke && alert(JSON.stringify(b)), e = d.indexOf(':'), f = d.substring(e + 1)) {
	            case 'ok':
	                c.success && c.success(b);
	                break;
	            case 'cancel':
	                c.cancel && c.cancel(b);
	                break;
	            default:
	                c.fail && c.fail(b);
	        }
	        c.complete && c.complete(b);
	    }
	    function h(a, b) {
	        var d, e, f, g;
	        if (b) {
	            switch (d = b.indexOf(':'), a) {
	                case o.config:
	                    e = 'config';
	                    break;
	                case o.openProductSpecificView:
	                    e = 'openProductSpecificView';
	                    break;
	                default:
	                    e = b.substring(0, d), e = e.replace(/_/g, ' '), e = e.replace(/\b\w+\b/g, function (a) {
	                        return a.substring(0, 1).toUpperCase() + a.substring(1);
	                    }), e = e.substring(0, 1).toLowerCase() + e.substring(1), e = e.replace(/ /g, ''), -1 != e.indexOf('Wcpay') && (e = e.replace('Wcpay', 'WCPay')), f = p[e], f && (e = f);
	            }
	            g = b.substring(d + 1), 'confirm' == g && (g = 'ok'), 'failed' == g && (g = 'fail'), -1 != g.indexOf('failed_') && (g = g.substring(7)), -1 != g.indexOf('fail_') && (g = g.substring(5)), g = g.replace(/_/g, ' '), g = g.toLowerCase(), ('access denied' == g || 'no permission to execute' == g) && (g = 'permission denied'), 'config' == e && 'function not exist' == g && (g = 'ok'), b = e + ':' + g;
	        }
	        return b;
	    }
	    function i(a) {
	        var b, c, d, e;
	        if (a) {
	            for (b = 0, c = a.length; c > b; ++b) {
	                d = a[b], e = o[d], e && (a[b] = e);
	            }return a;
	        }
	    }
	    function j(a, b) {
	        if (z.debug && !b.isInnerInvoke) {
	            var c = p[a];
	            c && (a = c), b && b._complete && delete b._complete, console.log('"' + a + '",', b || '');
	        }
	    }
	    function k() {
	        if (!('6.0.2' > w || y.systemType < 0)) {
	            var b = new Image();
	            y.appId = z.appId, y.initTime = x.initEndTime - x.initStartTime, y.preVerifyTime = x.preVerifyEndTime - x.preVerifyStartTime, C.getNetworkType({
	                isInnerInvoke: !0,
	                success: function success(a) {
	                    y.networkType = a.networkType;
	                    var c = 'https://open.weixin.qq.com/sdk/report?v=' + y.version + '&o=' + y.isPreVerifyOk + '&s=' + y.systemType + '&c=' + y.clientVersion + '&a=' + y.appId + '&n=' + y.networkType + '&i=' + y.initTime + '&p=' + y.preVerifyTime + '&u=' + y.url;
	                    b.src = c;
	                }
	            });
	        }
	    }
	    function l() {
	        return new Date().getTime();
	    }
	    function m(b) {
	        t && (a.WeixinJSBridge ? b() : q.addEventListener && q.addEventListener('WeixinJSBridgeReady', b, !1));
	    }
	    function n() {
	        C.invoke || (C.invoke = function (b, c, d) {
	            a.WeixinJSBridge && WeixinJSBridge.invoke(b, e(c), d);
	        }, C.on = function (b, c) {
	            a.WeixinJSBridge && WeixinJSBridge.on(b, c);
	        });
	    }
	    var o, p, q, r, s, t, u, v, w, x, y, z, A, B, C;
	    if (!a.jWeixin) return o = {
	        config: 'preVerifyJSAPI',
	        onMenuShareTimeline: 'menu:share:timeline',
	        onMenuShareAppMessage: 'menu:share:appmessage',
	        onMenuShareQQ: 'menu:share:qq',
	        onMenuShareWeibo: 'menu:share:weiboApp',
	        previewImage: 'imagePreview',
	        getLocation: 'geoLocation',
	        openProductSpecificView: 'openProductViewWithPid',
	        addCard: 'batchAddCard',
	        openCard: 'batchViewCard',
	        chooseWXPay: 'getBrandWCPayRequest'
	    }, p = function () {
	        var b,
	            a = {};
	        for (b in o) {
	            a[o[b]] = b;
	        }return a;
	    }(), q = window.document, r = q.title, s = navigator.userAgent.toLowerCase(), t = -1 != s.indexOf('micromessenger'), u = -1 != s.indexOf('android'), v = -1 != s.indexOf('iphone') || -1 != s.indexOf('ipad'), w = function () {
	        var a = s.match(/micromessenger\/(\d+\.\d+\.\d+)/) || s.match(/micromessenger\/(\d+\.\d+)/);
	        return a ? a[1] : '';
	    }(), x = {
	        initStartTime: l(),
	        initEndTime: 0,
	        preVerifyStartTime: 0,
	        preVerifyEndTime: 0
	    }, y = {
	        version: 1,
	        appId: '',
	        initTime: 0,
	        preVerifyTime: 0,
	        networkType: '',
	        isPreVerifyOk: 1,
	        systemType: v ? 1 : u ? 2 : -1,
	        clientVersion: w,
	        url: encodeURIComponent(location.href)
	    }, z = {}, A = { _completes: [] }, B = {
	        state: 0,
	        res: {}
	    }, m(function () {
	        x.initEndTime = l();
	    }), C = {
	        config: function config(a) {
	            z = a, j('config', a);
	            var b = z.check === !1 ? !1 : !0;
	            m(function () {
	                var a, d, e;
	                if (b) c(o.config, { verifyJsApiList: i(z.jsApiList) }, function () {
	                    A._complete = function (a) {
	                        x.preVerifyEndTime = l(), B.state = 1, B.res = a;
	                    }, A.success = function () {
	                        y.isPreVerifyOk = 0;
	                    }, A.fail = function (a) {
	                        A._fail ? A._fail(a) : B.state = -1;
	                    };
	                    var a = A._completes;
	                    return a.push(function () {
	                        z.debug || k();
	                    }), A.complete = function () {
	                        for (var c = 0, d = a.length; d > c; ++c) {
	                            a[c]();
	                        }A._completes = [];
	                    }, A;
	                }()), x.preVerifyStartTime = l();else {
	                    for (B.state = 1, a = A._completes, d = 0, e = a.length; e > d; ++d) {
	                        a[d]();
	                    }A._completes = [];
	                }
	            }), z.beta && n();
	        },
	        ready: function ready(a) {
	            0 != B.state ? a() : (A._completes.push(a), !t && z.debug && a());
	        },
	        error: function error(a) {
	            '6.0.2' > w || (-1 == B.state ? a(B.res) : A._fail = a);
	        },
	        checkJsApi: function checkJsApi(a) {
	            var b = function b(a) {
	                var c,
	                    d,
	                    b = a.checkResult;
	                for (c in b) {
	                    d = p[c], d && (b[d] = b[c], delete b[c]);
	                }return a;
	            };
	            c('checkJsApi', { jsApiList: i(a.jsApiList) }, function () {
	                return a._complete = function (a) {
	                    if (u) {
	                        var c = a.checkResult;
	                        c && (a.checkResult = JSON.parse(c));
	                    }
	                    a = b(a);
	                }, a;
	            }());
	        },
	        onMenuShareTimeline: function onMenuShareTimeline(a) {
	            d(o.onMenuShareTimeline, {
	                complete: function complete() {
	                    c('shareTimeline', {
	                        title: a.title || r,
	                        desc: a.title || r,
	                        img_url: a.imgUrl,
	                        link: a.link || location.href
	                    }, a);
	                }
	            }, a);
	        },
	        onMenuShareAppMessage: function onMenuShareAppMessage(a) {
	            d(o.onMenuShareAppMessage, {
	                complete: function complete() {
	                    c('sendAppMessage', {
	                        title: a.title || r,
	                        desc: a.desc || '',
	                        link: a.link || location.href,
	                        img_url: a.imgUrl,
	                        type: a.type || 'link',
	                        data_url: a.dataUrl || ''
	                    }, a);
	                }
	            }, a);
	        },
	        onMenuShareQQ: function onMenuShareQQ(a) {
	            d(o.onMenuShareQQ, {
	                complete: function complete() {
	                    c('shareQQ', {
	                        title: a.title || r,
	                        desc: a.desc || '',
	                        img_url: a.imgUrl,
	                        link: a.link || location.href
	                    }, a);
	                }
	            }, a);
	        },
	        onMenuShareWeibo: function onMenuShareWeibo(a) {
	            d(o.onMenuShareWeibo, {
	                complete: function complete() {
	                    c('shareWeiboApp', {
	                        title: a.title || r,
	                        desc: a.desc || '',
	                        img_url: a.imgUrl,
	                        link: a.link || location.href
	                    }, a);
	                }
	            }, a);
	        },
	        startRecord: function startRecord(a) {
	            c('startRecord', {}, a);
	        },
	        stopRecord: function stopRecord(a) {
	            c('stopRecord', {}, a);
	        },
	        onVoiceRecordEnd: function onVoiceRecordEnd(a) {
	            d('onVoiceRecordEnd', a);
	        },
	        playVoice: function playVoice(a) {
	            c('playVoice', { localId: a.localId }, a);
	        },
	        pauseVoice: function pauseVoice(a) {
	            c('pauseVoice', { localId: a.localId }, a);
	        },
	        stopVoice: function stopVoice(a) {
	            c('stopVoice', { localId: a.localId }, a);
	        },
	        onVoicePlayEnd: function onVoicePlayEnd(a) {
	            d('onVoicePlayEnd', a);
	        },
	        uploadVoice: function uploadVoice(a) {
	            c('uploadVoice', {
	                localId: a.localId,
	                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
	            }, a);
	        },
	        downloadVoice: function downloadVoice(a) {
	            c('downloadVoice', {
	                serverId: a.serverId,
	                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
	            }, a);
	        },
	        translateVoice: function translateVoice(a) {
	            c('translateVoice', {
	                localId: a.localId,
	                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
	            }, a);
	        },
	        chooseImage: function chooseImage(a) {
	            c('chooseImage', {
	                scene: '1|2',
	                count: a.count || 9,
	                sizeType: a.sizeType || ['original', 'compressed']
	            }, function () {
	                return a._complete = function (a) {
	                    if (u) {
	                        var b = a.localIds;
	                        b && (a.localIds = JSON.parse(b));
	                    }
	                }, a;
	            }());
	        },
	        previewImage: function previewImage(a) {
	            c(o.previewImage, {
	                current: a.current,
	                urls: a.urls
	            }, a);
	        },
	        uploadImage: function uploadImage(a) {
	            c('uploadImage', {
	                localId: a.localId,
	                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
	            }, a);
	        },
	        downloadImage: function downloadImage(a) {
	            c('downloadImage', {
	                serverId: a.serverId,
	                isShowProgressTips: 0 == a.isShowProgressTips ? 0 : 1
	            }, a);
	        },
	        getNetworkType: function getNetworkType(a) {
	            var b = function b(a) {
	                var c,
	                    d,
	                    e,
	                    b = a.errMsg;
	                if (a.errMsg = 'getNetworkType:ok', c = a.subtype, delete a.subtype, c) a.networkType = c;else switch (d = b.indexOf(':'), e = b.substring(d + 1)) {
	                    case 'wifi':
	                    case 'edge':
	                    case 'wwan':
	                        a.networkType = e;
	                        break;
	                    default:
	                        a.errMsg = 'getNetworkType:fail';
	                }
	                return a;
	            };
	            c('getNetworkType', {}, function () {
	                return a._complete = function (a) {
	                    a = b(a);
	                }, a;
	            }());
	        },
	        openLocation: function openLocation(a) {
	            c('openLocation', {
	                latitude: a.latitude,
	                longitude: a.longitude,
	                name: a.name || '',
	                address: a.address || '',
	                scale: a.scale || 28,
	                infoUrl: a.infoUrl || ''
	            }, a);
	        },
	        getLocation: function getLocation(a) {
	            a = a || {}, c(o.getLocation, { type: a.type || 'wgs84' }, function () {
	                return a._complete = function (a) {
	                    delete a.type;
	                }, a;
	            }());
	        },
	        hideOptionMenu: function hideOptionMenu(a) {
	            c('hideOptionMenu', {}, a);
	        },
	        showOptionMenu: function showOptionMenu(a) {
	            c('showOptionMenu', {}, a);
	        },
	        closeWindow: function closeWindow(a) {
	            a = a || {}, c('closeWindow', { immediate_close: a.immediateClose || 0 }, a);
	        },
	        hideMenuItems: function hideMenuItems(a) {
	            c('hideMenuItems', { menuList: a.menuList }, a);
	        },
	        showMenuItems: function showMenuItems(a) {
	            c('showMenuItems', { menuList: a.menuList }, a);
	        },
	        hideAllNonBaseMenuItem: function hideAllNonBaseMenuItem(a) {
	            c('hideAllNonBaseMenuItem', {}, a);
	        },
	        showAllNonBaseMenuItem: function showAllNonBaseMenuItem(a) {
	            c('showAllNonBaseMenuItem', {}, a);
	        },
	        scanQRCode: function scanQRCode(a) {
	            a = a || {}, c('scanQRCode', {
	                needResult: a.needResult || 0,
	                scanType: a.scanType || ['qrCode', 'barCode']
	            }, function () {
	                return a._complete = function (a) {
	                    var b, c;
	                    v && (b = a.resultStr, b && (c = JSON.parse(b), a.resultStr = c && c.scan_code && c.scan_code.scan_result));
	                }, a;
	            }());
	        },
	        openProductSpecificView: function openProductSpecificView(a) {
	            c(o.openProductSpecificView, {
	                pid: a.productId,
	                view_type: a.viewType || 0
	            }, a);
	        },
	        addCard: function addCard(a) {
	            var e,
	                f,
	                g,
	                h,
	                b = a.cardList,
	                d = [];
	            for (e = 0, f = b.length; f > e; ++e) {
	                g = b[e], h = {
	                    card_id: g.cardId,
	                    card_ext: g.cardExt
	                }, d.push(h);
	            }c(o.addCard, { card_list: d }, function () {
	                return a._complete = function (a) {
	                    var c,
	                        d,
	                        e,
	                        b = a.card_list;
	                    if (b) {
	                        for (b = JSON.parse(b), c = 0, d = b.length; d > c; ++c) {
	                            e = b[c], e.cardId = e.card_id, e.cardExt = e.card_ext, e.isSuccess = e.is_succ ? !0 : !1, delete e.card_id, delete e.card_ext, delete e.is_succ;
	                        }a.cardList = b, delete a.card_list;
	                    }
	                }, a;
	            }());
	        },
	        chooseCard: function chooseCard(a) {
	            c('chooseCard', {
	                app_id: z.appId,
	                location_id: a.shopId || '',
	                sign_type: a.signType || 'SHA1',
	                card_id: a.cardId || '',
	                card_type: a.cardType || '',
	                card_sign: a.cardSign,
	                time_stamp: a.timestamp + '',
	                nonce_str: a.nonceStr
	            }, function () {
	                return a._complete = function (a) {
	                    a.cardList = a.choose_card_info, delete a.choose_card_info;
	                }, a;
	            }());
	        },
	        openCard: function openCard(a) {
	            var e,
	                f,
	                g,
	                h,
	                b = a.cardList,
	                d = [];
	            for (e = 0, f = b.length; f > e; ++e) {
	                g = b[e], h = {
	                    card_id: g.cardId,
	                    code: g.code
	                }, d.push(h);
	            }c(o.openCard, { card_list: d }, a);
	        },
	        chooseWXPay: function chooseWXPay(a) {
	            c(o.chooseWXPay, f(a), a);
	        }
	    }, b && (a.wx = a.jWeixin = C), C;
	});

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var nextTodoId = 0;
	var addTodo = exports.addTodo = function addTodo(text) {
	  return function (dispatch) {
	    return new Promise(function (resolve) {
	      setTimeout(function () {
	        resolve({
	          type: 'ADD_TODO',
	          id: nextTodoId++,
	          text: text
	        });
	      }, 2000);
	    }).then(function (data) {
	      dispatch(data);
	    });
	  };
	  //return {
	  //  type: 'ADD_TODO',
	  //  id: nextTodoId++,
	  //  text
	  //}
	};

	var setVisibilityFilter = exports.setVisibilityFilter = function setVisibilityFilter(filter) {
	  return {
	    type: 'SET_VISIBILITY_FILTER',
	    filter: filter
	  };
	};

	var toggleTodo = exports.toggleTodo = function toggleTodo(id) {
	  return {
	    type: 'TOGGLE_TODO',
	    id: id
	  };
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = redux_mixin;
	function redux_mixin(store) {
	    return {
	        init: function init() {
	            this.store = store;
	        },
	        dispatch: function dispatch(action) {
	            return store.dispatch(action);
	        },
	        dispatchify: function dispatchify(actions) {
	            var keys = Object.keys(actions);
	            for (var idx in keys) {
	                var key = keys[idx];
	                var action = actions[key];

	                this[key] = function (action) {
	                    var isFunction = typeof action === 'function';
	                    return function () {
	                        var obj = isFunction ? action.apply(this, arguments) : action;
	                        return store.dispatch(obj);
	                    };
	                }(action);
	            }
	        },
	        subscribe: function subscribe(selector, callback) {
	            if (!callback) {
	                callback = this.update;
	            }
	            var self = this;
	            this.preProps = {};

	            var changed = function changed(props) {
	                return props !== self.preProps;
	            };

	            function compute() {
	                var props = selector(store.getState());
	                if (changed(props)) {
	                    self.preProps = props;
	                    callback(props);
	                }
	            }

	            var unsubscribe = store.subscribe(compute);
	            this.on('unmount', unsubscribe);
	            compute();
	            return unsubscribe;
	        }
	    };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = configureStore;

	var _redux = __webpack_require__(13);

	var _reduxThunk = __webpack_require__(26);

	var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

	var _reduxLogger = __webpack_require__(27);

	var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

	var _reducers = __webpack_require__(28);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function configureStore(initialState) {
	    var store = (0, _redux.createStore)(_reducers2.default, initialState, (0, _redux.applyMiddleware)(_reduxThunk2.default, (0, _reduxLogger2.default)()));

	    if (false) {
	        // Enable Webpack hot module replacement for reducers
	        module.hot.accept('../reducers', function () {
	            var nextRootReducer = require('../reducers').default;
	            store.replaceReducer(nextRootReducer);
	        });
	    }

	    return store;
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

	var _createStore = __webpack_require__(14);

	var _createStore2 = _interopRequireDefault(_createStore);

	var _combineReducers = __webpack_require__(21);

	var _combineReducers2 = _interopRequireDefault(_combineReducers);

	var _bindActionCreators = __webpack_require__(23);

	var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

	var _applyMiddleware = __webpack_require__(24);

	var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

	var _compose = __webpack_require__(25);

	var _compose2 = _interopRequireDefault(_compose);

	var _warning = __webpack_require__(22);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	/*
	* This is a dummy function to check if the function name has been altered by minification.
	* If the function has been minified and NODE_ENV !== 'production', warn the user.
	*/
	function isCrushed() {}

	if (false) {
	  (0, _warning2["default"])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	exports.createStore = _createStore2["default"];
	exports.combineReducers = _combineReducers2["default"];
	exports.bindActionCreators = _bindActionCreators2["default"];
	exports.applyMiddleware = _applyMiddleware2["default"];
	exports.compose = _compose2["default"];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;
	exports.ActionTypes = undefined;
	exports["default"] = createStore;

	var _isPlainObject = __webpack_require__(15);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _symbolObservable = __webpack_require__(19);

	var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = exports.ActionTypes = {
	  INIT: '@@redux/INIT'
	};

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [initialState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} enhancer The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, initialState, enhancer) {
	  var _ref2;

	  if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = initialState;
	    initialState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, initialState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = initialState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected listener to be a function.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!(0, _isPlainObject2["default"])(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      listeners[i]();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.INIT });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/zenparsing/es-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */

	      subscribe: function subscribe(observer) {
	        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object') {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[_symbolObservable2["default"]] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[_symbolObservable2["default"]] = observable, _ref2;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getPrototype = __webpack_require__(16),
	    isHostObject = __webpack_require__(17),
	    isObjectLike = __webpack_require__(18);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to infer the `Object` constructor. */
	var objectCtorString = funcToString.call(Object);

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.8.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object,
	 *  else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	function isPlainObject(value) {
	  if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
	    return false;
	  }
	  var proto = getPrototype(value);
	  if (proto === null) {
	    return true;
	  }
	  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
	  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
	}

	module.exports = isPlainObject;

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetPrototype = Object.getPrototypeOf;

	/**
	 * Gets the `[[Prototype]]` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {null|Object} Returns the `[[Prototype]]`.
	 */
	function getPrototype(value) {
	  return nativeGetPrototype(Object(value));
	}

	module.exports = getPrototype;

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	module.exports = __webpack_require__(20)(global || window || undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function symbolObservablePonyfill(root) {
		var result;
		var _Symbol = root.Symbol;

		if (typeof _Symbol === 'function') {
			if (_Symbol.observable) {
				result = _Symbol.observable;
			} else {
				result = _Symbol('observable');
				_Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = combineReducers;

	var _createStore = __webpack_require__(14);

	var _isPlainObject = __webpack_require__(15);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var _warning = __webpack_require__(22);

	var _warning2 = _interopRequireDefault(_warning);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	function getUndefinedStateErrorMessage(key, action) {
	  var actionType = action && action.type;
	  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

	  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
	}

	function getUnexpectedStateShapeWarningMessage(inputState, reducers, action) {
	  var reducerKeys = Object.keys(reducers);
	  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'initialState argument passed to createStore' : 'previous state received by the reducer';

	  if (reducerKeys.length === 0) {
	    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
	  }

	  if (!(0, _isPlainObject2["default"])(inputState)) {
	    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
	  }

	  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
	    return !reducers.hasOwnProperty(key);
	  });

	  if (unexpectedKeys.length > 0) {
	    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
	  }
	}

	function assertReducerSanity(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

	    if (typeof initialState === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
	    }

	    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
	    if (typeof reducer(undefined, { type: type }) === 'undefined') {
	      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
	    }
	  });
	}

	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */
	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};
	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];
	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }
	  var finalReducerKeys = Object.keys(finalReducers);

	  var sanityError;
	  try {
	    assertReducerSanity(finalReducers);
	  } catch (e) {
	    sanityError = e;
	  }

	  return function combination() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    if (sanityError) {
	      throw sanityError;
	    }

	    if (false) {
	      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action);
	      if (warningMessage) {
	        (0, _warning2["default"])(warningMessage);
	      }
	    }

	    var hasChanged = false;
	    var nextState = {};
	    for (var i = 0; i < finalReducerKeys.length; i++) {
	      var key = finalReducerKeys[i];
	      var reducer = finalReducers[key];
	      var previousStateForKey = state[key];
	      var nextStateForKey = reducer(previousStateForKey, action);
	      if (typeof nextStateForKey === 'undefined') {
	        var errorMessage = getUndefinedStateErrorMessage(key, action);
	        throw new Error(errorMessage);
	      }
	      nextState[key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }
	    return hasChanged ? nextState : state;
	  };
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports["default"] = warning;
	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	    /* eslint-disable no-empty */
	  } catch (e) {}
	  /* eslint-enable no-empty */
	}

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;
	exports["default"] = bindActionCreators;
	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(undefined, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }return target;
	};

	exports["default"] = applyMiddleware;

	var _compose = __webpack_require__(25);

	var _compose2 = _interopRequireDefault(_compose);

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { "default": obj };
	}

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function (reducer, initialState, enhancer) {
	      var store = createStore(reducer, initialState, enhancer);
	      var _dispatch = store.dispatch;
	      var chain = [];

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch(action) {
	          return _dispatch(action);
	        }
	      };
	      chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = _compose2["default"].apply(undefined, chain)(store.dispatch);

	      return _extends({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

/***/ },
/* 25 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	exports.__esModule = true;
	exports["default"] = compose;
	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  } else {
	    var _ret = function () {
	      var last = funcs[funcs.length - 1];
	      var rest = funcs.slice(0, -1);
	      return {
	        v: function v() {
	          return rest.reduceRight(function (composed, f) {
	            return f(composed);
	          }, last.apply(undefined, arguments));
	        }
	      };
	    }();

	    if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	  }
	}

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	function createThunkMiddleware(extraArgument) {
	  return function (_ref) {
	    var dispatch = _ref.dispatch;
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        if (typeof action === 'function') {
	          return action(dispatch, getState, extraArgument);
	        }

	        return next(action);
	      };
	    };
	  };
	}

	var thunk = createThunkMiddleware();
	thunk.withExtraArgument = createThunkMiddleware;

	exports['default'] = thunk;

/***/ },
/* 27 */
/***/ function(module, exports) {

	"use strict";

	var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	}

	function _typeof(obj) {
	  return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
	}

	var repeat = function repeat(str, times) {
	  return new Array(times + 1).join(str);
	};
	var pad = function pad(num, maxLength) {
	  return repeat("0", maxLength - num.toString().length) + num;
	};
	var formatTime = function formatTime(time) {
	  return "@ " + pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
	};

	// Use the new performance api to get better precision if available
	var timer = typeof performance !== "undefined" && typeof performance.now === "function" ? performance : Date;

	/**
	 * parse the level option of createLogger
	 *
	 * @property {string | function | object} level - console[level]
	 * @property {object} action
	 * @property {array} payload
	 * @property {string} type
	 */

	function getLogLevel(level, action, payload, type) {
	  switch (typeof level === "undefined" ? "undefined" : _typeof(level)) {
	    case "object":
	      return typeof level[type] === "function" ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
	    case "function":
	      return level(action);
	    default:
	      return level;
	  }
	}

	/**
	 * Creates logger with followed options
	 *
	 * @namespace
	 * @property {object} options - options for logger
	 * @property {string | function | object} options.level - console[level]
	 * @property {boolean} options.duration - print duration of each action?
	 * @property {boolean} options.timestamp - print timestamp with each action?
	 * @property {object} options.colors - custom colors
	 * @property {object} options.logger - implementation of the `console` API
	 * @property {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
	 * @property {boolean} options.collapsed - is group collapsed?
	 * @property {boolean} options.predicate - condition which resolves logger behavior
	 * @property {function} options.stateTransformer - transform state before print
	 * @property {function} options.actionTransformer - transform action before print
	 * @property {function} options.errorTransformer - transform error before print
	 */

	function createLogger() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var _options$level = options.level;
	  var level = _options$level === undefined ? "log" : _options$level;
	  var _options$logger = options.logger;
	  var logger = _options$logger === undefined ? console : _options$logger;
	  var _options$logErrors = options.logErrors;
	  var logErrors = _options$logErrors === undefined ? true : _options$logErrors;
	  var collapsed = options.collapsed;
	  var predicate = options.predicate;
	  var _options$duration = options.duration;
	  var duration = _options$duration === undefined ? false : _options$duration;
	  var _options$timestamp = options.timestamp;
	  var timestamp = _options$timestamp === undefined ? true : _options$timestamp;
	  var transformer = options.transformer;
	  var _options$stateTransfo = options.stateTransformer;
	  var // deprecated
	  stateTransformer = _options$stateTransfo === undefined ? function (state) {
	    return state;
	  } : _options$stateTransfo;
	  var _options$actionTransf = options.actionTransformer;
	  var actionTransformer = _options$actionTransf === undefined ? function (actn) {
	    return actn;
	  } : _options$actionTransf;
	  var _options$errorTransfo = options.errorTransformer;
	  var errorTransformer = _options$errorTransfo === undefined ? function (error) {
	    return error;
	  } : _options$errorTransfo;
	  var _options$colors = options.colors;
	  var colors = _options$colors === undefined ? {
	    title: function title() {
	      return "#000000";
	    },
	    prevState: function prevState() {
	      return "#9E9E9E";
	    },
	    action: function action() {
	      return "#03A9F4";
	    },
	    nextState: function nextState() {
	      return "#4CAF50";
	    },
	    error: function error() {
	      return "#F20404";
	    }
	  } : _options$colors;

	  // exit if console undefined

	  if (typeof logger === "undefined") {
	    return function () {
	      return function (next) {
	        return function (action) {
	          return next(action);
	        };
	      };
	    };
	  }

	  if (transformer) {
	    console.error("Option 'transformer' is deprecated, use stateTransformer instead");
	  }

	  var logBuffer = [];
	  function printBuffer() {
	    logBuffer.forEach(function (logEntry, key) {
	      var started = logEntry.started;
	      var startedTime = logEntry.startedTime;
	      var action = logEntry.action;
	      var prevState = logEntry.prevState;
	      var error = logEntry.error;
	      var took = logEntry.took;
	      var nextState = logEntry.nextState;

	      var nextEntry = logBuffer[key + 1];
	      if (nextEntry) {
	        nextState = nextEntry.prevState;
	        took = nextEntry.started - started;
	      }
	      // message
	      var formattedAction = actionTransformer(action);
	      var isCollapsed = typeof collapsed === "function" ? collapsed(function () {
	        return nextState;
	      }, action) : collapsed;

	      var formattedTime = formatTime(startedTime);
	      var titleCSS = colors.title ? "color: " + colors.title(formattedAction) + ";" : null;
	      var title = "action " + (timestamp ? formattedTime : "") + " " + formattedAction.type + " " + (duration ? "(in " + took.toFixed(2) + " ms)" : "");

	      // render
	      try {
	        if (isCollapsed) {
	          if (colors.title) logger.groupCollapsed("%c " + title, titleCSS);else logger.groupCollapsed(title);
	        } else {
	          if (colors.title) logger.group("%c " + title, titleCSS);else logger.group(title);
	        }
	      } catch (e) {
	        logger.log(title);
	      }

	      var prevStateLevel = getLogLevel(level, formattedAction, [prevState], "prevState");
	      var actionLevel = getLogLevel(level, formattedAction, [formattedAction], "action");
	      var errorLevel = getLogLevel(level, formattedAction, [error, prevState], "error");
	      var nextStateLevel = getLogLevel(level, formattedAction, [nextState], "nextState");

	      if (prevStateLevel) {
	        if (colors.prevState) logger[prevStateLevel]("%c prev state", "color: " + colors.prevState(prevState) + "; font-weight: bold", prevState);else logger[prevStateLevel]("prev state", prevState);
	      }

	      if (actionLevel) {
	        if (colors.action) logger[actionLevel]("%c action", "color: " + colors.action(formattedAction) + "; font-weight: bold", formattedAction);else logger[actionLevel]("action", formattedAction);
	      }

	      if (error && errorLevel) {
	        if (colors.error) logger[errorLevel]("%c error", "color: " + colors.error(error, prevState) + "; font-weight: bold", error);else logger[errorLevel]("error", error);
	      }

	      if (nextStateLevel) {
	        if (colors.nextState) logger[nextStateLevel]("%c next state", "color: " + colors.nextState(nextState) + "; font-weight: bold", nextState);else logger[nextStateLevel]("next state", nextState);
	      }

	      try {
	        logger.groupEnd();
	      } catch (e) {
	        logger.log("—— log end ——");
	      }
	    });
	    logBuffer.length = 0;
	  }

	  return function (_ref) {
	    var getState = _ref.getState;
	    return function (next) {
	      return function (action) {
	        // exit early if predicate function returns false
	        if (typeof predicate === "function" && !predicate(getState, action)) {
	          return next(action);
	        }

	        var logEntry = {};
	        logBuffer.push(logEntry);

	        logEntry.started = timer.now();
	        logEntry.startedTime = new Date();
	        logEntry.prevState = stateTransformer(getState());
	        logEntry.action = action;

	        var returnedValue = undefined;
	        if (logErrors) {
	          try {
	            returnedValue = next(action);
	          } catch (e) {
	            logEntry.error = errorTransformer(e);
	          }
	        } else {
	          returnedValue = next(action);
	        }

	        logEntry.took = timer.now() - logEntry.started;
	        logEntry.nextState = stateTransformer(getState());

	        printBuffer();

	        if (logEntry.error) throw logEntry.error;
	        return returnedValue;
	      };
	    };
	  };
	}

	module.exports = createLogger;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(13);

	var _todos = __webpack_require__(29);

	var _todos2 = _interopRequireDefault(_todos);

	var _visibilityFilter = __webpack_require__(31);

	var _visibilityFilter2 = _interopRequireDefault(_visibilityFilter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var todoApp = (0, _redux.combineReducers)({
	  todos: _todos2.default,
	  visibilityFilter: _visibilityFilter2.default
	});

	exports.default = todoApp;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _immutable = __webpack_require__(30);

	// const todo = (state, action) => {
	//   switch (action.type) {
	//     case 'ADD_TODO':
	//       return {
	//         id: action.id,
	//         text: action.text,
	//         completed: false
	//       }
	//     case 'TOGGLE_TODO':
	//       if (state.id !== action.id) {
	//         return state
	//       }

	//       return Object.assign({}, state, {
	//         completed: !state.completed
	//       })
	//     default:
	//       return state
	//   }
	// }

	var todos = function todos() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? (0, _immutable.List)() : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'ADD_TODO':
	      return state.push((0, _immutable.Map)({
	        id: action.id,
	        text: action.text,
	        completed: false
	      }));
	    case 'TOGGLE_TODO':
	      return state.map(function (todo) {
	        if (todo.get('id') === action.id) {
	          return todo.update('completed', function (v) {
	            return !v;
	          });
	        }
	        return todo;
	      });
	    default:
	      return state;
	  }
	};

	exports.default = todos;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/**
	 *  Copyright (c) 2014-2015, Facebook, Inc.
	 *  All rights reserved.
	 *
	 *  This source code is licensed under the BSD-style license found in the
	 *  LICENSE file in the root directory of this source tree. An additional grant
	 *  of patent rights can be found in the PATENTS file in the same directory.
	 */

	(function (global, factory) {
	  ( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : global.Immutable = factory();
	})(undefined, function () {
	  'use strict';
	  var SLICE$0 = Array.prototype.slice;

	  function createClass(ctor, superClass) {
	    if (superClass) {
	      ctor.prototype = Object.create(superClass.prototype);
	    }
	    ctor.prototype.constructor = ctor;
	  }

	  function Iterable(value) {
	    return isIterable(value) ? value : Seq(value);
	  }

	  createClass(KeyedIterable, Iterable);
	  function KeyedIterable(value) {
	    return isKeyed(value) ? value : KeyedSeq(value);
	  }

	  createClass(IndexedIterable, Iterable);
	  function IndexedIterable(value) {
	    return isIndexed(value) ? value : IndexedSeq(value);
	  }

	  createClass(SetIterable, Iterable);
	  function SetIterable(value) {
	    return isIterable(value) && !isAssociative(value) ? value : SetSeq(value);
	  }

	  function isIterable(maybeIterable) {
	    return !!(maybeIterable && maybeIterable[IS_ITERABLE_SENTINEL]);
	  }

	  function isKeyed(maybeKeyed) {
	    return !!(maybeKeyed && maybeKeyed[IS_KEYED_SENTINEL]);
	  }

	  function isIndexed(maybeIndexed) {
	    return !!(maybeIndexed && maybeIndexed[IS_INDEXED_SENTINEL]);
	  }

	  function isAssociative(maybeAssociative) {
	    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
	  }

	  function isOrdered(maybeOrdered) {
	    return !!(maybeOrdered && maybeOrdered[IS_ORDERED_SENTINEL]);
	  }

	  Iterable.isIterable = isIterable;
	  Iterable.isKeyed = isKeyed;
	  Iterable.isIndexed = isIndexed;
	  Iterable.isAssociative = isAssociative;
	  Iterable.isOrdered = isOrdered;

	  Iterable.Keyed = KeyedIterable;
	  Iterable.Indexed = IndexedIterable;
	  Iterable.Set = SetIterable;

	  var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  // Used for setting prototype methods that IE8 chokes on.
	  var DELETE = 'delete';

	  // Constants describing the size of trie nodes.
	  var SHIFT = 5; // Resulted in best performance after ______?
	  var SIZE = 1 << SHIFT;
	  var MASK = SIZE - 1;

	  // A consistent shared value representing "not set" which equals nothing other
	  // than itself, and nothing that could be provided externally.
	  var NOT_SET = {};

	  // Boolean references, Rough equivalent of `bool &`.
	  var CHANGE_LENGTH = { value: false };
	  var DID_ALTER = { value: false };

	  function MakeRef(ref) {
	    ref.value = false;
	    return ref;
	  }

	  function SetRef(ref) {
	    ref && (ref.value = true);
	  }

	  // A function which returns a value representing an "owner" for transient writes
	  // to tries. The return value will only ever equal itself, and will not equal
	  // the return of any subsequent call of this function.
	  function OwnerID() {}

	  // http://jsperf.com/copy-array-inline
	  function arrCopy(arr, offset) {
	    offset = offset || 0;
	    var len = Math.max(0, arr.length - offset);
	    var newArr = new Array(len);
	    for (var ii = 0; ii < len; ii++) {
	      newArr[ii] = arr[ii + offset];
	    }
	    return newArr;
	  }

	  function ensureSize(iter) {
	    if (iter.size === undefined) {
	      iter.size = iter.__iterate(returnTrue);
	    }
	    return iter.size;
	  }

	  function wrapIndex(iter, index) {
	    // This implements "is array index" which the ECMAString spec defines as:
	    //
	    //     A String property name P is an array index if and only if
	    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
	    //     to 2^32−1.
	    //
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
	    if (typeof index !== 'number') {
	      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
	      if ('' + uint32Index !== index || uint32Index === 4294967295) {
	        return NaN;
	      }
	      index = uint32Index;
	    }
	    return index < 0 ? ensureSize(iter) + index : index;
	  }

	  function returnTrue() {
	    return true;
	  }

	  function wholeSlice(begin, end, size) {
	    return (begin === 0 || size !== undefined && begin <= -size) && (end === undefined || size !== undefined && end >= size);
	  }

	  function resolveBegin(begin, size) {
	    return resolveIndex(begin, size, 0);
	  }

	  function resolveEnd(end, size) {
	    return resolveIndex(end, size, size);
	  }

	  function resolveIndex(index, size, defaultIndex) {
	    return index === undefined ? defaultIndex : index < 0 ? Math.max(0, size + index) : size === undefined ? index : Math.min(size, index);
	  }

	  /* global Symbol */

	  var ITERATE_KEYS = 0;
	  var ITERATE_VALUES = 1;
	  var ITERATE_ENTRIES = 2;

	  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator';

	  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

	  function Iterator(next) {
	    this.next = next;
	  }

	  Iterator.prototype.toString = function () {
	    return '[Iterator]';
	  };

	  Iterator.KEYS = ITERATE_KEYS;
	  Iterator.VALUES = ITERATE_VALUES;
	  Iterator.ENTRIES = ITERATE_ENTRIES;

	  Iterator.prototype.inspect = Iterator.prototype.toSource = function () {
	    return this.toString();
	  };
	  Iterator.prototype[ITERATOR_SYMBOL] = function () {
	    return this;
	  };

	  function iteratorValue(type, k, v, iteratorResult) {
	    var value = type === 0 ? k : type === 1 ? v : [k, v];
	    iteratorResult ? iteratorResult.value = value : iteratorResult = {
	      value: value, done: false
	    };
	    return iteratorResult;
	  }

	  function iteratorDone() {
	    return { value: undefined, done: true };
	  }

	  function hasIterator(maybeIterable) {
	    return !!getIteratorFn(maybeIterable);
	  }

	  function isIterator(maybeIterator) {
	    return maybeIterator && typeof maybeIterator.next === 'function';
	  }

	  function getIterator(iterable) {
	    var iteratorFn = getIteratorFn(iterable);
	    return iteratorFn && iteratorFn.call(iterable);
	  }

	  function getIteratorFn(iterable) {
	    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  function isArrayLike(value) {
	    return value && typeof value.length === 'number';
	  }

	  createClass(Seq, Iterable);
	  function Seq(value) {
	    return value === null || value === undefined ? emptySequence() : isIterable(value) ? value.toSeq() : seqFromValue(value);
	  }

	  Seq.of = function () /*...values*/{
	    return Seq(arguments);
	  };

	  Seq.prototype.toSeq = function () {
	    return this;
	  };

	  Seq.prototype.toString = function () {
	    return this.__toString('Seq {', '}');
	  };

	  Seq.prototype.cacheResult = function () {
	    if (!this._cache && this.__iterateUncached) {
	      this._cache = this.entrySeq().toArray();
	      this.size = this._cache.length;
	    }
	    return this;
	  };

	  // abstract __iterateUncached(fn, reverse)

	  Seq.prototype.__iterate = function (fn, reverse) {
	    return seqIterate(this, fn, reverse, true);
	  };

	  // abstract __iteratorUncached(type, reverse)

	  Seq.prototype.__iterator = function (type, reverse) {
	    return seqIterator(this, type, reverse, true);
	  };

	  createClass(KeyedSeq, Seq);
	  function KeyedSeq(value) {
	    return value === null || value === undefined ? emptySequence().toKeyedSeq() : isIterable(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : keyedSeqFromValue(value);
	  }

	  KeyedSeq.prototype.toKeyedSeq = function () {
	    return this;
	  };

	  createClass(IndexedSeq, Seq);
	  function IndexedSeq(value) {
	    return value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value.toIndexedSeq();
	  }

	  IndexedSeq.of = function () /*...values*/{
	    return IndexedSeq(arguments);
	  };

	  IndexedSeq.prototype.toIndexedSeq = function () {
	    return this;
	  };

	  IndexedSeq.prototype.toString = function () {
	    return this.__toString('Seq [', ']');
	  };

	  IndexedSeq.prototype.__iterate = function (fn, reverse) {
	    return seqIterate(this, fn, reverse, false);
	  };

	  IndexedSeq.prototype.__iterator = function (type, reverse) {
	    return seqIterator(this, type, reverse, false);
	  };

	  createClass(SetSeq, Seq);
	  function SetSeq(value) {
	    return (value === null || value === undefined ? emptySequence() : !isIterable(value) ? indexedSeqFromValue(value) : isKeyed(value) ? value.entrySeq() : value).toSetSeq();
	  }

	  SetSeq.of = function () /*...values*/{
	    return SetSeq(arguments);
	  };

	  SetSeq.prototype.toSetSeq = function () {
	    return this;
	  };

	  Seq.isSeq = isSeq;
	  Seq.Keyed = KeyedSeq;
	  Seq.Set = SetSeq;
	  Seq.Indexed = IndexedSeq;

	  var IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';

	  Seq.prototype[IS_SEQ_SENTINEL] = true;

	  createClass(ArraySeq, IndexedSeq);
	  function ArraySeq(array) {
	    this._array = array;
	    this.size = array.length;
	  }

	  ArraySeq.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
	  };

	  ArraySeq.prototype.__iterate = function (fn, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(array[reverse ? maxIndex - ii : ii], ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  ArraySeq.prototype.__iterator = function (type, reverse) {
	    var array = this._array;
	    var maxIndex = array.length - 1;
	    var ii = 0;
	    return new Iterator(function () {
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii, array[reverse ? maxIndex - ii++ : ii++]);
	    });
	  };

	  createClass(ObjectSeq, KeyedSeq);
	  function ObjectSeq(object) {
	    var keys = Object.keys(object);
	    this._object = object;
	    this._keys = keys;
	    this.size = keys.length;
	  }

	  ObjectSeq.prototype.get = function (key, notSetValue) {
	    if (notSetValue !== undefined && !this.has(key)) {
	      return notSetValue;
	    }
	    return this._object[key];
	  };

	  ObjectSeq.prototype.has = function (key) {
	    return this._object.hasOwnProperty(key);
	  };

	  ObjectSeq.prototype.__iterate = function (fn, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      if (fn(object[key], key, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  ObjectSeq.prototype.__iterator = function (type, reverse) {
	    var object = this._object;
	    var keys = this._keys;
	    var maxIndex = keys.length - 1;
	    var ii = 0;
	    return new Iterator(function () {
	      var key = keys[reverse ? maxIndex - ii : ii];
	      return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, key, object[key]);
	    });
	  };

	  ObjectSeq.prototype[IS_ORDERED_SENTINEL] = true;

	  createClass(IterableSeq, IndexedSeq);
	  function IterableSeq(iterable) {
	    this._iterable = iterable;
	    this.size = iterable.length || iterable.size;
	  }

	  IterableSeq.prototype.__iterateUncached = function (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    var iterations = 0;
	    if (isIterator(iterator)) {
	      var step;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	    }
	    return iterations;
	  };

	  IterableSeq.prototype.__iteratorUncached = function (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterable = this._iterable;
	    var iterator = getIterator(iterable);
	    if (!isIterator(iterator)) {
	      return new Iterator(iteratorDone);
	    }
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value);
	    });
	  };

	  createClass(IteratorSeq, IndexedSeq);
	  function IteratorSeq(iterator) {
	    this._iterator = iterator;
	    this._iteratorCache = [];
	  }

	  IteratorSeq.prototype.__iterateUncached = function (fn, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterate(fn, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    while (iterations < cache.length) {
	      if (fn(cache[iterations], iterations++, this) === false) {
	        return iterations;
	      }
	    }
	    var step;
	    while (!(step = iterator.next()).done) {
	      var val = step.value;
	      cache[iterations] = val;
	      if (fn(val, iterations++, this) === false) {
	        break;
	      }
	    }
	    return iterations;
	  };

	  IteratorSeq.prototype.__iteratorUncached = function (type, reverse) {
	    if (reverse) {
	      return this.cacheResult().__iterator(type, reverse);
	    }
	    var iterator = this._iterator;
	    var cache = this._iteratorCache;
	    var iterations = 0;
	    return new Iterator(function () {
	      if (iterations >= cache.length) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        cache[iterations] = step.value;
	      }
	      return iteratorValue(type, iterations, cache[iterations++]);
	    });
	  };

	  // # pragma Helper functions

	  function isSeq(maybeSeq) {
	    return !!(maybeSeq && maybeSeq[IS_SEQ_SENTINEL]);
	  }

	  var EMPTY_SEQ;

	  function emptySequence() {
	    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
	  }

	  function keyedSeqFromValue(value) {
	    var seq = Array.isArray(value) ? new ArraySeq(value).fromEntrySeq() : isIterator(value) ? new IteratorSeq(value).fromEntrySeq() : hasIterator(value) ? new IterableSeq(value).fromEntrySeq() : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? new ObjectSeq(value) : undefined;
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of [k, v] entries, ' + 'or keyed object: ' + value);
	    }
	    return seq;
	  }

	  function indexedSeqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value);
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of values: ' + value);
	    }
	    return seq;
	  }

	  function seqFromValue(value) {
	    var seq = maybeIndexedSeqFromValue(value) || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && new ObjectSeq(value);
	    if (!seq) {
	      throw new TypeError('Expected Array or iterable object of values, or keyed object: ' + value);
	    }
	    return seq;
	  }

	  function maybeIndexedSeqFromValue(value) {
	    return isArrayLike(value) ? new ArraySeq(value) : isIterator(value) ? new IteratorSeq(value) : hasIterator(value) ? new IterableSeq(value) : undefined;
	  }

	  function seqIterate(seq, fn, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      for (var ii = 0; ii <= maxIndex; ii++) {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        if (fn(entry[1], useKeys ? entry[0] : ii, seq) === false) {
	          return ii + 1;
	        }
	      }
	      return ii;
	    }
	    return seq.__iterateUncached(fn, reverse);
	  }

	  function seqIterator(seq, type, reverse, useKeys) {
	    var cache = seq._cache;
	    if (cache) {
	      var maxIndex = cache.length - 1;
	      var ii = 0;
	      return new Iterator(function () {
	        var entry = cache[reverse ? maxIndex - ii : ii];
	        return ii++ > maxIndex ? iteratorDone() : iteratorValue(type, useKeys ? entry[0] : ii - 1, entry[1]);
	      });
	    }
	    return seq.__iteratorUncached(type, reverse);
	  }

	  function fromJS(json, converter) {
	    return converter ? fromJSWith(converter, json, '', { '': json }) : fromJSDefault(json);
	  }

	  function fromJSWith(converter, json, key, parentJSON) {
	    if (Array.isArray(json)) {
	      return converter.call(parentJSON, key, IndexedSeq(json).map(function (v, k) {
	        return fromJSWith(converter, v, k, json);
	      }));
	    }
	    if (isPlainObj(json)) {
	      return converter.call(parentJSON, key, KeyedSeq(json).map(function (v, k) {
	        return fromJSWith(converter, v, k, json);
	      }));
	    }
	    return json;
	  }

	  function fromJSDefault(json) {
	    if (Array.isArray(json)) {
	      return IndexedSeq(json).map(fromJSDefault).toList();
	    }
	    if (isPlainObj(json)) {
	      return KeyedSeq(json).map(fromJSDefault).toMap();
	    }
	    return json;
	  }

	  function isPlainObj(value) {
	    return value && (value.constructor === Object || value.constructor === undefined);
	  }

	  /**
	   * An extension of the "same-value" algorithm as [described for use by ES6 Map
	   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
	   *
	   * NaN is considered the same as NaN, however -0 and 0 are considered the same
	   * value, which is different from the algorithm described by
	   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
	   *
	   * This is extended further to allow Objects to describe the values they
	   * represent, by way of `valueOf` or `equals` (and `hashCode`).
	   *
	   * Note: because of this extension, the key equality of Immutable.Map and the
	   * value equality of Immutable.Set will differ from ES6 Map and Set.
	   *
	   * ### Defining custom values
	   *
	   * The easiest way to describe the value an object represents is by implementing
	   * `valueOf`. For example, `Date` represents a value by returning a unix
	   * timestamp for `valueOf`:
	   *
	   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
	   *     var date2 = new Date(1234567890000);
	   *     date1.valueOf(); // 1234567890000
	   *     assert( date1 !== date2 );
	   *     assert( Immutable.is( date1, date2 ) );
	   *
	   * Note: overriding `valueOf` may have other implications if you use this object
	   * where JavaScript expects a primitive, such as implicit string coercion.
	   *
	   * For more complex types, especially collections, implementing `valueOf` may
	   * not be performant. An alternative is to implement `equals` and `hashCode`.
	   *
	   * `equals` takes another object, presumably of similar type, and returns true
	   * if the it is equal. Equality is symmetrical, so the same result should be
	   * returned if this and the argument are flipped.
	   *
	   *     assert( a.equals(b) === b.equals(a) );
	   *
	   * `hashCode` returns a 32bit integer number representing the object which will
	   * be used to determine how to store the value object in a Map or Set. You must
	   * provide both or neither methods, one must not exist without the other.
	   *
	   * Also, an important relationship between these methods must be upheld: if two
	   * values are equal, they *must* return the same hashCode. If the values are not
	   * equal, they might have the same hashCode; this is called a hash collision,
	   * and while undesirable for performance reasons, it is acceptable.
	   *
	   *     if (a.equals(b)) {
	   *       assert( a.hashCode() === b.hashCode() );
	   *     }
	   *
	   * All Immutable collections implement `equals` and `hashCode`.
	   *
	   */
	  function is(valueA, valueB) {
	    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	      return true;
	    }
	    if (!valueA || !valueB) {
	      return false;
	    }
	    if (typeof valueA.valueOf === 'function' && typeof valueB.valueOf === 'function') {
	      valueA = valueA.valueOf();
	      valueB = valueB.valueOf();
	      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
	        return true;
	      }
	      if (!valueA || !valueB) {
	        return false;
	      }
	    }
	    if (typeof valueA.equals === 'function' && typeof valueB.equals === 'function' && valueA.equals(valueB)) {
	      return true;
	    }
	    return false;
	  }

	  function deepEqual(a, b) {
	    if (a === b) {
	      return true;
	    }

	    if (!isIterable(b) || a.size !== undefined && b.size !== undefined && a.size !== b.size || a.__hash !== undefined && b.__hash !== undefined && a.__hash !== b.__hash || isKeyed(a) !== isKeyed(b) || isIndexed(a) !== isIndexed(b) || isOrdered(a) !== isOrdered(b)) {
	      return false;
	    }

	    if (a.size === 0 && b.size === 0) {
	      return true;
	    }

	    var notAssociative = !isAssociative(a);

	    if (isOrdered(a)) {
	      var entries = a.entries();
	      return b.every(function (v, k) {
	        var entry = entries.next().value;
	        return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
	      }) && entries.next().done;
	    }

	    var flipped = false;

	    if (a.size === undefined) {
	      if (b.size === undefined) {
	        if (typeof a.cacheResult === 'function') {
	          a.cacheResult();
	        }
	      } else {
	        flipped = true;
	        var _ = a;
	        a = b;
	        b = _;
	      }
	    }

	    var allEqual = true;
	    var bSize = b.__iterate(function (v, k) {
	      if (notAssociative ? !a.has(v) : flipped ? !is(v, a.get(k, NOT_SET)) : !is(a.get(k, NOT_SET), v)) {
	        allEqual = false;
	        return false;
	      }
	    });

	    return allEqual && a.size === bSize;
	  }

	  createClass(Repeat, IndexedSeq);

	  function Repeat(value, times) {
	    if (!(this instanceof Repeat)) {
	      return new Repeat(value, times);
	    }
	    this._value = value;
	    this.size = times === undefined ? Infinity : Math.max(0, times);
	    if (this.size === 0) {
	      if (EMPTY_REPEAT) {
	        return EMPTY_REPEAT;
	      }
	      EMPTY_REPEAT = this;
	    }
	  }

	  Repeat.prototype.toString = function () {
	    if (this.size === 0) {
	      return 'Repeat []';
	    }
	    return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
	  };

	  Repeat.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._value : notSetValue;
	  };

	  Repeat.prototype.includes = function (searchValue) {
	    return is(this._value, searchValue);
	  };

	  Repeat.prototype.slice = function (begin, end) {
	    var size = this.size;
	    return wholeSlice(begin, end, size) ? this : new Repeat(this._value, resolveEnd(end, size) - resolveBegin(begin, size));
	  };

	  Repeat.prototype.reverse = function () {
	    return this;
	  };

	  Repeat.prototype.indexOf = function (searchValue) {
	    if (is(this._value, searchValue)) {
	      return 0;
	    }
	    return -1;
	  };

	  Repeat.prototype.lastIndexOf = function (searchValue) {
	    if (is(this._value, searchValue)) {
	      return this.size;
	    }
	    return -1;
	  };

	  Repeat.prototype.__iterate = function (fn, reverse) {
	    for (var ii = 0; ii < this.size; ii++) {
	      if (fn(this._value, ii, this) === false) {
	        return ii + 1;
	      }
	    }
	    return ii;
	  };

	  Repeat.prototype.__iterator = function (type, reverse) {
	    var this$0 = this;
	    var ii = 0;
	    return new Iterator(function () {
	      return ii < this$0.size ? iteratorValue(type, ii++, this$0._value) : iteratorDone();
	    });
	  };

	  Repeat.prototype.equals = function (other) {
	    return other instanceof Repeat ? is(this._value, other._value) : deepEqual(other);
	  };

	  var EMPTY_REPEAT;

	  function invariant(condition, error) {
	    if (!condition) throw new Error(error);
	  }

	  createClass(Range, IndexedSeq);

	  function Range(start, end, step) {
	    if (!(this instanceof Range)) {
	      return new Range(start, end, step);
	    }
	    invariant(step !== 0, 'Cannot step a Range by 0');
	    start = start || 0;
	    if (end === undefined) {
	      end = Infinity;
	    }
	    step = step === undefined ? 1 : Math.abs(step);
	    if (end < start) {
	      step = -step;
	    }
	    this._start = start;
	    this._end = end;
	    this._step = step;
	    this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
	    if (this.size === 0) {
	      if (EMPTY_RANGE) {
	        return EMPTY_RANGE;
	      }
	      EMPTY_RANGE = this;
	    }
	  }

	  Range.prototype.toString = function () {
	    if (this.size === 0) {
	      return 'Range []';
	    }
	    return 'Range [ ' + this._start + '...' + this._end + (this._step !== 1 ? ' by ' + this._step : '') + ' ]';
	  };

	  Range.prototype.get = function (index, notSetValue) {
	    return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
	  };

	  Range.prototype.includes = function (searchValue) {
	    var possibleIndex = (searchValue - this._start) / this._step;
	    return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
	  };

	  Range.prototype.slice = function (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    begin = resolveBegin(begin, this.size);
	    end = resolveEnd(end, this.size);
	    if (end <= begin) {
	      return new Range(0, 0);
	    }
	    return new Range(this.get(begin, this._end), this.get(end, this._end), this._step);
	  };

	  Range.prototype.indexOf = function (searchValue) {
	    var offsetValue = searchValue - this._start;
	    if (offsetValue % this._step === 0) {
	      var index = offsetValue / this._step;
	      if (index >= 0 && index < this.size) {
	        return index;
	      }
	    }
	    return -1;
	  };

	  Range.prototype.lastIndexOf = function (searchValue) {
	    return this.indexOf(searchValue);
	  };

	  Range.prototype.__iterate = function (fn, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    for (var ii = 0; ii <= maxIndex; ii++) {
	      if (fn(value, ii, this) === false) {
	        return ii + 1;
	      }
	      value += reverse ? -step : step;
	    }
	    return ii;
	  };

	  Range.prototype.__iterator = function (type, reverse) {
	    var maxIndex = this.size - 1;
	    var step = this._step;
	    var value = reverse ? this._start + maxIndex * step : this._start;
	    var ii = 0;
	    return new Iterator(function () {
	      var v = value;
	      value += reverse ? -step : step;
	      return ii > maxIndex ? iteratorDone() : iteratorValue(type, ii++, v);
	    });
	  };

	  Range.prototype.equals = function (other) {
	    return other instanceof Range ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
	  };

	  var EMPTY_RANGE;

	  createClass(Collection, Iterable);
	  function Collection() {
	    throw TypeError('Abstract');
	  }

	  createClass(KeyedCollection, Collection);function KeyedCollection() {}

	  createClass(IndexedCollection, Collection);function IndexedCollection() {}

	  createClass(SetCollection, Collection);function SetCollection() {}

	  Collection.Keyed = KeyedCollection;
	  Collection.Indexed = IndexedCollection;
	  Collection.Set = SetCollection;

	  var imul = typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2 ? Math.imul : function imul(a, b) {
	    a = a | 0; // int
	    b = b | 0; // int
	    var c = a & 0xffff;
	    var d = b & 0xffff;
	    // Shift by 0 fixes the sign on the high part.
	    return c * d + ((a >>> 16) * d + c * (b >>> 16) << 16 >>> 0) | 0; // int
	  };

	  // v8 has an optimization for storing 31-bit signed numbers.
	  // Values which have either 00 or 11 as the high order bits qualify.
	  // This function drops the highest order bit in a signed number, maintaining
	  // the sign bit.
	  function smi(i32) {
	    return i32 >>> 1 & 0x40000000 | i32 & 0xBFFFFFFF;
	  }

	  function hash(o) {
	    if (o === false || o === null || o === undefined) {
	      return 0;
	    }
	    if (typeof o.valueOf === 'function') {
	      o = o.valueOf();
	      if (o === false || o === null || o === undefined) {
	        return 0;
	      }
	    }
	    if (o === true) {
	      return 1;
	    }
	    var type = typeof o === 'undefined' ? 'undefined' : _typeof(o);
	    if (type === 'number') {
	      if (o !== o || o === Infinity) {
	        return 0;
	      }
	      var h = o | 0;
	      if (h !== o) {
	        h ^= o * 0xFFFFFFFF;
	      }
	      while (o > 0xFFFFFFFF) {
	        o /= 0xFFFFFFFF;
	        h ^= o;
	      }
	      return smi(h);
	    }
	    if (type === 'string') {
	      return o.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(o) : hashString(o);
	    }
	    if (typeof o.hashCode === 'function') {
	      return o.hashCode();
	    }
	    if (type === 'object') {
	      return hashJSObj(o);
	    }
	    if (typeof o.toString === 'function') {
	      return hashString(o.toString());
	    }
	    throw new Error('Value type ' + type + ' cannot be hashed.');
	  }

	  function cachedHashString(string) {
	    var hash = stringHashCache[string];
	    if (hash === undefined) {
	      hash = hashString(string);
	      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
	        STRING_HASH_CACHE_SIZE = 0;
	        stringHashCache = {};
	      }
	      STRING_HASH_CACHE_SIZE++;
	      stringHashCache[string] = hash;
	    }
	    return hash;
	  }

	  // http://jsperf.com/hashing-strings
	  function hashString(string) {
	    // This is the hash from JVM
	    // The hash code for a string is computed as
	    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
	    // where s[i] is the ith character of the string and n is the length of
	    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
	    // (exclusive) by dropping high bits.
	    var hash = 0;
	    for (var ii = 0; ii < string.length; ii++) {
	      hash = 31 * hash + string.charCodeAt(ii) | 0;
	    }
	    return smi(hash);
	  }

	  function hashJSObj(obj) {
	    var hash;
	    if (usingWeakMap) {
	      hash = weakMap.get(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = obj[UID_HASH_KEY];
	    if (hash !== undefined) {
	      return hash;
	    }

	    if (!canDefineProperty) {
	      hash = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
	      if (hash !== undefined) {
	        return hash;
	      }

	      hash = getIENodeHash(obj);
	      if (hash !== undefined) {
	        return hash;
	      }
	    }

	    hash = ++objHashUID;
	    if (objHashUID & 0x40000000) {
	      objHashUID = 0;
	    }

	    if (usingWeakMap) {
	      weakMap.set(obj, hash);
	    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
	      throw new Error('Non-extensible objects are not allowed as keys.');
	    } else if (canDefineProperty) {
	      Object.defineProperty(obj, UID_HASH_KEY, {
	        'enumerable': false,
	        'configurable': false,
	        'writable': false,
	        'value': hash
	      });
	    } else if (obj.propertyIsEnumerable !== undefined && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
	      // Since we can't define a non-enumerable property on the object
	      // we'll hijack one of the less-used non-enumerable properties to
	      // save our hash on it. Since this is a function it will not show up in
	      // `JSON.stringify` which is what we want.
	      obj.propertyIsEnumerable = function () {
	        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
	      };
	      obj.propertyIsEnumerable[UID_HASH_KEY] = hash;
	    } else if (obj.nodeType !== undefined) {
	      // At this point we couldn't get the IE `uniqueID` to use as a hash
	      // and we couldn't use a non-enumerable property to exploit the
	      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
	      // itself.
	      obj[UID_HASH_KEY] = hash;
	    } else {
	      throw new Error('Unable to set a non-enumerable property on object.');
	    }

	    return hash;
	  }

	  // Get references to ES5 object methods.
	  var isExtensible = Object.isExtensible;

	  // True if Object.defineProperty works as expected. IE8 fails this test.
	  var canDefineProperty = function () {
	    try {
	      Object.defineProperty({}, '@', {});
	      return true;
	    } catch (e) {
	      return false;
	    }
	  }();

	  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
	  // and avoid memory leaks from the IE cloneNode bug.
	  function getIENodeHash(node) {
	    if (node && node.nodeType > 0) {
	      switch (node.nodeType) {
	        case 1:
	          // Element
	          return node.uniqueID;
	        case 9:
	          // Document
	          return node.documentElement && node.documentElement.uniqueID;
	      }
	    }
	  }

	  // If possible, use a WeakMap.
	  var usingWeakMap = typeof WeakMap === 'function';
	  var weakMap;
	  if (usingWeakMap) {
	    weakMap = new WeakMap();
	  }

	  var objHashUID = 0;

	  var UID_HASH_KEY = '__immutablehash__';
	  if (typeof Symbol === 'function') {
	    UID_HASH_KEY = Symbol(UID_HASH_KEY);
	  }

	  var STRING_HASH_CACHE_MIN_STRLEN = 16;
	  var STRING_HASH_CACHE_MAX_SIZE = 255;
	  var STRING_HASH_CACHE_SIZE = 0;
	  var stringHashCache = {};

	  function assertNotInfinite(size) {
	    invariant(size !== Infinity, 'Cannot perform this action with an infinite size.');
	  }

	  createClass(Map, KeyedCollection);

	  // @pragma Construction

	  function Map(value) {
	    return value === null || value === undefined ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function (map) {
	      var iter = KeyedIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  Map.of = function () {
	    var keyValues = SLICE$0.call(arguments, 0);
	    return emptyMap().withMutations(function (map) {
	      for (var i = 0; i < keyValues.length; i += 2) {
	        if (i + 1 >= keyValues.length) {
	          throw new Error('Missing value for key: ' + keyValues[i]);
	        }
	        map.set(keyValues[i], keyValues[i + 1]);
	      }
	    });
	  };

	  Map.prototype.toString = function () {
	    return this.__toString('Map {', '}');
	  };

	  // @pragma Access

	  Map.prototype.get = function (k, notSetValue) {
	    return this._root ? this._root.get(0, undefined, k, notSetValue) : notSetValue;
	  };

	  // @pragma Modification

	  Map.prototype.set = function (k, v) {
	    return updateMap(this, k, v);
	  };

	  Map.prototype.setIn = function (keyPath, v) {
	    return this.updateIn(keyPath, NOT_SET, function () {
	      return v;
	    });
	  };

	  Map.prototype.remove = function (k) {
	    return updateMap(this, k, NOT_SET);
	  };

	  Map.prototype.deleteIn = function (keyPath) {
	    return this.updateIn(keyPath, function () {
	      return NOT_SET;
	    });
	  };

	  Map.prototype.update = function (k, notSetValue, updater) {
	    return arguments.length === 1 ? k(this) : this.updateIn([k], notSetValue, updater);
	  };

	  Map.prototype.updateIn = function (keyPath, notSetValue, updater) {
	    if (!updater) {
	      updater = notSetValue;
	      notSetValue = undefined;
	    }
	    var updatedValue = updateInDeepMap(this, forceIterator(keyPath), notSetValue, updater);
	    return updatedValue === NOT_SET ? undefined : updatedValue;
	  };

	  Map.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._root = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyMap();
	  };

	  // @pragma Composition

	  Map.prototype.merge = function () /*...iters*/{
	    return mergeIntoMapWith(this, undefined, arguments);
	  };

	  Map.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoMapWith(this, merger, iters);
	  };

	  Map.prototype.mergeIn = function (keyPath) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.updateIn(keyPath, emptyMap(), function (m) {
	      return typeof m.merge === 'function' ? m.merge.apply(m, iters) : iters[iters.length - 1];
	    });
	  };

	  Map.prototype.mergeDeep = function () /*...iters*/{
	    return mergeIntoMapWith(this, deepMerger, arguments);
	  };

	  Map.prototype.mergeDeepWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoMapWith(this, deepMergerWith(merger), iters);
	  };

	  Map.prototype.mergeDeepIn = function (keyPath) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.updateIn(keyPath, emptyMap(), function (m) {
	      return typeof m.mergeDeep === 'function' ? m.mergeDeep.apply(m, iters) : iters[iters.length - 1];
	    });
	  };

	  Map.prototype.sort = function (comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator));
	  };

	  Map.prototype.sortBy = function (mapper, comparator) {
	    // Late binding
	    return OrderedMap(sortFactory(this, comparator, mapper));
	  };

	  // @pragma Mutability

	  Map.prototype.withMutations = function (fn) {
	    var mutable = this.asMutable();
	    fn(mutable);
	    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
	  };

	  Map.prototype.asMutable = function () {
	    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
	  };

	  Map.prototype.asImmutable = function () {
	    return this.__ensureOwner();
	  };

	  Map.prototype.wasAltered = function () {
	    return this.__altered;
	  };

	  Map.prototype.__iterator = function (type, reverse) {
	    return new MapIterator(this, type, reverse);
	  };

	  Map.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var iterations = 0;
	    this._root && this._root.iterate(function (entry) {
	      iterations++;
	      return fn(entry[1], entry[0], this$0);
	    }, reverse);
	    return iterations;
	  };

	  Map.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeMap(this.size, this._root, ownerID, this.__hash);
	  };

	  function isMap(maybeMap) {
	    return !!(maybeMap && maybeMap[IS_MAP_SENTINEL]);
	  }

	  Map.isMap = isMap;

	  var IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';

	  var MapPrototype = Map.prototype;
	  MapPrototype[IS_MAP_SENTINEL] = true;
	  MapPrototype[DELETE] = MapPrototype.remove;
	  MapPrototype.removeIn = MapPrototype.deleteIn;

	  // #pragma Trie Nodes

	  function ArrayMapNode(ownerID, entries) {
	    this.ownerID = ownerID;
	    this.entries = entries;
	  }

	  ArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0, len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  };

	  ArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;

	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;

	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }

	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);

	    if (removed && entries.length === 1) {
	      return; // undefined
	    }

	    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
	      return createNodes(ownerID, entries, key, value);
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);

	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }

	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }

	    return new ArrayMapNode(ownerID, newEntries);
	  };

	  function BitmapIndexedNode(ownerID, bitmap, nodes) {
	    this.ownerID = ownerID;
	    this.bitmap = bitmap;
	    this.nodes = nodes;
	  }

	  BitmapIndexedNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
	    var bitmap = this.bitmap;
	    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
	  };

	  BitmapIndexedNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var bit = 1 << keyHashFrag;
	    var bitmap = this.bitmap;
	    var exists = (bitmap & bit) !== 0;

	    if (!exists && value === NOT_SET) {
	      return this;
	    }

	    var idx = popCount(bitmap & bit - 1);
	    var nodes = this.nodes;
	    var node = exists ? nodes[idx] : undefined;
	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);

	    if (newNode === node) {
	      return this;
	    }

	    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
	      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
	    }

	    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
	      return nodes[idx ^ 1];
	    }

	    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
	      return newNode;
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
	    var newNodes = exists ? newNode ? setIn(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);

	    if (isEditable) {
	      this.bitmap = newBitmap;
	      this.nodes = newNodes;
	      return this;
	    }

	    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
	  };

	  function HashArrayMapNode(ownerID, count, nodes) {
	    this.ownerID = ownerID;
	    this.count = count;
	    this.nodes = nodes;
	  }

	  HashArrayMapNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var node = this.nodes[idx];
	    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
	  };

	  HashArrayMapNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }
	    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
	    var removed = value === NOT_SET;
	    var nodes = this.nodes;
	    var node = nodes[idx];

	    if (removed && !node) {
	      return this;
	    }

	    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
	    if (newNode === node) {
	      return this;
	    }

	    var newCount = this.count;
	    if (!node) {
	      newCount++;
	    } else if (!newNode) {
	      newCount--;
	      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
	        return packNodes(ownerID, nodes, newCount, idx);
	      }
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newNodes = setIn(nodes, idx, newNode, isEditable);

	    if (isEditable) {
	      this.count = newCount;
	      this.nodes = newNodes;
	      return this;
	    }

	    return new HashArrayMapNode(ownerID, newCount, newNodes);
	  };

	  function HashCollisionNode(ownerID, keyHash, entries) {
	    this.ownerID = ownerID;
	    this.keyHash = keyHash;
	    this.entries = entries;
	  }

	  HashCollisionNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    var entries = this.entries;
	    for (var ii = 0, len = entries.length; ii < len; ii++) {
	      if (is(key, entries[ii][0])) {
	        return entries[ii][1];
	      }
	    }
	    return notSetValue;
	  };

	  HashCollisionNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (keyHash === undefined) {
	      keyHash = hash(key);
	    }

	    var removed = value === NOT_SET;

	    if (keyHash !== this.keyHash) {
	      if (removed) {
	        return this;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
	    }

	    var entries = this.entries;
	    var idx = 0;
	    for (var len = entries.length; idx < len; idx++) {
	      if (is(key, entries[idx][0])) {
	        break;
	      }
	    }
	    var exists = idx < len;

	    if (exists ? entries[idx][1] === value : removed) {
	      return this;
	    }

	    SetRef(didAlter);
	    (removed || !exists) && SetRef(didChangeSize);

	    if (removed && len === 2) {
	      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
	    }

	    var isEditable = ownerID && ownerID === this.ownerID;
	    var newEntries = isEditable ? entries : arrCopy(entries);

	    if (exists) {
	      if (removed) {
	        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
	      } else {
	        newEntries[idx] = [key, value];
	      }
	    } else {
	      newEntries.push([key, value]);
	    }

	    if (isEditable) {
	      this.entries = newEntries;
	      return this;
	    }

	    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
	  };

	  function ValueNode(ownerID, keyHash, entry) {
	    this.ownerID = ownerID;
	    this.keyHash = keyHash;
	    this.entry = entry;
	  }

	  ValueNode.prototype.get = function (shift, keyHash, key, notSetValue) {
	    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
	  };

	  ValueNode.prototype.update = function (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    var removed = value === NOT_SET;
	    var keyMatch = is(key, this.entry[0]);
	    if (keyMatch ? value === this.entry[1] : removed) {
	      return this;
	    }

	    SetRef(didAlter);

	    if (removed) {
	      SetRef(didChangeSize);
	      return; // undefined
	    }

	    if (keyMatch) {
	      if (ownerID && ownerID === this.ownerID) {
	        this.entry[1] = value;
	        return this;
	      }
	      return new ValueNode(ownerID, this.keyHash, [key, value]);
	    }

	    SetRef(didChangeSize);
	    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
	  };

	  // #pragma Iterators

	  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function (fn, reverse) {
	    var entries = this.entries;
	    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
	      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
	        return false;
	      }
	    }
	  };

	  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function (fn, reverse) {
	    var nodes = this.nodes;
	    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
	      var node = nodes[reverse ? maxIndex - ii : ii];
	      if (node && node.iterate(fn, reverse) === false) {
	        return false;
	      }
	    }
	  };

	  ValueNode.prototype.iterate = function (fn, reverse) {
	    return fn(this.entry);
	  };

	  createClass(MapIterator, Iterator);

	  function MapIterator(map, type, reverse) {
	    this._type = type;
	    this._reverse = reverse;
	    this._stack = map._root && mapIteratorFrame(map._root);
	  }

	  MapIterator.prototype.next = function () {
	    var type = this._type;
	    var stack = this._stack;
	    while (stack) {
	      var node = stack.node;
	      var index = stack.index++;
	      var maxIndex;
	      if (node.entry) {
	        if (index === 0) {
	          return mapIteratorValue(type, node.entry);
	        }
	      } else if (node.entries) {
	        maxIndex = node.entries.length - 1;
	        if (index <= maxIndex) {
	          return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
	        }
	      } else {
	        maxIndex = node.nodes.length - 1;
	        if (index <= maxIndex) {
	          var subNode = node.nodes[this._reverse ? maxIndex - index : index];
	          if (subNode) {
	            if (subNode.entry) {
	              return mapIteratorValue(type, subNode.entry);
	            }
	            stack = this._stack = mapIteratorFrame(subNode, stack);
	          }
	          continue;
	        }
	      }
	      stack = this._stack = this._stack.__prev;
	    }
	    return iteratorDone();
	  };

	  function mapIteratorValue(type, entry) {
	    return iteratorValue(type, entry[0], entry[1]);
	  }

	  function mapIteratorFrame(node, prev) {
	    return {
	      node: node,
	      index: 0,
	      __prev: prev
	    };
	  }

	  function makeMap(size, root, ownerID, hash) {
	    var map = Object.create(MapPrototype);
	    map.size = size;
	    map._root = root;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_MAP;
	  function emptyMap() {
	    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
	  }

	  function updateMap(map, k, v) {
	    var newRoot;
	    var newSize;
	    if (!map._root) {
	      if (v === NOT_SET) {
	        return map;
	      }
	      newSize = 1;
	      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
	    } else {
	      var didChangeSize = MakeRef(CHANGE_LENGTH);
	      var didAlter = MakeRef(DID_ALTER);
	      newRoot = updateNode(map._root, map.__ownerID, 0, undefined, k, v, didChangeSize, didAlter);
	      if (!didAlter.value) {
	        return map;
	      }
	      newSize = map.size + (didChangeSize.value ? v === NOT_SET ? -1 : 1 : 0);
	    }
	    if (map.__ownerID) {
	      map.size = newSize;
	      map._root = newRoot;
	      map.__hash = undefined;
	      map.__altered = true;
	      return map;
	    }
	    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
	  }

	  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
	    if (!node) {
	      if (value === NOT_SET) {
	        return node;
	      }
	      SetRef(didAlter);
	      SetRef(didChangeSize);
	      return new ValueNode(ownerID, keyHash, [key, value]);
	    }
	    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
	  }

	  function isLeafNode(node) {
	    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
	  }

	  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
	    if (node.keyHash === keyHash) {
	      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
	    }

	    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
	    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

	    var newNode;
	    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);

	    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
	  }

	  function createNodes(ownerID, entries, key, value) {
	    if (!ownerID) {
	      ownerID = new OwnerID();
	    }
	    var node = new ValueNode(ownerID, hash(key), [key, value]);
	    for (var ii = 0; ii < entries.length; ii++) {
	      var entry = entries[ii];
	      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
	    }
	    return node;
	  }

	  function packNodes(ownerID, nodes, count, excluding) {
	    var bitmap = 0;
	    var packedII = 0;
	    var packedNodes = new Array(count);
	    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
	      var node = nodes[ii];
	      if (node !== undefined && ii !== excluding) {
	        bitmap |= bit;
	        packedNodes[packedII++] = node;
	      }
	    }
	    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
	  }

	  function expandNodes(ownerID, nodes, bitmap, including, node) {
	    var count = 0;
	    var expandedNodes = new Array(SIZE);
	    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
	      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
	    }
	    expandedNodes[including] = node;
	    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
	  }

	  function mergeIntoMapWith(map, merger, iterables) {
	    var iters = [];
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = KeyedIterable(value);
	      if (!isIterable(value)) {
	        iter = iter.map(function (v) {
	          return fromJS(v);
	        });
	      }
	      iters.push(iter);
	    }
	    return mergeIntoCollectionWith(map, merger, iters);
	  }

	  function deepMerger(existing, value, key) {
	    return existing && existing.mergeDeep && isIterable(value) ? existing.mergeDeep(value) : is(existing, value) ? existing : value;
	  }

	  function deepMergerWith(merger) {
	    return function (existing, value, key) {
	      if (existing && existing.mergeDeepWith && isIterable(value)) {
	        return existing.mergeDeepWith(merger, value);
	      }
	      var nextValue = merger(existing, value, key);
	      return is(existing, nextValue) ? existing : nextValue;
	    };
	  }

	  function mergeIntoCollectionWith(collection, merger, iters) {
	    iters = iters.filter(function (x) {
	      return x.size !== 0;
	    });
	    if (iters.length === 0) {
	      return collection;
	    }
	    if (collection.size === 0 && !collection.__ownerID && iters.length === 1) {
	      return collection.constructor(iters[0]);
	    }
	    return collection.withMutations(function (collection) {
	      var mergeIntoMap = merger ? function (value, key) {
	        collection.update(key, NOT_SET, function (existing) {
	          return existing === NOT_SET ? value : merger(existing, value, key);
	        });
	      } : function (value, key) {
	        collection.set(key, value);
	      };
	      for (var ii = 0; ii < iters.length; ii++) {
	        iters[ii].forEach(mergeIntoMap);
	      }
	    });
	  }

	  function updateInDeepMap(existing, keyPathIter, notSetValue, updater) {
	    var isNotSet = existing === NOT_SET;
	    var step = keyPathIter.next();
	    if (step.done) {
	      var existingValue = isNotSet ? notSetValue : existing;
	      var newValue = updater(existingValue);
	      return newValue === existingValue ? existing : newValue;
	    }
	    invariant(isNotSet || existing && existing.set, 'invalid keyPath');
	    var key = step.value;
	    var nextExisting = isNotSet ? NOT_SET : existing.get(key, NOT_SET);
	    var nextUpdated = updateInDeepMap(nextExisting, keyPathIter, notSetValue, updater);
	    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? existing.remove(key) : (isNotSet ? emptyMap() : existing).set(key, nextUpdated);
	  }

	  function popCount(x) {
	    x = x - (x >> 1 & 0x55555555);
	    x = (x & 0x33333333) + (x >> 2 & 0x33333333);
	    x = x + (x >> 4) & 0x0f0f0f0f;
	    x = x + (x >> 8);
	    x = x + (x >> 16);
	    return x & 0x7f;
	  }

	  function setIn(array, idx, val, canEdit) {
	    var newArray = canEdit ? array : arrCopy(array);
	    newArray[idx] = val;
	    return newArray;
	  }

	  function spliceIn(array, idx, val, canEdit) {
	    var newLen = array.length + 1;
	    if (canEdit && idx + 1 === newLen) {
	      array[idx] = val;
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        newArray[ii] = val;
	        after = -1;
	      } else {
	        newArray[ii] = array[ii + after];
	      }
	    }
	    return newArray;
	  }

	  function spliceOut(array, idx, canEdit) {
	    var newLen = array.length - 1;
	    if (canEdit && idx === newLen) {
	      array.pop();
	      return array;
	    }
	    var newArray = new Array(newLen);
	    var after = 0;
	    for (var ii = 0; ii < newLen; ii++) {
	      if (ii === idx) {
	        after = 1;
	      }
	      newArray[ii] = array[ii + after];
	    }
	    return newArray;
	  }

	  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
	  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
	  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

	  createClass(List, IndexedCollection);

	  // @pragma Construction

	  function List(value) {
	    var empty = emptyList();
	    if (value === null || value === undefined) {
	      return empty;
	    }
	    if (isList(value)) {
	      return value;
	    }
	    var iter = IndexedIterable(value);
	    var size = iter.size;
	    if (size === 0) {
	      return empty;
	    }
	    assertNotInfinite(size);
	    if (size > 0 && size < SIZE) {
	      return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
	    }
	    return empty.withMutations(function (list) {
	      list.setSize(size);
	      iter.forEach(function (v, i) {
	        return list.set(i, v);
	      });
	    });
	  }

	  List.of = function () /*...values*/{
	    return this(arguments);
	  };

	  List.prototype.toString = function () {
	    return this.__toString('List [', ']');
	  };

	  // @pragma Access

	  List.prototype.get = function (index, notSetValue) {
	    index = wrapIndex(this, index);
	    if (index >= 0 && index < this.size) {
	      index += this._origin;
	      var node = listNodeFor(this, index);
	      return node && node.array[index & MASK];
	    }
	    return notSetValue;
	  };

	  // @pragma Modification

	  List.prototype.set = function (index, value) {
	    return updateList(this, index, value);
	  };

	  List.prototype.remove = function (index) {
	    return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
	  };

	  List.prototype.insert = function (index, value) {
	    return this.splice(index, 0, value);
	  };

	  List.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = this._origin = this._capacity = 0;
	      this._level = SHIFT;
	      this._root = this._tail = null;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyList();
	  };

	  List.prototype.push = function () /*...values*/{
	    var values = arguments;
	    var oldSize = this.size;
	    return this.withMutations(function (list) {
	      setListBounds(list, 0, oldSize + values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(oldSize + ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.pop = function () {
	    return setListBounds(this, 0, -1);
	  };

	  List.prototype.unshift = function () /*...values*/{
	    var values = arguments;
	    return this.withMutations(function (list) {
	      setListBounds(list, -values.length);
	      for (var ii = 0; ii < values.length; ii++) {
	        list.set(ii, values[ii]);
	      }
	    });
	  };

	  List.prototype.shift = function () {
	    return setListBounds(this, 1);
	  };

	  // @pragma Composition

	  List.prototype.merge = function () /*...iters*/{
	    return mergeIntoListWith(this, undefined, arguments);
	  };

	  List.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoListWith(this, merger, iters);
	  };

	  List.prototype.mergeDeep = function () /*...iters*/{
	    return mergeIntoListWith(this, deepMerger, arguments);
	  };

	  List.prototype.mergeDeepWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return mergeIntoListWith(this, deepMergerWith(merger), iters);
	  };

	  List.prototype.setSize = function (size) {
	    return setListBounds(this, 0, size);
	  };

	  // @pragma Iteration

	  List.prototype.slice = function (begin, end) {
	    var size = this.size;
	    if (wholeSlice(begin, end, size)) {
	      return this;
	    }
	    return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
	  };

	  List.prototype.__iterator = function (type, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    return new Iterator(function () {
	      var value = values();
	      return value === DONE ? iteratorDone() : iteratorValue(type, index++, value);
	    });
	  };

	  List.prototype.__iterate = function (fn, reverse) {
	    var index = 0;
	    var values = iterateList(this, reverse);
	    var value;
	    while ((value = values()) !== DONE) {
	      if (fn(value, index++, this) === false) {
	        break;
	      }
	    }
	    return index;
	  };

	  List.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      return this;
	    }
	    return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
	  };

	  function isList(maybeList) {
	    return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
	  }

	  List.isList = isList;

	  var IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';

	  var ListPrototype = List.prototype;
	  ListPrototype[IS_LIST_SENTINEL] = true;
	  ListPrototype[DELETE] = ListPrototype.remove;
	  ListPrototype.setIn = MapPrototype.setIn;
	  ListPrototype.deleteIn = ListPrototype.removeIn = MapPrototype.removeIn;
	  ListPrototype.update = MapPrototype.update;
	  ListPrototype.updateIn = MapPrototype.updateIn;
	  ListPrototype.mergeIn = MapPrototype.mergeIn;
	  ListPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  ListPrototype.withMutations = MapPrototype.withMutations;
	  ListPrototype.asMutable = MapPrototype.asMutable;
	  ListPrototype.asImmutable = MapPrototype.asImmutable;
	  ListPrototype.wasAltered = MapPrototype.wasAltered;

	  function VNode(array, ownerID) {
	    this.array = array;
	    this.ownerID = ownerID;
	  }

	  // TODO: seems like these methods are very similar

	  VNode.prototype.removeBefore = function (ownerID, level, index) {
	    if (index === level ? 1 << level : 0 || this.array.length === 0) {
	      return this;
	    }
	    var originIndex = index >>> level & MASK;
	    if (originIndex >= this.array.length) {
	      return new VNode([], ownerID);
	    }
	    var removingFirst = originIndex === 0;
	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[originIndex];
	      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && removingFirst) {
	        return this;
	      }
	    }
	    if (removingFirst && !newChild) {
	      return this;
	    }
	    var editable = editableVNode(this, ownerID);
	    if (!removingFirst) {
	      for (var ii = 0; ii < originIndex; ii++) {
	        editable.array[ii] = undefined;
	      }
	    }
	    if (newChild) {
	      editable.array[originIndex] = newChild;
	    }
	    return editable;
	  };

	  VNode.prototype.removeAfter = function (ownerID, level, index) {
	    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
	      return this;
	    }
	    var sizeIndex = index - 1 >>> level & MASK;
	    if (sizeIndex >= this.array.length) {
	      return this;
	    }

	    var newChild;
	    if (level > 0) {
	      var oldChild = this.array[sizeIndex];
	      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
	      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
	        return this;
	      }
	    }

	    var editable = editableVNode(this, ownerID);
	    editable.array.splice(sizeIndex + 1);
	    if (newChild) {
	      editable.array[sizeIndex] = newChild;
	    }
	    return editable;
	  };

	  var DONE = {};

	  function iterateList(list, reverse) {
	    var left = list._origin;
	    var right = list._capacity;
	    var tailPos = getTailOffset(right);
	    var tail = list._tail;

	    return iterateNodeOrLeaf(list._root, list._level, 0);

	    function iterateNodeOrLeaf(node, level, offset) {
	      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
	    }

	    function iterateLeaf(node, offset) {
	      var array = offset === tailPos ? tail && tail.array : node && node.array;
	      var from = offset > left ? 0 : left - offset;
	      var to = right - offset;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function () {
	        if (from === to) {
	          return DONE;
	        }
	        var idx = reverse ? --to : from++;
	        return array && array[idx];
	      };
	    }

	    function iterateNode(node, level, offset) {
	      var values;
	      var array = node && node.array;
	      var from = offset > left ? 0 : left - offset >> level;
	      var to = (right - offset >> level) + 1;
	      if (to > SIZE) {
	        to = SIZE;
	      }
	      return function () {
	        do {
	          if (values) {
	            var value = values();
	            if (value !== DONE) {
	              return value;
	            }
	            values = null;
	          }
	          if (from === to) {
	            return DONE;
	          }
	          var idx = reverse ? --to : from++;
	          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
	        } while (true);
	      };
	    }
	  }

	  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
	    var list = Object.create(ListPrototype);
	    list.size = capacity - origin;
	    list._origin = origin;
	    list._capacity = capacity;
	    list._level = level;
	    list._root = root;
	    list._tail = tail;
	    list.__ownerID = ownerID;
	    list.__hash = hash;
	    list.__altered = false;
	    return list;
	  }

	  var EMPTY_LIST;
	  function emptyList() {
	    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
	  }

	  function updateList(list, index, value) {
	    index = wrapIndex(list, index);

	    if (index !== index) {
	      return list;
	    }

	    if (index >= list.size || index < 0) {
	      return list.withMutations(function (list) {
	        index < 0 ? setListBounds(list, index).set(0, value) : setListBounds(list, 0, index + 1).set(index, value);
	      });
	    }

	    index += list._origin;

	    var newTail = list._tail;
	    var newRoot = list._root;
	    var didAlter = MakeRef(DID_ALTER);
	    if (index >= getTailOffset(list._capacity)) {
	      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
	    } else {
	      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
	    }

	    if (!didAlter.value) {
	      return list;
	    }

	    if (list.__ownerID) {
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
	  }

	  function updateVNode(node, ownerID, level, index, value, didAlter) {
	    var idx = index >>> level & MASK;
	    var nodeHas = node && idx < node.array.length;
	    if (!nodeHas && value === undefined) {
	      return node;
	    }

	    var newNode;

	    if (level > 0) {
	      var lowerNode = node && node.array[idx];
	      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
	      if (newLowerNode === lowerNode) {
	        return node;
	      }
	      newNode = editableVNode(node, ownerID);
	      newNode.array[idx] = newLowerNode;
	      return newNode;
	    }

	    if (nodeHas && node.array[idx] === value) {
	      return node;
	    }

	    SetRef(didAlter);

	    newNode = editableVNode(node, ownerID);
	    if (value === undefined && idx === newNode.array.length - 1) {
	      newNode.array.pop();
	    } else {
	      newNode.array[idx] = value;
	    }
	    return newNode;
	  }

	  function editableVNode(node, ownerID) {
	    if (ownerID && node && ownerID === node.ownerID) {
	      return node;
	    }
	    return new VNode(node ? node.array.slice() : [], ownerID);
	  }

	  function listNodeFor(list, rawIndex) {
	    if (rawIndex >= getTailOffset(list._capacity)) {
	      return list._tail;
	    }
	    if (rawIndex < 1 << list._level + SHIFT) {
	      var node = list._root;
	      var level = list._level;
	      while (node && level > 0) {
	        node = node.array[rawIndex >>> level & MASK];
	        level -= SHIFT;
	      }
	      return node;
	    }
	  }

	  function setListBounds(list, begin, end) {
	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      end = end | 0;
	    }
	    var owner = list.__ownerID || new OwnerID();
	    var oldOrigin = list._origin;
	    var oldCapacity = list._capacity;
	    var newOrigin = oldOrigin + begin;
	    var newCapacity = end === undefined ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
	    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
	      return list;
	    }

	    // If it's going to end after it starts, it's empty.
	    if (newOrigin >= newCapacity) {
	      return list.clear();
	    }

	    var newLevel = list._level;
	    var newRoot = list._root;

	    // New origin might need creating a higher root.
	    var offsetShift = 0;
	    while (newOrigin + offsetShift < 0) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [undefined, newRoot] : [], owner);
	      newLevel += SHIFT;
	      offsetShift += 1 << newLevel;
	    }
	    if (offsetShift) {
	      newOrigin += offsetShift;
	      oldOrigin += offsetShift;
	      newCapacity += offsetShift;
	      oldCapacity += offsetShift;
	    }

	    var oldTailOffset = getTailOffset(oldCapacity);
	    var newTailOffset = getTailOffset(newCapacity);

	    // New size might need creating a higher root.
	    while (newTailOffset >= 1 << newLevel + SHIFT) {
	      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
	      newLevel += SHIFT;
	    }

	    // Locate or create the new tail.
	    var oldTail = list._tail;
	    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;

	    // Merge Tail into tree.
	    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
	      newRoot = editableVNode(newRoot, owner);
	      var node = newRoot;
	      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
	        var idx = oldTailOffset >>> level & MASK;
	        node = node.array[idx] = editableVNode(node.array[idx], owner);
	      }
	      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
	    }

	    // If the size has been reduced, there's a chance the tail needs to be trimmed.
	    if (newCapacity < oldCapacity) {
	      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
	    }

	    // If the new origin is within the tail, then we do not need a root.
	    if (newOrigin >= newTailOffset) {
	      newOrigin -= newTailOffset;
	      newCapacity -= newTailOffset;
	      newLevel = SHIFT;
	      newRoot = null;
	      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

	      // Otherwise, if the root has been trimmed, garbage collect.
	    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
	        offsetShift = 0;

	        // Identify the new top root node of the subtree of the old root.
	        while (newRoot) {
	          var beginIndex = newOrigin >>> newLevel & MASK;
	          if (beginIndex !== newTailOffset >>> newLevel & MASK) {
	            break;
	          }
	          if (beginIndex) {
	            offsetShift += (1 << newLevel) * beginIndex;
	          }
	          newLevel -= SHIFT;
	          newRoot = newRoot.array[beginIndex];
	        }

	        // Trim the new sides of the new root.
	        if (newRoot && newOrigin > oldOrigin) {
	          newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
	        }
	        if (newRoot && newTailOffset < oldTailOffset) {
	          newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
	        }
	        if (offsetShift) {
	          newOrigin -= offsetShift;
	          newCapacity -= offsetShift;
	        }
	      }

	    if (list.__ownerID) {
	      list.size = newCapacity - newOrigin;
	      list._origin = newOrigin;
	      list._capacity = newCapacity;
	      list._level = newLevel;
	      list._root = newRoot;
	      list._tail = newTail;
	      list.__hash = undefined;
	      list.__altered = true;
	      return list;
	    }
	    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
	  }

	  function mergeIntoListWith(list, merger, iterables) {
	    var iters = [];
	    var maxSize = 0;
	    for (var ii = 0; ii < iterables.length; ii++) {
	      var value = iterables[ii];
	      var iter = IndexedIterable(value);
	      if (iter.size > maxSize) {
	        maxSize = iter.size;
	      }
	      if (!isIterable(value)) {
	        iter = iter.map(function (v) {
	          return fromJS(v);
	        });
	      }
	      iters.push(iter);
	    }
	    if (maxSize > list.size) {
	      list = list.setSize(maxSize);
	    }
	    return mergeIntoCollectionWith(list, merger, iters);
	  }

	  function getTailOffset(size) {
	    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
	  }

	  createClass(OrderedMap, Map);

	  // @pragma Construction

	  function OrderedMap(value) {
	    return value === null || value === undefined ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function (map) {
	      var iter = KeyedIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v, k) {
	        return map.set(k, v);
	      });
	    });
	  }

	  OrderedMap.of = function () /*...values*/{
	    return this(arguments);
	  };

	  OrderedMap.prototype.toString = function () {
	    return this.__toString('OrderedMap {', '}');
	  };

	  // @pragma Access

	  OrderedMap.prototype.get = function (k, notSetValue) {
	    var index = this._map.get(k);
	    return index !== undefined ? this._list.get(index)[1] : notSetValue;
	  };

	  // @pragma Modification

	  OrderedMap.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._map.clear();
	      this._list.clear();
	      return this;
	    }
	    return emptyOrderedMap();
	  };

	  OrderedMap.prototype.set = function (k, v) {
	    return updateOrderedMap(this, k, v);
	  };

	  OrderedMap.prototype.remove = function (k) {
	    return updateOrderedMap(this, k, NOT_SET);
	  };

	  OrderedMap.prototype.wasAltered = function () {
	    return this._map.wasAltered() || this._list.wasAltered();
	  };

	  OrderedMap.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._list.__iterate(function (entry) {
	      return entry && fn(entry[1], entry[0], this$0);
	    }, reverse);
	  };

	  OrderedMap.prototype.__iterator = function (type, reverse) {
	    return this._list.fromEntrySeq().__iterator(type, reverse);
	  };

	  OrderedMap.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    var newList = this._list.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      this._list = newList;
	      return this;
	    }
	    return makeOrderedMap(newMap, newList, ownerID, this.__hash);
	  };

	  function isOrderedMap(maybeOrderedMap) {
	    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
	  }

	  OrderedMap.isOrderedMap = isOrderedMap;

	  OrderedMap.prototype[IS_ORDERED_SENTINEL] = true;
	  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

	  function makeOrderedMap(map, list, ownerID, hash) {
	    var omap = Object.create(OrderedMap.prototype);
	    omap.size = map ? map.size : 0;
	    omap._map = map;
	    omap._list = list;
	    omap.__ownerID = ownerID;
	    omap.__hash = hash;
	    return omap;
	  }

	  var EMPTY_ORDERED_MAP;
	  function emptyOrderedMap() {
	    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
	  }

	  function updateOrderedMap(omap, k, v) {
	    var map = omap._map;
	    var list = omap._list;
	    var i = map.get(k);
	    var has = i !== undefined;
	    var newMap;
	    var newList;
	    if (v === NOT_SET) {
	      // removed
	      if (!has) {
	        return omap;
	      }
	      if (list.size >= SIZE && list.size >= map.size * 2) {
	        newList = list.filter(function (entry, idx) {
	          return entry !== undefined && i !== idx;
	        });
	        newMap = newList.toKeyedSeq().map(function (entry) {
	          return entry[0];
	        }).flip().toMap();
	        if (omap.__ownerID) {
	          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
	        }
	      } else {
	        newMap = map.remove(k);
	        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
	      }
	    } else {
	      if (has) {
	        if (v === list.get(i)[1]) {
	          return omap;
	        }
	        newMap = map;
	        newList = list.set(i, [k, v]);
	      } else {
	        newMap = map.set(k, list.size);
	        newList = list.set(list.size, [k, v]);
	      }
	    }
	    if (omap.__ownerID) {
	      omap.size = newMap.size;
	      omap._map = newMap;
	      omap._list = newList;
	      omap.__hash = undefined;
	      return omap;
	    }
	    return makeOrderedMap(newMap, newList);
	  }

	  createClass(ToKeyedSequence, KeyedSeq);
	  function ToKeyedSequence(indexed, useKeys) {
	    this._iter = indexed;
	    this._useKeys = useKeys;
	    this.size = indexed.size;
	  }

	  ToKeyedSequence.prototype.get = function (key, notSetValue) {
	    return this._iter.get(key, notSetValue);
	  };

	  ToKeyedSequence.prototype.has = function (key) {
	    return this._iter.has(key);
	  };

	  ToKeyedSequence.prototype.valueSeq = function () {
	    return this._iter.valueSeq();
	  };

	  ToKeyedSequence.prototype.reverse = function () {
	    var this$0 = this;
	    var reversedSequence = reverseFactory(this, true);
	    if (!this._useKeys) {
	      reversedSequence.valueSeq = function () {
	        return this$0._iter.toSeq().reverse();
	      };
	    }
	    return reversedSequence;
	  };

	  ToKeyedSequence.prototype.map = function (mapper, context) {
	    var this$0 = this;
	    var mappedSequence = mapFactory(this, mapper, context);
	    if (!this._useKeys) {
	      mappedSequence.valueSeq = function () {
	        return this$0._iter.toSeq().map(mapper, context);
	      };
	    }
	    return mappedSequence;
	  };

	  ToKeyedSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var ii;
	    return this._iter.__iterate(this._useKeys ? function (v, k) {
	      return fn(v, k, this$0);
	    } : (ii = reverse ? resolveSize(this) : 0, function (v) {
	      return fn(v, reverse ? --ii : ii++, this$0);
	    }), reverse);
	  };

	  ToKeyedSequence.prototype.__iterator = function (type, reverse) {
	    if (this._useKeys) {
	      return this._iter.__iterator(type, reverse);
	    }
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var ii = reverse ? resolveSize(this) : 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, reverse ? --ii : ii++, step.value, step);
	    });
	  };

	  ToKeyedSequence.prototype[IS_ORDERED_SENTINEL] = true;

	  createClass(ToIndexedSequence, IndexedSeq);
	  function ToIndexedSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  ToIndexedSequence.prototype.includes = function (value) {
	    return this._iter.includes(value);
	  };

	  ToIndexedSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    var iterations = 0;
	    return this._iter.__iterate(function (v) {
	      return fn(v, iterations++, this$0);
	    }, reverse);
	  };

	  ToIndexedSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    var iterations = 0;
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, iterations++, step.value, step);
	    });
	  };

	  createClass(ToSetSequence, SetSeq);
	  function ToSetSequence(iter) {
	    this._iter = iter;
	    this.size = iter.size;
	  }

	  ToSetSequence.prototype.has = function (key) {
	    return this._iter.includes(key);
	  };

	  ToSetSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._iter.__iterate(function (v) {
	      return fn(v, v, this$0);
	    }, reverse);
	  };

	  ToSetSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      var step = iterator.next();
	      return step.done ? step : iteratorValue(type, step.value, step.value, step);
	    });
	  };

	  createClass(FromEntriesSequence, KeyedSeq);
	  function FromEntriesSequence(entries) {
	    this._iter = entries;
	    this.size = entries.size;
	  }

	  FromEntriesSequence.prototype.entrySeq = function () {
	    return this._iter.toSeq();
	  };

	  FromEntriesSequence.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._iter.__iterate(function (entry) {
	      // Check if entry exists first so array access doesn't throw for holes
	      // in the parent iteration.
	      if (entry) {
	        validateEntry(entry);
	        var indexedIterable = isIterable(entry);
	        return fn(indexedIterable ? entry.get(1) : entry[1], indexedIterable ? entry.get(0) : entry[0], this$0);
	      }
	    }, reverse);
	  };

	  FromEntriesSequence.prototype.__iterator = function (type, reverse) {
	    var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
	    return new Iterator(function () {
	      while (true) {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        // Check if entry exists first so array access doesn't throw for holes
	        // in the parent iteration.
	        if (entry) {
	          validateEntry(entry);
	          var indexedIterable = isIterable(entry);
	          return iteratorValue(type, indexedIterable ? entry.get(0) : entry[0], indexedIterable ? entry.get(1) : entry[1], step);
	        }
	      }
	    });
	  };

	  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

	  function flipFactory(iterable) {
	    var flipSequence = makeSequence(iterable);
	    flipSequence._iter = iterable;
	    flipSequence.size = iterable.size;
	    flipSequence.flip = function () {
	      return iterable;
	    };
	    flipSequence.reverse = function () {
	      var reversedSequence = iterable.reverse.apply(this); // super.reverse()
	      reversedSequence.flip = function () {
	        return iterable.reverse();
	      };
	      return reversedSequence;
	    };
	    flipSequence.has = function (key) {
	      return iterable.includes(key);
	    };
	    flipSequence.includes = function (key) {
	      return iterable.has(key);
	    };
	    flipSequence.cacheResult = cacheResultThrough;
	    flipSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k) {
	        return fn(k, v, this$0) !== false;
	      }, reverse);
	    };
	    flipSequence.__iteratorUncached = function (type, reverse) {
	      if (type === ITERATE_ENTRIES) {
	        var iterator = iterable.__iterator(type, reverse);
	        return new Iterator(function () {
	          var step = iterator.next();
	          if (!step.done) {
	            var k = step.value[0];
	            step.value[0] = step.value[1];
	            step.value[1] = k;
	          }
	          return step;
	        });
	      }
	      return iterable.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
	    };
	    return flipSequence;
	  }

	  function mapFactory(iterable, mapper, context) {
	    var mappedSequence = makeSequence(iterable);
	    mappedSequence.size = iterable.size;
	    mappedSequence.has = function (key) {
	      return iterable.has(key);
	    };
	    mappedSequence.get = function (key, notSetValue) {
	      var v = iterable.get(key, NOT_SET);
	      return v === NOT_SET ? notSetValue : mapper.call(context, v, key, iterable);
	    };
	    mappedSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k, c) {
	        return fn(mapper.call(context, v, k, c), k, this$0) !== false;
	      }, reverse);
	    };
	    mappedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      return new Iterator(function () {
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var key = entry[0];
	        return iteratorValue(type, key, mapper.call(context, entry[1], key, iterable), step);
	      });
	    };
	    return mappedSequence;
	  }

	  function reverseFactory(iterable, useKeys) {
	    var reversedSequence = makeSequence(iterable);
	    reversedSequence._iter = iterable;
	    reversedSequence.size = iterable.size;
	    reversedSequence.reverse = function () {
	      return iterable;
	    };
	    if (iterable.flip) {
	      reversedSequence.flip = function () {
	        var flipSequence = flipFactory(iterable);
	        flipSequence.reverse = function () {
	          return iterable.flip();
	        };
	        return flipSequence;
	      };
	    }
	    reversedSequence.get = function (key, notSetValue) {
	      return iterable.get(useKeys ? key : -1 - key, notSetValue);
	    };
	    reversedSequence.has = function (key) {
	      return iterable.has(useKeys ? key : -1 - key);
	    };
	    reversedSequence.includes = function (value) {
	      return iterable.includes(value);
	    };
	    reversedSequence.cacheResult = cacheResultThrough;
	    reversedSequence.__iterate = function (fn, reverse) {
	      var this$0 = this;
	      return iterable.__iterate(function (v, k) {
	        return fn(v, k, this$0);
	      }, !reverse);
	    };
	    reversedSequence.__iterator = function (type, reverse) {
	      return iterable.__iterator(type, !reverse);
	    };
	    return reversedSequence;
	  }

	  function filterFactory(iterable, predicate, context, useKeys) {
	    var filterSequence = makeSequence(iterable);
	    if (useKeys) {
	      filterSequence.has = function (key) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && !!predicate.call(context, v, key, iterable);
	      };
	      filterSequence.get = function (key, notSetValue) {
	        var v = iterable.get(key, NOT_SET);
	        return v !== NOT_SET && predicate.call(context, v, key, iterable) ? v : notSetValue;
	      };
	    }
	    filterSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        if (predicate.call(context, v, k, c)) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      }, reverse);
	      return iterations;
	    };
	    filterSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterations = 0;
	      return new Iterator(function () {
	        while (true) {
	          var step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	          var entry = step.value;
	          var key = entry[0];
	          var value = entry[1];
	          if (predicate.call(context, value, key, iterable)) {
	            return iteratorValue(type, useKeys ? key : iterations++, value, step);
	          }
	        }
	      });
	    };
	    return filterSequence;
	  }

	  function countByFactory(iterable, grouper, context) {
	    var groups = Map().asMutable();
	    iterable.__iterate(function (v, k) {
	      groups.update(grouper.call(context, v, k, iterable), 0, function (a) {
	        return a + 1;
	      });
	    });
	    return groups.asImmutable();
	  }

	  function groupByFactory(iterable, grouper, context) {
	    var isKeyedIter = isKeyed(iterable);
	    var groups = (isOrdered(iterable) ? OrderedMap() : Map()).asMutable();
	    iterable.__iterate(function (v, k) {
	      groups.update(grouper.call(context, v, k, iterable), function (a) {
	        return a = a || [], a.push(isKeyedIter ? [k, v] : v), a;
	      });
	    });
	    var coerce = iterableClass(iterable);
	    return groups.map(function (arr) {
	      return reify(iterable, coerce(arr));
	    });
	  }

	  function sliceFactory(iterable, begin, end, useKeys) {
	    var originalSize = iterable.size;

	    // Sanitize begin & end using this shorthand for ToInt32(argument)
	    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
	    if (begin !== undefined) {
	      begin = begin | 0;
	    }
	    if (end !== undefined) {
	      if (end === Infinity) {
	        end = originalSize;
	      } else {
	        end = end | 0;
	      }
	    }

	    if (wholeSlice(begin, end, originalSize)) {
	      return iterable;
	    }

	    var resolvedBegin = resolveBegin(begin, originalSize);
	    var resolvedEnd = resolveEnd(end, originalSize);

	    // begin or end will be NaN if they were provided as negative numbers and
	    // this iterable's size is unknown. In that case, cache first so there is
	    // a known size and these do not resolve to NaN.
	    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
	      return sliceFactory(iterable.toSeq().cacheResult(), begin, end, useKeys);
	    }

	    // Note: resolvedEnd is undefined when the original sequence's length is
	    // unknown and this slice did not supply an end and should contain all
	    // elements after resolvedBegin.
	    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
	    var resolvedSize = resolvedEnd - resolvedBegin;
	    var sliceSize;
	    if (resolvedSize === resolvedSize) {
	      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
	    }

	    var sliceSeq = makeSequence(iterable);

	    // If iterable.size is undefined, the size of the realized sliceSeq is
	    // unknown at this point unless the number of items to slice is 0
	    sliceSeq.size = sliceSize === 0 ? sliceSize : iterable.size && sliceSize || undefined;

	    if (!useKeys && isSeq(iterable) && sliceSize >= 0) {
	      sliceSeq.get = function (index, notSetValue) {
	        index = wrapIndex(this, index);
	        return index >= 0 && index < sliceSize ? iterable.get(index + resolvedBegin, notSetValue) : notSetValue;
	      };
	    }

	    sliceSeq.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (sliceSize === 0) {
	        return 0;
	      }
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var skipped = 0;
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function (v, k) {
	        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0) !== false && iterations !== sliceSize;
	        }
	      });
	      return iterations;
	    };

	    sliceSeq.__iteratorUncached = function (type, reverse) {
	      if (sliceSize !== 0 && reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      // Don't bother instantiating parent iterator if taking 0.
	      var iterator = sliceSize !== 0 && iterable.__iterator(type, reverse);
	      var skipped = 0;
	      var iterations = 0;
	      return new Iterator(function () {
	        while (skipped++ < resolvedBegin) {
	          iterator.next();
	        }
	        if (++iterations > sliceSize) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (useKeys || type === ITERATE_VALUES) {
	          return step;
	        } else if (type === ITERATE_KEYS) {
	          return iteratorValue(type, iterations - 1, undefined, step);
	        } else {
	          return iteratorValue(type, iterations - 1, step.value[1], step);
	        }
	      });
	    };

	    return sliceSeq;
	  }

	  function takeWhileFactory(iterable, predicate, context) {
	    var takeSequence = makeSequence(iterable);
	    takeSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$0);
	      });
	      return iterations;
	    };
	    takeSequence.__iteratorUncached = function (type, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var iterating = true;
	      return new Iterator(function () {
	        if (!iterating) {
	          return iteratorDone();
	        }
	        var step = iterator.next();
	        if (step.done) {
	          return step;
	        }
	        var entry = step.value;
	        var k = entry[0];
	        var v = entry[1];
	        if (!predicate.call(context, v, k, this$0)) {
	          iterating = false;
	          return iteratorDone();
	        }
	        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	      });
	    };
	    return takeSequence;
	  }

	  function skipWhileFactory(iterable, predicate, context, useKeys) {
	    var skipSequence = makeSequence(iterable);
	    skipSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterate(fn, reverse);
	      }
	      var isSkipping = true;
	      var iterations = 0;
	      iterable.__iterate(function (v, k, c) {
	        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
	          iterations++;
	          return fn(v, useKeys ? k : iterations - 1, this$0);
	        }
	      });
	      return iterations;
	    };
	    skipSequence.__iteratorUncached = function (type, reverse) {
	      var this$0 = this;
	      if (reverse) {
	        return this.cacheResult().__iterator(type, reverse);
	      }
	      var iterator = iterable.__iterator(ITERATE_ENTRIES, reverse);
	      var skipping = true;
	      var iterations = 0;
	      return new Iterator(function () {
	        var step, k, v;
	        do {
	          step = iterator.next();
	          if (step.done) {
	            if (useKeys || type === ITERATE_VALUES) {
	              return step;
	            } else if (type === ITERATE_KEYS) {
	              return iteratorValue(type, iterations++, undefined, step);
	            } else {
	              return iteratorValue(type, iterations++, step.value[1], step);
	            }
	          }
	          var entry = step.value;
	          k = entry[0];
	          v = entry[1];
	          skipping && (skipping = predicate.call(context, v, k, this$0));
	        } while (skipping);
	        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
	      });
	    };
	    return skipSequence;
	  }

	  function concatFactory(iterable, values) {
	    var isKeyedIterable = isKeyed(iterable);
	    var iters = [iterable].concat(values).map(function (v) {
	      if (!isIterable(v)) {
	        v = isKeyedIterable ? keyedSeqFromValue(v) : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
	      } else if (isKeyedIterable) {
	        v = KeyedIterable(v);
	      }
	      return v;
	    }).filter(function (v) {
	      return v.size !== 0;
	    });

	    if (iters.length === 0) {
	      return iterable;
	    }

	    if (iters.length === 1) {
	      var singleton = iters[0];
	      if (singleton === iterable || isKeyedIterable && isKeyed(singleton) || isIndexed(iterable) && isIndexed(singleton)) {
	        return singleton;
	      }
	    }

	    var concatSeq = new ArraySeq(iters);
	    if (isKeyedIterable) {
	      concatSeq = concatSeq.toKeyedSeq();
	    } else if (!isIndexed(iterable)) {
	      concatSeq = concatSeq.toSetSeq();
	    }
	    concatSeq = concatSeq.flatten(true);
	    concatSeq.size = iters.reduce(function (sum, seq) {
	      if (sum !== undefined) {
	        var size = seq.size;
	        if (size !== undefined) {
	          return sum + size;
	        }
	      }
	    }, 0);
	    return concatSeq;
	  }

	  function flattenFactory(iterable, depth, useKeys) {
	    var flatSequence = makeSequence(iterable);
	    flatSequence.__iterateUncached = function (fn, reverse) {
	      var iterations = 0;
	      var stopped = false;
	      function flatDeep(iter, currentDepth) {
	        var this$0 = this;
	        iter.__iterate(function (v, k) {
	          if ((!depth || currentDepth < depth) && isIterable(v)) {
	            flatDeep(v, currentDepth + 1);
	          } else if (fn(v, useKeys ? k : iterations++, this$0) === false) {
	            stopped = true;
	          }
	          return !stopped;
	        }, reverse);
	      }
	      flatDeep(iterable, 0);
	      return iterations;
	    };
	    flatSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(type, reverse);
	      var stack = [];
	      var iterations = 0;
	      return new Iterator(function () {
	        while (iterator) {
	          var step = iterator.next();
	          if (step.done !== false) {
	            iterator = stack.pop();
	            continue;
	          }
	          var v = step.value;
	          if (type === ITERATE_ENTRIES) {
	            v = v[1];
	          }
	          if ((!depth || stack.length < depth) && isIterable(v)) {
	            stack.push(iterator);
	            iterator = v.__iterator(type, reverse);
	          } else {
	            return useKeys ? step : iteratorValue(type, iterations++, v, step);
	          }
	        }
	        return iteratorDone();
	      });
	    };
	    return flatSequence;
	  }

	  function flatMapFactory(iterable, mapper, context) {
	    var coerce = iterableClass(iterable);
	    return iterable.toSeq().map(function (v, k) {
	      return coerce(mapper.call(context, v, k, iterable));
	    }).flatten(true);
	  }

	  function interposeFactory(iterable, separator) {
	    var interposedSequence = makeSequence(iterable);
	    interposedSequence.size = iterable.size && iterable.size * 2 - 1;
	    interposedSequence.__iterateUncached = function (fn, reverse) {
	      var this$0 = this;
	      var iterations = 0;
	      iterable.__iterate(function (v, k) {
	        return (!iterations || fn(separator, iterations++, this$0) !== false) && fn(v, iterations++, this$0) !== false;
	      }, reverse);
	      return iterations;
	    };
	    interposedSequence.__iteratorUncached = function (type, reverse) {
	      var iterator = iterable.__iterator(ITERATE_VALUES, reverse);
	      var iterations = 0;
	      var step;
	      return new Iterator(function () {
	        if (!step || iterations % 2) {
	          step = iterator.next();
	          if (step.done) {
	            return step;
	          }
	        }
	        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
	      });
	    };
	    return interposedSequence;
	  }

	  function sortFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    var isKeyedIterable = isKeyed(iterable);
	    var index = 0;
	    var entries = iterable.toSeq().map(function (v, k) {
	      return [k, v, index++, mapper ? mapper(v, k, iterable) : v];
	    }).toArray();
	    entries.sort(function (a, b) {
	      return comparator(a[3], b[3]) || a[2] - b[2];
	    }).forEach(isKeyedIterable ? function (v, i) {
	      entries[i].length = 2;
	    } : function (v, i) {
	      entries[i] = v[1];
	    });
	    return isKeyedIterable ? KeyedSeq(entries) : isIndexed(iterable) ? IndexedSeq(entries) : SetSeq(entries);
	  }

	  function maxFactory(iterable, comparator, mapper) {
	    if (!comparator) {
	      comparator = defaultComparator;
	    }
	    if (mapper) {
	      var entry = iterable.toSeq().map(function (v, k) {
	        return [v, mapper(v, k, iterable)];
	      }).reduce(function (a, b) {
	        return maxCompare(comparator, a[1], b[1]) ? b : a;
	      });
	      return entry && entry[0];
	    } else {
	      return iterable.reduce(function (a, b) {
	        return maxCompare(comparator, a, b) ? b : a;
	      });
	    }
	  }

	  function maxCompare(comparator, a, b) {
	    var comp = comparator(b, a);
	    // b is considered the new max if the comparator declares them equal, but
	    // they are not equal and b is in fact a nullish value.
	    return comp === 0 && b !== a && (b === undefined || b === null || b !== b) || comp > 0;
	  }

	  function zipWithFactory(keyIter, zipper, iters) {
	    var zipSequence = makeSequence(keyIter);
	    zipSequence.size = new ArraySeq(iters).map(function (i) {
	      return i.size;
	    }).min();
	    // Note: this a generic base implementation of __iterate in terms of
	    // __iterator which may be more generically useful in the future.
	    zipSequence.__iterate = function (fn, reverse) {
	      /* generic:
	      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        iterations++;
	        if (fn(step.value[1], step.value[0], this) === false) {
	          break;
	        }
	      }
	      return iterations;
	      */
	      // indexed:
	      var iterator = this.__iterator(ITERATE_VALUES, reverse);
	      var step;
	      var iterations = 0;
	      while (!(step = iterator.next()).done) {
	        if (fn(step.value, iterations++, this) === false) {
	          break;
	        }
	      }
	      return iterations;
	    };
	    zipSequence.__iteratorUncached = function (type, reverse) {
	      var iterators = iters.map(function (i) {
	        return i = Iterable(i), getIterator(reverse ? i.reverse() : i);
	      });
	      var iterations = 0;
	      var isDone = false;
	      return new Iterator(function () {
	        var steps;
	        if (!isDone) {
	          steps = iterators.map(function (i) {
	            return i.next();
	          });
	          isDone = steps.some(function (s) {
	            return s.done;
	          });
	        }
	        if (isDone) {
	          return iteratorDone();
	        }
	        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function (s) {
	          return s.value;
	        })));
	      });
	    };
	    return zipSequence;
	  }

	  // #pragma Helper Functions

	  function reify(iter, seq) {
	    return isSeq(iter) ? seq : iter.constructor(seq);
	  }

	  function validateEntry(entry) {
	    if (entry !== Object(entry)) {
	      throw new TypeError('Expected [K, V] tuple: ' + entry);
	    }
	  }

	  function resolveSize(iter) {
	    assertNotInfinite(iter.size);
	    return ensureSize(iter);
	  }

	  function iterableClass(iterable) {
	    return isKeyed(iterable) ? KeyedIterable : isIndexed(iterable) ? IndexedIterable : SetIterable;
	  }

	  function makeSequence(iterable) {
	    return Object.create((isKeyed(iterable) ? KeyedSeq : isIndexed(iterable) ? IndexedSeq : SetSeq).prototype);
	  }

	  function cacheResultThrough() {
	    if (this._iter.cacheResult) {
	      this._iter.cacheResult();
	      this.size = this._iter.size;
	      return this;
	    } else {
	      return Seq.prototype.cacheResult.call(this);
	    }
	  }

	  function defaultComparator(a, b) {
	    return a > b ? 1 : a < b ? -1 : 0;
	  }

	  function forceIterator(keyPath) {
	    var iter = getIterator(keyPath);
	    if (!iter) {
	      // Array might not be iterable in this environment, so we need a fallback
	      // to our wrapped type.
	      if (!isArrayLike(keyPath)) {
	        throw new TypeError('Expected iterable or array-like: ' + keyPath);
	      }
	      iter = getIterator(Iterable(keyPath));
	    }
	    return iter;
	  }

	  createClass(Record, KeyedCollection);

	  function Record(defaultValues, name) {
	    var hasInitialized;

	    var RecordType = function Record(values) {
	      if (values instanceof RecordType) {
	        return values;
	      }
	      if (!(this instanceof RecordType)) {
	        return new RecordType(values);
	      }
	      if (!hasInitialized) {
	        hasInitialized = true;
	        var keys = Object.keys(defaultValues);
	        setProps(RecordTypePrototype, keys);
	        RecordTypePrototype.size = keys.length;
	        RecordTypePrototype._name = name;
	        RecordTypePrototype._keys = keys;
	        RecordTypePrototype._defaultValues = defaultValues;
	      }
	      this._map = Map(values);
	    };

	    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
	    RecordTypePrototype.constructor = RecordType;

	    return RecordType;
	  }

	  Record.prototype.toString = function () {
	    return this.__toString(recordName(this) + ' {', '}');
	  };

	  // @pragma Access

	  Record.prototype.has = function (k) {
	    return this._defaultValues.hasOwnProperty(k);
	  };

	  Record.prototype.get = function (k, notSetValue) {
	    if (!this.has(k)) {
	      return notSetValue;
	    }
	    var defaultVal = this._defaultValues[k];
	    return this._map ? this._map.get(k, defaultVal) : defaultVal;
	  };

	  // @pragma Modification

	  Record.prototype.clear = function () {
	    if (this.__ownerID) {
	      this._map && this._map.clear();
	      return this;
	    }
	    var RecordType = this.constructor;
	    return RecordType._empty || (RecordType._empty = makeRecord(this, emptyMap()));
	  };

	  Record.prototype.set = function (k, v) {
	    if (!this.has(k)) {
	      throw new Error('Cannot set unknown key "' + k + '" on ' + recordName(this));
	    }
	    if (this._map && !this._map.has(k)) {
	      var defaultVal = this._defaultValues[k];
	      if (v === defaultVal) {
	        return this;
	      }
	    }
	    var newMap = this._map && this._map.set(k, v);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  };

	  Record.prototype.remove = function (k) {
	    if (!this.has(k)) {
	      return this;
	    }
	    var newMap = this._map && this._map.remove(k);
	    if (this.__ownerID || newMap === this._map) {
	      return this;
	    }
	    return makeRecord(this, newMap);
	  };

	  Record.prototype.wasAltered = function () {
	    return this._map.wasAltered();
	  };

	  Record.prototype.__iterator = function (type, reverse) {
	    var this$0 = this;
	    return KeyedIterable(this._defaultValues).map(function (_, k) {
	      return this$0.get(k);
	    }).__iterator(type, reverse);
	  };

	  Record.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return KeyedIterable(this._defaultValues).map(function (_, k) {
	      return this$0.get(k);
	    }).__iterate(fn, reverse);
	  };

	  Record.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map && this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return makeRecord(this, newMap, ownerID);
	  };

	  var RecordPrototype = Record.prototype;
	  RecordPrototype[DELETE] = RecordPrototype.remove;
	  RecordPrototype.deleteIn = RecordPrototype.removeIn = MapPrototype.removeIn;
	  RecordPrototype.merge = MapPrototype.merge;
	  RecordPrototype.mergeWith = MapPrototype.mergeWith;
	  RecordPrototype.mergeIn = MapPrototype.mergeIn;
	  RecordPrototype.mergeDeep = MapPrototype.mergeDeep;
	  RecordPrototype.mergeDeepWith = MapPrototype.mergeDeepWith;
	  RecordPrototype.mergeDeepIn = MapPrototype.mergeDeepIn;
	  RecordPrototype.setIn = MapPrototype.setIn;
	  RecordPrototype.update = MapPrototype.update;
	  RecordPrototype.updateIn = MapPrototype.updateIn;
	  RecordPrototype.withMutations = MapPrototype.withMutations;
	  RecordPrototype.asMutable = MapPrototype.asMutable;
	  RecordPrototype.asImmutable = MapPrototype.asImmutable;

	  function makeRecord(likeRecord, map, ownerID) {
	    var record = Object.create(Object.getPrototypeOf(likeRecord));
	    record._map = map;
	    record.__ownerID = ownerID;
	    return record;
	  }

	  function recordName(record) {
	    return record._name || record.constructor.name || 'Record';
	  }

	  function setProps(prototype, names) {
	    try {
	      names.forEach(setProp.bind(undefined, prototype));
	    } catch (error) {
	      // Object.defineProperty failed. Probably IE8.
	    }
	  }

	  function setProp(prototype, name) {
	    Object.defineProperty(prototype, name, {
	      get: function get() {
	        return this.get(name);
	      },
	      set: function set(value) {
	        invariant(this.__ownerID, 'Cannot set on an immutable record.');
	        this.set(name, value);
	      }
	    });
	  }

	  createClass(Set, SetCollection);

	  // @pragma Construction

	  function Set(value) {
	    return value === null || value === undefined ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function (set) {
	      var iter = SetIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  Set.of = function () /*...values*/{
	    return this(arguments);
	  };

	  Set.fromKeys = function (value) {
	    return this(KeyedIterable(value).keySeq());
	  };

	  Set.prototype.toString = function () {
	    return this.__toString('Set {', '}');
	  };

	  // @pragma Access

	  Set.prototype.has = function (value) {
	    return this._map.has(value);
	  };

	  // @pragma Modification

	  Set.prototype.add = function (value) {
	    return updateSet(this, this._map.set(value, true));
	  };

	  Set.prototype.remove = function (value) {
	    return updateSet(this, this._map.remove(value));
	  };

	  Set.prototype.clear = function () {
	    return updateSet(this, this._map.clear());
	  };

	  // @pragma Composition

	  Set.prototype.union = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    iters = iters.filter(function (x) {
	      return x.size !== 0;
	    });
	    if (iters.length === 0) {
	      return this;
	    }
	    if (this.size === 0 && !this.__ownerID && iters.length === 1) {
	      return this.constructor(iters[0]);
	    }
	    return this.withMutations(function (set) {
	      for (var ii = 0; ii < iters.length; ii++) {
	        SetIterable(iters[ii]).forEach(function (value) {
	          return set.add(value);
	        });
	      }
	    });
	  };

	  Set.prototype.intersect = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) {
	      return SetIterable(iter);
	    });
	    var originalSet = this;
	    return this.withMutations(function (set) {
	      originalSet.forEach(function (value) {
	        if (!iters.every(function (iter) {
	          return iter.includes(value);
	        })) {
	          set.remove(value);
	        }
	      });
	    });
	  };

	  Set.prototype.subtract = function () {
	    var iters = SLICE$0.call(arguments, 0);
	    if (iters.length === 0) {
	      return this;
	    }
	    iters = iters.map(function (iter) {
	      return SetIterable(iter);
	    });
	    var originalSet = this;
	    return this.withMutations(function (set) {
	      originalSet.forEach(function (value) {
	        if (iters.some(function (iter) {
	          return iter.includes(value);
	        })) {
	          set.remove(value);
	        }
	      });
	    });
	  };

	  Set.prototype.merge = function () {
	    return this.union.apply(this, arguments);
	  };

	  Set.prototype.mergeWith = function (merger) {
	    var iters = SLICE$0.call(arguments, 1);
	    return this.union.apply(this, iters);
	  };

	  Set.prototype.sort = function (comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator));
	  };

	  Set.prototype.sortBy = function (mapper, comparator) {
	    // Late binding
	    return OrderedSet(sortFactory(this, comparator, mapper));
	  };

	  Set.prototype.wasAltered = function () {
	    return this._map.wasAltered();
	  };

	  Set.prototype.__iterate = function (fn, reverse) {
	    var this$0 = this;
	    return this._map.__iterate(function (_, k) {
	      return fn(k, k, this$0);
	    }, reverse);
	  };

	  Set.prototype.__iterator = function (type, reverse) {
	    return this._map.map(function (_, k) {
	      return k;
	    }).__iterator(type, reverse);
	  };

	  Set.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    var newMap = this._map.__ensureOwner(ownerID);
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this._map = newMap;
	      return this;
	    }
	    return this.__make(newMap, ownerID);
	  };

	  function isSet(maybeSet) {
	    return !!(maybeSet && maybeSet[IS_SET_SENTINEL]);
	  }

	  Set.isSet = isSet;

	  var IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';

	  var SetPrototype = Set.prototype;
	  SetPrototype[IS_SET_SENTINEL] = true;
	  SetPrototype[DELETE] = SetPrototype.remove;
	  SetPrototype.mergeDeep = SetPrototype.merge;
	  SetPrototype.mergeDeepWith = SetPrototype.mergeWith;
	  SetPrototype.withMutations = MapPrototype.withMutations;
	  SetPrototype.asMutable = MapPrototype.asMutable;
	  SetPrototype.asImmutable = MapPrototype.asImmutable;

	  SetPrototype.__empty = emptySet;
	  SetPrototype.__make = makeSet;

	  function updateSet(set, newMap) {
	    if (set.__ownerID) {
	      set.size = newMap.size;
	      set._map = newMap;
	      return set;
	    }
	    return newMap === set._map ? set : newMap.size === 0 ? set.__empty() : set.__make(newMap);
	  }

	  function makeSet(map, ownerID) {
	    var set = Object.create(SetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_SET;
	  function emptySet() {
	    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
	  }

	  createClass(OrderedSet, Set);

	  // @pragma Construction

	  function OrderedSet(value) {
	    return value === null || value === undefined ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function (set) {
	      var iter = SetIterable(value);
	      assertNotInfinite(iter.size);
	      iter.forEach(function (v) {
	        return set.add(v);
	      });
	    });
	  }

	  OrderedSet.of = function () /*...values*/{
	    return this(arguments);
	  };

	  OrderedSet.fromKeys = function (value) {
	    return this(KeyedIterable(value).keySeq());
	  };

	  OrderedSet.prototype.toString = function () {
	    return this.__toString('OrderedSet {', '}');
	  };

	  function isOrderedSet(maybeOrderedSet) {
	    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
	  }

	  OrderedSet.isOrderedSet = isOrderedSet;

	  var OrderedSetPrototype = OrderedSet.prototype;
	  OrderedSetPrototype[IS_ORDERED_SENTINEL] = true;

	  OrderedSetPrototype.__empty = emptyOrderedSet;
	  OrderedSetPrototype.__make = makeOrderedSet;

	  function makeOrderedSet(map, ownerID) {
	    var set = Object.create(OrderedSetPrototype);
	    set.size = map ? map.size : 0;
	    set._map = map;
	    set.__ownerID = ownerID;
	    return set;
	  }

	  var EMPTY_ORDERED_SET;
	  function emptyOrderedSet() {
	    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
	  }

	  createClass(Stack, IndexedCollection);

	  // @pragma Construction

	  function Stack(value) {
	    return value === null || value === undefined ? emptyStack() : isStack(value) ? value : emptyStack().unshiftAll(value);
	  }

	  Stack.of = function () /*...values*/{
	    return this(arguments);
	  };

	  Stack.prototype.toString = function () {
	    return this.__toString('Stack [', ']');
	  };

	  // @pragma Access

	  Stack.prototype.get = function (index, notSetValue) {
	    var head = this._head;
	    index = wrapIndex(this, index);
	    while (head && index--) {
	      head = head.next;
	    }
	    return head ? head.value : notSetValue;
	  };

	  Stack.prototype.peek = function () {
	    return this._head && this._head.value;
	  };

	  // @pragma Modification

	  Stack.prototype.push = function () /*...values*/{
	    if (arguments.length === 0) {
	      return this;
	    }
	    var newSize = this.size + arguments.length;
	    var head = this._head;
	    for (var ii = arguments.length - 1; ii >= 0; ii--) {
	      head = {
	        value: arguments[ii],
	        next: head
	      };
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pushAll = function (iter) {
	    iter = IndexedIterable(iter);
	    if (iter.size === 0) {
	      return this;
	    }
	    assertNotInfinite(iter.size);
	    var newSize = this.size;
	    var head = this._head;
	    iter.reverse().forEach(function (value) {
	      newSize++;
	      head = {
	        value: value,
	        next: head
	      };
	    });
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  Stack.prototype.pop = function () {
	    return this.slice(1);
	  };

	  Stack.prototype.unshift = function () /*...values*/{
	    return this.push.apply(this, arguments);
	  };

	  Stack.prototype.unshiftAll = function (iter) {
	    return this.pushAll(iter);
	  };

	  Stack.prototype.shift = function () {
	    return this.pop.apply(this, arguments);
	  };

	  Stack.prototype.clear = function () {
	    if (this.size === 0) {
	      return this;
	    }
	    if (this.__ownerID) {
	      this.size = 0;
	      this._head = undefined;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return emptyStack();
	  };

	  Stack.prototype.slice = function (begin, end) {
	    if (wholeSlice(begin, end, this.size)) {
	      return this;
	    }
	    var resolvedBegin = resolveBegin(begin, this.size);
	    var resolvedEnd = resolveEnd(end, this.size);
	    if (resolvedEnd !== this.size) {
	      // super.slice(begin, end);
	      return IndexedCollection.prototype.slice.call(this, begin, end);
	    }
	    var newSize = this.size - resolvedBegin;
	    var head = this._head;
	    while (resolvedBegin--) {
	      head = head.next;
	    }
	    if (this.__ownerID) {
	      this.size = newSize;
	      this._head = head;
	      this.__hash = undefined;
	      this.__altered = true;
	      return this;
	    }
	    return makeStack(newSize, head);
	  };

	  // @pragma Mutability

	  Stack.prototype.__ensureOwner = function (ownerID) {
	    if (ownerID === this.__ownerID) {
	      return this;
	    }
	    if (!ownerID) {
	      this.__ownerID = ownerID;
	      this.__altered = false;
	      return this;
	    }
	    return makeStack(this.size, this._head, ownerID, this.__hash);
	  };

	  // @pragma Iteration

	  Stack.prototype.__iterate = function (fn, reverse) {
	    if (reverse) {
	      return this.reverse().__iterate(fn);
	    }
	    var iterations = 0;
	    var node = this._head;
	    while (node) {
	      if (fn(node.value, iterations++, this) === false) {
	        break;
	      }
	      node = node.next;
	    }
	    return iterations;
	  };

	  Stack.prototype.__iterator = function (type, reverse) {
	    if (reverse) {
	      return this.reverse().__iterator(type);
	    }
	    var iterations = 0;
	    var node = this._head;
	    return new Iterator(function () {
	      if (node) {
	        var value = node.value;
	        node = node.next;
	        return iteratorValue(type, iterations++, value);
	      }
	      return iteratorDone();
	    });
	  };

	  function isStack(maybeStack) {
	    return !!(maybeStack && maybeStack[IS_STACK_SENTINEL]);
	  }

	  Stack.isStack = isStack;

	  var IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

	  var StackPrototype = Stack.prototype;
	  StackPrototype[IS_STACK_SENTINEL] = true;
	  StackPrototype.withMutations = MapPrototype.withMutations;
	  StackPrototype.asMutable = MapPrototype.asMutable;
	  StackPrototype.asImmutable = MapPrototype.asImmutable;
	  StackPrototype.wasAltered = MapPrototype.wasAltered;

	  function makeStack(size, head, ownerID, hash) {
	    var map = Object.create(StackPrototype);
	    map.size = size;
	    map._head = head;
	    map.__ownerID = ownerID;
	    map.__hash = hash;
	    map.__altered = false;
	    return map;
	  }

	  var EMPTY_STACK;
	  function emptyStack() {
	    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
	  }

	  /**
	   * Contributes additional methods to a constructor
	   */
	  function mixin(ctor, methods) {
	    var keyCopier = function keyCopier(key) {
	      ctor.prototype[key] = methods[key];
	    };
	    Object.keys(methods).forEach(keyCopier);
	    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
	    return ctor;
	  }

	  Iterable.Iterator = Iterator;

	  mixin(Iterable, {

	    // ### Conversion to other types

	    toArray: function toArray() {
	      assertNotInfinite(this.size);
	      var array = new Array(this.size || 0);
	      this.valueSeq().__iterate(function (v, i) {
	        array[i] = v;
	      });
	      return array;
	    },

	    toIndexedSeq: function toIndexedSeq() {
	      return new ToIndexedSequence(this);
	    },

	    toJS: function toJS() {
	      return this.toSeq().map(function (value) {
	        return value && typeof value.toJS === 'function' ? value.toJS() : value;
	      }).__toJS();
	    },

	    toJSON: function toJSON() {
	      return this.toSeq().map(function (value) {
	        return value && typeof value.toJSON === 'function' ? value.toJSON() : value;
	      }).__toJS();
	    },

	    toKeyedSeq: function toKeyedSeq() {
	      return new ToKeyedSequence(this, true);
	    },

	    toMap: function toMap() {
	      // Use Late Binding here to solve the circular dependency.
	      return Map(this.toKeyedSeq());
	    },

	    toObject: function toObject() {
	      assertNotInfinite(this.size);
	      var object = {};
	      this.__iterate(function (v, k) {
	        object[k] = v;
	      });
	      return object;
	    },

	    toOrderedMap: function toOrderedMap() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedMap(this.toKeyedSeq());
	    },

	    toOrderedSet: function toOrderedSet() {
	      // Use Late Binding here to solve the circular dependency.
	      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSet: function toSet() {
	      // Use Late Binding here to solve the circular dependency.
	      return Set(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toSetSeq: function toSetSeq() {
	      return new ToSetSequence(this);
	    },

	    toSeq: function toSeq() {
	      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
	    },

	    toStack: function toStack() {
	      // Use Late Binding here to solve the circular dependency.
	      return Stack(isKeyed(this) ? this.valueSeq() : this);
	    },

	    toList: function toList() {
	      // Use Late Binding here to solve the circular dependency.
	      return List(isKeyed(this) ? this.valueSeq() : this);
	    },

	    // ### Common JavaScript methods and properties

	    toString: function toString() {
	      return '[Iterable]';
	    },

	    __toString: function __toString(head, tail) {
	      if (this.size === 0) {
	        return head + tail;
	      }
	      return head + ' ' + this.toSeq().map(this.__toStringMapper).join(', ') + ' ' + tail;
	    },

	    // ### ES6 Collection methods (ES6 Array and Map)

	    concat: function concat() {
	      var values = SLICE$0.call(arguments, 0);
	      return reify(this, concatFactory(this, values));
	    },

	    includes: function includes(searchValue) {
	      return this.some(function (value) {
	        return is(value, searchValue);
	      });
	    },

	    entries: function entries() {
	      return this.__iterator(ITERATE_ENTRIES);
	    },

	    every: function every(predicate, context) {
	      assertNotInfinite(this.size);
	      var returnValue = true;
	      this.__iterate(function (v, k, c) {
	        if (!predicate.call(context, v, k, c)) {
	          returnValue = false;
	          return false;
	        }
	      });
	      return returnValue;
	    },

	    filter: function filter(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, true));
	    },

	    find: function find(predicate, context, notSetValue) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[1] : notSetValue;
	    },

	    forEach: function forEach(sideEffect, context) {
	      assertNotInfinite(this.size);
	      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
	    },

	    join: function join(separator) {
	      assertNotInfinite(this.size);
	      separator = separator !== undefined ? '' + separator : ',';
	      var joined = '';
	      var isFirst = true;
	      this.__iterate(function (v) {
	        isFirst ? isFirst = false : joined += separator;
	        joined += v !== null && v !== undefined ? v.toString() : '';
	      });
	      return joined;
	    },

	    keys: function keys() {
	      return this.__iterator(ITERATE_KEYS);
	    },

	    map: function map(mapper, context) {
	      return reify(this, mapFactory(this, mapper, context));
	    },

	    reduce: function reduce(reducer, initialReduction, context) {
	      assertNotInfinite(this.size);
	      var reduction;
	      var useFirst;
	      if (arguments.length < 2) {
	        useFirst = true;
	      } else {
	        reduction = initialReduction;
	      }
	      this.__iterate(function (v, k, c) {
	        if (useFirst) {
	          useFirst = false;
	          reduction = v;
	        } else {
	          reduction = reducer.call(context, reduction, v, k, c);
	        }
	      });
	      return reduction;
	    },

	    reduceRight: function reduceRight(reducer, initialReduction, context) {
	      var reversed = this.toKeyedSeq().reverse();
	      return reversed.reduce.apply(reversed, arguments);
	    },

	    reverse: function reverse() {
	      return reify(this, reverseFactory(this, true));
	    },

	    slice: function slice(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, true));
	    },

	    some: function some(predicate, context) {
	      return !this.every(not(predicate), context);
	    },

	    sort: function sort(comparator) {
	      return reify(this, sortFactory(this, comparator));
	    },

	    values: function values() {
	      return this.__iterator(ITERATE_VALUES);
	    },

	    // ### More sequential methods

	    butLast: function butLast() {
	      return this.slice(0, -1);
	    },

	    isEmpty: function isEmpty() {
	      return this.size !== undefined ? this.size === 0 : !this.some(function () {
	        return true;
	      });
	    },

	    count: function count(predicate, context) {
	      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
	    },

	    countBy: function countBy(grouper, context) {
	      return countByFactory(this, grouper, context);
	    },

	    equals: function equals(other) {
	      return deepEqual(this, other);
	    },

	    entrySeq: function entrySeq() {
	      var iterable = this;
	      if (iterable._cache) {
	        // We cache as an entries array, so we can just return the cache!
	        return new ArraySeq(iterable._cache);
	      }
	      var entriesSequence = iterable.toSeq().map(entryMapper).toIndexedSeq();
	      entriesSequence.fromEntrySeq = function () {
	        return iterable.toSeq();
	      };
	      return entriesSequence;
	    },

	    filterNot: function filterNot(predicate, context) {
	      return this.filter(not(predicate), context);
	    },

	    findEntry: function findEntry(predicate, context, notSetValue) {
	      var found = notSetValue;
	      this.__iterate(function (v, k, c) {
	        if (predicate.call(context, v, k, c)) {
	          found = [k, v];
	          return false;
	        }
	      });
	      return found;
	    },

	    findKey: function findKey(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry && entry[0];
	    },

	    findLast: function findLast(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
	    },

	    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
	      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
	    },

	    findLastKey: function findLastKey(predicate, context) {
	      return this.toKeyedSeq().reverse().findKey(predicate, context);
	    },

	    first: function first() {
	      return this.find(returnTrue);
	    },

	    flatMap: function flatMap(mapper, context) {
	      return reify(this, flatMapFactory(this, mapper, context));
	    },

	    flatten: function flatten(depth) {
	      return reify(this, flattenFactory(this, depth, true));
	    },

	    fromEntrySeq: function fromEntrySeq() {
	      return new FromEntriesSequence(this);
	    },

	    get: function get(searchKey, notSetValue) {
	      return this.find(function (_, key) {
	        return is(key, searchKey);
	      }, undefined, notSetValue);
	    },

	    getIn: function getIn(searchKeyPath, notSetValue) {
	      var nested = this;
	      // Note: in an ES6 environment, we would prefer:
	      // for (var key of searchKeyPath) {
	      var iter = forceIterator(searchKeyPath);
	      var step;
	      while (!(step = iter.next()).done) {
	        var key = step.value;
	        nested = nested && nested.get ? nested.get(key, NOT_SET) : NOT_SET;
	        if (nested === NOT_SET) {
	          return notSetValue;
	        }
	      }
	      return nested;
	    },

	    groupBy: function groupBy(grouper, context) {
	      return groupByFactory(this, grouper, context);
	    },

	    has: function has(searchKey) {
	      return this.get(searchKey, NOT_SET) !== NOT_SET;
	    },

	    hasIn: function hasIn(searchKeyPath) {
	      return this.getIn(searchKeyPath, NOT_SET) !== NOT_SET;
	    },

	    isSubset: function isSubset(iter) {
	      iter = typeof iter.includes === 'function' ? iter : Iterable(iter);
	      return this.every(function (value) {
	        return iter.includes(value);
	      });
	    },

	    isSuperset: function isSuperset(iter) {
	      iter = typeof iter.isSubset === 'function' ? iter : Iterable(iter);
	      return iter.isSubset(this);
	    },

	    keyOf: function keyOf(searchValue) {
	      return this.findKey(function (value) {
	        return is(value, searchValue);
	      });
	    },

	    keySeq: function keySeq() {
	      return this.toSeq().map(keyMapper).toIndexedSeq();
	    },

	    last: function last() {
	      return this.toSeq().reverse().first();
	    },

	    lastKeyOf: function lastKeyOf(searchValue) {
	      return this.toKeyedSeq().reverse().keyOf(searchValue);
	    },

	    max: function max(comparator) {
	      return maxFactory(this, comparator);
	    },

	    maxBy: function maxBy(mapper, comparator) {
	      return maxFactory(this, comparator, mapper);
	    },

	    min: function min(comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
	    },

	    minBy: function minBy(mapper, comparator) {
	      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
	    },

	    rest: function rest() {
	      return this.slice(1);
	    },

	    skip: function skip(amount) {
	      return this.slice(Math.max(0, amount));
	    },

	    skipLast: function skipLast(amount) {
	      return reify(this, this.toSeq().reverse().skip(amount).reverse());
	    },

	    skipWhile: function skipWhile(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, true));
	    },

	    skipUntil: function skipUntil(predicate, context) {
	      return this.skipWhile(not(predicate), context);
	    },

	    sortBy: function sortBy(mapper, comparator) {
	      return reify(this, sortFactory(this, comparator, mapper));
	    },

	    take: function take(amount) {
	      return this.slice(0, Math.max(0, amount));
	    },

	    takeLast: function takeLast(amount) {
	      return reify(this, this.toSeq().reverse().take(amount).reverse());
	    },

	    takeWhile: function takeWhile(predicate, context) {
	      return reify(this, takeWhileFactory(this, predicate, context));
	    },

	    takeUntil: function takeUntil(predicate, context) {
	      return this.takeWhile(not(predicate), context);
	    },

	    valueSeq: function valueSeq() {
	      return this.toIndexedSeq();
	    },

	    // ### Hashable Object

	    hashCode: function hashCode() {
	      return this.__hash || (this.__hash = hashIterable(this));
	    }

	    // ### Internal

	    // abstract __iterate(fn, reverse)

	    // abstract __iterator(type, reverse)
	  });

	  // var IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
	  // var IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
	  // var IS_INDEXED_SENTINEL = '@@__IMMUTABLE_INDEXED__@@';
	  // var IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';

	  var IterablePrototype = Iterable.prototype;
	  IterablePrototype[IS_ITERABLE_SENTINEL] = true;
	  IterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.values;
	  IterablePrototype.__toJS = IterablePrototype.toArray;
	  IterablePrototype.__toStringMapper = quoteString;
	  IterablePrototype.inspect = IterablePrototype.toSource = function () {
	    return this.toString();
	  };
	  IterablePrototype.chain = IterablePrototype.flatMap;
	  IterablePrototype.contains = IterablePrototype.includes;

	  mixin(KeyedIterable, {

	    // ### More sequential methods

	    flip: function flip() {
	      return reify(this, flipFactory(this));
	    },

	    mapEntries: function mapEntries(mapper, context) {
	      var this$0 = this;
	      var iterations = 0;
	      return reify(this, this.toSeq().map(function (v, k) {
	        return mapper.call(context, [k, v], iterations++, this$0);
	      }).fromEntrySeq());
	    },

	    mapKeys: function mapKeys(mapper, context) {
	      var this$0 = this;
	      return reify(this, this.toSeq().flip().map(function (k, v) {
	        return mapper.call(context, k, v, this$0);
	      }).flip());
	    }

	  });

	  var KeyedIterablePrototype = KeyedIterable.prototype;
	  KeyedIterablePrototype[IS_KEYED_SENTINEL] = true;
	  KeyedIterablePrototype[ITERATOR_SYMBOL] = IterablePrototype.entries;
	  KeyedIterablePrototype.__toJS = IterablePrototype.toObject;
	  KeyedIterablePrototype.__toStringMapper = function (v, k) {
	    return JSON.stringify(k) + ': ' + quoteString(v);
	  };

	  mixin(IndexedIterable, {

	    // ### Conversion to other types

	    toKeyedSeq: function toKeyedSeq() {
	      return new ToKeyedSequence(this, false);
	    },

	    // ### ES6 Collection methods (ES6 Array and Map)

	    filter: function filter(predicate, context) {
	      return reify(this, filterFactory(this, predicate, context, false));
	    },

	    findIndex: function findIndex(predicate, context) {
	      var entry = this.findEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    indexOf: function indexOf(searchValue) {
	      var key = this.keyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    lastIndexOf: function lastIndexOf(searchValue) {
	      var key = this.lastKeyOf(searchValue);
	      return key === undefined ? -1 : key;
	    },

	    reverse: function reverse() {
	      return reify(this, reverseFactory(this, false));
	    },

	    slice: function slice(begin, end) {
	      return reify(this, sliceFactory(this, begin, end, false));
	    },

	    splice: function splice(index, removeNum /*, ...values*/) {
	      var numArgs = arguments.length;
	      removeNum = Math.max(removeNum | 0, 0);
	      if (numArgs === 0 || numArgs === 2 && !removeNum) {
	        return this;
	      }
	      // If index is negative, it should resolve relative to the size of the
	      // collection. However size may be expensive to compute if not cached, so
	      // only call count() if the number is in fact negative.
	      index = resolveBegin(index, index < 0 ? this.count() : this.size);
	      var spliced = this.slice(0, index);
	      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
	    },

	    // ### More collection methods

	    findLastIndex: function findLastIndex(predicate, context) {
	      var entry = this.findLastEntry(predicate, context);
	      return entry ? entry[0] : -1;
	    },

	    first: function first() {
	      return this.get(0);
	    },

	    flatten: function flatten(depth) {
	      return reify(this, flattenFactory(this, depth, false));
	    },

	    get: function get(index, notSetValue) {
	      index = wrapIndex(this, index);
	      return index < 0 || this.size === Infinity || this.size !== undefined && index > this.size ? notSetValue : this.find(function (_, key) {
	        return key === index;
	      }, undefined, notSetValue);
	    },

	    has: function has(index) {
	      index = wrapIndex(this, index);
	      return index >= 0 && (this.size !== undefined ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
	    },

	    interpose: function interpose(separator) {
	      return reify(this, interposeFactory(this, separator));
	    },

	    interleave: function interleave() /*...iterables*/{
	      var iterables = [this].concat(arrCopy(arguments));
	      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, iterables);
	      var interleaved = zipped.flatten(true);
	      if (zipped.size) {
	        interleaved.size = zipped.size * iterables.length;
	      }
	      return reify(this, interleaved);
	    },

	    keySeq: function keySeq() {
	      return Range(0, this.size);
	    },

	    last: function last() {
	      return this.get(-1);
	    },

	    skipWhile: function skipWhile(predicate, context) {
	      return reify(this, skipWhileFactory(this, predicate, context, false));
	    },

	    zip: function zip() /*, ...iterables */{
	      var iterables = [this].concat(arrCopy(arguments));
	      return reify(this, zipWithFactory(this, defaultZipper, iterables));
	    },

	    zipWith: function zipWith(zipper /*, ...iterables */) {
	      var iterables = arrCopy(arguments);
	      iterables[0] = this;
	      return reify(this, zipWithFactory(this, zipper, iterables));
	    }

	  });

	  IndexedIterable.prototype[IS_INDEXED_SENTINEL] = true;
	  IndexedIterable.prototype[IS_ORDERED_SENTINEL] = true;

	  mixin(SetIterable, {

	    // ### ES6 Collection methods (ES6 Array and Map)

	    get: function get(value, notSetValue) {
	      return this.has(value) ? value : notSetValue;
	    },

	    includes: function includes(value) {
	      return this.has(value);
	    },

	    // ### More sequential methods

	    keySeq: function keySeq() {
	      return this.valueSeq();
	    }

	  });

	  SetIterable.prototype.has = IterablePrototype.includes;
	  SetIterable.prototype.contains = SetIterable.prototype.includes;

	  // Mixin subclasses

	  mixin(KeyedSeq, KeyedIterable.prototype);
	  mixin(IndexedSeq, IndexedIterable.prototype);
	  mixin(SetSeq, SetIterable.prototype);

	  mixin(KeyedCollection, KeyedIterable.prototype);
	  mixin(IndexedCollection, IndexedIterable.prototype);
	  mixin(SetCollection, SetIterable.prototype);

	  // #pragma Helper functions

	  function keyMapper(v, k) {
	    return k;
	  }

	  function entryMapper(v, k) {
	    return [k, v];
	  }

	  function not(predicate) {
	    return function () {
	      return !predicate.apply(this, arguments);
	    };
	  }

	  function neg(predicate) {
	    return function () {
	      return -predicate.apply(this, arguments);
	    };
	  }

	  function quoteString(value) {
	    return typeof value === 'string' ? JSON.stringify(value) : String(value);
	  }

	  function defaultZipper() {
	    return arrCopy(arguments);
	  }

	  function defaultNegComparator(a, b) {
	    return a < b ? 1 : a > b ? -1 : 0;
	  }

	  function hashIterable(iterable) {
	    if (iterable.size === Infinity) {
	      return 0;
	    }
	    var ordered = isOrdered(iterable);
	    var keyed = isKeyed(iterable);
	    var h = ordered ? 1 : 0;
	    var size = iterable.__iterate(keyed ? ordered ? function (v, k) {
	      h = 31 * h + hashMerge(hash(v), hash(k)) | 0;
	    } : function (v, k) {
	      h = h + hashMerge(hash(v), hash(k)) | 0;
	    } : ordered ? function (v) {
	      h = 31 * h + hash(v) | 0;
	    } : function (v) {
	      h = h + hash(v) | 0;
	    });
	    return murmurHashOfSize(size, h);
	  }

	  function murmurHashOfSize(size, h) {
	    h = imul(h, 0xCC9E2D51);
	    h = imul(h << 15 | h >>> -15, 0x1B873593);
	    h = imul(h << 13 | h >>> -13, 5);
	    h = (h + 0xE6546B64 | 0) ^ size;
	    h = imul(h ^ h >>> 16, 0x85EBCA6B);
	    h = imul(h ^ h >>> 13, 0xC2B2AE35);
	    h = smi(h ^ h >>> 16);
	    return h;
	  }

	  function hashMerge(a, b) {
	    return a ^ b + 0x9E3779B9 + (a << 6) + (a >> 2) | 0; // int
	  }

	  var Immutable = {

	    Iterable: Iterable,

	    Seq: Seq,
	    Collection: Collection,
	    Map: Map,
	    OrderedMap: OrderedMap,
	    List: List,
	    Stack: Stack,
	    Set: Set,
	    OrderedSet: OrderedSet,

	    Record: Record,
	    Range: Range,
	    Repeat: Repeat,

	    is: is,
	    fromJS: fromJS

	  };

	  return Immutable;
	});

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var visibilityFilter = function visibilityFilter() {
	  var state = arguments.length <= 0 || arguments[0] === undefined ? 'SHOW_ALL' : arguments[0];
	  var action = arguments[1];

	  switch (action.type) {
	    case 'SET_VISIBILITY_FILTER':
	      return action.filter;
	    default:
	      return state;
	  }
	};

	exports.default = visibilityFilter;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _riot = __webpack_require__(33);

	var _riot2 = _interopRequireDefault(_riot);

	var _router = __webpack_require__(36);

	var _router2 = _interopRequireDefault(_router);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Spa = function () {
	    function Spa() {
	        _classCallCheck(this, Spa);

	        this._init();
	        this.middleware = [];
	        this.context = {};
	        this.tags = [];
	    }

	    _createClass(Spa, [{
	        key: '_init',
	        value: function _init() {
	            if (!window.riot) {
	                window.riot = _riot2.default;
	            }
	            this._parseRoute();
	            _riot2.default.route(this._doRoute());
	            _riot2.default.route.start(true);
	            _riot2.default.mixin({ router: this.router.bind(this) });
	        }
	    }, {
	        key: 'router',
	        value: function router() {
	            var router = new _router2.default();
	            this.use(router.routes());
	            return router;
	        }
	    }, {
	        key: 'use',
	        value: function use(fn) {
	            this.middleware.push(fn);
	            return this;
	        }
	    }, {
	        key: 'mount',
	        value: function mount() {
	            var selector = arguments.length <= 0 || arguments[0] === undefined ? '*' : arguments[0];
	            var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	            try {
	                var tags = _riot2.default.mount(selector, opts);
	                this.tags = tags;
	                return tags;
	            } catch (e) {
	                console.log(e.stack);
	            }
	        }
	    }, {
	        key: '_parseRoute',
	        value: function _parseRoute() {
	            _riot2.default.route.parser(function (path) {
	                var req = {};

	                var _path$split = path.split('?');

	                var _path$split2 = _slicedToArray(_path$split, 2);

	                var uri = _path$split2[0];
	                var queryString = _path$split2[1];

	                req.path = '/' + path;
	                req.url = uri;

	                req.query = {};
	                if (queryString) {
	                    queryString.split('&').map(function (i) {
	                        return req.query[i.split('=')[0]] = i.split('=')[1];
	                    });
	                }
	                return req;
	            });
	        }
	    }, {
	        key: '_doRoute',
	        value: function _doRoute() {
	            var self = this;
	            return function (req) {
	                self.context.request = req;
	                self.context.query = req.query;
	                var i = 0;
	                next();
	                function next() {
	                    var layer = self.middleware[i];
	                    i++;
	                    if (i <= self.middleware.length) {
	                        layer.call(self.context, next);
	                    }
	                }
	            };
	        }
	    }]);

	    return Spa;
	}();

	exports.default = Spa;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	/* Riot v2.4.0, @license MIT */

	;(function (window, undefined) {
	  'use strict';

	  var riot = { version: 'v2.4.0', settings: {} },

	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`

	  // counter to give a unique id to all the Tag instances
	  __uid = 0,

	  // tags instances cache
	  __virtualDom = [],

	  // tags implementation cache
	  __tagImpl = {},


	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',


	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	      RIOT_TAG = RIOT_PREFIX + 'tag',
	      RIOT_TAG_IS = 'data-is',


	  // for typeof == '' comparisons
	  T_STRING = 'string',
	      T_OBJECT = 'object',
	      T_UNDEF = 'undefined',
	      T_FUNCTION = 'function',

	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	      RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,

	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],


	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,


	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger;
	  /* istanbul ignore next */
	  riot.observable = function (el) {

	    /**
	     * Extend the original object or create a new empty one
	     * @type { Object }
	     */

	    el = el || {};

	    /**
	     * Private variables
	     */
	    var callbacks = {},
	        slice = Array.prototype.slice;

	    /**
	     * Private Methods
	     */

	    /**
	     * Helper function needed to get and loop all the events in a string
	     * @param   { String }   e - event string
	     * @param   {Function}   fn - callback
	     */
	    function onEachEvent(e, fn) {
	      var es = e.split(' '),
	          l = es.length,
	          i = 0,
	          name,
	          indx;
	      for (; i < l; i++) {
	        name = es[i];
	        indx = name.indexOf('.');
	        if (name) fn(~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null);
	      }
	    }

	    /**
	     * Public Api
	     */

	    // extend the el object adding the observable methods
	    Object.defineProperties(el, {
	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` each time an event is triggered.
	       * @param  { String } events - events ids
	       * @param  { Function } fn - callback function
	       * @returns { Object } el
	       */
	      on: {
	        value: function value(events, fn) {
	          if (typeof fn != 'function') return el;

	          onEachEvent(events, function (name, pos, ns) {
	            (callbacks[name] = callbacks[name] || []).push(fn);
	            fn.typed = pos > 0;
	            fn.ns = ns;
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Removes the given space separated list of `events` listeners
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      off: {
	        value: function value(events, fn) {
	          if (events == '*' && !fn) callbacks = {};else {
	            onEachEvent(events, function (name, pos, ns) {
	              if (fn || ns) {
	                var arr = callbacks[name];
	                for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                  if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1);
	                }
	              } else delete callbacks[name];
	            });
	          }
	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Listen to the given space separated list of `events` and
	       * execute the `callback` at most once
	       * @param   { String } events - events ids
	       * @param   { Function } fn - callback function
	       * @returns { Object } el
	       */
	      one: {
	        value: function value(events, fn) {
	          function on() {
	            el.off(events, on);
	            fn.apply(el, arguments);
	          }
	          return el.on(events, on);
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      },

	      /**
	       * Execute all callback functions that listen to
	       * the given space separated list of `events`
	       * @param   { String } events - events ids
	       * @returns { Object } el
	       */
	      trigger: {
	        value: function value(events) {

	          // getting the arguments
	          var arglen = arguments.length - 1,
	              args = new Array(arglen),
	              fns;

	          for (var i = 0; i < arglen; i++) {
	            args[i] = arguments[i + 1]; // skip first argument
	          }

	          onEachEvent(events, function (name, pos, ns) {

	            fns = slice.call(callbacks[name] || [], 0);

	            for (var i = 0, fn; fn = fns[i]; ++i) {
	              if (fn.busy) continue;
	              fn.busy = 1;
	              if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args);
	              if (fns[i] !== fn) {
	                i--;
	              }
	              fn.busy = 0;
	            }

	            if (callbacks['*'] && name != '*') el.trigger.apply(el, ['*', name].concat(args));
	          });

	          return el;
	        },
	        enumerable: false,
	        writable: false,
	        configurable: false
	      }
	    });

	    return el;
	  }
	  /* istanbul ignore next */
	  ;(function (riot) {

	    /**
	     * Simple client-side router
	     * @module riot-route
	     */

	    var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	        EVENT_LISTENER = 'EventListener',
	        REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	        ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	        HAS_ATTRIBUTE = 'hasAttribute',
	        REPLACE = 'replace',
	        POPSTATE = 'popstate',
	        HASHCHANGE = 'hashchange',
	        TRIGGER = 'trigger',
	        MAX_EMIT_STACK_LEVEL = 3,
	        win = typeof window != 'undefined' && window,
	        doc = typeof document != 'undefined' && document,
	        hist = win && history,
	        loc = win && (hist.location || win.location),
	        // see html5-history-api
	    prot = Router.prototype,
	        // to minify more
	    clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	        started = false,
	        central = riot.observable(),
	        routeFound = false,
	        debouncedEmit,
	        base,
	        current,
	        parser,
	        secondParser,
	        emitStack = [],
	        emitStackLevel = 0;

	    /**
	     * Default parser. You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_PARSER(path) {
	      return path.split(/[/?#]/);
	    }

	    /**
	     * Default parser (second). You can replace it via router.parser method.
	     * @param {string} path - current path (normalized)
	     * @param {string} filter - filter string (normalized)
	     * @returns {array} array
	     */
	    function DEFAULT_SECOND_PARSER(path, filter) {
	      var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	          args = path.match(re);

	      if (args) return args.slice(1);
	    }

	    /**
	     * Simple/cheap debounce implementation
	     * @param   {function} fn - callback
	     * @param   {number} delay - delay in seconds
	     * @returns {function} debounced function
	     */
	    function debounce(fn, delay) {
	      var t;
	      return function () {
	        clearTimeout(t);
	        t = setTimeout(fn, delay);
	      };
	    }

	    /**
	     * Set the window listeners to trigger the routes
	     * @param {boolean} autoExec - see route.start
	     */
	    function start(autoExec) {
	      debouncedEmit = debounce(emit, 1);
	      win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[ADD_EVENT_LISTENER](clickEvent, click);
	      if (autoExec) emit(true);
	    }

	    /**
	     * Router class
	     */
	    function Router() {
	      this.$ = [];
	      riot.observable(this); // make it observable
	      central.on('stop', this.s.bind(this));
	      central.on('emit', this.e.bind(this));
	    }

	    function normalize(path) {
	      return path[REPLACE](/^\/|\/$/, '');
	    }

	    function isString(str) {
	      return typeof str == 'string';
	    }

	    /**
	     * Get the part after domain name
	     * @param {string} href - fullpath
	     * @returns {string} path from root
	     */
	    function getPathFromRoot(href) {
	      return (href || loc.href)[REPLACE](RE_ORIGIN, '');
	    }

	    /**
	     * Get the part after base
	     * @param {string} href - fullpath
	     * @returns {string} path from base
	     */
	    function getPathFromBase(href) {
	      return base[0] == '#' ? (href || loc.href || '').split(base)[1] || '' : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '');
	    }

	    function emit(force) {
	      // the stack is needed for redirections
	      var isRoot = emitStackLevel == 0;
	      if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return;

	      emitStackLevel++;
	      emitStack.push(function () {
	        var path = getPathFromBase();
	        if (force || path != current) {
	          central[TRIGGER]('emit', path);
	          current = path;
	        }
	      });
	      if (isRoot) {
	        while (emitStack.length) {
	          emitStack[0]();
	          emitStack.shift();
	        }
	        emitStackLevel = 0;
	      }
	    }

	    function click(e) {
	      if (e.which != 1 // not left click
	       || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	       || e.defaultPrevented // or default prevented
	      ) return;

	      var el = e.target;
	      while (el && el.nodeName != 'A') {
	        el = el.parentNode;
	      }if (!el || el.nodeName != 'A' // not A tag
	       || el[HAS_ATTRIBUTE]('download') // has download attr
	       || !el[HAS_ATTRIBUTE]('href') // has no href attr
	       || el.target && el.target != '_self' // another window or frame
	       || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	      ) return;

	      if (el.href != loc.href) {
	        if (el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	         || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	         || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	        ) return;
	      }

	      e.preventDefault();
	    }

	    /**
	     * Go to the path
	     * @param {string} path - destination path
	     * @param {string} title - page title
	     * @param {boolean} shouldReplace - use replaceState or pushState
	     * @returns {boolean} - route not found flag
	     */
	    function go(path, title, shouldReplace) {
	      if (hist) {
	        // if a browser
	        path = base + normalize(path);
	        title = title || doc.title;
	        // browsers ignores the second parameter `title`
	        shouldReplace ? hist.replaceState(null, title, path) : hist.pushState(null, title, path);
	        // so we need to set it manually
	        doc.title = title;
	        routeFound = false;
	        emit();
	        return routeFound;
	      }

	      // Server-side usage: directly execute handlers for the path
	      return central[TRIGGER]('emit', getPathFromBase(path));
	    }

	    /**
	     * Go to path or set action
	     * a single string:                go there
	     * two strings:                    go there with setting a title
	     * two strings and boolean:        replace history with setting a title
	     * a single function:              set an action on the default route
	     * a string/RegExp and a function: set an action on the route
	     * @param {(string|function)} first - path / action / filter
	     * @param {(string|RegExp|function)} second - title / action
	     * @param {boolean} third - replace flag
	     */
	    prot.m = function (first, second, third) {
	      if (isString(first) && (!second || isString(second))) go(first, second, third || false);else if (second) this.r(first, second);else this.r('@', first);
	    };

	    /**
	     * Stop routing
	     */
	    prot.s = function () {
	      this.off('*');
	      this.$ = [];
	    };

	    /**
	     * Emit
	     * @param {string} path - path
	     */
	    prot.e = function (path) {
	      this.$.concat('@').some(function (filter) {
	        var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter));
	        if (typeof args != 'undefined') {
	          this[TRIGGER].apply(null, [filter].concat(args));
	          return routeFound = true; // exit from loop
	        }
	      }, this);
	    };

	    /**
	     * Register route
	     * @param {string} filter - filter for matching to url
	     * @param {function} action - action to register
	     */
	    prot.r = function (filter, action) {
	      if (filter != '@') {
	        filter = '/' + normalize(filter);
	        this.$.push(filter);
	      }
	      this.on(filter, action);
	    };

	    var mainRouter = new Router();
	    var route = mainRouter.m.bind(mainRouter);

	    /**
	     * Create a sub router
	     * @returns {function} the method of a new Router object
	     */
	    route.create = function () {
	      var newSubRouter = new Router();
	      // assign sub-router's main method
	      var router = newSubRouter.m.bind(newSubRouter);
	      // stop only this sub-router
	      router.stop = newSubRouter.s.bind(newSubRouter);
	      return router;
	    };

	    /**
	     * Set the base of url
	     * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	     */
	    route.base = function (arg) {
	      base = arg || '#';
	      current = getPathFromBase(); // recalculate current path
	    };

	    /** Exec routing right now **/
	    route.exec = function () {
	      emit(true);
	    };

	    /**
	     * Replace the default router to yours
	     * @param {function} fn - your parser function
	     * @param {function} fn2 - your secondParser function
	     */
	    route.parser = function (fn, fn2) {
	      if (!fn && !fn2) {
	        // reset parser for testing...
	        parser = DEFAULT_PARSER;
	        secondParser = DEFAULT_SECOND_PARSER;
	      }
	      if (fn) parser = fn;
	      if (fn2) secondParser = fn2;
	    };

	    /**
	     * Helper function to get url query as an object
	     * @returns {object} parsed query
	     */
	    route.query = function () {
	      var q = {};
	      var href = loc.href || current;
	      href[REPLACE](/[?&](.+?)=([^&]*)/g, function (_, k, v) {
	        q[k] = v;
	      });
	      return q;
	    };

	    /** Stop routing **/
	    route.stop = function () {
	      if (started) {
	        if (win) {
	          win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	          win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	          doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	        }
	        central[TRIGGER]('stop');
	        started = false;
	      }
	    };

	    /**
	     * Start routing
	     * @param {boolean} autoExec - automatically exec after starting if true
	     */
	    route.start = function (autoExec) {
	      if (!started) {
	        if (win) {
	          if (document.readyState == 'complete') start(autoExec);
	          // the timeout is needed to solve
	          // a weird safari bug https://github.com/riot/route/issues/33
	          else win[ADD_EVENT_LISTENER]('load', function () {
	              setTimeout(function () {
	                start(autoExec);
	              }, 1);
	            });
	        }
	        started = true;
	      }
	    };

	    /** Prepare the router **/
	    route.base();
	    route.parser();

	    riot.route = route;
	  })(riot);
	  /* istanbul ignore next */

	  /**
	   * The riot template engine
	   * @version v2.4.0
	   */
	  /**
	   * riot.util.brackets
	   *
	   * - `brackets    ` - Returns a string or regex based on its parameter
	   * - `brackets.set` - Change the current riot brackets
	   *
	   * @module
	   */

	  var brackets = function (UNDEF) {

	    var REGLOB = 'g',
	        R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	        R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	        S_QBLOCKS = R_STRINGS.source + '|' + /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' + /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	        FINDBRACES = {
	      '(': RegExp('([()])|' + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|' + S_QBLOCKS, REGLOB)
	    },
	        DEFAULT = '{ }';

	    var _pairs = ['{', '}', '{', '}', /{[^}]*}/, /\\([{}])/g, /\\({)|{/g, RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB), DEFAULT, /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/, /(^|[^\\]){=[\S\s]*?}/];

	    var cachedBrackets = UNDEF,
	        _regex,
	        _cache = [],
	        _settings;

	    function _loopback(re) {
	      return re;
	    }

	    function _rewrite(re, bp) {
	      if (!bp) bp = _cache;
	      return new RegExp(re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : '');
	    }

	    function _create(pair) {
	      if (pair === DEFAULT) return _pairs;

	      var arr = pair.split(' ');

	      if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) {
	        // eslint-disable-line
	        throw new Error('Unsupported brackets "' + pair + '"');
	      }
	      arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '));

	      arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	      arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	      arr[6] = _rewrite(_pairs[6], arr);
	      arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	      arr[8] = pair;
	      return arr;
	    }

	    function _brackets(reOrIdx) {
	      return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx];
	    }

	    _brackets.split = function split(str, tmpl, _bp) {
	      // istanbul ignore next: _bp is for the compiler
	      if (!_bp) _bp = _cache;

	      var parts = [],
	          match,
	          isexpr,
	          start,
	          pos,
	          re = _bp[6];

	      isexpr = start = re.lastIndex = 0;

	      while (match = re.exec(str)) {

	        pos = match.index;

	        if (isexpr) {

	          if (match[2]) {
	            re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	            continue;
	          }
	          if (!match[3]) {
	            continue;
	          }
	        }

	        if (!match[1]) {
	          unescapeStr(str.slice(start, pos));
	          start = re.lastIndex;
	          re = _bp[6 + (isexpr ^= 1)];
	          re.lastIndex = start;
	        }
	      }

	      if (str && start < str.length) {
	        unescapeStr(str.slice(start));
	      }

	      return parts;

	      function unescapeStr(s) {
	        if (tmpl || isexpr) {
	          parts.push(s && s.replace(_bp[5], '$1'));
	        } else {
	          parts.push(s);
	        }
	      }

	      function skipBraces(s, ch, ix) {
	        var match,
	            recch = FINDBRACES[ch];

	        recch.lastIndex = ix;
	        ix = 1;
	        while (match = recch.exec(s)) {
	          if (match[1] && !(match[1] === ch ? ++ix : --ix)) break;
	        }
	        return ix ? s.length : recch.lastIndex;
	      }
	    };

	    _brackets.hasExpr = function hasExpr(str) {
	      return _cache[4].test(str);
	    };

	    _brackets.loopKeys = function loopKeys(expr) {
	      var m = expr.match(_cache[9]);

	      return m ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] } : { val: expr.trim() };
	    };

	    _brackets.array = function array(pair) {
	      return pair ? _create(pair) : _cache;
	    };

	    function _reset(pair) {
	      if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	        _cache = _create(pair);
	        _regex = pair === DEFAULT ? _loopback : _rewrite;
	        _cache[9] = _regex(_pairs[9]);
	      }
	      cachedBrackets = pair;
	    }

	    function _setSettings(o) {
	      var b;

	      o = o || {};
	      b = o.brackets;
	      Object.defineProperty(o, 'brackets', {
	        set: _reset,
	        get: function get() {
	          return cachedBrackets;
	        },
	        enumerable: true
	      });
	      _settings = o;
	      _reset(b);
	    }

	    Object.defineProperty(_brackets, 'settings', {
	      set: _setSettings,
	      get: function get() {
	        return _settings;
	      }
	    });

	    /* istanbul ignore next: in the browser riot is always in the scope */
	    _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	    _brackets.set = _reset;

	    _brackets.R_STRINGS = R_STRINGS;
	    _brackets.R_MLCOMMS = R_MLCOMMS;
	    _brackets.S_QBLOCKS = S_QBLOCKS;

	    return _brackets;
	  }();

	  /**
	   * @module tmpl
	   *
	   * tmpl          - Root function, returns the template value, render with data
	   * tmpl.hasExpr  - Test the existence of a expression inside a string
	   * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	   */

	  var tmpl = function () {

	    var _cache = {};

	    function _tmpl(str, data) {
	      if (!str) return str;

	      return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr);
	    }

	    _tmpl.haveRaw = brackets.hasRaw;

	    _tmpl.hasExpr = brackets.hasExpr;

	    _tmpl.loopKeys = brackets.loopKeys;

	    _tmpl.errorHandler = null;

	    function _logErr(err, ctx) {

	      if (_tmpl.errorHandler) {

	        err.riotData = {
	          tagName: ctx && ctx.root && ctx.root.tagName,
	          _riot_id: ctx && ctx._riot_id //eslint-disable-line camelcase
	        };
	        _tmpl.errorHandler(err);
	      }
	    }

	    function _create(str) {
	      var expr = _getTmpl(str);

	      if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr;

	      /* eslint-disable */

	      return new Function('E', expr + ';');
	      /* eslint-enable */
	    }

	    var CH_IDEXPR = '⁗',
	        RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	        RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	        RE_DQUOTE = /\u2057/g,
	        RE_QBMARK = /\u2057(\d+)~/g;

	    function _getTmpl(str) {
	      var qstr = [],
	          expr,
	          parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

	      if (parts.length > 2 || parts[0]) {
	        var i,
	            j,
	            list = [];

	        for (i = j = 0; i < parts.length; ++i) {

	          expr = parts[i];

	          if (expr && (expr = i & 1 ? _parseExpr(expr, 1, qstr) : '"' + expr.replace(/\\/g, '\\\\').replace(/\r\n?|\n/g, '\\n').replace(/"/g, '\\"') + '"')) list[j++] = expr;
	        }

	        expr = j < 2 ? list[0] : '[' + list.join(',') + '].join("")';
	      } else {

	        expr = _parseExpr(parts[1], 0, qstr);
	      }

	      if (qstr[0]) {
	        expr = expr.replace(RE_QBMARK, function (_, pos) {
	          return qstr[pos].replace(/\r/g, '\\r').replace(/\n/g, '\\n');
	        });
	      }
	      return expr;
	    }

	    var RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	    function _parseExpr(expr, asText, qstr) {

	      expr = expr.replace(RE_QBLOCK, function (s, div) {
	        return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s;
	      }).replace(/\s+/g, ' ').trim().replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	      if (expr) {
	        var list = [],
	            cnt = 0,
	            match;

	        while (expr && (match = expr.match(RE_CSNAME)) && !match.index) {
	          var key,
	              jsb,
	              re = /,|([[{(])|$/g;

	          expr = RegExp.rightContext;
	          key = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	          while (jsb = (match = re.exec(expr))[1]) {
	            skipBraces(jsb, re);
	          }jsb = expr.slice(0, match.index);
	          expr = RegExp.rightContext;

	          list[cnt++] = _wrapExpr(jsb, 1, key);
	        }

	        expr = !cnt ? _wrapExpr(expr, asText) : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	      }
	      return expr;

	      function skipBraces(ch, re) {
	        var mm,
	            lv = 1,
	            ir = RE_BREND[ch];

	        ir.lastIndex = re.lastIndex;
	        while (mm = ir.exec(expr)) {
	          if (mm[0] === ch) ++lv;else if (! --lv) break;
	        }
	        re.lastIndex = lv ? expr.length : ir.lastIndex;
	      }
	    }

	    // istanbul ignore next: not both
	    var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' ? 'global' : 'window') + ').',
	        JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	        JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	    function _wrapExpr(expr, asText, key) {
	      var tb;

	      expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	        if (mvar) {
	          pos = tb ? 0 : pos + match.length;

	          if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	            match = p + '("' + mvar + JS_CONTEXT + mvar;
	            if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '[';
	          } else if (pos) {
	            tb = !JS_NOPROPS.test(s.slice(pos));
	          }
	        }
	        return match;
	      });

	      if (tb) {
	        expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	      }

	      if (key) {

	        expr = (tb ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')') + '?"' + key + '":""';
	      } else if (asText) {

	        expr = 'function(v){' + (tb ? expr.replace('return ', 'v=') : 'v=(' + expr + ')') + ';return v||v===0?v:""}.call(this)';
	      }

	      return expr;
	    }

	    // istanbul ignore next: compatibility fix for beta versions
	    _tmpl.parse = function (s) {
	      return s;
	    };

	    _tmpl.version = brackets.version = 'v2.4.0';

	    return _tmpl;
	  }();

	  /*
	    lib/browser/tag/mkdom.js
	  
	    Includes hacks needed for the Internet Explorer version 9 and below
	    See: http://kangax.github.io/compat-table/es5/#ie8
	         http://codeplanet.io/dropping-ie8/
	  */
	  var mkdom = function _mkdom() {
	    var reHasYield = /<yield\b/i,
	        reYieldAll = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig,
	        reYieldSrc = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	        reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	    var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	        tblTags = IE_VERSION && IE_VERSION < 10 ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;

	    /**
	     * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	     * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	     *
	     * @param   {string} templ  - The template coming from the custom tag definition
	     * @param   {string} [html] - HTML content that comes from the DOM element where you
	     *           will mount the tag, mostly the original tag in the page
	     * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	     */
	    function _mkdom(templ, html) {
	      var match = templ && templ.match(/^\s*<([-\w]+)/),
	          tagName = match && match[1].toLowerCase(),
	          el = mkEl('div', isSVGTag(tagName));

	      // replace all the yield tags with the tag inner html
	      templ = replaceYield(templ, html);

	      /* istanbul ignore next */
	      if (tblTags.test(tagName)) el = specialTags(el, templ, tagName);else setInnerHTML(el, templ);

	      el.stub = true;

	      return el;
	    }

	    /*
	      Creates the root element for table or select child elements:
	      tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	    */
	    function specialTags(el, templ, tagName) {
	      var select = tagName[0] === 'o',
	          parent = select ? 'select>' : 'table>';

	      // trim() is important here, this ensures we don't have artifacts,
	      // so we can check if we have only one element inside the parent
	      el.innerHTML = '<' + parent + templ.trim() + '</' + parent;
	      parent = el.firstChild;

	      // returns the immediate parent if tr/th/td/col is the only element, if not
	      // returns the whole tree, as this can include additional elements
	      if (select) {
	        parent.selectedIndex = -1; // for IE9, compatible w/current riot behavior
	      } else {
	          // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	          var tname = rootEls[tagName];
	          if (tname && parent.childElementCount === 1) parent = $(tname, parent);
	        }
	      return parent;
	    }

	    /*
	      Replace the yield tag from any tag template with the innerHTML of the
	      original tag in the page
	    */
	    function replaceYield(templ, html) {
	      // do nothing if no yield
	      if (!reHasYield.test(templ)) return templ;

	      // be careful with #1343 - string on the source having `$1`
	      var src = {};

	      html = html && html.replace(reYieldSrc, function (_, ref, text) {
	        src[ref] = src[ref] || text; // preserve first definition
	        return '';
	      }).trim();

	      return templ.replace(reYieldDest, function (_, ref, def) {
	        // yield with from - to attrs
	        return src[ref] || def || '';
	      }).replace(reYieldAll, function (_, def) {
	        // yield without any "from"
	        return html || def || '';
	      });
	    }

	    return _mkdom;
	  }();

	  /**
	   * Convert the item looped into an object used to extend the child tag properties
	   * @param   { Object } expr - object containing the keys used to extend the children tags
	   * @param   { * } key - value to assign to the new object returned
	   * @param   { * } val - value containing the position of the item in the array
	   * @returns { Object } - new object containing the values of the original item
	   *
	   * The variables 'key' and 'val' are arbitrary.
	   * They depend on the collection type looped (Array, Object)
	   * and on the expression used on the each tag
	   *
	   */
	  function mkitem(expr, key, val) {
	    var item = {};
	    item[expr.key] = key;
	    if (expr.pos) item[expr.pos] = val;
	    return item;
	  }

	  /**
	   * Unmount the redundant tags
	   * @param   { Array } items - array containing the current items to loop
	   * @param   { Array } tags - array containing all the children tags
	   */
	  function unmountRedundant(items, tags) {

	    var i = tags.length,
	        j = items.length,
	        t;

	    while (i > j) {
	      t = tags[--i];
	      tags.splice(i, 1);
	      t.unmount();
	    }
	  }

	  /**
	   * Move the nested custom tags in non custom loop tags
	   * @param   { Object } child - non custom loop tag
	   * @param   { Number } i - current position of the loop tag
	   */
	  function moveNestedTags(child, i) {
	    Object.keys(child.tags).forEach(function (tagName) {
	      var tag = child.tags[tagName];
	      if (isArray(tag)) each(tag, function (t) {
	        moveChildTag(t, tagName, i);
	      });else moveChildTag(tag, tagName, i);
	    });
	  }

	  /**
	   * Adds the elements for a virtual tag
	   * @param { Tag } tag - the tag whose root's children will be inserted or appended
	   * @param { Node } src - the node that will do the inserting or appending
	   * @param { Tag } target - only if inserting, insert before this tag's first child
	   */
	  function addVirtual(tag, src, target) {
	    var el = tag._root,
	        sib;
	    tag._virts = [];
	    while (el) {
	      sib = el.nextSibling;
	      if (target) src.insertBefore(el, target._root);else src.appendChild(el);

	      tag._virts.push(el); // hold for unmounting
	      el = sib;
	    }
	  }

	  /**
	   * Move virtual tag and all child nodes
	   * @param { Tag } tag - first child reference used to start move
	   * @param { Node } src  - the node that will do the inserting
	   * @param { Tag } target - insert before this tag's first child
	   * @param { Number } len - how many child nodes to move
	   */
	  function moveVirtual(tag, src, target, len) {
	    var el = tag._root,
	        sib,
	        i = 0;
	    for (; i < len; i++) {
	      sib = el.nextSibling;
	      src.insertBefore(el, target._root);
	      el = sib;
	    }
	  }

	  /**
	   * Manage tags having the 'each'
	   * @param   { Object } dom - DOM node we need to loop
	   * @param   { Tag } parent - parent tag instance where the dom node is contained
	   * @param   { String } expr - string contained in the 'each' attribute
	   */
	  function _each(dom, parent, expr) {

	    // remove the each property from the original tag
	    remAttr(dom, 'each');

	    var mustReorder = _typeof(getAttr(dom, 'no-reorder')) !== T_STRING || remAttr(dom, 'no-reorder'),
	        tagName = getTagName(dom),
	        impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	        useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	        root = dom.parentNode,
	        ref = document.createTextNode(''),
	        child = getTag(dom),
	        isOption = tagName.toLowerCase() === 'option',
	        // the option tags must be treated differently
	    tags = [],
	        oldItems = [],
	        hasKeys,
	        isVirtual = dom.tagName == 'VIRTUAL';

	    // parse the each expression
	    expr = tmpl.loopKeys(expr);

	    // insert a marked where the loop tags will be injected
	    root.insertBefore(ref, dom);

	    // clean template code
	    parent.one('before-mount', function () {

	      // remove the original DOM node
	      dom.parentNode.removeChild(dom);
	      if (root.stub) root = parent.root;
	    }).on('update', function () {
	      // get the new items collection
	      var items = tmpl(expr.val, parent),

	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment();

	      // object loop. any changes cause full redraw
	      if (!isArray(items)) {
	        hasKeys = items || false;
	        items = hasKeys ? Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key]);
	        }) : [];
	      }

	      // loop all the new items
	      var i = 0,
	          itemsLength = items.length;

	      for (; i < itemsLength; i++) {
	        // reorder only if the items are objects
	        var item = items[i],
	            _mustReorder = mustReorder && item instanceof Object && !hasKeys,
	            oldPos = oldItems.indexOf(item),
	            pos = ~oldPos && _mustReorder ? oldPos : i,

	        // does a tag exist in this position?
	        tag = tags[pos];

	        item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	        // new tag
	        if (!_mustReorder && !tag // with no-reorder we just update the old tags
	         || _mustReorder && ! ~oldPos || !tag // by default we always try to reorder the DOM elements
	        ) {

	            tag = new Tag(impl, {
	              parent: parent,
	              isLoop: true,
	              hasImpl: !!__tagImpl[tagName],
	              root: useRoot ? root : dom.cloneNode(),
	              item: item
	            }, dom.innerHTML);

	            tag.mount();

	            if (isVirtual) tag._root = tag.root.firstChild; // save reference for further moves or inserts
	            // this tag must be appended
	            if (i == tags.length || !tags[i]) {
	              // fix 1581
	              if (isVirtual) addVirtual(tag, frag);else frag.appendChild(tag.root);
	            }
	            // this tag must be insert
	            else {
	                if (isVirtual) addVirtual(tag, root, tags[i]);else root.insertBefore(tag.root, tags[i].root); // #1374 some browsers reset selected here
	                oldItems.splice(i, 0, item);
	              }

	            tags.splice(i, 0, tag);
	            pos = i; // handled here so no move
	          } else tag.update(item, true);

	        // reorder the tag if it's not located in its previous position
	        if (pos !== i && _mustReorder && tags[i] // fix 1581 unable to reproduce it in a test!
	        ) {
	            // update the DOM
	            if (isVirtual) moveVirtual(tag, root, tags[i], dom.childNodes.length);else root.insertBefore(tag.root, tags[i].root);
	            // update the position attribute if it exists
	            if (expr.pos) tag[expr.pos] = i;
	            // move the old tag instance
	            tags.splice(i, 0, tags.splice(pos, 1)[0]);
	            // move the old item
	            oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	            // if the loop tags are not custom
	            // we need to move all their custom tags into the right position
	            if (!child && tag.tags) moveNestedTags(tag, i);
	          }

	        // cache the original item to use it in the events bound to this node
	        // and its children
	        tag._item = item;
	        // cache the real parent tag internally
	        defineProperty(tag, '_parent', parent);
	      }

	      // remove the redundant tags
	      unmountRedundant(items, tags);

	      // insert the new nodes
	      if (isOption) {
	        root.appendChild(frag);

	        // #1374 FireFox bug in <option selected={expression}>
	        if (FIREFOX && !root.multiple) {
	          for (var n = 0; n < root.length; n++) {
	            if (root[n].__riot1374) {
	              root.selectedIndex = n; // clear other options
	              delete root[n].__riot1374;
	              break;
	            }
	          }
	        }
	      } else root.insertBefore(frag, ref);

	      // set the 'tags' property of the parent tag
	      // if child is 'undefined' it means that we don't need to set this property
	      // for example:
	      // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	      // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	      if (child) parent.tags[tagName] = tags;

	      // clone the items array
	      oldItems = items.slice();
	    });
	  }
	  /**
	   * Object that will be used to inject and manage the css of every tag instance
	   */
	  var styleManager = function (_riot) {

	    if (!window) return { // skip injection on the server
	      add: function add() {},
	      inject: function inject() {}
	    };

	    var styleNode = function () {
	      // create a new style element with the correct type
	      var newNode = mkEl('style');
	      setAttr(newNode, 'type', 'text/css');

	      // replace any user node or insert the new one into the head
	      var userNode = $('style[type=riot]');
	      if (userNode) {
	        if (userNode.id) newNode.id = userNode.id;
	        userNode.parentNode.replaceChild(newNode, userNode);
	      } else document.getElementsByTagName('head')[0].appendChild(newNode);

	      return newNode;
	    }();

	    // Create cache and shortcut to the correct property
	    var cssTextProp = styleNode.styleSheet,
	        stylesToInject = '';

	    // Expose the style node in a non-modificable property
	    Object.defineProperty(_riot, 'styleNode', {
	      value: styleNode,
	      writable: true
	    });

	    /**
	     * Public api
	     */
	    return {
	      /**
	       * Save a tag style to be later injected into DOM
	       * @param   { String } css [description]
	       */
	      add: function add(css) {
	        stylesToInject += css;
	      },
	      /**
	       * Inject all previously saved tag styles into DOM
	       * innerHTML seems slow: http://jsperf.com/riot-insert-style
	       */
	      inject: function inject() {
	        if (stylesToInject) {
	          if (cssTextProp) cssTextProp.cssText += stylesToInject;else styleNode.innerHTML += stylesToInject;
	          stylesToInject = '';
	        }
	      }
	    };
	  }(riot);

	  function parseNamedElements(root, tag, childTags, forceParsingNamed) {

	    walk(root, function (dom) {
	      if (dom.nodeType == 1) {
	        dom.isLoop = dom.isLoop || dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each') ? 1 : 0;

	        // custom child tag
	        if (childTags) {
	          var child = getTag(dom);

	          if (child && !dom.isLoop) childTags.push(initChildTag(child, { root: dom, parent: tag }, dom.innerHTML, tag));
	        }

	        if (!dom.isLoop || forceParsingNamed) setNamed(dom, tag, []);
	      }
	    });
	  }

	  function parseExpressions(root, tag, expressions) {

	    function addExpr(dom, val, extra) {
	      if (tmpl.hasExpr(val)) {
	        expressions.push(extend({ dom: dom, expr: val }, extra));
	      }
	    }

	    walk(root, function (dom) {
	      var type = dom.nodeType,
	          attr;

	      // text node
	      if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue);
	      if (type != 1) return;

	      /* element */

	      // loop
	      attr = getAttr(dom, 'each');

	      if (attr) {
	        _each(dom, tag, attr);return false;
	      }

	      // attribute expressions
	      each(dom.attributes, function (attr) {
	        var name = attr.name,
	            bool = name.split('__')[1];

	        addExpr(dom, attr.value, { attr: bool || name, bool: bool });
	        if (bool) {
	          remAttr(dom, name);return false;
	        }
	      });

	      // skip custom tags
	      if (getTag(dom)) return false;
	    });
	  }
	  function Tag(impl, conf, innerHTML) {

	    var self = riot.observable(this),
	        opts = inherit(conf.opts) || {},
	        parent = conf.parent,
	        isLoop = conf.isLoop,
	        hasImpl = conf.hasImpl,
	        item = cleanUpData(conf.item),
	        expressions = [],
	        childTags = [],
	        root = conf.root,
	        tagName = root.tagName.toLowerCase(),
	        attr = {},
	        propsInSyncWithParent = [],
	        dom;

	    // only call unmount if we have a valid __tagImpl (has name property)
	    if (impl.name && root._tag) root._tag.unmount(true);

	    // not yet mounted
	    this.isMounted = false;
	    root.isLoop = isLoop;

	    // keep a reference to the tag just created
	    // so we will be able to mount this tag multiple times
	    root._tag = this;

	    // create a unique id to this tag
	    // it could be handy to use it also to improve the virtual dom rendering speed
	    defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id

	    extend(this, { parent: parent, root: root, opts: opts, tags: {} }, item);

	    // grab attributes
	    each(root.attributes, function (el) {
	      var val = el.value;
	      // remember attributes with expressions only
	      if (tmpl.hasExpr(val)) attr[el.name] = val;
	    });

	    dom = mkdom(impl.tmpl, innerHTML);

	    // options
	    function updateOpts() {
	      var ctx = hasImpl && isLoop ? self : parent || self;

	      // update opts from current DOM attributes
	      each(root.attributes, function (el) {
	        var val = el.value;
	        opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val;
	      });
	      // recover those with expressions
	      each(Object.keys(attr), function (name) {
	        opts[toCamel(name)] = tmpl(attr[name], ctx);
	      });
	    }

	    function normalizeData(data) {
	      for (var key in item) {
	        if (_typeof(self[key]) !== T_UNDEF && isWritable(self, key)) self[key] = data[key];
	      }
	    }

	    function inheritFromParent() {
	      if (!self.parent || !isLoop) return;
	      each(Object.keys(self.parent), function (k) {
	        // some properties must be always in sync with the parent tag
	        var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k);
	        if (_typeof(self[k]) === T_UNDEF || mustSync) {
	          // track the property to keep in sync
	          // so we can keep it updated
	          if (!mustSync) propsInSyncWithParent.push(k);
	          self[k] = self.parent[k];
	        }
	      });
	    }

	    /**
	     * Update the tag expressions and options
	     * @param   { * }  data - data we want to use to extend the tag properties
	     * @param   { Boolean } isInherited - is this update coming from a parent tag?
	     * @returns { self }
	     */
	    defineProperty(this, 'update', function (data, isInherited) {

	      // make sure the data passed will not override
	      // the component core methods
	      data = cleanUpData(data);
	      // inherit properties from the parent
	      inheritFromParent();
	      // normalize the tag properties in case an item object was initially passed
	      if (data && isObject(item)) {
	        normalizeData(data);
	        item = data;
	      }
	      extend(self, data);
	      updateOpts();
	      self.trigger('update', data);
	      update(expressions, self);

	      // the updated event will be triggered
	      // once the DOM will be ready and all the re-flows are completed
	      // this is useful if you want to get the "real" root properties
	      // 4 ex: root.offsetWidth ...
	      if (isInherited && self.parent)
	        // closes #1599
	        self.parent.one('updated', function () {
	          self.trigger('updated');
	        });else rAF(function () {
	        self.trigger('updated');
	      });

	      return this;
	    });

	    defineProperty(this, 'mixin', function () {
	      each(arguments, function (mix) {
	        var instance;

	        mix = (typeof mix === 'undefined' ? 'undefined' : _typeof(mix)) === T_STRING ? riot.mixin(mix) : mix;

	        // check if the mixin is a function
	        if (isFunction(mix)) {
	          // create the new mixin instance
	          instance = new mix();
	          // save the prototype to loop it afterwards
	          mix = mix.prototype;
	        } else instance = mix;

	        // loop the keys in the function prototype or the all object keys
	        each(Object.getOwnPropertyNames(mix), function (key) {
	          // bind methods to self
	          if (key != 'init') self[key] = isFunction(instance[key]) ? instance[key].bind(self) : instance[key];
	        });

	        // init method will be called automatically
	        if (instance.init) instance.init.bind(self)();
	      });
	      return this;
	    });

	    defineProperty(this, 'mount', function () {

	      updateOpts();

	      // add global mixins
	      var globalMixin = riot.mixin(GLOBAL_MIXIN);
	      if (globalMixin) for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) self.mixin(globalMixin[i]);
	      } // initialiation
	      if (impl.fn) impl.fn.call(self, opts);

	      // parse layout after init. fn may calculate args for nested custom tags
	      parseExpressions(dom, self, expressions);

	      // mount the child tags
	      toggle(true);

	      // update the root adding custom attributes coming from the compiler
	      // it fixes also #1087
	      if (impl.attrs) walkAttributes(impl.attrs, function (k, v) {
	        setAttr(root, k, v);
	      });
	      if (impl.attrs || hasImpl) parseExpressions(self.root, self, expressions);

	      if (!self.parent || isLoop) self.update(item);

	      // internal use only, fixes #403
	      self.trigger('before-mount');

	      if (isLoop && !hasImpl) {
	        // update the root attribute for the looped elements
	        root = dom.firstChild;
	      } else {
	        while (dom.firstChild) {
	          root.appendChild(dom.firstChild);
	        }if (root.stub) root = parent.root;
	      }

	      defineProperty(self, 'root', root);

	      // parse the named dom nodes in the looped child
	      // adding them to the parent as well
	      if (isLoop) parseNamedElements(self.root, self.parent, null, true);

	      // if it's not a child tag we can trigger its mount event
	      if (!self.parent || self.parent.isMounted) {
	        self.isMounted = true;
	        self.trigger('mount');
	      }
	      // otherwise we need to wait that the parent event gets triggered
	      else self.parent.one('mount', function () {
	          // avoid to trigger the `mount` event for the tags
	          // not visible included in an if statement
	          if (!isInStub(self.root)) {
	            self.parent.isMounted = self.isMounted = true;
	            self.trigger('mount');
	          }
	        });
	    });

	    defineProperty(this, 'unmount', function (keepRootTag) {
	      var el = root,
	          p = el.parentNode,
	          ptag,
	          tagIndex = __virtualDom.indexOf(self);

	      self.trigger('before-unmount');

	      // remove this tag instance from the global virtualDom variable
	      if (~tagIndex) __virtualDom.splice(tagIndex, 1);

	      if (p) {

	        if (parent) {
	          ptag = getImmediateCustomParentTag(parent);
	          // remove this tag from the parent tags object
	          // if there are multiple nested tags with same name..
	          // remove this element form the array
	          if (isArray(ptag.tags[tagName])) each(ptag.tags[tagName], function (tag, i) {
	            if (tag._riot_id == self._riot_id) ptag.tags[tagName].splice(i, 1);
	          });else
	            // otherwise just delete the tag instance
	            ptag.tags[tagName] = undefined;
	        } else while (el.firstChild) {
	          el.removeChild(el.firstChild);
	        }if (!keepRootTag) p.removeChild(el);else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, RIOT_TAG_IS);
	          remAttr(p, RIOT_TAG); // this will be removed in riot 3.0.0
	        }
	      }

	      if (this._virts) {
	        each(this._virts, function (v) {
	          if (v.parentNode) v.parentNode.removeChild(v);
	        });
	      }

	      self.trigger('unmount');
	      toggle();
	      self.off('*');
	      self.isMounted = false;
	      delete root._tag;
	    });

	    // proxy function to bind updates
	    // dispatched from a parent tag
	    function onChildUpdate(data) {
	      self.update(data, true);
	    }

	    function toggle(isMount) {

	      // mount/unmount children
	      each(childTags, function (child) {
	        child[isMount ? 'mount' : 'unmount']();
	      });

	      // listen/unlisten parent (events flow one way from parent to children)
	      if (!parent) return;
	      var evt = isMount ? 'on' : 'off';

	      // the loop tags will be always in sync with the parent automatically
	      if (isLoop) parent[evt]('unmount', self.unmount);else {
	        parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount);
	      }
	    }

	    // named elements available for fn
	    parseNamedElements(dom, this, childTags);
	  }
	  /**
	   * Attach an event to a DOM node
	   * @param { String } name - event name
	   * @param { Function } handler - event callback
	   * @param { Object } dom - dom node
	   * @param { Tag } tag - tag instance
	   */
	  function setEventHandler(name, handler, dom, tag) {

	    dom[name] = function (e) {

	      var ptag = tag._parent,
	          item = tag._item,
	          el;

	      if (!item) while (ptag && !item) {
	        item = ptag._item;
	        ptag = ptag._parent;
	      }

	      // cross browser event fix
	      e = e || window.event;

	      // override the event properties
	      if (isWritable(e, 'currentTarget')) e.currentTarget = dom;
	      if (isWritable(e, 'target')) e.target = e.srcElement;
	      if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode;

	      e.item = item;

	      // prevent default behaviour (by default)
	      if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	        if (e.preventDefault) e.preventDefault();
	        e.returnValue = false;
	      }

	      if (!e.preventUpdate) {
	        el = item ? getImmediateCustomParentTag(ptag) : tag;
	        el.update();
	      }
	    };
	  }

	  /**
	   * Insert a DOM node replacing another one (used by if- attribute)
	   * @param   { Object } root - parent node
	   * @param   { Object } node - node replaced
	   * @param   { Object } before - node added
	   */
	  function insertTo(root, node, before) {
	    if (!root) return;
	    root.insertBefore(before, node);
	    root.removeChild(node);
	  }

	  /**
	   * Update the expressions in a Tag instance
	   * @param   { Array } expressions - expression that must be re evaluated
	   * @param   { Tag } tag - tag instance
	   */
	  function update(expressions, tag) {

	    each(expressions, function (expr, i) {

	      var dom = expr.dom,
	          attrName = expr.attr,
	          value = tmpl(expr.expr, tag),
	          parent = expr.dom.parentNode;

	      if (expr.bool) {
	        value = !!value;
	      } else if (value == null) {
	        value = '';
	      }

	      // #1638: regression of #1612, update the dom only if the value of the
	      // expression was changed
	      if (expr.value === value) {
	        return;
	      }
	      expr.value = value;

	      // textarea and text nodes has no attribute name
	      if (!attrName) {
	        // about #815 w/o replace: the browser converts the value to a string,
	        // the comparison by "==" does too, but not in the server
	        value += '';
	        // test for parent avoids error with invalid assignment to nodeValue
	        if (parent) {
	          if (parent.tagName === 'TEXTAREA') {
	            parent.value = value; // #1113
	            if (!IE_VERSION) dom.nodeValue = value; // #1625 IE throws here, nodeValue
	          } // will be available on 'updated'
	          else dom.nodeValue = value;
	        }
	        return;
	      }

	      // ~~#1612: look for changes in dom.value when updating the value~~
	      if (attrName === 'value') {
	        dom.value = value;
	        return;
	      }

	      // remove original attribute
	      remAttr(dom, attrName);

	      // event handler
	      if (isFunction(value)) {
	        setEventHandler(attrName, value, dom, tag);

	        // if- conditional
	      } else if (attrName == 'if') {
	          var stub = expr.stub,
	              add = function add() {
	            insertTo(stub.parentNode, stub, dom);
	          },
	              remove = function remove() {
	            insertTo(dom.parentNode, dom, stub);
	          };

	          // add to DOM
	          if (value) {
	            if (stub) {
	              add();
	              dom.inStub = false;
	              // avoid to trigger the mount event if the tags is not visible yet
	              // maybe we can optimize this avoiding to mount the tag at all
	              if (!isInStub(dom)) {
	                walk(dom, function (el) {
	                  if (el._tag && !el._tag.isMounted) el._tag.isMounted = !!el._tag.trigger('mount');
	                });
	              }
	            }
	            // remove from DOM
	          } else {
	              stub = expr.stub = stub || document.createTextNode('');
	              // if the parentNode is defined we can easily replace the tag
	              if (dom.parentNode) remove();
	              // otherwise we need to wait the updated event
	              else (tag.parent || tag).one('updated', remove);

	              dom.inStub = true;
	            }
	          // show / hide
	        } else if (attrName === 'show') {
	            dom.style.display = value ? '' : 'none';
	          } else if (attrName === 'hide') {
	            dom.style.display = value ? 'none' : '';
	          } else if (expr.bool) {
	            dom[attrName] = value;
	            if (value) setAttr(dom, attrName, attrName);
	            if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	              dom.__riot1374 = value; // #1374
	            }
	          } else if (value === 0 || value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== T_OBJECT) {
	              // <img src="{ expr }">
	              if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	                attrName = attrName.slice(RIOT_PREFIX.length);
	              }
	              setAttr(dom, attrName, value);
	            }
	    });
	  }
	  /**
	   * Specialized function for looping an array-like collection with `each={}`
	   * @param   { Array } els - collection of items
	   * @param   {Function} fn - callback function
	   * @returns { Array } the array looped
	   */
	  function each(els, fn) {
	    var len = els ? els.length : 0;

	    for (var i = 0, el; i < len; i++) {
	      el = els[i];
	      // return false -> current item was removed by fn during the loop
	      if (el != null && fn(el, i) === false) i--;
	    }
	    return els;
	  }

	  /**
	   * Detect if the argument passed is a function
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isFunction(v) {
	    return (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_FUNCTION || false; // avoid IE problems
	  }

	  /**
	   * Get the outer html of any DOM node SVGs included
	   * @param   { Object } el - DOM node to parse
	   * @returns { String } el.outerHTML
	   */
	  function getOuterHTML(el) {
	    if (el.outerHTML) return el.outerHTML;
	    // some browsers do not support outerHTML on the SVGs tags
	    else {
	        var container = mkEl('div');
	        container.appendChild(el.cloneNode(true));
	        return container.innerHTML;
	      }
	  }

	  /**
	   * Set the inner html of any DOM node SVGs included
	   * @param { Object } container - DOM node where we will inject the new html
	   * @param { String } html - html to inject
	   */
	  function setInnerHTML(container, html) {
	    if (_typeof(container.innerHTML) != T_UNDEF) container.innerHTML = html;
	    // some browsers do not support innerHTML on the SVGs tags
	    else {
	        var doc = new DOMParser().parseFromString(html, 'application/xml');
	        container.appendChild(container.ownerDocument.importNode(doc.documentElement, true));
	      }
	  }

	  /**
	   * Checks wether a DOM node must be considered part of an svg document
	   * @param   { String }  name - tag name
	   * @returns { Boolean } -
	   */
	  function isSVGTag(name) {
	    return ~SVG_TAGS_LIST.indexOf(name);
	  }

	  /**
	   * Detect if the argument passed is an object, exclude null.
	   * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	   * @param   { * } v - whatever you want to pass to this function
	   * @returns { Boolean } -
	   */
	  function isObject(v) {
	    return v && (typeof v === 'undefined' ? 'undefined' : _typeof(v)) === T_OBJECT; // typeof null is 'object'
	  }

	  /**
	   * Remove any DOM attribute from a node
	   * @param   { Object } dom - DOM node we want to update
	   * @param   { String } name - name of the property we want to remove
	   */
	  function remAttr(dom, name) {
	    dom.removeAttribute(name);
	  }

	  /**
	   * Convert a string containing dashes to camel case
	   * @param   { String } string - input string
	   * @returns { String } my-string -> myString
	   */
	  function toCamel(string) {
	    return string.replace(/-(\w)/g, function (_, c) {
	      return c.toUpperCase();
	    });
	  }

	  /**
	   * Get the value of any DOM attribute on a node
	   * @param   { Object } dom - DOM node we want to parse
	   * @param   { String } name - name of the attribute we want to get
	   * @returns { String | undefined } name of the node attribute whether it exists
	   */
	  function getAttr(dom, name) {
	    return dom.getAttribute(name);
	  }

	  /**
	   * Set any DOM attribute
	   * @param { Object } dom - DOM node we want to update
	   * @param { String } name - name of the property we want to set
	   * @param { String } val - value of the property we want to set
	   */
	  function setAttr(dom, name, val) {
	    dom.setAttribute(name, val);
	  }

	  /**
	   * Detect the tag implementation by a DOM node
	   * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	   * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	   */
	  function getTag(dom) {
	    return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) || getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()];
	  }
	  /**
	   * Add a child tag to its parent into the `tags` object
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the new tag will be stored
	   * @param   { Object } parent - tag instance where the new child tag will be included
	   */
	  function addChildTag(tag, tagName, parent) {
	    var cachedTag = parent.tags[tagName];

	    // if there are multiple children tags having the same name
	    if (cachedTag) {
	      // if the parent tags property is not yet an array
	      // create it adding the first cached tag
	      if (!isArray(cachedTag))
	        // don't add the same tag twice
	        if (cachedTag !== tag) parent.tags[tagName] = [cachedTag];
	      // add the new nested tag to the array
	      if (!contains(parent.tags[tagName], tag)) parent.tags[tagName].push(tag);
	    } else {
	      parent.tags[tagName] = tag;
	    }
	  }

	  /**
	   * Move the position of a custom tag in its parent tag
	   * @param   { Object } tag - child tag instance
	   * @param   { String } tagName - key where the tag was stored
	   * @param   { Number } newPos - index where the new tag will be stored
	   */
	  function moveChildTag(tag, tagName, newPos) {
	    var parent = tag.parent,
	        tags;
	    // no parent no move
	    if (!parent) return;

	    tags = parent.tags[tagName];

	    if (isArray(tags)) tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0]);else addChildTag(tag, tagName, parent);
	  }

	  /**
	   * Create a new child tag including it correctly into its parent
	   * @param   { Object } child - child tag implementation
	   * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	   * @param   { String } innerHTML - inner html of the child node
	   * @param   { Object } parent - instance of the parent tag including the child custom tag
	   * @returns { Object } instance of the new child tag just created
	   */
	  function initChildTag(child, opts, innerHTML, parent) {
	    var tag = new Tag(child, opts, innerHTML),
	        tagName = getTagName(opts.root),
	        ptag = getImmediateCustomParentTag(parent);
	    // fix for the parent attribute in the looped elements
	    tag.parent = ptag;
	    // store the real parent tag
	    // in some cases this could be different from the custom parent tag
	    // for example in nested loops
	    tag._parent = parent;

	    // add this tag to the custom parent tag
	    addChildTag(tag, tagName, ptag);
	    // and also to the real parent tag
	    if (ptag !== parent) addChildTag(tag, tagName, parent);
	    // empty the child node once we got its template
	    // to avoid that its children get compiled multiple times
	    opts.root.innerHTML = '';

	    return tag;
	  }

	  /**
	   * Loop backward all the parents tree to detect the first custom parent tag
	   * @param   { Object } tag - a Tag instance
	   * @returns { Object } the instance of the first custom parent tag found
	   */
	  function getImmediateCustomParentTag(tag) {
	    var ptag = tag;
	    while (!getTag(ptag.root)) {
	      if (!ptag.parent) break;
	      ptag = ptag.parent;
	    }
	    return ptag;
	  }

	  /**
	   * Helper function to set an immutable property
	   * @param   { Object } el - object where the new property will be set
	   * @param   { String } key - object key where the new property will be stored
	   * @param   { * } value - value of the new property
	  * @param   { Object } options - set the propery overriding the default options
	   * @returns { Object } - the initial object
	   */
	  function defineProperty(el, key, value, options) {
	    Object.defineProperty(el, key, extend({
	      value: value,
	      enumerable: false,
	      writable: false,
	      configurable: true
	    }, options));
	    return el;
	  }

	  /**
	   * Get the tag name of any DOM node
	   * @param   { Object } dom - DOM node we want to parse
	   * @returns { String } name to identify this dom node in riot
	   */
	  function getTagName(dom) {
	    var child = getTag(dom),
	        namedTag = getAttr(dom, 'name'),
	        tagName = namedTag && !tmpl.hasExpr(namedTag) ? namedTag : child ? child.name : dom.tagName.toLowerCase();

	    return tagName;
	  }

	  /**
	   * Extend any object with other properties
	   * @param   { Object } src - source object
	   * @returns { Object } the resulting extended object
	   *
	   * var obj = { foo: 'baz' }
	   * extend(obj, {bar: 'bar', foo: 'bar'})
	   * console.log(obj) => {bar: 'bar', foo: 'bar'}
	   *
	   */
	  function extend(src) {
	    var obj,
	        args = arguments;
	    for (var i = 1; i < args.length; ++i) {
	      if (obj = args[i]) {
	        for (var key in obj) {
	          // check if this property of the source object could be overridden
	          if (isWritable(src, key)) src[key] = obj[key];
	        }
	      }
	    }
	    return src;
	  }

	  /**
	   * Check whether an array contains an item
	   * @param   { Array } arr - target array
	   * @param   { * } item - item to test
	   * @returns { Boolean } Does 'arr' contain 'item'?
	   */
	  function contains(arr, item) {
	    return ~arr.indexOf(item);
	  }

	  /**
	   * Check whether an object is a kind of array
	   * @param   { * } a - anything
	   * @returns {Boolean} is 'a' an array?
	   */
	  function isArray(a) {
	    return Array.isArray(a) || a instanceof Array;
	  }

	  /**
	   * Detect whether a property of an object could be overridden
	   * @param   { Object }  obj - source object
	   * @param   { String }  key - object property
	   * @returns { Boolean } is this property writable?
	   */
	  function isWritable(obj, key) {
	    var props = Object.getOwnPropertyDescriptor(obj, key);
	    return _typeof(obj[key]) === T_UNDEF || props && props.writable;
	  }

	  /**
	   * With this function we avoid that the internal Tag methods get overridden
	   * @param   { Object } data - options we want to use to extend the tag instance
	   * @returns { Object } clean object without containing the riot internal reserved words
	   */
	  function cleanUpData(data) {
	    if (!(data instanceof Tag) && !(data && _typeof(data.trigger) == T_FUNCTION)) return data;

	    var o = {};
	    for (var key in data) {
	      if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key];
	    }
	    return o;
	  }

	  /**
	   * Walk down recursively all the children tags starting dom node
	   * @param   { Object }   dom - starting node where we will start the recursion
	   * @param   { Function } fn - callback to transform the child node just found
	   */
	  function walk(dom, fn) {
	    if (dom) {
	      // stop the recursion
	      if (fn(dom) === false) return;else {
	        dom = dom.firstChild;

	        while (dom) {
	          walk(dom, fn);
	          dom = dom.nextSibling;
	        }
	      }
	    }
	  }

	  /**
	   * Minimize risk: only zero or one _space_ between attr & value
	   * @param   { String }   html - html string we want to parse
	   * @param   { Function } fn - callback function to apply on any attribute found
	   */
	  function walkAttributes(html, fn) {
	    var m,
	        re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;

	    while (m = re.exec(html)) {
	      fn(m[1].toLowerCase(), m[2] || m[3] || m[4]);
	    }
	  }

	  /**
	   * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	   * @param   { Object }  dom - DOM node we want to parse
	   * @returns { Boolean } -
	   */
	  function isInStub(dom) {
	    while (dom) {
	      if (dom.inStub) return true;
	      dom = dom.parentNode;
	    }
	    return false;
	  }

	  /**
	   * Create a generic DOM node
	   * @param   { String } name - name of the DOM node we want to create
	   * @param   { Boolean } isSvg - should we use a SVG as parent node?
	   * @returns { Object } DOM node just created
	   */
	  function mkEl(name, isSvg) {
	    return isSvg ? document.createElementNS('http://www.w3.org/2000/svg', 'svg') : document.createElement(name);
	  }

	  /**
	   * Shorter and fast way to select multiple nodes in the DOM
	   * @param   { String } selector - DOM selector
	   * @param   { Object } ctx - DOM node where the targets of our search will is located
	   * @returns { Object } dom nodes found
	   */
	  function $$(selector, ctx) {
	    return (ctx || document).querySelectorAll(selector);
	  }

	  /**
	   * Shorter and fast way to select a single node in the DOM
	   * @param   { String } selector - unique dom selector
	   * @param   { Object } ctx - DOM node where the target of our search will is located
	   * @returns { Object } dom node found
	   */
	  function $(selector, ctx) {
	    return (ctx || document).querySelector(selector);
	  }

	  /**
	   * Simple object prototypal inheritance
	   * @param   { Object } parent - parent object
	   * @returns { Object } child instance
	   */
	  function inherit(parent) {
	    function Child() {}
	    Child.prototype = parent;
	    return new Child();
	  }

	  /**
	   * Get the name property needed to identify a DOM node in riot
	   * @param   { Object } dom - DOM node we need to parse
	   * @returns { String | undefined } give us back a string to identify this dom node
	   */
	  function getNamedKey(dom) {
	    return getAttr(dom, 'id') || getAttr(dom, 'name');
	  }

	  /**
	   * Set the named properties of a tag element
	   * @param { Object } dom - DOM node we need to parse
	   * @param { Object } parent - tag instance where the named dom element will be eventually added
	   * @param { Array } keys - list of all the tag instance properties
	   */
	  function setNamed(dom, parent, keys) {
	    // get the key value we want to add to the tag instance
	    var key = getNamedKey(dom),
	        isArr,

	    // add the node detected to a tag instance using the named property
	    add = function add(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return;
	      // check whether this value is an array
	      isArr = isArray(value);
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom;
	        // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	          // add the dom node into the array
	          if (isArr) value.push(dom);else parent[key] = [value, dom];
	        }
	    };

	    // skip the elements with no named properties
	    if (!key) return;

	    // check whether this key has been already evaluated
	    if (tmpl.hasExpr(key))
	      // wait the first updated event only once
	      parent.one('mount', function () {
	        key = getNamedKey(dom);
	        add(parent[key]);
	      });else add(parent[key]);
	  }

	  /**
	   * Faster String startsWith alternative
	   * @param   { String } src - source string
	   * @param   { String } str - test string
	   * @returns { Boolean } -
	   */
	  function startsWith(src, str) {
	    return src.slice(0, str.length) === str;
	  }

	  /**
	   * requestAnimationFrame function
	   * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	   */
	  var rAF = function (w) {
	    var raf = w.requestAnimationFrame || w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame;

	    if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {
	      // buggy iOS6
	      var lastTime = 0;

	      raf = function raf(cb) {
	        var nowtime = Date.now(),
	            timeout = Math.max(16 - (nowtime - lastTime), 0);
	        setTimeout(function () {
	          cb(lastTime = nowtime + timeout);
	        }, timeout);
	      };
	    }
	    return raf;
	  }(window || {});

	  /**
	   * Mount a tag creating new Tag instance
	   * @param   { Object } root - dom node where the tag will be mounted
	   * @param   { String } tagName - name of the riot tag we want to mount
	   * @param   { Object } opts - options to pass to the Tag instance
	   * @returns { Tag } a new Tag instance
	   */
	  function mountTo(root, tagName, opts) {
	    var tag = __tagImpl[tagName],

	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	    // clear the inner html
	    root.innerHTML = '';

	    if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML);

	    if (tag && tag.mount) {
	      tag.mount();
	      // add this tag to the virtualDom variable
	      if (!contains(__virtualDom, tag)) __virtualDom.push(tag);
	    }

	    return tag;
	  }
	  /**
	   * Riot public api
	   */

	  // share methods for other riot parts, e.g. compiler
	  riot.util = { brackets: brackets, tmpl: tmpl };

	  /**
	   * Create a mixin that could be globally shared across all the tags
	   */
	  riot.mixin = function () {
	    var mixins = {},
	        globals = mixins[GLOBAL_MIXIN] = {},
	        _id = 0;

	    /**
	     * Create/Return a mixin by its name
	     * @param   { String }  name - mixin name (global mixin if object)
	     * @param   { Object }  mixin - mixin logic
	     * @param   { Boolean } g - is global?
	     * @returns { Object }  the mixin logic
	     */
	    return function (name, mixin, g) {
	      // Unnamed global
	      if (isObject(name)) {
	        riot.mixin('__unnamed_' + _id++, name, true);
	        return;
	      }

	      var store = g ? globals : mixins;

	      // Getter
	      if (!mixin) return store[name];
	      // Setter
	      store[name] = extend(store[name] || {}, mixin);
	    };
	  }();

	  /**
	   * Create a new riot tag implementation
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag = function (name, html, css, attrs, fn) {
	    if (isFunction(attrs)) {
	      fn = attrs;
	      if (/^[\w\-]+\s?=/.test(css)) {
	        attrs = css;
	        css = '';
	      } else attrs = '';
	    }
	    if (css) {
	      if (isFunction(css)) fn = css;else styleManager.add(css);
	    }
	    name = name.toLowerCase();
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Create a new riot tag implementation (for use by the compiler)
	   * @param   { String }   name - name/id of the new riot tag
	   * @param   { String }   html - tag template
	   * @param   { String }   css - custom tag css
	   * @param   { String }   attrs - root tag attributes
	   * @param   { Function } fn - user function
	   * @returns { String } name/id of the tag just created
	   */
	  riot.tag2 = function (name, html, css, attrs, fn) {
	    if (css) styleManager.add(css);
	    //if (bpair) riot.settings.brackets = bpair
	    __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn };
	    return name;
	  };

	  /**
	   * Mount a tag using a specific tag implementation
	   * @param   { String } selector - tag DOM selector
	   * @param   { String } tagName - tag implementation name
	   * @param   { Object } opts - tag logic
	   * @returns { Array } new tags instances
	   */
	  riot.mount = function (selector, tagName, opts) {

	    var els,
	        allTags,
	        tags = [];

	    // helper functions

	    function addRiotTags(arr) {
	      var list = '';
	      each(arr, function (e) {
	        if (!/[^-\w]/.test(e)) {
	          e = e.trim().toLowerCase();
	          list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]';
	        }
	      });
	      return list;
	    }

	    function selectAllTags() {
	      var keys = Object.keys(__tagImpl);
	      return keys + addRiotTags(keys);
	    }

	    function pushTags(root) {
	      if (root.tagName) {
	        var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG);

	        // have tagName? force riot-tag to be the same
	        if (tagName && riotTag !== tagName) {
	          riotTag = tagName;
	          setAttr(root, RIOT_TAG_IS, tagName);
	          setAttr(root, RIOT_TAG, tagName); // this will be removed in riot 3.0.0
	        }
	        var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	        if (tag) tags.push(tag);
	      } else if (root.length) {
	        each(root, pushTags); // assume nodeList
	      }
	    }

	    // ----- mount code -----

	    // inject styles into DOM
	    styleManager.inject();

	    if (isObject(tagName)) {
	      opts = tagName;
	      tagName = 0;
	    }

	    // crawl the DOM to find the tag
	    if ((typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === T_STRING) {
	      if (selector === '*')
	        // select all the tags registered
	        // and also the tags found with the riot-tag attribute set
	        selector = allTags = selectAllTags();else
	        // or just the ones named like the selector
	        selector += addRiotTags(selector.split(/, */));

	      // make sure to pass always a selector
	      // to the querySelectorAll function
	      els = selector ? $$(selector) : [];
	    } else
	      // probably you have passed already a tag or a NodeList
	      els = selector;

	    // select all the registered and mount them inside their root elements
	    if (tagName === '*') {
	      // get all custom tags
	      tagName = allTags || selectAllTags();
	      // if the root els it's just a single tag
	      if (els.tagName) els = $$(tagName, els);else {
	        // select all the children for all the different root elements
	        var nodeList = [];
	        each(els, function (_el) {
	          nodeList.push($$(tagName, _el));
	        });
	        els = nodeList;
	      }
	      // get rid of the tagName
	      tagName = 0;
	    }

	    pushTags(els);

	    return tags;
	  };

	  /**
	   * Update all the tags instances created
	   * @returns { Array } all the tags instances
	   */
	  riot.update = function () {
	    return each(__virtualDom, function (tag) {
	      tag.update();
	    });
	  };

	  /**
	   * Export the Virtual DOM
	   */
	  riot.vdom = __virtualDom;

	  /**
	   * Export the Tag constructor
	   */
	  riot.Tag = Tag;
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (( false ? 'undefined' : _typeof(exports)) === T_OBJECT) module.exports = riot;else if (( false ? 'undefined' : _typeof(__webpack_require__(34))) === T_FUNCTION && _typeof(__webpack_require__(35)) !== T_UNDEF) !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return riot;
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else window.riot = riot;
	})(typeof window != 'undefined' ? window : void 0);

/***/ },
/* 34 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 35 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _layer = __webpack_require__(37);

	var _layer2 = _interopRequireDefault(_layer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Router = function () {
	    function Router(opts) {
	        _classCallCheck(this, Router);

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


	    _createClass(Router, [{
	        key: 'config',
	        value: function config(path, opts, middleware) {
	            var middleware;
	            if (opts.tag) {
	                opts.tag.hidden = true;
	            }

	            if ((typeof opts === 'undefined' ? 'undefined' : _typeof(opts)) === 'object') {
	                middleware = Array.prototype.slice.call(arguments, 2);
	            } else {
	                middleware = Array.prototype.slice.call(arguments, 1);
	                opts = {};
	            }

	            this.register(path, middleware, opts);

	            return this;
	        }
	    }, {
	        key: 'register',


	        /**
	         * Create and register a route.
	         *
	         * @param {String} path Path string or regular expression.
	         * @param {Array.<String>} methods Array of HTTP verbs.
	         * @param {Function} middleware Multiple middleware also accepted.
	         * @returns {Layer}
	         * @private
	         */
	        value: function register(path, middleware, opts) {
	            opts = opts || {};

	            var stack = this.stack;

	            // create route
	            var route = new _layer2.default(path, middleware, {
	                end: opts.end === false ? opts.end : true,
	                name: opts.name,
	                tag: opts.tag,
	                sensitive: opts.sensitive || this.opts.sensitive || false,
	                strict: opts.strict || this.opts.strict || false,
	                prefix: opts.prefix || this.opts.prefix || ""
	            });

	            if (this.opts.prefix) {
	                route.setPrefix(this.opts.prefix);
	            }

	            // register route with router
	            stack.push(route);

	            return route;
	        }
	    }, {
	        key: 'use',


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
	        value: function use() {
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
	        }
	    }, {
	        key: 'prefix',


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

	        value: function prefix(_prefix) {
	            _prefix = _prefix.replace(/\/$/, '');

	            this.opts.prefix = _prefix;

	            this.stack.forEach(function (route) {
	                route.setPrefix(_prefix);
	            });

	            return this;
	        }
	    }, {
	        key: 'routes',


	        /**
	         * Returns router middleware which dispatches a route matching the request.
	         *
	         * @returns {Function}
	         */

	        value: function routes() {
	            var router = this;

	            var dispatch = function dispatch(next) {
	                var _this = this;

	                var self = this;
	                var path = router.opts.routerPath || this.routerPath || this.request.path;
	                var matched = router.match(path);
	                if (this.matched) {
	                    this.matched.push.apply(this.matched, matched.path);
	                } else {
	                    this.matched = matched.path;
	                }
	                if (matched.pathAndMethod.length) {
	                    var i = 0;

	                    var _loop = function _loop() {
	                        var layer = matched.pathAndMethod[i];
	                        i++;
	                        var ii = 0;
	                        _this.captures = layer.captures(path, _this.captures);
	                        _this.params = layer.params(path, _this.captures, _this.params);
	                        tag = layer.tag;

	                        function display(tag) {

	                            tag.update({ hidden: false });
	                            Object.keys(tag.parent.tags).map(function (k) {
	                                return tag.parent.tags[k];
	                            }).filter(function (t) {
	                                return t != tag;
	                            }).forEach(function (t) {
	                                if (t.hasOwnProperty('hidden')) {
	                                    t.update({ hidden: true });
	                                }
	                            });
	                            if (tag.parent.parent) {
	                                display(tag.parent);
	                            }
	                        }
	                        layer.stack.push(function () {
	                            display(tag);
	                        });
	                        run();
	                        function run() {
	                            var fn = layer.stack[ii];
	                            ii++;
	                            if (ii <= layer.stack.length) {
	                                fn.call(self, run);
	                            }
	                        }
	                    };

	                    while (matched.route && i < matched.pathAndMethod.length) {
	                        var tag;

	                        _loop();
	                    }
	                }

	                next();
	            };

	            dispatch.router = this;
	            return dispatch;
	        }
	    }, {
	        key: 'match',


	        /**
	         * Match given `path` and return corresponding routes.
	         *
	         * @param {String} path
	         * @param {String} method
	         * @returns {Object.<path, pathAndMethod>} returns layers that matched path and
	         * path and method.
	         * @private
	         */

	        value: function match(path) {
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
	        }
	    }]);

	    return Router;
	}();

	exports.default = Router;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _pathToRegexp = __webpack_require__(38);

	var _pathToRegexp2 = _interopRequireDefault(_pathToRegexp);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Layer = function () {
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

	    function Layer(path, middleware, opts) {
	        _classCallCheck(this, Layer);

	        this.opts = opts || {};
	        this.name = this.opts.name || null;
	        this.tag = opts.tag || {};
	        this.paramNames = [];
	        this.stack = Array.isArray(middleware) ? middleware : [middleware];

	        // ensure middleware is a function
	        this.stack.forEach(function (fn) {
	            var type = typeof fn === 'undefined' ? 'undefined' : _typeof(fn);
	            if (type !== 'function') {
	                throw new Error(" `" + (this.opts.name || path) + "`: `middleware` " + "must be a function, not `" + type + "`");
	            }
	        }, this);

	        this.path = path;
	        this.regexp = (0, _pathToRegexp2.default)(path, this.paramNames, this.opts);
	    }

	    /**
	     * Returns whether request `path` matches route.
	     *
	     * @param {String} path
	     * @returns {Boolean}
	     * @private
	     */

	    _createClass(Layer, [{
	        key: 'match',
	        value: function match(path) {
	            return this.regexp.test(path);
	        }
	    }, {
	        key: 'params',


	        /**
	         * Returns map of URL parameters for given `path` and `paramNames`.
	         *
	         * @param {String} path
	         * @param {Array.<String>} captures
	         * @param {Object=} existingParams
	         * @returns {Object}
	         * @private
	         */

	        value: function params(path, captures, existingParams) {
	            var params = existingParams || {};

	            for (var len = captures.length, i = 0; i < len; i++) {
	                if (this.paramNames[i]) {
	                    var c = captures[i];
	                    params[this.paramNames[i].name] = c ? safeDecodeURIComponent(c) : c;
	                }
	            }

	            return params;
	        }
	    }, {
	        key: 'captures',


	        /**
	         * Returns array of regexp url path captures.
	         *
	         * @param {String} path
	         * @returns {Array.<String>}
	         * @private
	         */

	        value: function captures(path) {
	            return path.match(this.regexp).slice(1);
	        }
	    }, {
	        key: 'url',


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

	        value: function url(params) {
	            var args = params;
	            var url = this.path;

	            // argument is of form { key: val }
	            if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) != 'object') {
	                args = Array.prototype.slice.call(arguments);
	            }

	            if (args instanceof Array) {
	                for (var len = args.length, i = 0; i < len; i++) {
	                    url = url.replace(/:[^\/]+/, args[i]);
	                }
	            } else {
	                for (var key in args) {
	                    url = url.replace(':' + key, args[key]);
	                }
	            }

	            url.split('/').forEach(function (component) {
	                url = url.replace(component, encodeURIComponent(component));
	            });

	            return url;
	        }
	    }, {
	        key: 'setPrefix',


	        /**
	         * Prefix route path.
	         *
	         * @param {String} prefix
	         * @returns {Layer}
	         * @private
	         */

	        value: function setPrefix(prefix) {
	            if (this.path) {
	                this.path = prefix + this.path;
	                this.paramNames = [];
	                this.regexp = (0, _pathToRegexp2.default)(this.path, this.paramNames, this.opts);
	            }

	            return this;
	        }
	    }]);

	    return Layer;
	}();

	/**
	 * Safe decodeURIComponent, won't throw any error.
	 * If `decodeURIComponent` error happen, just return the original value.
	 *
	 * @param {String} text
	 * @returns {String} URL decode original string.
	 * @private
	 */

	exports.default = Layer;
	function safeDecodeURIComponent(text) {
	    try {
	        return decodeURIComponent(text);
	    } catch (e) {
	        return text;
	    }
	}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var isarray = __webpack_require__(39);

	/**
	 * Expose `pathToRegexp`.
	 */
	module.exports = pathToRegexp;
	module.exports.parse = parse;
	module.exports.compile = compile;
	module.exports.tokensToFunction = tokensToFunction;
	module.exports.tokensToRegExp = tokensToRegExp;

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	// Match escaped characters that would otherwise appear in future matches.
	// This allows the user to escape special characters that won't transform.
	'(\\\\.)',
	// Match Express-style parameters and un-named parameters with a prefix
	// and optional suffixes. Matches appear as:
	//
	// "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	// "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	// "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	'([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'].join('|'), 'g');

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse(str) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var res;

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue;
	    }

	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }

	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || '/';
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?');

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    });
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }

	  return tokens;
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile(str) {
	  return tokensToFunction(parse(str));
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty(str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk(str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	  });
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction(tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (_typeof(tokens[i]) === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }

	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];

	      if (typeof token === 'string') {
	        path += token;

	        continue;
	      }

	      var value = data[token.name];
	      var segment;

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }

	          continue;
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined');
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`');
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue;
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty');
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`');
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }

	        continue;
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"');
	      }

	      path += token.prefix + segment;
	    }

	    return path;
	  };
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString(str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1');
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup(group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1');
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys(re, keys) {
	  re.keys = keys;
	  return re;
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags(options) {
	  return options.sensitive ? '' : 'i';
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp(path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }

	  return attachKeys(path, keys);
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp(path, keys, options) {
	  var parts = [];

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

	  return attachKeys(regexp, keys);
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp(path, keys, options) {
	  var tokens = parse(path);
	  var re = tokensToRegExp(tokens, options);

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i]);
	    }
	  }

	  return attachKeys(re, keys);
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp(tokens, options) {
	  options = options || {};

	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';
	  var lastToken = tokens[tokens.length - 1];
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken);

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }

	      route += capture;
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?';
	  }

	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)';
	  }

	  return new RegExp('^' + route, flags(options));
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp(path, keys, options) {
	  keys = keys || [];

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */keys;
	    keys = [];
	  } else if (!options) {
	    options = {};
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */keys);
	  }

	  if (isarray(path)) {
	    return arrayToRegexp( /** @type {!Array} */path, /** @type {!Array} */keys, options);
	  }

	  return stringToRegexp( /** @type {string} */path, /** @type {!Array} */keys, options);
	}

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(41)
	__webpack_require__(42)
	__webpack_require__(43)
	riot.tag2('app', '<home></home> <poster></poster> <footer></footer>', '', '', function(opts) {
	});

/***/ },
/* 41 */
/***/ function(module, exports) {

	riot.tag2('home', '<div class="author-top"> <div class="headimgbac" style="background: url(http://img.aituwen.com/SJJLnANXY25kdf7aFMV2MEVo2UU%3D?imageView2/1/w/132/interlace/1) no-repeat 0 0;background-size:cover;"> </div> <div class="authors-cover"></div> <div class="author-info"> <div class="avatar"> <img alt="548e7287311c21743694cee4" quality="100" src="http://img.aituwen.com/SJJLnANXY25kdf7aFMV2MEVo2UU%3D?imageView2/1/w/132/interlace/1" thumbnail="64x64"> </div> <p class="name">德宏</p> <span class="dianl">&nbsp;</span> <span class="faxianl"> 541天前发现格图 </span> </div> <div class="loadingForFollow" style="display: none;"></div> <div class="divForButton" style="border-color: rgb(240, 105, 58); display: block;"> <div class="divForSpan" onclick="app.f.tofocusInShow()"> <div class="followButtonIcon verticalMediate buttonIconMark" style="display: block;"></div> <span class="followWordSpan buttonSpanMark" style="display: block;">关注</span> <div class="followButtonIcon1 verticalMediate buttonIconMark" style="display: none;"></div> <span class="followWordSpan1 buttonSpanMark" style="display: none;">已关注</span> <div class="followButtonIcon2 verticalMediate buttonIconMark" style="display: none;"></div> <span class="followWordSpan2 buttonSpanMark" style="display: none;">相互关注</span> </div> <div class="loadingDiv"></div> </div> <div class="buttonCover" style="display: none;"></div> </div> <div id="wrap" class="container" style="background:#f4f4f4;"> <div id="main-timeline" class="row main-timeline" role="main"> <div id="tline-content" class="col-xs-12 col-md-12"> <article id="5757a56a6c5e49892a0544e9" class="tline-box item_img_2 col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-l hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -8.58062px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">6月&nbsp;/&nbsp;8&nbsp;&nbsp;2016</span> <h4><a href="/post/show/5757a56a6c5e49892a0544e9">护蛋行动（1）</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>56</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>6</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>107</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>16</span> </div> </div> </article> <article id="574be3c4382322e438d02ee3" class="tline-box item_img_1 rgtline col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-r hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/wNZ37Frk59rv%2FMcBPi8nU5rQiHo%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/wNZ37Frk59rv%2FMcBPi8nU5rQiHo%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -8.83875px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;30&nbsp;&nbsp;2016</span> <h4><a href="/post/show/574be3c4382322e438d02ee3">今天我当家（3）</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>140</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>34</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>594</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>27</span> </div> </div> </article> <div class="clear"></div> <article id="574a3ec3b17100d80bac469b" class="tline-box item_img_0 col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-l hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/rcwCP4YKctn9XMz7ygUJuvBLcGI%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/rcwCP4YKctn9XMz7ygUJuvBLcGI%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -70.0144px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;29&nbsp;&nbsp;2016</span> <h4><a href="/post/show/574a3ec3b17100d80bac469b">今天我当家（2）</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>146</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>32</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>624</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>32</span> </div> </div> </article> <article id="57492d8cf14e27683ebdb94b" class="tline-box item_img_1 rgtline col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-r hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/gZBegzfJ5REC7HlVEc8dVJ2G8xI%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/gZBegzfJ5REC7HlVEc8dVJ2G8xI%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -8.83875px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;28&nbsp;&nbsp;2016</span> <h4><a href="/post/show/57492d8cf14e27683ebdb94b">今天我当家(1)</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>167</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>47</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>924</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>39</span> </div> </div> </article> <div class="clear"></div> <article id="573c4c63e845e7e57affccb1" class="tline-box item_img_2 col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-l hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/umZBB04THaMJ9RPLi2zGorzuAhE%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/umZBB04THaMJ9RPLi2zGorzuAhE%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -77.5px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;18&nbsp;&nbsp;2016</span> <h4><a href="/post/show/573c4c63e845e7e57affccb1">思念是一种病 ，出发才是解药</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>656</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>128</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>4k</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>148</span> </div> </div> </article> <article id="573879db2d910b2030c4dfd6" class="tline-box item_img_2 rgtline col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-r hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/KSVsTky7Pcoyud4VZCqZlg2ZkAI%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/KSVsTky7Pcoyud4VZCqZlg2ZkAI%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -30.005px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;15&nbsp;&nbsp;2016</span> <h4><a href="/post/show/573879db2d910b2030c4dfd6">一把小雨伞</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>162</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>26</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>668</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>20</span> </div> </div> </article> <div class="clear"></div> <article id="572f228e29853b4e3f80be8a" class="tline-box item_img_1 col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-l hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/rsaj10RsDsFpx9cvwppZ%2FLXw8tw%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/rsaj10RsDsFpx9cvwppZ%2FLXw8tw%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -8.83875px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;8&nbsp;&nbsp;2016</span> <h4><a href="/post/show/572f228e29853b4e3f80be8a">秘密花园</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>473</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>77</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>4k</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>206</span> </div> </div> </article> <article id="572b3f0c54703cdc3f0a3dee" class="tline-box item_img_1 rgtline col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-r hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/QexyFZ3FloJKf1Khuq%2FN%2BAfhf%2Bg%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/QexyFZ3FloJKf1Khuq%2FN%2BAfhf%2Bg%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -10.1294px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">5月&nbsp;/&nbsp;5&nbsp;&nbsp;2016</span> <h4><a href="/post/show/572b3f0c54703cdc3f0a3dee">我与花海有个约定</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>153</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>47</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>1k</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>59</span> </div> </div> </article> <div class="clear"></div> <article id="570a48216857c60c7478a592" class="tline-box item_img_1 col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-l hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/QDe0RxhDoUFOxX6%2BsyOqcSNq%2B2Y%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/QDe0RxhDoUFOxX6%2BsyOqcSNq%2B2Y%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -8.83875px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">4月&nbsp;/&nbsp;10&nbsp;&nbsp;2016</span> <h4><a href="/post/show/570a48216857c60c7478a592">路过新安江 留下喜欢/:rose</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>269</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>56</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>2k</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>112</span> </div> </div> </article> <article id="57079a9b0898b031671aef54" class="tline-box item_img_2 rgtline col-xs-12 col-md-5 col-sm-5"> <span class="tline-row-r hidden-xs"></span> <div class="item_ imgbox" style="overflow: hidden;"> <div class="photo" style="width: 413px; height: 258.125px;"> <img class="scroload photo" onerror="this.parentNode.removeChild(this)" data-url="http://img.aituwen.com/5HaDoAJCuXf9owprIdte%2FbTdSG0%3D?imageView2/2/w/800/interlace/1" src="http://img.aituwen.com/5HaDoAJCuXf9owprIdte%2FbTdSG0%3D?imageView2/2/w/800/interlace/1" style="width: 100%; margin-top: -5.99938px;"> </div> <span class="icon-sanjiao"> <i class="iconfont icon-iconsanjiao ic-2x"></i> </span> </div> <div class="tline-ecxt"> <span class="date">4月&nbsp;/&nbsp;8&nbsp;&nbsp;2016</span> <h4><a href="/post/show/57079a9b0898b031671aef54">这个春天，我们去牛首山/::&gt;</a></h4> </div> <hr noshade="value" class="line"> <div class="artdata"> <div class="icon-a"> <i class="iconfont icon-01 ic-2x"></i> <span>121</span> </div> <div class="icon-b"> <i class="iconfont icon-02 ic-2x"></i> <span>15</span> </div> <div class="icon-c"> <i class="iconfont icon-03 ic-1x"></i> <span>581</span> </div> <div class="icon-d"> <i class="iconfont icon-04 ic-1x"></i> <span>23</span> </div> </div> </article> <div class="clear"></div> </div> </div> <div class="showmore"> <span class="showmoretext">查看更多</span> </div> <div class="relationdesc"> <p>快快关注TA，不错过任何动态！</p> </div> <div class="foot-div"> <i class="foot-img juzhongfoot"></i> </div> <div class="confirm"> <div class="wordHolder"> <div class="confirmSpanHolder" id="confirmSpanHolder"> <span id="confirmSpan"></span> </div> </div> <div class="choiceHolder"> <div class="no"><span></span></div> <div class="choiceHolderWhiteLine mediate"></div> <div class="yes"><span></span></div> </div> </div> <div class="class2Note"> <div class="class2WordHolder"> <div class="class2ConfirmSpanHolder" id="class2ConfirmSpanHolder"> <span id="class2ConfirmSpan"></span> </div> </div> <div class="class2ChoiceHolder"> <div class="class2nNo"><span></span></div> <div class="class2ChoiceHolderWhiteLine mediate"></div> <div class="class2Yes"><span></span></div> </div> </div> <div class="shadeNote"> <div class="class1SpanHodler"> <span id="class1Span"></span> </div> </div> <div id="cover5" style="position: fixed; width: 100%; height: 100%;"></div> <input type="hidden" name="lasttime" value="Fri Apr 08 2016 19:48:43 GMT+0800 (CST)"> <input type="hidden" name="userid" value="548e7287311c21743694cee4"> </div> <link rel="stylesheet" href="/web/css/bootstrap.min.css"> <link rel="stylesheet" href="/web/css/font-awesome.min.css"> <link rel="stylesheet" href="/web/css/iconfont.css"> <link rel="stylesheet" href="/web/css/index.css">', 'home .header-top,[riot-tag="home"] .header-top,[data-is="home"] .header-top{ background: #fff; height: 40px; } home .left,[riot-tag="home"] .left,[data-is="home"] .left{ display: inline-block; float: left; width: 50px; margin-top: 9px; margin-left: 10px; position: relative; z-index: 1; } home .center,[riot-tag="home"] .center,[data-is="home"] .center{ text-align: center; display: block; left: -35px; position: relative; font-size: 16px; top: 8px; } home .author-top,[riot-tag="home"] .author-top,[data-is="home"] .author-top{ position: relative; } home .headimgbac,[riot-tag="home"] .headimgbac,[data-is="home"] .headimgbac{ height: 225px } home .authors-cover,[riot-tag="home"] .authors-cover,[data-is="home"] .authors-cover{ height: 225px; position: relative; background-color: #0A091B; margin-top: -225px; opacity: 0.96; } home .author-info,[riot-tag="home"] .author-info,[data-is="home"] .author-info{ margin-top: -184px; height: 184px; position: relative; text-align: center; } home .author-info .avatar,[riot-tag="home"] .author-info .avatar,[data-is="home"] .author-info .avatar{ padding: 0; width: 63px; height: 63px; margin-left: auto; margin-right: auto; background: #E5E5E5; border-radius: 100px; } home .avatar img,[riot-tag="home"] .avatar img,[data-is="home"] .avatar img{ width: 63px; height: 63px; border-radius: 100px; border: none; } home .author-info .name,[riot-tag="home"] .author-info .name,[data-is="home"] .author-info .name{ color: #fff; margin-top: 18px; font-size: 17px; line-height: 17px; font-weight: normal; } home .author-info span,[riot-tag="home"] .author-info span,[data-is="home"] .author-info span{ position: relative; display: block; color: #fff; font-size: 12px; line-height: 12px; margin-left: auto; margin-right: auto; } home .dianl,[riot-tag="home"] .dianl,[data-is="home"] .dianl{ height: 6px; margin: 13px 0 14px; background: #fff; position: absolute; width: 5px; height: 5px; border-radius: 40px; display: none !important; } home .faxianl,[riot-tag="home"] .faxianl,[data-is="home"] .faxianl{ opacity: 0.15; margin-top: 61px; }', 'if="{!hidden}"', function(opts) {
	            var initData = {};
	            initData.visitorId = "" || '';
	            initData.returnurl = "http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&mid=204281103&idx=1&sn=d56f4a1015f988feca1510053bcfc1b9#rd";
	            initData.author_id = "548e7287311c21743694cee4";
	            initData.isSubscribe = false;
	            initData.isUser = false;

	//            var relationship = new Relationship();
	//
	//            var notification = new Notification();
	//
	//            notification.initTheButton();
	//
	//            notification.initTheButton1();
	//
	//            relationship.relationshipJudge();//判断访问者和被访问者的关系

	        var self = this;
	        var router = this.router();
	        router.config('/home', {tag: this}, function (next) {
	            console.log('route to home');
	            next();
	        })
	});

/***/ },
/* 42 */
/***/ function(module, exports) {

	riot.tag2('poster', '<div id="activity-detail"> <div class="nav-button"> <div class="nav-div-back" onclick="gotoHistory()"> <i class="incons_show nav-back"></i> </div> <div class="nav-div-center"> <i class="incons_show nav-fav"></i> <i class="incons_show nav-yes-fav" style="display:none"></i> <i class="incons_show nav-yes-like" style="display:none"></i> <i class="incons_show nav-like"></i> <a href="#dt_visitor"><i class="incons_show nav-comment"></i></a> <input name="favoriteid" type="hidden" value=""> </div> </div> <div id="main"> <div class="author-top"> <div class="headimgbac" id="headimgbac"> <img src="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/1/h/640/interlace/1" onerror="this.parentNode.removeChild(this)"> </div> <i id="medallike" class="incons_show medal typelike like-right"></i> <img class="headbacsanjiao" src="/web/images/sanjiao2.png"> <div class="author-info"> <div class="avatar"> <a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"> <img alt="548e7287311c21743694cee4" quality="100" src="http://img.aituwen.com/SJJLnANXY25kdf7aFMV2MEVo2UU%3D?imageView2/2/w/96/interlace/1" thumbnail="64x64"> </a> </div> </div> <div class="headauthormsg"> <span class="authorname-head">德宏</span><i class="expert-head"></i> </div> <div class="followmsg-head"> <div class="divForButton-head" style="display:block"> <div class="divForSpan" onclick="app.f.tofocusInShow()"> <span class="followWordSpan buttonSpanMark" style="display:block">关注</span> <span class="followWordSpan1 buttonSpanMark">已关注</span> <span class="followWordSpan2 buttonSpanMark">相互关注</span> </div> </div> <div class="buttonCover"></div> </div> <div class="poststatus"> </div> <div id="music" class="musicright animated"> <div class="musicborder"> <span class="musicinfo"><i class="musicicon_move musicicon"></i></span> </div> <div id="playerContent" style="width: 0px; height: 0px;"> <audio id="paly1" src="http://m1.music.126.net/oSDrULdH6XHuWO3Fh8ZkSg==/5940661325244235.mp3" preload="auto" loop="loop">浏览器不支持音频标签 </audio> </div> </div> <div class="musicsanjiao" style="display: none;"></div> <div class="musicmsg" style="display: none;"> <p class="musicname">爱我你就抱抱我(合唱版)&nbsp;&nbsp;段丽阳</p> </div> </div> <div class="page-bizinfo"> <div class="postitme"> <span id="post-date" class="time-date">6月8日&nbsp;2016</span> </div> <div class="header"> <h1 id="activity-name">护蛋行动（1）</h1> <span class="activity-meta post-visit"> 阅读: 174 </span> <span class="teshufuhao">&amp;</span> <span class="activity-meta post-share"> 分享: 24 </span> <hr noshade="value" class="line"> </div> </div> <div id="page-content" class="page-content"> <div id="img-content" style="height: 3685px; overflow: hidden;"> <div class="text"> <p style="font-weight:bold;color:rgb(240, 105, 58);font-size:18px;text-align:center;"> 古小四3班语文实践活动</p> </div> <div class="media" id="media1"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/80Rler1%2FJh%2Bty%2BLCVRGe1s%2Bazh0%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;color:rgb(240, 105, 58);font-size:18px;">我的宝宝诞生啦！</p> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;">图/德宏&nbsp; 文/古平岗小学四3班的孩子们</p> </div> <div class="text"> <p style="font-weight:bold;color:rgb(240, 105, 58);font-size:18px;">写在活动前的话： 真正幸福的人，是过着值得尊敬和真正人的生活的人，是精神上和物质上都很富有的人。学会过美好的生活，使每一个学生都成为能够创造幸福生活的人，这才是完美的教育！ 中国古训“纸上得来终觉浅，绝知此事要躬行”。护蛋行动，让孩子们学会在活动中体验，体验中感悟，感悟生命的意义，感恩父母的恩情！</p> </div> <div class="media" id="media5"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/WkoMRvZN1pU13BHRX62y8MLqKWw%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/WkoMRvZN1pU13BHRX62y8MLqKWw%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/WkoMRvZN1pU13BHRX62y8MLqKWw%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 2016年6月1日是个特别的日子，王老师又一次组织了有趣的语文实践活动——护蛋行动。 听到这个消息，大家兴奋不已。回家后，我怀着一种好奇的心情打扮我的“蛋宝宝”。我要让她长得像仙女一样，所以我给她取名叫“苏小仙”。从今天开始她就是我的“妹妹”了，我会24小时不离身的保护她。规则是，如果她“死”了，游戏就结束了。【欣彤】</p> </div> <div class="media" id="media7"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/TJmZYmc%2FEHbiqz9VQSHmhcPf1SQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/TJmZYmc%2FEHbiqz9VQSHmhcPf1SQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/TJmZYmc%2FEHbiqz9VQSHmhcPf1SQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我打开冰箱，一眼就看中了一个不是太大，但看起来很坚硬的白鸡蛋。既然我看见了你，那就决定选你了。我边说边拿起他，给他洗了个澡后，就迫不及待地给他装饰、上色，还给他取名“小金刚”。 做完一切准备后，我突然想到一个问题，你和我是什么关系呢？嗯，你就做我的弟弟吧。我会保护好你，不让你碎的！看着“小金刚”，我心里感觉多了一份责任。&nbsp;&nbsp; [沛霖]</p> </div> <div class="media" id="media9"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/F%2FFKnR%2BBc0NXblI8VoHrwRMxAOI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/F%2FFKnR%2BBc0NXblI8VoHrwRMxAOI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/F%2FFKnR%2BBc0NXblI8VoHrwRMxAOI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我的眼一扫，一眼就盯上了一个大鸡蛋，给她取名叫国圆圆。我给她洗了个澡，穿上我亲手缝的粉色小裙。 圆圆穿上了真像个“公主”。为了让她更可爱更漂亮，我还给她画了一双萌萌的眼睛和樱桃似的小嘴巴，给她做了个温暖、柔和的床。你看，我是不是很关心她。她好像在说她:“谢谢你，姐姐。”&nbsp;&nbsp; [雨晴]</p> </div> <div class="media" id="media11"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/iLomzTzCqDmS8%2FhaoWZdy45NdHc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/iLomzTzCqDmS8%2FhaoWZdy45NdHc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/iLomzTzCqDmS8%2FhaoWZdy45NdHc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我带的蛋被我化妆成一个很酷的小帅哥。他是我的弟弟，名字叫做“火狐童子”。怎么样？很酷吧！&nbsp;&nbsp; [智宇]</p> </div> <div class="media" id="media13"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/988mD1X0stm8laaAscdGYtpRGyk%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/988mD1X0stm8laaAscdGYtpRGyk%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/988mD1X0stm8laaAscdGYtpRGyk%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我这个宝贝跟我是父子关系，我给他起名叫“韩小志”。[咏志] （老师语：呵呵，更像是你的兄弟）</p> </div> <div class="media" id="media15"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="http://img.aituwen.com/qHEgRZYUjHLZTDT9DY8QDhJGOYM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-layzr="http://img.aituwen.com/qHEgRZYUjHLZTDT9DY8QDhJGOYM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/qHEgRZYUjHLZTDT9DY8QDhJGOYM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我给我的蛋宝宝取名为范嘉盛。为什么呢?范是我的姓，嘉是财富的意思，盛就是旺盛的意思，也就是说我希望他以后财富很旺盛啦!他是我的弟弟。我给他打扮得很帅哩! 我给他的保护是：在一个纸盒子里放上一些纸。之后，我把嘉盛放在盒子里，这样他会很觉得舒服呢!再用一个盒子给他盖上，用绳子系在纸盒子上，这样我就可以挂在身上了。 一切准备就绪。一晚上，我都兴奋地睡不着觉哩!终于天亮喽!，上学时我时不时地对我的嘉盛说:“宝贝乖哦!哥哥带你出发啦！” [诗嘉]</p> </div> <div class="media" id="media17"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/6lWkmwVQ%2F1VHl%2FQfi7JBnkqx2OE%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/6lWkmwVQ%2F1VHl%2FQfi7JBnkqx2OE%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 为什么给她取这个名字呢？因为我想让“开心果”每天都像花儿一样露出笑脸，开开心心地过好每一天，正如妈妈给我取名为乐乐一样。我怕“开心果”受伤，给她穿上了“气泡垫毛衣”。我觉得她的衣服不够漂亮，又给她穿了一件“红色塑料小外套”。虽然是做游戏，但也有做游戏的规则，那就是：每一节课间或是上厕所都要带着你的宝贝。&nbsp;&nbsp;&nbsp; [张乐]</p> </div> <div class="media" id="media19"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/W1xcOpwqyX5qsvGKLD0t1TrKxwI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/W1xcOpwqyX5qsvGKLD0t1TrKxwI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我挑了一个又胖又圆的鸡蛋，给他取了一个特别的名字，叫“吴有财”，为什么呢？因为在这次活动中，他是我的儿子，和我是父子关系。吴是我的本姓，有是拥有，财是财富。也就是我希望他有才能，每天都能不缺钱花。&nbsp;&nbsp; [克诚]</p> </div> <div class="media" id="media21"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/0e6btDoJND5MQ2DuNXBW0o%2FdFHI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/0e6btDoJND5MQ2DuNXBW0o%2FdFHI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我先在家选一个“蛋”，这个“蛋”可不是一般的蛋哦！自从我选了她以后，就赋予了她一条鲜活的生命啦！从这时开始她就是我的宝贝女儿“妙妙”。 在我的精心打扮下，她可漂亮啦，有一个樱桃般的小嘴，一双水灵灵的大眼睛，小巧的鼻子和一对白嫩嫩的耳朵。 第一天早上，我给妙妙足足穿了三件“衣服”。第一件是双层餐巾纸，第二件是一块小花布，第三件是白色塑料袋。心想，这样放到口袋里就万无一失了。&nbsp;&nbsp; [欣然]</p> </div> <div class="media" id="media23"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/M2zLiuch5hhh0BYkCCRmmnNegLM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/M2zLiuch5hhh0BYkCCRmmnNegLM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 回到家，我从冰箱拿出一颗鸡蛋，然后给他画了一双眼睛，一件衣服，给他取名叫“汪小豪”。我是他的爸爸哟！&nbsp;&nbsp;&nbsp; [子豪]&nbsp;&nbsp; （老师语：呵呵，这个名字，更像是兄弟）</p> </div> <div class="media" id="media25"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/9aT1WNBHen9bAfu%2FjAyQk37a0Ow%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/9aT1WNBHen9bAfu%2FjAyQk37a0Ow%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我选了一个非常漂亮的鸡蛋，在上面画上了小男孩脸的图案，把他装扮成了我的儿子，还用纸给他做上了衣服和帽子，我还给他起了个名字叫孙强强。为什么叫孙强强呢？这可是有说法的：一是因为我特别喜欢《熊出没》里的光头强，二是因为我希望他如小强一样坚强地活下去。&nbsp;&nbsp; [旻哲]</p> </div> <div class="media" id="media27"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/44sBVG%2BkE4ZVWrSX9YK0xoNastk%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/44sBVG%2BkE4ZVWrSX9YK0xoNastk%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我给我的蛋蛋画上长长的头发，大大的眼睛，红红的小嘴。思来想去我给她取了通俗易懂的名字“丁丽儿”。我和她情同手足。为了她的安全，我用餐巾纸做了一件裙子，用A4做了一个摇篮。我发誓：一定保护好丽儿，珍爱她的生命! 一大早，大家带着自己的弟弟妹妹一起到学校过儿童节啦。我发现同学的宝宝既漂亮又可爱。特别是过益涵的“妹妹”，她穿着漂亮的裙子，戴着漂亮的帽子，跟公主一样。我把我的“丁丽儿”给大家看，大家也夸我的妹妹长得出众。“丁丽儿”红彤彤的脸蛋显得更红了。&nbsp;&nbsp;&nbsp; [丽媛]</p> </div> <div class="media" id="media29"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/J1lXk68fggWAKRVNIR27U5ckYQY%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/J1lXk68fggWAKRVNIR27U5ckYQY%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 为什么我那么高兴呢？因为今天不仅是“六一”儿童节，我们的节日；更重要的是就在今天，我的小妹诞生啦！她从外表看虽然只是一个普通的不能再普通的鸡蛋，但是她在我的眼里，是一个拥有生命的宝贝蛋！你瞧，她多漂亮啊！粉红色的蝴蝶结，一件紫色的连衣裙，还有一张圆溜溜的脸蛋，你可不要小瞧她哦！她还有一个好听的名字，叫“妞妞”！ 到了班级，哇，这么多的蛋宝宝！个个可爱之极，我太喜欢他们了！这时，王老师来了，我们一下子仿佛从嘈杂的菜场，变成了安静的图书馆。王老师让我们各自介绍一下自己的“BABY。”我是第一个上台的，我给大家介绍了我的妹妹——妞妞。 一会我看到周琦超上台了，我看了一眼他的蛋宝宝，就忍不住“噗嗤”一声笑了，我心想，这就是他家的宝贝女儿“周婷婷”？呵，简直像个滑稽的小丑，真可笑！&nbsp;&nbsp;&nbsp; [益涵]</p> </div> <div class="media" id="media31"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/DvIt3Z7LfIIQhCDTIQFMJ7rJaXo%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/DvIt3Z7LfIIQhCDTIQFMJ7rJaXo%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我的“女儿”周婷婷诞生了。她长着一双水灵灵的大眼睛，一张樱桃般的小嘴，可爱极了。为什么我会有个女儿呢？因为老师为了让我们体会家长的辛苦就带我们开展“护蛋行动”。规则是这样的：每人准备一个蛋，想想它和你是什么关系，给它画上五官，然后保护好它，两天内一定要随身带。 到了班级一看，呵，每个人的宝贝都来了呀！哈哈，杨胜孜的“杨土豪”分明就是一位小丑，长的好搞笑呀!&nbsp;&nbsp; [琦超]</p> </div> <div class="media" id="media33"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/trghU%2FIpDjPBth3Q3vJxgO9QEEI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/trghU%2FIpDjPBth3Q3vJxgO9QEEI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> “六一”儿童节是我们的节日。语文老师为了让我们感受父母养育我们的艰辛，特意组织了一个活动——护蛋行动。这是我的弟弟杨土豪，哈哈哈！&nbsp; [胜孜]</p> </div> <div class="media" id="media35"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/HV3I1DqvK3gCymT8odwj43fl2P4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/HV3I1DqvK3gCymT8odwj43fl2P4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> “护蛋”活动，要求大家把蛋当人来看。“六一”儿童节，我带着“宝贝儿子”张阿蛋，怀着激动的心情来到学校。&nbsp;&nbsp;&nbsp; [玉康]</p> </div> <div class="media" id="media37"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/E9kJ4ZodZ3X0kdhGz74tnQK518s%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/E9kJ4ZodZ3X0kdhGz74tnQK518s%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 来到学校，王老师让我们把自己的宝宝请到讲台上，并一一介绍。马一飞上来介绍自己的蛋宝宝时把我们吓了一大跳——他竟然带了个“光蛋”过来，我们笑话他的蛋宝宝，名字应该叫“马光蛋”！&nbsp;&nbsp; [寒喧]</p> </div> <div class="media" id="media39"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/tDZHy%2B05DQqpsZT%2FB1GpRP4%2BIO4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/tDZHy%2B05DQqpsZT%2FB1GpRP4%2BIO4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 回到家，我从冰箱里拿出鸡蛋放在口袋里，心想：我在家先试试看。结果没几分钟就破了两个。唉，我叹了一口气，决定把鸡蛋煮熟了，这样就不容易破了，如果破了还可以吃。煮好了，就开始给它起名字了。 我思考了半天，想了两个名字：马小财和马小飞，我想让他成为我的弟弟，这样就有人和我一起玩了。可是哪个名字好呢？妈妈说，就叫马小飞吧，和你的名字很近，别人一听就知道是兄弟。 名字取好了，就要保护他了。我和妈妈一起找了棉花和海绵，把小飞放在中间，四周再用胶带裹好。瞧，这下不会破了吧，我心里很是得意。&nbsp;&nbsp; [一飞]</p> </div> <div class="media" id="media41"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/0x2k9EAJhEryQtYDEDYgctwWhFc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/0x2k9EAJhEryQtYDEDYgctwWhFc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我一进教室，哇，每个同学把自家的宝宝都带过来聚会呢！老师说每个家长都要介绍家里的娃。在这里面让我最好笑的是马一飞的光蛋：这也能带学校来？最佳搞笑奖非他莫属。&nbsp;&nbsp; [万祥]</p> </div> <div class="media" id="media43"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/%2FlgK%2FpdwNYCLxFzDyI%2Fiy%2F2WqfQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/%2FlgK%2FpdwNYCLxFzDyI%2Fiy%2F2WqfQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> “六一”这天，我把自己的宝宝带到学校，刚进教室，就看见同学们都把自己的宝宝拿出来比美，只见郭瑶佳的宝宝可漂亮了。一双水灵灵的大眼睛，一张樱桃般的小嘴巴，多可爱呀！ 这时王老师来了，她让我们把宝宝们放在桌上，给这些可爱的小生命拍了一张合影。我们一一上台介绍。我的宝宝叫“小优”，我和她是姐妹关系，她有两个粉红色的马尾辫，一双水灵灵的大眼睛，一张美丽的脸蛋和那樱桃般的小嘴。&nbsp;&nbsp;&nbsp; [佳佳]</p> </div> <div class="media" id="media45"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/CbUlsKOm3AZb2aagROZQ5fQ4zLI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/CbUlsKOm3AZb2aagROZQ5fQ4zLI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 早自习时，王老师来到班上，让我们把蛋宝宝送到了讲台上，并按座位顺序上台介绍自己的宝宝。我是这么介绍的；"我的宝贝叫‘妮妮’，她是我的女儿。我准备这两天一直把她放在口袋里。” …… 我忙凑过去瞧了一眼，哇，郭瑶佳的宝贝好可爱哦！白白的脸蛋，小巧玲珑的眼睛紧紧地闭着，还有樱桃般的小嘴呢！郭瑶佳忙向我介绍；“这是我的女儿，她叫‘萌萌’。才刚刚出生。”我心想:这个名字和蛋宝宝一样可爱！&nbsp;&nbsp;&nbsp; [张涵]</p> </div> <div class="media" id="media47"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/HrIB3y59lXEp6kUYhsSarVKxLkc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/HrIB3y59lXEp6kUYhsSarVKxLkc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我兴高采烈地回到家，从冰箱里挑了一个没有斑纹的鸡蛋，给她取了一个可爱的名字“郭萌萌”，还给她化了一个漂亮的妆。我拿出水彩笔，让她有一双大眼睛，一张樱桃小嘴，还有漂亮的背景呢！ 在去学校的路上，我拎着一个塑料袋，里面放了一些餐巾纸把她包起来。我小心翼翼的做事，生怕一个不小心让她破碎。&nbsp; [瑶佳]</p> </div> <div class="media" id="media49"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/9IH6DN18wfTJndhNnS0OeeElEjs%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/9IH6DN18wfTJndhNnS0OeeElEjs%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 早上，我非常开心，终于可以当一回哥哥啦!&nbsp;&nbsp; [永铭]</p> </div> <div class="media" id="media51"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/QEOgPoXF1SPdT%2BMJxmbUfkwHDx0%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/QEOgPoXF1SPdT%2BMJxmbUfkwHDx0%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 回到家，我选了一个圆滚滚的鸡蛋，先给她画眼睛、鼻子、嘴巴，在给她画上粉红的蝴蝶结，然后给她涂上颜色，这样我的妹妹出生了，我给她起名为“露露”。 王老师说，要我们保护她两天。哪知道，第一天上学，我竟然把宝宝丢在家里，忘带了。&nbsp;&nbsp; [宣茹]</p> </div> <div class="media" id="media53"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/hJMDcN7ZCRQl5F4Wje1FNgBFU4Y%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/hJMDcN7ZCRQl5F4Wje1FNgBFU4Y%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 从现在开始为了保护好她的安全，我准备了一个圆形带盖的塑料盒子。并且在盒子里辅垫了很多很厚实的棉花。接着，我小心翼翼地轻轻把“张小黄”放进了棉花堆中间。真是一个舒适又安全的安全屋。我把盒盖盖好，心想：这下蛋肯定不会有事，一定碎不了！&nbsp; [珈齐]</p> </div> <div class="media" id="media55"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/1so6O4WSlof0cUpcEkqQ%2BT%2BsdRs%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/1so6O4WSlof0cUpcEkqQ%2BT%2BsdRs%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我当时觉得这还不容易，保存10天都没问题。我精心挑选了一只鸡蛋，郑重给他命名为“小扁璞”，他有大大的嘴；小小的翅膀，一副刚从蛋壳里钻出来的模样，真萌！我给他安了几个保护层，第一层是棉花，第二层是一块有机玻璃，第三层是一个小布袋。罩了这么个“盔甲”，看什么东西能把他弄破！我越想越得意。&nbsp;&nbsp;&nbsp; [知曰]</p> </div> <div class="media" id="media57"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/t5iWzQfI59ziudiU7tTWze6ezcI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/t5iWzQfI59ziudiU7tTWze6ezcI%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我怀着激动的心情来到学校。哇，班上有各种各样的宝贝哎，听着大家互相介绍自己的宝贝，别提多开心啦！我的宝贝蛋名字叫做“小薇”，我希望她健健康康！&nbsp;&nbsp;&nbsp; [雨冰]</p> </div> <div class="media" id="media59"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/9w%2Bv%2FVX6Y0aTgcwjWLJVBJAjiw4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/9w%2Bv%2FVX6Y0aTgcwjWLJVBJAjiw4%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我也把自己的“宝贝女儿”拿了出来，她叫“小灯泡”，你看她那圆润、光亮的身体多么像闪闪发亮的小灯泡呀！我给她画上了月牙似的眼睛和一张小巧的嘴巴，还画上了红红的脸蛋，真可爱！ 王老师给“宝贝”们拍了几张集体照，并让我们一个一个地上去介绍自己的“宝宝”。陈沛霖的“宝宝”真搞笑，那“宝宝”的头发竟然是紫色的，长得跟魔鬼一样。&nbsp;&nbsp;&nbsp; [子涵]</p> </div> <div class="media" id="media61"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/x%2FdvA2nAvYjRm9neJ5enMM5YsFc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/x%2FdvA2nAvYjRm9neJ5enMM5YsFc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我刚到班，王老师把我们的蛋拍了个照，说了游戏规则：蛋不离身，说去上个厕所，也要带上自己的宝贝。&nbsp;&nbsp;&nbsp; [子杰]</p> </div> <div class="media" id="media63"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/FmP4niQPp2e_IFPLFIGiejjcEkzI?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/FmP4niQPp2e_IFPLFIGiejjcEkzI?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 第一天在上学的路上，我不停地跟小周周说：“小周周，哥哥会保护好你的。”</p> </div> <div class="media" id="media65"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/tQagnYHsAIDuzgV81UsOkL%2F%2FKdQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/tQagnYHsAIDuzgV81UsOkL%2F%2FKdQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 来到了学校，王老师叫我们把自己的小宝贝小心地放在讲台上合影，大家的小宝贝表情丰富，不同造型，有的坐在摇篮里，有的穿着公主裙，有的被打扮成了海绵宝宝的造型……看了大家的小宝贝都被打扮的美美的。&nbsp;&nbsp; [俊杰]</p> </div> <div class="media" id="media67"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/uNQEbeb%2FaRsiSZhqRPz8EJpi9vc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/uNQEbeb%2FaRsiSZhqRPz8EJpi9vc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 一进班级，我就小心翼翼走到座位上，生怕宝贝碎了。</p> </div> <div class="media" id="media69"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/OojU8aqs6jm3%2B%2BsEDRzy383A4yc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/OojU8aqs6jm3%2B%2BsEDRzy383A4yc%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 等王老师来了以后，我们各自都把宝贝一齐放到了讲台上，合了个影。我们还为自己的宝贝们做了介绍和对宝贝发了誓。当时我是这样说的:“我发誓，我一定会保护好我的宝贝，不让他伤心；不让他死去。要让他平平安安的。”&nbsp;&nbsp; [华楠]</p> </div> <div class="media" id="media71"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/5EEWkWa3XJZuMxmaFBan5VaVKAQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/5EEWkWa3XJZuMxmaFBan5VaVKAQ%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 王老师来啦，给我们的宝贝拍了张合影。我的宝贝儿子“时宇然”笑得多开心！我们一个个上台捧着宝贝发誓，会保护自己最心爱的宝贝蛋的。&nbsp;&nbsp;&nbsp;&nbsp; [浩然]</p> </div> <div class="media" id="media73"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/gaxaJUuuAn7FYzu%2FR7zHwaEuM3k%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/gaxaJUuuAn7FYzu%2FR7zHwaEuM3k%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 我和“旺财”到学校后，老师便让我们每个人向大家介绍自己家的宝贝儿，并在讲台上合影留恋。我激动地介绍着自己家帅气的宝贝，心里泛起一阵阵浓烈的自豪感和保护欲！</p> </div> <div class="media" id="media75"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/RWZqA0VDNSRgiXJhfBBOpAnak5E%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/RWZqA0VDNSRgiXJhfBBOpAnak5E%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text"> <p style="font-weight:bold;font-size:18px;"> 而后，我和其他同学一起为这次保护行动进行了宣誓，并和其他家长和子女们拍了一张“全家福”。&nbsp;&nbsp;&nbsp; [梁睿]</p> </div> <div class="media" id="media77"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/aupVrM5fXIOZffdxYSCKTSWLzdE%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/aupVrM5fXIOZffdxYSCKTSWLzdE%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="media" id="media78"> <figure style="padding:0; margin:0;"> <img class="photo" onerror="this.parentNode.removeChild(this)" src="/web/images/pixel.gif" data-layzr="http://img.aituwen.com/KUa9xAcUiniHkPwswx%2FLeOHFcCM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20" data-src="http://img.aituwen.com/KUa9xAcUiniHkPwswx%2FLeOHFcCM%3D?imageView2/2/w/800/interlace/1%7Cwatermark/3/text/5b635a6P/font/5b6u6L2v6ZuF6buR/fontsize/600/fill/d2hpdGU=/dissolve/30/gravity/SouthEast/dx/25/dy/20"> </figure> </div> <div class="text" style="margin-bottom: 47px;"> <p style="font-weight:bold;color:rgb(240, 105, 58);font-size:18px;">精彩继续，欢迎欣赏第二部《宝贝，对不起》<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif" width="24" height="24"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif" width="24" height="24"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif" width="24" height="24"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif" width="24" height="24"> 鸣谢： 音乐推荐：琳娜老师<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif" width="24" height="24"><img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif" width="24" height="24">/:</p> </div> </div> <div class="unfold-field" style="display: block; transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);"> <p>展开全文</p> </div> </div> <div class="feed-tag-box" id="feed-tag-box"> <span class="">儿童</span> <span class="">亲子</span> <span class="">文章</span> <span class="">校园</span> <span class="">写真</span> <span class="">文艺</span> </div> <div class="end" id="endIconHolder"> <i class="end-icon"></i> </div> <div class="likelist"> <input type="hidden" name="likecunt" class="likecunt" value="81"> <div class="like_index"> <ul class="likeusermsg_index"> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> <li class="likeuserx" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;"></li> </ul> </div> <div class="like_over"> <ul class="likeusermsg"> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="548e7287311c21743694cee4"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/SJJLnANXY25kdf7aFMV2MEVo2UU%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57494330c4c5a88e316d3771"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/mstJFqQptFrpuoRdODYhwx1607o%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55ee0bc7ab32fe223b424d62"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/FiT%2BPONjm4kSK2etNMCzZbqcOkU%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55911b047864bff35881fed6"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/p%2F%2BRjwOljEvae2RrWwMWKSwqRCg%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55edf9dd66cdc8ce3c18d019"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/nthY3eTKAVnKmK86uQufpjuolXg%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="573532d6ea9360537da20d6e"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/o1MVkeHQwJ7GykquU6PUXHsnz38%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="570f210321ca401e23d3b3ef"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/CRot2i09JazYP8WhwF522HT7WvM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="569aea156bff1843443fbf1b"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/TXXYMRaga1WbJ1JA6CxQ0oBQw5w%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="550796d2d5837b9b5c51df3b"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/CMegs5IeSvH7DeGtkwE1RoFQoNo%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="573c74215edf50277bc15f40"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/%2FswsnErp15jZTRSbpcx73mt%2B6f0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f659a5ba7239587681211f"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/ByTvgr7U9R8xMcHJfW5qON1oslw%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55c7facc9258385e12efd9ee"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/6InSl%2Bk7%2FqcqWuPPMbugAUkPJq0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56ad7d1058dd034c4dcad362"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Uy1B64Ei4s2DEUa4NfeMb36HqSE%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56a850380e3b6ca2685fb837"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/R9JS%2FIl8s9tEDkORG9cWhT15pTw%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56a22fa690b7477129152b03"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/zoO9hvTJ9CS5aRmNGMrdmXx9N5w%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56c32a12f6ce763e7e5303f3"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/DSJhdVSQQu1TIMJFKs08hCnJitE%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="562e17da4d6ffc4b67a3601c"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/faCqOBFLfhq9PrnJMloI%2Fh7eGDs%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55d0686abcec678f6bf58d54"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Paz4ZwIGWV%2BIBqql%2BoIlRnZGnso%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5706ed461e9e6ecc2cddf874"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/1yGPm1SkuL3xCs%2Fei3i3uBq%2FGDI%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="572b2e3a54703cdc3f0a3955"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/uDIbwazBbjwjgvwxg7g%2B1UcF3sM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56c1dfe727dc08a6739cd593"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/E7voIxWQtq9LSD182F2WVw%2FPGCY%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f2acdf1385e57f21f2389a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/buEW1kNNxXTJsBhbl%2FOflzxeCH4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56d05108cf76ffd77089be81"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/YNSwQ69lvuboGnlAkw%2Bl7bZ%2FjU8%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5634acfcf6afcb256be59350"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/ZS7tLhD5ndDTx%2FyO9CUa6fYXpwY%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55476666370d725461ee6c69"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/3bSlmqJgWpvWV4dqlgHSCBw2Lnk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="563b72ccce0cdb9c525b9e97"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/L53qm8PxuxwfgPHoko9%2FL7hmt%2BM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f5cb351385e57f21f29977"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/1AJLuC27zw3zc0tdhM43kdTF4L0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="574963a83ebb28350ccab657"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/khjJgYBzkMIjT2BLbtr4jGj5ImA%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5563299e23ad36bd4dd98842"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Ufosvly%2BbUPu6ltxJqHAPC4Tttk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="559e8b03e12ef58a2cbeda78"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/YZvC7s%2F3bN3IILpPuiEYdihB%2BvI%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56dad5954a0c64556950481b"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/JQqA2Ha9zeuSzVYhvEZTWNgOsdo%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5509123bd5837b9b5c51e3f9"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/msiQqdOk7wnGvD61tjsfvYWn9Z4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="54f94469d96f212f47766e8f"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Q41bJ02kXd1JSXhKD6eoJ6oONCE%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f85b76ba72395876817422"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/WpJa%2FU9sw%2BioTZJKdpJEY5cQtko%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57356b3d29853b4e3f81cfb4"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/XymPh7DYNFZEKUNd8K4LAXXuVNc%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5703a9811e9e6ecc2cdd6c10"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/B53nFI%2BRBaxzEuVOINbPlSdy7PU%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5496de1752c5231948007443"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/EbN1IW1mXshZYwxG5JnQzidO%2FtI%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="558f5d3693f4efa164cc57b2"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/4VBK%2BnSlwczoW27lrXDWQDLhLXE%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57497f2f567a91f1430a7b50"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/T0GG0QLDuEUrae0DjGIfoKqhO%2B4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="574959291632046738b36783"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/61zWEL0uxb2CaP0qRY6yToL4W98%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57328ff129853b4e3f8156ef"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/vuroJ3p5cRAYUhWEdohTGS8hcTY%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5640570593d5f4f63802b08e"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/H3WaNrgnKei25%2BSUxDO2HuNFK0w%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56eab0f41d83d9670dc8fd51"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/6SY78EyVHxL2lJrvFBwoTyg8L7E%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="571189c7c8e62662648cb5e1"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/2%2BSl8Sb%2F2hzAW5ri8W5IFeyokQM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5507b0e90b3eba8d5cfe6843"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/xT4D%2BCka0WGaL9ItFjA%2BK1rjwR0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="563f58ced3d4c17f7e77ec0a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/BAu3sRFhyh%2B%2B%2B2B1POsDNLUj%2BSE%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="54e82811fc5cd9b1281b7861"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/JtXi2ktDUSzJMBVtA3hzKEBit%2Fs%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5666e92de06d58a072f0f01d"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Z9SmRVMJEeuyE2Emf0taVFu%2BvIA%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55783fe7232a7cd707f48fd9"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/0%2FNjBhlK1QJeSVTuMS1YdMNZ6Hk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f5de591385e57f21f29b6a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/lcf7gxRx%2FA1hqAvrPyQZpy69W4M%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57232daa63c80a2740a38b7c"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/g5JdwJ1vJ1MS4tLt0EnOC0pRnWc%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57391009e845e7e57aff42f7"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/QxUKejb1Wl38coVmhmEr2Kjv%2BG0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56c07ef855ddb44b6319d577"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/kzTvwkIWJUn2voj%2F6o4k1At6if4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55f0d8131124f557271c4038"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/23MPV3SVPWCl4mhnb0ijYEGOCm4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="565b6cf4fa88b57768c66b2c"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/GJQBapXQovMZIzw1LG%2B7p6nCDrw%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5613da391e846f1270e66fe7"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/%2BI4vpptcwNfb%2FY2Tk3kf9%2BBVJpo%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5637f1175bfd55175df78374"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/CYn0zywwd9%2FnGLpNOGi6Qv9ZVXM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f2c4521385e57f21f23ce1"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/i28HLDjIHgBHfIX9ZeQeCP5HQjo%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55853b3a4a85ada331cb554e"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/ob8cUUReDs66sp%2BMrbaZrGKdrG4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="574af0c61c0a950c06d611f9"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/j1DwbczfwGCY04r26O3lC%2BS57mU%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="572b321654703cdc3f0a3a5c"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/DcAGblKi1VEUBsQa0GHfXRQuoEI%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56ce3f3c0c2537a1196c8576"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/xY%2Fq2ZVrOlMAC0eHPDHa68DZkcw%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57496ae458971b404132af9d"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/GQFYYgj%2Fd7r3Iq1vL54TDEBtxkc%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56aaa2509e3eac2b58904af4"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/khGk1qnnpyw2yrsCsCiJXnFGmFI%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56a316a890b7477129153eb3"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/FS1%2FJh8iK8LnwrXsYPp8XhtmK%2Bk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="565e7a571219981f57bd0210"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/LkVakMGqNc7fLvZBJQDx8wrluPQ%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="571a33e04f9460fd1dd1e7ad"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/PSc6cOFtclqqGhjSBuCPkX%2Bpvnk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="550799870b3eba8d5cfe67ab"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/F6ibUqK182JNVcf6mSdaUSuzolM%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="574c0b0a1b479b625a33fc14"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/eiSNaDiWEznvmNBi9LfsMtAzCA4%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56443d86cafb7e4d50eaeb0e"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/ikRCXBnvp7CZdHlL0hw1217eEsQ%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56c12f7b458931b423cf255f"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/qXd6xj2DQUSMYnE3gjGttT5GQGQ%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56f3ad391385e57f21f25510"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/WkKHC658AxvzOEuJtLHTzrB%2F%2F9w%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="563f5442c5c965944394b643"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/40yQpzQ6s1Qqvn7ZJ3Hgc8x%2FOZk%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56e95b5719ada1e57574685c"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/AD20w1Qql3Dy1cMJ%2Bm22Y7Z%2Bz7c%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5742f0796a4806bc2e75d17a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/4tlvmCKFEbYRxJ9wiaPQAYHdpEo%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="55ad75681de1aec040c06624"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/Hl4xZu%2B%2FGlmNYfOIDOWLU8rukx0%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57494bd68c2e57b13747148a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/kP2ETKCSej5xDEg63nBINv3cj3k%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="56e8b8436e5eb27a66c7ff05"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/TSTWzOqYLr6wkw7uM7k4AtJxlZg%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="5757d86034195c4212a2e52a"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/K3Zrb4pklBXi63TPlarR7XLQE2w%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="57198cdf38e2d32e1e3ccc71"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/m8sHdAFUD%2BcNXuDGWAdFZZDrNJg%3D?imageView2/1/w/96/interlace/1"></a> </li> <li class="likeuser" style="margin-left:4px;margin-right:4px;margin-bottom: 4px;" id="570c2d4712bebac74ea27cc1"><a href="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"><img style="width:32px; height:32px;border-radius: 40px;" src="http://img.aituwen.com/k31EYciydAtQvr7W0QFa4vStjpQ%3D?imageView2/1/w/96/interlace/1"></a> </li> </ul> </div> </div> <div class="like_is"> <hr noshade="value" class="hr-like"> <span>已有81位小伙伴点赞了哟！</span> <hr noshade="value" class="hr-like"> </div> <div class="likebottom" id="likebottom"> <div class="liketrueclick"> <div class="like_text"> <span class="like_text_span"> 点赞 </span> </div> <div class="like_tag"> <span class="likeClick"> <i class="like_img-o likeAnimation"></i> </span> </div> </div> <div class="canjiahuodong"> </div> <div id="likebottomcover"> </div> </div> <div class="authorbox"> <div class="authormsg"> <a href="/like/user/548e7287311c21743694cee4"><img alt="548e7287311c21743694cee4" quality="50" src="http://img.aituwen.com/SJJLnANXY25kdf7aFMV2MEVo2UU%3D?imageView2/2/w/96/interlace/1"></a> </div> <div class="authorname"> <span class="author-name-text">作者</span><br> <span class="author-name">德宏</span><i class="expert"></i> </div> <div class="followmsg"> <div class="divForButton" style="display:block"> <div class="divForSpan" onclick="app.f.tofocusInShow()"> <span class="followWordSpan buttonSpanMark" style="display:block">关注</span> <span class="followWordSpan1 buttonSpanMark">已关注</span> <span class="followWordSpan2 buttonSpanMark">相互关注</span> </div> </div> <div class="buttonCover"></div> </div> </div> </div> <div class="ad"> <div class="ad-img" onclick="location.href=\'http://m6.girtu.com/post/show/571077afc8e62662648c8850\';return false;"> <img src="http://7jpoiy.com1.z0.glb.clouddn.com/times_2016_0607_big.jpg"> </div> </div> <div class="recommend-essence" style=""> </div> <div class="dt_visitor" id="dt_visitor"> <div class="dt_com_desc" onclick="location.href=\'http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd\'" style="padding-top: 20px;"> <textarea class="dtcomtextarea" placeholder="写评论（8）"></textarea> </div> </div> <div id="dt_review" class="dt_review"> <ul id="dt_review_main" class="dt_review_main"> <li id="5757cc4ef2154e197a70172f" class="comment_li"> <div class="div_for_img"> <img id="56e95b5719ada1e57574685c" src="http://img.aituwen.com/AD20w1Qql3Dy1cMJ%2Bm22Y7Z%2Bz7c%3D?imageView2/2/w/96/interlace/1"> </div> <div class="div_for_word"><a class="conm_author author_a1" id="56e95b5719ada1e57574685c">严建军</a><a class="com_time">1 小时前</a></div> <div class="com_replay"> </div> <p class="div_for_say">棒！~嗡~</p> </li> <li id="5757c6009d166dc276073063" class="comment_li"> <div class="div_for_img"> <img id="56a316a890b7477129153eb3" src="http://img.aituwen.com/FS1%2FJh8iK8LnwrXsYPp8XhtmK%2Bk%3D?imageView2/2/w/96/interlace/1"> </div> <div class="div_for_word"><a class="conm_author author_a1" id="56a316a890b7477129153eb3">大地欢歌</a><a class="com_time">1 小时前</a></div> <div class="com_replay"> </div> <p class="div_for_say">赞！！</p> </li> <li id="5757bab3a58a9579742fed37" class="comment_li"> <div class="div_for_img"> <img id="565b6cf4fa88b57768c66b2c" src="http://img.aituwen.com/GJQBapXQovMZIzw1LG%2B7p6nCDrw%3D?imageView2/2/w/96/interlace/1"> </div> <div class="div_for_word"><a class="conm_author author_a1" id="565b6cf4fa88b57768c66b2c">吴同学</a><a class="com_time">2 小时前</a></div> <div class="com_replay"> </div> <p class="div_for_say">好有意义的六一儿童节活动呀！谢谢老师。</p> </li> <li id="5757b2373bc8858b7b42559c" class="comment_li"> <div class="div_for_img"> <img id="5640570593d5f4f63802b08e" src="http://img.aituwen.com/H3WaNrgnKei25%2BSUxDO2HuNFK0w%3D?imageView2/2/w/96/interlace/1"> </div> <div class="div_for_word"><a class="conm_author author_a1" id="5640570593d5f4f63802b08e">茅剑</a><a class="com_time">3 小时前</a></div> <div class="com_replay"> </div> <p class="div_for_say">好老师，赞。预祝阖府端午节安康!</p> </li> <li id="5757b13ebb245fff70f78e93" class="comment_li"> <div class="div_for_img"> <img id="57356b3d29853b4e3f81cfb4" src="http://img.aituwen.com/XymPh7DYNFZEKUNd8K4LAXXuVNc%3D?imageView2/2/w/96/interlace/1"> </div> <div class="div_for_word"><a class="conm_author author_a1" id="57356b3d29853b4e3f81cfb4">翔叔</a><a class="com_time">3 小时前</a></div> <div class="com_replay"> </div> <p class="div_for_say">寓教于乐，很好的教学方式！👍👍👍👌</p> </li> </ul> <div id="review_loading" class="dt_review_more"> <span class="loading button_style"><i class="fa-dian-down"></i></span> </div> </div> <div class="right-menu"> <a class="fanUp" href="javascript:void(0);" style="display: none;"><i class="incons_show fanUp-icon"></i></a> <a class="fanDown" href="javascript:void(0);" style="display: none;"><i class="incons_show fanDown-icon"></i></a> </div> <div class="foot-div" style=""> <img src="/web/images/q_foot_show.png" style="width:140px;"> </div> <div class="report" onclick="location.href =\'/post/report?postid=5757a56a6c5e49892a0544e9&amp;postname=护蛋行动（1）&amp;visituserid=\'"> <span>举报</span> </div> <p id="bottompostessence" onclick="location.href = \'http://m6.girtu.com/recommendforessence\'" style="text-align: center;font-size: 12px;color: rgba(0, 0, 0, 0.15);padding-bottom: 8px;padding-top: 8px;"> 发现下一篇</p> <input type="hidden" name="post_title" value="护蛋行动（1）"> <input type="hidden" name="returnurl" value="http://mp.weixin.qq.com/s?__biz=MzA3MDcyNDMyMQ==&amp;mid=204281103&amp;idx=1&amp;sn=d56f4a1015f988feca1510053bcfc1b9#rd"> <input type="hidden" name="postId" value="5757a56a6c5e49892a0544e9"> <input type="hidden" name="authorid" value="548e7287311c21743694cee4"> <input type="hidden" name="originalNum" value="8"> <input type="hidden" name="postimgnum" value="39"> <input type="hidden" name="userId" value=""> <input type="hidden" name="userSrc" value=""> <input type="hidden" name="userName" value=""> <input type="hidden" name="ifMusicPlaying" value="false"> <input type="hidden" name="chosenMusicId" value="28785754"> <input type="hidden" name="musicIdInput" id="musicIdInput" value="28785754"> <input type="hidden" name="musicNameInput" id="musicNameInput" value="爱我你就抱抱我(合唱版)"> <input type="hidden" name="artistNameInput" id="artistNameInput" value="段丽阳"> <input type="hidden" name="musicSrcInput" id="musicSrcInput" value="http://m1.music.126.net/oSDrULdH6XHuWO3Fh8ZkSg==/5940661325244235.mp3"> <input type="hidden" name="originalMusicIdInput" id="originalMusicidInput" value="28785754"> <input type="hidden" name="musicIdInputTemp" id="musicIdInputTemp" value=""> <input type="hidden" name="musicNameInputTemp" id="musicNameInputTemp" value=""> <input type="hidden" name="artistNameInputTemp" id="artistNameInputTemp" value=""> <input type="hidden" name="musicSrcInputTemp" id="musicSrcInputTemp" value=""> <input type="hidden" name="repliedId" id="repliedId" value=""> <input type="hidden" name="repliedName" id="repliedName" value=""> <input type="hidden" name="likeId" value=""> <div class="coverfornote" style="position: fixed; width: 100%; height: 100%;"></div> <div id="cover1" style="position: fixed; width: 100%; height: 100%;"></div> <div id="cover2"></div> <div id="cover5" style="position: fixed; width: 100%; height: 100%;"></div> <div id="coverForMusic" style="position: fixed; width: 100%; height: 100%;"></div> <div style="width:0px;height:0px;overflow:hidden;"><img id="share_img" src=""></div> <div class="poptopboxanimation"> </div> <div class="bootom-tab-bar"> <div class="bar-times" onclick="location.href=\'/timeline\';return false;"> <i class="bar-times-icon"></i> <span>动态</span> </div> <div class="bar-recommends" onclick="location.href=\'/times\';return false;"> <i class="bar-recommends-icon"></i> <span>发现</span> </div> <div class="bar-make" onclick="location.href=\'/post/make\';return false;"> <i class="bar-make-icon"></i> </div> <div class="bar-trends" onclick="location.href=\'/message/catalog\';return false;"> <i class="bar-trends-icon"></i> <span>消息</span> </div> <div class="bar-me" onclick="location.href=\'/home\';return false;"> <i class="bar-me-icon"></i> <span>我的</span> </div> </div> <div class="confirm"> <div class="wordHolder"> <div class="confirmSpanHolder" id="confirmSpanHolder"> <span id="confirmSpan"></span> </div> </div> <div class="choiceHolder"> <div class="no"><span></span></div> <div class="choiceHolderWhiteLine mediate"></div> <div class="yes"><span></span></div> </div> </div> <div class="class2Note"> <div class="class2WordHolder"> <div class="class2ConfirmSpanHolder" id="class2ConfirmSpanHolder"> <span id="class2ConfirmSpan"></span> </div> </div> <div class="class2ChoiceHolder"> <div class="class2nNo"><span></span></div> <div class="class2ChoiceHolderWhiteLine mediate"></div> <div class="class2Yes"><span></span></div> </div> </div> <div class="shadeNote"> <div class="class1SpanHodler"> <span id="class1Span"></span> </div> </div> <div id="sharewechat" class="sharewechat" onclick="showLayer()" style=""> <i class="sharejiantou"></i> <p>点击右上角“...”<br>选择“分享到朋友圈”</p> </div> </div> <link rel="stylesheet" href="/web/css/enjoy.css"> <link rel="stylesheet" href="/web/css/show.css">', '', 'if="{!hidden}"', function(opts) {
	//            var notification = new Notification();
	//            notification.initTheButton();
	//            notification.initTheButton1();
	//
	//            var makeAComment = function () {
	//                if (initData.isUser) {
	//                    if ($('.dtcomtextarea').val().trim() !== '') {
	//                        app.f.commentCreate();
	//                    } else {
	//                        notification.class1Note('内容不能为空');
	//                    }
	//                } else {
	//                    //app.f.popupbox(initData.isUser, initData.issubscribe, 'comment', '现在关注格图订阅号，让ta看到你的点评吧～','');
	//                }
	//            }
	//
	//            var textAreaAutoChangeHeight = function (obj) {//进行textarea自动伸缩的处理
	//                obj.style.height = '0px';
	//                obj.style.height = obj.scrollHeight + 'px';
	//                obj.style.textAlign = 'left';
	//            };
	//
	//            var textareacss = function (obj) {
	//                $('.dt_visitor .dt_com_send span').css({
	//                    'color': '#FFFFFF',
	//                    'backgroundColor': '#F0693A',
	//                    'border': '1px solid #F0693A'
	//                });
	//
	//                $('.bootom-tab-bar').css({
	//                    'position': 'absolute'
	//                });
	//            }
	//
	//            var textareabottombar = function (obj) {
	//                $('.bootom-tab-bar').css({
	//                    'position': 'fixed'
	//                });
	//            }
	//
	//
	//            function showLayer() {
	//                var sharewechat = $('.sharewechat');
	//
	//                if (sharewechat.css('display') === 'none') {
	//                    sharewechat.css('display', 'block');
	//                } else {
	//                    sharewechat.css('display', 'none');
	//                }
	//            }

	//            Zepto(function ($) {
	//                showEmotionInPost();
	//                showEmotionInLoad();
	//            });

	        var self = this;
	        var router = this.router();
	        router.config('/poster', {tag: this}, function (next) {
	            console.log('route to poster');
	            next();
	        })
	});

/***/ },
/* 43 */
/***/ function(module, exports) {

	riot.tag2('footer', '<div class="bootom-tab-bar"> <div class="bar-times" onclick="location.href=\'#/timeline\';return false;"> <i class="bar-times-icon"></i> <span>动态</span> </div> <div class="bar-recommends" onclick="location.href=\'#/times\';return false;"> <i class="bar-recommends-icon"></i> <span>发现</span> </div> <div class="bar-make" onclick="location.href=\'#/post/make\';return false;"> <i class="bar-make-icon"></i> </div> <div class="bar-trends" onclick="location.href=\'#/message/catalog\';return false;"> <i class="bar-trends-icon"></i> <span>消息</span> </div> <div class="bar-me" onclick="location.href=\'#/home\';return false;"> <i class="bar-me-icon"></i> <span>我的</span> </div> </div>', 'footer body,[riot-tag="footer"] body,[data-is="footer"] body{ display: block; margin: 0; } footer .bootom-tab-bar,[riot-tag="footer"] .bootom-tab-bar,[data-is="footer"] .bootom-tab-bar{ position: fixed; bottom: 0; width: 100%; background-color: #1A1A23; z-index: 5; height: 50px; } footer .bar-times,[riot-tag="footer"] .bar-times,[data-is="footer"] .bar-times{ float: left; width: 6.4%; text-align: center; height: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0); margin-right: 10.6%; margin-left: 8%; } footer .bar-times-icon,[riot-tag="footer"] .bar-times-icon,[data-is="footer"] .bar-times-icon,footer .bar-trends-icon,[riot-tag="footer"] .bar-trends-icon,[data-is="footer"] .bar-trends-icon,footer .bar-recommends-icon,[riot-tag="footer"] .bar-recommends-icon,[data-is="footer"] .bar-recommends-icon,footer .bar-me-icon,[riot-tag="footer"] .bar-me-icon,[data-is="footer"] .bar-me-icon{ background-size: 24px 24px; background-repeat: no-repeat; width: 24px; height: 24px; display: inline-block; margin-top: 8px; } footer .bootom-tab-bar span,[riot-tag="footer"] .bootom-tab-bar span,[data-is="footer"] .bootom-tab-bar span{ font-size: 10px; color: #9EA9BF; display: block; position: relative; bottom: 3px; height: 10px; } footer .bar-times-icon,[riot-tag="footer"] .bar-times-icon,[data-is="footer"] .bar-times-icon{ background-image: url(\'/web/images/timelinecopy.png\'); } footer .bar-recommends,[riot-tag="footer"] .bar-recommends,[data-is="footer"] .bar-recommends{ float: left; width: 6.4%; text-align: center; height: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0); margin-right: 8%; } footer .bar-recommends-icon,[riot-tag="footer"] .bar-recommends-icon,[data-is="footer"] .bar-recommends-icon{ background-image: url(\'/web/images/menufavcopy.png\'); } footer .bar-make,[riot-tag="footer"] .bar-make,[data-is="footer"] .bar-make{ float: left; width: 21.3%; text-align: center; height: 100%; background-color: #E8511A; } footer .bar-make-icon,[riot-tag="footer"] .bar-make-icon,[data-is="footer"] .bar-make-icon{ background-image: url(\'/web/images/menucamera@3x.png\'); background-size: 28px 24px; background-repeat: no-repeat; width: 28px; height: 24px; display: inline-block; margin-top: 12px; } footer .bar-trends,[riot-tag="footer"] .bar-trends,[data-is="footer"] .bar-trends{ float: left; width: 6.4%; text-align: center; height: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0); margin-left: 8%; } footer .bar-trends-icon,[riot-tag="footer"] .bar-trends-icon,[data-is="footer"] .bar-trends-icon{ background-image: url(\'/web/images/menuinfocopy.png\'); } footer .bar-me,[riot-tag="footer"] .bar-me,[data-is="footer"] .bar-me{ float: left; width: 6.4%; text-align: center; height: 100%; -webkit-tap-highlight-color: rgba(0,0,0,0); margin-left: 10.6%; } footer .bar-me-icon,[riot-tag="footer"] .bar-me-icon,[data-is="footer"] .bar-me-icon{ background-image: url(\'/web/images/menumecopy.png\'); }', '', function(opts) {
	});

/***/ }
]);