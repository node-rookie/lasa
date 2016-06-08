export var util = {
    querystring: {
        parse: function(search){
            let o = {};
            search.replace(/\?/g, '').split('&').map(pair=>o[pair.split('=')[0]] = pair.split('=')[1]);
            return o;
        },
        stringify: function(o){
            return Object.keys(o).reduce((acc, curr)=>acc + curr + '=' + o[curr] + '&', '?').slice(0, -1);
        }
    },
    values: function(o){
        return Object.keys(o).map(k=>o[k]);
    },
    object: function(ks, vs){
        var o = {};
        if(!Array.isArray(ks) || !Array.isArray(vs) || ks.length != vs.length){
            return o;
        }
        ks.forEach((k, index)=>{
            o[k] = vs[index]
        });
        return o;
    },
    assign: function(...args){
        let cloneSingleValue = (t, s)=> {
            let o = {};
            for(var ps in s){
                o[ps] = s[ps]
            }
            for(var pt in t){
                o[pt] = t[pt]
            }
            return o;
        };
        return args.reduceRight((acc, curr)=>{
            if(acc) return cloneSingleValue(curr, acc);
        }, {});
    },
    mixin: function(...args){
        let cloneSingleValue = (t, s)=> {
            for(var p in s){
                t[p] = s[p];
            }
            return t;
        };
        return args.reduceRight((acc, curr)=>{
            if(acc) return cloneSingleValue(curr, acc);
        }, {});
    },
    nextTick: (function () {
        var canSetImmediate = typeof window !== 'undefined'
            && window.setImmediate;
        var canPost = typeof window !== 'undefined'
            && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
            return function (f) { return window.setImmediate(f) };
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
    })()
}

if(!window._){
    window._ = util;
}