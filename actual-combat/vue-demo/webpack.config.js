const CopyPlugin = require("copy-webpack-plugin");
const { resolve, join } = require("path")
const { VueLoaderPlugin } = require("vue-loader");
console.log(join(__dirname, './dist/assets/lib'))
console.log(resolve(__dirname, './src/assets/lib'))
const config = {
  entry: "./main.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/dist"
  },
  mode: "production",
  // 使用引入的vue，就不用把vue打包了
  externals: {
    vue: "Vue"
  },
  module: {
    rules: [
      {
        test: /\.vue/,
        use: ["vue-loader"]
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
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin([{
      from: resolve(__dirname, './src/assets/lib'),
      to: join(__dirname, './dist/assets/lib')
    }])
  ]
}
module.exports = config;