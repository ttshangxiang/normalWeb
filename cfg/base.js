'use strict';
let path = require('path');
var webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
let CopyWebpackPlugin = require('copy-webpack-plugin');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];

let defaultSettings = require('./defaults');
let entries = defaultSettings.entries();
var chunks = Object.keys(entries);

let config = {
    port: defaultSettings.port,
    debug: true,
    devtool: 'eval',
    output: {
        path: path.join(__dirname, '../'),
        filename: './dist/js/[name].js',
        publicPath: defaultSettings.publicPath
    },
    devServer: {
        contentBase: './',
        historyApiFallback: true,
        hot: true,
        stats: { colors: true },
        port: defaultSettings.port,
        publicPath: defaultSettings.publicPath,
        noInfo: false
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            src: `${defaultSettings.srcPath}/`,
            jquery: `${defaultSettings.srcPath}/lib/jquery.min.js`
        }
    },
    externals: {
        // jquery: 'window.$'
    },
    module: {},
    plugins: [
        new webpack.ProvidePlugin({ //载入jq,这样就不用每个里面都require了，直接使用  $
            $: "jquery"
        }),
    	new webpack.optimize.CommonsChunkPlugin({
            name: 'vendors', // 将公共模块提取，生成名为`vendors`的chunk
            chunks: chunks,
            minChunks: chunks.length // 提取所有entry共同依赖的模块
        }),
        new ExtractTextPlugin('./dist/css/[name]-[contenthash:8].css'),
        new CopyWebpackPlugin([
            { from: './src/lib', to: './dist/lib', toType: 'dir'}
        ])
    ]
};

chunks.forEach(function(entry){
	let conf = {
        template:'src/html/'+entry+'.html',
        filename: entry+'.html',
        chunks: [entry,'vendors'],
        minify: { //压缩HTML文件
            removeComments: true //移除HTML中的注释
        },
        hash: false
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
