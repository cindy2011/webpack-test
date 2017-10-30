var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: {
        index:[path.resolve(__dirname, "../src/main.js")]
    },
    output: {
        path: path.resolve(__dirname, "../dist/static"),//输出的地址
        filename: '[name].js',
        publicPath: "static/" //插入index.html页面的公用的地址
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, "../src"),
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve:{
        extensions: ['.js','.vue'], //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
        alias:{
            "vue$": "vue/dist/vue.esm.js" 
        }
        //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: '../index.html',//相对与这个js的地址
            template: path.resolve(__dirname, "../index.html"),
            inject: true
        })
    ]

}