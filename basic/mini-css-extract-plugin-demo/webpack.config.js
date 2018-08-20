const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css的插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const config = {
    entry: "./index.js",
    output:{
        path: path.resolve(__dirname,"./dist"),
        filename: "index.js"
    },
    plugins:[
        new MiniCssExtractPlugin({
            // filename:"[name].css",
            filename:"index.css",
            chunkFilename:"[id].css"
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin({})
    ],
    mode:"production",
    module:{
        rules:[
            {
                test:/\.less/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath:'../'
                        }
                    },
                    "css-loader",
                    {
                        loader: "less-loader",
                    }
                ]
            }
        ]
    }
}

module.exports = config;