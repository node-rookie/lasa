"use strict";
import {} from 'jQuery';
import {} from 'wx';

import * as actions from './actions/index'
import redux_mixin from './redux-mixin'
import configureStore from './store/configureStore'

const store = configureStore();
import Spa from './spa';
var application = new Spa();

require('../../tag/app.html');

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
)

riot.mixin(redux_mixin(store));
window.actions = actions;
application.mount();




