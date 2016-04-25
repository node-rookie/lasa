var AllReady = require('../framework/allready');
var context = require('./context');
//var redisMain = require('../app/redis-client')();
//var mongooseMain = require('../app/mongoose');

var ar = new AllReady();
//ar.add('redis', ar.redis(redisMain));
//ar.add('mongoose', ar.mongoose(mongooseMain));

//context.logger = require('../app/logging').logger;
//context.redis.main = redisMain;
//context.mongoose.main = mongooseMain;
//context.domainBuilder.main = require('../framework/model/DomainBuilder');
ar.ready(function(){
    //require('../modules');
});

ar.context = context;
module.exports = ar;