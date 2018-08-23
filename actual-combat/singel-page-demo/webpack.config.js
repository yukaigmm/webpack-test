const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebPlugin } = require('web-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");
const config = {
    entry: { app: "./main.js" },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]_[chunkhash:8].js"
    },
    mode: "production",
    module: {
        rules: [
            {
                test: /\.vue/,
                use: ["vue-loader"]
            },
            {
                test: /\.js$/,
                use: ['babel-loader'],
                // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                // 参考https://vue-loader.vuejs.org/zh/migrating.html#%E5%80%BC%E5%BE%97%E6%B3%A8%E6%84%8F%E7%9A%84%E4%B8%8D%E5%85%BC%E5%AE%B9%E5%8F%98%E6%9B%B4
                test: /\.css$/,
                oneOf: [
                    // 这里匹配 `<style module>`
                    {
                        resourceQuery: /module/,
                        use: [
                            'vue-style-loader',
                            {
                                loader:MiniCssExtractPlugin.loader
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    modules: true,
                                    localIdentName: '[name]_[hash:base64:5]'
                                }
                            }
                        
                        ]
                    },
                    // 这里匹配普通的 `<style>` 或 `<style scoped>`
                    {
                        use: [
                            'vue-style-loader',
                            
                            {
                                loader:MiniCssExtractPlugin.loader
                            },
                            'css-loader'
                        ]
                    }
                ]
            }
        ]
    },
    plugins: [
        // 使用本文的主角 WebPlugin，一个 WebPlugin 对应一个 HTML 文件
        new WebPlugin({
            template: './index.html', // HTML 模版文件所在的文件路径
            filename: 'index.html' // 输出的 HTML 的文件名称

        }),
        new MiniCssExtractPlugin({
            // filename:"[name].css",
            filename: "[name]_[contenthash:8].css",
            chunkFilename: "[id].css"
        }),
        new VueLoaderPlugin()
    ],
    externals:{
        vue:"Vue"
    }
}


module.exports = config;