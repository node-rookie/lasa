var settings = require('@private/base-settings').mongo;
var mongoose = require('mongoose');
var makeUrl = function(mongo){
    var authPart = settings.username + ':' + settings.password + '@';
    var auth = settings.username ? authPart : '';
    return 'mongodb://' + auth + mongo.host + ':' + mongo.port + '/' + mongo.db;
};

var url = makeUrl(settings);
var options = {};

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

module.exports = mongoose;

