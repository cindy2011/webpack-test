var HtmlWebpackPlugin = require("html-webpack-plugin");
var path = require("path");
var config = require("./webpack.base.conf");
var webpack = require("webpack");
config.output.publicPath = "/";
config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.resolve(__dirname, "../index.html"),
        inject: true
    })
];
//var devClient = 'webpack-hot-middleware/client';
var devClient="./build/dev-client";
// console.dir(Object.keys(config.entry));
//Object.keys返回的正是一个对象属性数组
Object.keys(config.entry).forEach(function(name, i) {
    var extras = [devClient];
    config.entry[name] = extras.concat(config.entry[name]);
})
// { index: [ './build/dev-client', 'D:\\xindy1025\\src\\main.js' ] }
// console.dir(config.entry);
module.exports = config;