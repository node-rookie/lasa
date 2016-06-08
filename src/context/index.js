import AllReady from '../framework/allready';
import context from './context';
import redisMain from '../app/redis';
import {logger} from '../app/logging';
import mongooseMain from '../app/mongoose';

var ar = new AllReady();
ar.add('redis', ar.redis(redisMain));
ar.add('mongoose', ar.mongoose(mongooseMain));

context.redis.main = redisMain;
context.mongoose.main = mongooseMain;
context.domainBuilder.main = require('../framework/model/DomainBuilder');
ar.ready(function(){
    logger.info('already');
    //require('../modules');
});

ar.context = context;
export default ar;