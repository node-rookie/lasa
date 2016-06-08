var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var path = require('path');
module.exports = {
    entry: {
        index: './web/js/app/index.js'
    },
    output: {
        path: path.join(__dirname , '/public/build/js'),
        filename: 'build.js'
    },
    resolve: {
        extensions: ['', '.js'],
        root: __dirname,
        alias: {
            fetch: '../../../node_modules/components/isomorphic-fetch/fetch-npm-browserify.js',
            'es6-promise': '../../../node_modules/es6-promise/dist/es6-promise.min.js',
            jQuery: '../../../web/js/framework/jQueryLean.js',
            wx: '../../../web/js/app/jssdk.js'
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.html$/,
                loader: 'riotjs-loader',
                query: {
                    type: 'none'
                }
            }
        ],
        loaders: [{
            test: /\.js$/,
            exclude: [path.resolve(__dirname, '../../../public'), path.resolve(__dirname, '../../../node_modules')],
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                compact: false
            }
        }]
    },
    plugins: [commonsPlugin, new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"production"'
    })]
    //plugins: [commonsPlugin,
    //    new webpack.ProvidePlugin({
    //        riot: 'riot'
    //    })
    //],
    //devServer: {
    //    contentBase: './public'
    //}
    //webpack-dev-server --inline --hot
};