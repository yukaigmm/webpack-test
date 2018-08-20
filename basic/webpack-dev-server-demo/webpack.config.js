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
    ]
}

module.exports = config;