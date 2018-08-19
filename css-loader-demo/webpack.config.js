const path = require("path");
const config = {
    entry:"./index.js",
    output:{
        path: path.resolve(__dirname,"./dist"),
        filename:"bundle.js"
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    mode: "development"
}

module.exports = config;