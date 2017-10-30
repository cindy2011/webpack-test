var express = require("express");
var webpack = require("webpack");
var config = require("./webpack.dev.conf.js");
var app = express();
var path=require("path");
var compiler = webpack(config);
var dist_dir = path.join(__dirname, "dist");
var port = 3500;
// console.log("publicPath:"+config.output.publicPath);
var devMiddleware = require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        color: true,
        chunks: false
    }
});

var hotMiddleware = require("webpack-hot-middleware")(compiler);
// compiler还有compiler.plugin函数。这个相当于是插件可以进行处理的webpack的运行中的一些任务点，
// compilation也有compilation.plugin函数，这个也是处理webpack的运行中的一些任务点
// 当html-webpack-plugin提交之后通过热重载中间件发布重载动作使得页面重载
compiler.plugin('compilation',function(compilation){
	// 生成html目标文件后触发async
	compilation.plugin("html-webpack-plugin-after-emit",function(data,cb){
		//发布事件
		hotMiddleware.publish({action:"reload"});
		cb();//回调函数
	})
})
// 必须要监测compiler的compilation事件
// 然后在回调compilation事件时，对compilation参数进行plugin的事件的注册 。
app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(port, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log("listen at http://localhost:" + port);
})