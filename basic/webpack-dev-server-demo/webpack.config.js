const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname,"./dist"),
        filename: "bundle.js"
    },
    mode:"production",
    module:{
        rules:[
            {
                test:/\.css/,
                use:["style-loader",MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            // filename:"[name].css",
            filename:"index.css",
            chunkFilename:"[id].css"
        }),
    ],
    // 只有在通过 DevServer 去启动 Webpack 时配置文件里 devServer 才会生效，因为这些参数所对应的功能都是 DevServer 提供的，Webpack 本身并不认识 devServer 配置项。
    devServer:{
        // 设置这个host，就能让其他设备访问本地服务
        host: "0.0.0.0",
        // 是否自动打开默认浏览器，同时还提供 devServer.openPage 配置项用于打开指定 URL 的网页。
        open: true,
        // 访问端口
        port: 8010,
        // 是否热更新
        hot: true,
        // disableHostCheck 配置项用于配置是否关闭用于 DNS 重绑定的 HTTP 请求的 HOST 检查。 DevServer 默认只接受来自本地的请求，关闭后可以接受来自任何 HOST 的请求。 
        // 它通常用于搭配 --host 0.0.0.0 使用，因为你想要其它设备访问你本地的服务，但访问时是直接通过 IP 地址访问而不是 HOST 访问，所以需要关闭 HOST 检查。
        disableHostCheck: true,
    }
}

module.exports = config;