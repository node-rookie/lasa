import Store from './session-store';
import session from "koa-session2";

export default session({
    store: new Store(),
    maxAge: 2*60000*60
})