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