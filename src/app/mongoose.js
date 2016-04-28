'use strict'
import settings from '../configs/settings';
import mongoose from 'mongoose';
let makeUrl = (mongo) => {
    var authPart = mongo.username + ':' + mongo.password + '@';
    var auth = mongo.username ? authPart : '';
    return 'mongodb://' + auth + mongo.host + ':' + mongo.port + '/' + mongo.db;
};

let url = makeUrl(settings.mongo);
let options = {};

mongoose.connect(url, options);

mongoose.connection.on('connected',function(){
    console.log('Mongoose connected to '+url);
});
mongoose.connection.on('error',function(err){
    console.log('Mongoose error happens: '+err);
});
mongoose.connection.on('disconnected',function(){
    console.log('Mongoose disconnected to '+url);
});

export default mongoose;

