const path = require("path");
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
                test:/\.less/,
                use:[
                    "style-loader",
                    "css-loader",
                    {
                        loader:"less-loader",
                        options:{
                            minimize:true
                        }
                    }
                ]
            }
        ]
    }
}

module.exports = config;