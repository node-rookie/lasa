export default function redux_mixin(store) {
    return {
        init: function () {
            this.store = store
        },
        dispatch: function (action) {
            return store.dispatch(action)
        },
        dispatchify: function (actions) {
            var keys = Object.keys(actions)
            for (var idx in keys) {
                var key = keys[idx]
                var action = actions[key]

                this[key] = (function (action) {
                    var isFunction = typeof action === 'function'
                    return function () {
                        var obj = isFunction ? action.apply(this, arguments) : action
                        return store.dispatch(obj)
                    }
                })(action)
            }
        },
        subscribe: function (selector, callback) {
            if (!callback) {
                callback = this.update
            }
            var self = this;
            this.preProps = {};

             var changed = function (props) {
                return props !== self.preProps;
            }

            function compute () {
                var props = selector(store.getState());
                if (changed(props)) {
                    self.preProps = props;
                    callback(props)
                }
            }

            var unsubscribe = store.subscribe(compute)
            this.on('unmount', unsubscribe)
            compute()
            return unsubscribe
        }
    }
}