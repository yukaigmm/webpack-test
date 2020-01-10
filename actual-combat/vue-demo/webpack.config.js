const CopyPlugin = require("copy-webpack-plugin");
const { resolve, join } = require("path")
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
  entry: {
    main: "./main.js",
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: "assets/js/bundle.js",
    // publicPath: "/dist"
  },
  mode: "production",
  // 使用引入的vue，就不用把vue打包了
  externals: {
    vue: "Vue"
  },
  devServer: {
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
    proxy: {
      '/api': {
        target: 'http://192.168.1.107:3000', // 测试
        changeOrigin: true, // 改变源（是否跨域）
        pathRewrite: {
          '^/api': '/'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              outputPath: 'assets/img',
              name: "[hash:8].[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.vue/,
        use: ["vue-loader"]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../../'
            }
          },
          "css-loader",
        ],
      }
    ]
  },
  plugins: [
    // if you have plugins that make use of it, html-webpack-plugin should be ordered first before any of the integrated plugins.
    new HtmlWebpackPlugin({
      title: "自定义webpack",  // 页面title
      favicon: resolve(__dirname, "./favicon.ico"),  // 打包前的favicon路径,
      template: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "./assets/css/index.css",
      chunkFilename: "./assets/css/[id].css",

    }),
    // 压缩css
    // new OptimizeCSSAssetsPlugin({}),
    new VueLoaderPlugin(),
    new CopyPlugin([{
      from: resolve(__dirname, './src/assets/lib'),
      to: join(__dirname, './dist/assets/lib')
    }]),
  ]
}
module.exports = config;