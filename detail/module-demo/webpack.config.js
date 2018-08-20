const path = require("path");
const config = {
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    mode: "development",
    module: {
        rules: [
            // 条件匹配：通过 test 、 include 、 exclude 三个配置项来命中 Loader 要应用规则的文件。
            // 在 Loader 需要传入很多参数时，你还可以通过一个 options对象来描述
            {
                // 支持字符串、正则和正则的数组
                test: [/\.css/, /\.less/, /\.scss/],

                // 处理顺序为从后到前
                use: ["style-loader", "css-loader", "less-loader", "sass-loader"],

                // include和exclude，支持单个路径，也能用数组支持多个路径
                // 数组里的每项之间是或的关系，即文件路径符合数组中的任何一个条件就会被命中。
                include: [path.resolve(__dirname, "src")],

                // 使用exlude，不是对于某个文件夹下的文件不编译，是对于某个文件夹下的文件，不使用exclude所在的loader编译
                exclude: [path.resolve(__dirname, "node_modules")]
            },
            {
                test: /\.js/,
                use: "babel-loader",
                // parser 属性可以更细粒度的配置哪些模块语法要解析哪些不解析，和 noParse 配置项的区别在于 parser 可以精确到语法层面， 而 noParse 只能控制哪些文件不被解析。
                parser: {
                    amd: false, // 禁用 AMD
                    commonjs: false, // 禁用 CommonJS
                    system: false, // 禁用 SystemJS
                    harmony: false, // 禁用 ES6 import/export
                    requireInclude: false, // 禁用 require.include
                    requireEnsure: false, // 禁用 require.ensure
                    requireContext: false, // 禁用 require.context
                    browserify: false, // 禁用 browserify
                    requireJs: false, // 禁用 requirejs
                }
            }
        ]
    }
}
module.exports = config;