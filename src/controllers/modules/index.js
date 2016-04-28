module.exports = function(app){
    //spa module
    app.use(require('./spa')());
}