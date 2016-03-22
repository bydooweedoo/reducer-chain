'use strict';

var webpack = require('webpack');
var env = process.env.NODE_ENV;
var config = {
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    output: {
        library: 'reducer-chain',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        })
    ]
};

if (env !== 'test') {
    config.externals = ['ramda'];
}

if (env === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compressor: {
            screw_ie8: true,
            warnings: false
        }
    }));
}

module.exports = config;
