import {app} from '../app/app';

export var dispatcher = {
    dispatch: function(action){
        /**
         * allow dispatch a thunk function
         */
        if(isThunk(action)){
            return action(done);
        }
        /**
         * allow a promise
         */
        if(isPromise(action)){
            return action.then(done);
        }
        /**
         * plain action
         */
        done(action);
        function done(res){
            app.trigger('action', res);
        }
    }
};

function isThunk(o){
    return typeof o === 'function';
}
function isPromise(o){
    return typeof o === 'object' && typeof o.then === 'function';
}