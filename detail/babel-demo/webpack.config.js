const path = require("path");
const config = {
    entry: "./index.js",
    output:{
        path: path.resolve(__dirname,"dist"),
        filename: "index.js"
    },
    mode: "development",
    module:{
        rules:[
            {
                test: /\.css/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.js/,
                // 使用babel-plugin-transform-runtime 时，可能会报错"export 'default' (imported as '_typeof2') was not found in 'babel-runtime/helpers/typeof'
                // 这时需要 在babelrc里面将transform-runtime的polyfill设置为false
                use: ["babel-loader"]
            }
        ]
    },
    resolve:{
        alias:{
            "@":"./src"
        }
    }
}

module.exports = config;