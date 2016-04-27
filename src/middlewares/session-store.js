import redisClient from "../app/redis";
import {Store} from "koa-session2";

export default class RedisStore extends Store {
    constructor() {
        super();
        this.redis = redisClient;
    }

    async get(sid) {
        let sess = await this.redis.getAsync(`koss:${sid}`);
        sess = JSON.parse(sess) || {};
        return sess;
    }

    async set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }
        if(opts.maxAge && typeof opts.maxAge !== 'number'){
            throw(new Error('redis config options maxAge number required'));
            return;
        }
        if(typeof session === 'object'){
            session = JSON.stringify(session);
        }
        await this.redis.setAsync(`koss:${opts.sid}`, session, 'PX', opts.maxAge);
        return opts.sid;
    }

    async destory(sid) {
        return await this.redis.delAsync(`koss:${sid}`);
    }
}