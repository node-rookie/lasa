import settings from '../configs/settings';
var util = {};
util.extend = function(obj, source) {
    for (var prop in source) {
        obj[prop] = source[prop];
    }
    return obj;
};
util.isGenerator = function(fn){
    return typeof fn === 'function' && fn.constructor.name === 'GeneratorFunction';
};
util.extendAll = function(target, source){
    for (var prop in source) {
        if(typeof source[prop]=='object'){
            if(typeof target[prop]!='object'){
                target[prop] = {};
            }
            util.extendAll(target[prop], source[prop]);
        }
        else{
            target[prop] = source[prop];

        }
    }
    return target;
};
util.clone = function(source) {
    return util.extend({},source);
};
util.defaults = function(obj, source) {
    for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
    }
    return obj;
};
util.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return typeof value === 'function' ? value.call(object) : value;
};


util.appendLine = function(target, str, parseFlag){
    str = str.replace(/%%.*%%/, parseFlag);
    target += str + "\n";
    return target;
}

/**
 * @param min
 * @param max
 * get a random no between min and max
 * */
util.random = function(min, max){
    var no = max - min + 1;
    return Math.floor(Math.random()*no + min);
}

//relationshipId generator(Two strings have the same length)
util.genOneToOneId = function(str1, str2) {
    return _sortStr(str1, str2);
}

/**
 * generate random string
 * @param num //limit random string length
 * **/
util.generateRandomString = function(num){
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var res = "";
    for (var i = 0; i < num; i++) {
        var id = Math.floor(Math.random() * 62);
        res += chars[id];
    }
    return res;
}

/**
 * generate token by input param
 * @param str
 * **/
util.generateToken = function(str){
    var key = settings.secretKey;
    return require('crypto').createHash('sha1').update(String(str)).update(key).digest('hex');
}

function _sortStr(str1, str2) {
    for(var i = 0, len = str1.length; i<len; i++) {
        var char1 = str1.charAt(i),
            char2 = str2.charAt(i);
        if(char1 < char2) {
            return str1 + str2;
        }else if(char1 > char2){
            return str2 + str1;
        }else if(i === (len-1)){
            throw new Error('Failed to generate relationshipId One to One [error]: two objs has the same Id');
        }
    }
}

module.exports = {
    extend: util.extend,
    extendAll: util.extendAll,
    clone: util.clone,
    defaults: util.defaults,
    result: util.result,
    appendLine: util.appendLine,
    genOneToOneId: util.genOneToOneId,
    generateToken: util.generateToken,
    random: util.random,
    generateRandomString: util.generateRandomString,
    isGenerator: util.isGenerator
};