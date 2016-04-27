'use strict'
import settings from '../configs/settings';
import {logger} from './logging';
import redis from 'redis';
import Promise from 'bluebird';
Promise.promisifyAll(redis.RedisClient.prototype);

const DEFAULT_NAME = 'default';
let clients = {};

let redisClient = (name = DEFAULT_NAME) => {
    if(clients[name]) return clients[name];
    return clients[name] = createRedisClient(name);
};

let createRedisClient = (name) => {
    var redisClient = {};
    if (settings.redis.mode == 'single') {
        redisClient = redis.createClient(settings.redis.port, settings.redis.host, {} ); //TODO: need options
    } else {
        redisClient = null; //TODO: sentinel
    }

    if (settings.redis.auth != '') {redisClient.auth(settings.redis.auth);}
    let url = 'redis://' + redisClient.address;
    redisClient.on('connect'     , () => logger.info('Redis client ' + name + ' is connecting to ' + url));
    redisClient.on('ready'       , () => logger.info('Redis client ' + name + ' is ready'));
    redisClient.on('reconnecting', () => logger.warn('Redis client ' + name + ' is reconnecting to ' + url));
    redisClient.on('error'       , () => logger.error('Redis client ' + name + ' error happens'));
    redisClient.on('end'         , () => logger.info('Redis client ' + name + ' is ended'));
    return redisClient;
};

export default redisClient;
