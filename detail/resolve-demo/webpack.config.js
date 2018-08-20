const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const config = {
    entry : "./index.js",
    output : {
        filename: "index.js",
        path: path.resolve(__dirname,"dist")
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: "index.css",
            chunkFilename:"[id].css"
        })
    ],
    mode:"development",
    module:{
        rules:[
            {
                test:/\.css/,
                use:["style-loader",MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    },
    resolve:{
        // alias 配置项通过别名来把原导入路径映射成一个新的导入路径，就是相当于把路径中的./src缩减成@，这样可以节省代码，
        // 比如有的时候会有很多层嵌套，导入的时候会有../../../这样的情况，那么就可以设置alias，提高开发效率
        alias:{
            "@":"./src"
        },
        // 当遇到 require('./data') 这样的导入语句时，Webpack 会先去寻找 ./data.js 文件，
        // 如果该文件不存在就去寻找 ./data.json 文件， 如果还是找不到就报错。
        extensions:['.js','.json'],
        // 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 import '../../../components/button' 这时你可以利用 modules 配置项优化，假如那些被大量导入的模块都在 ./src/components 目录下,就可以这样配置,然后通过import "button",webpack就会先去'./src/components'目录下查找button组件
        modules:['./src/components','node_modules'],
        // enforceExtension 如果配置为 true 所有导入语句都必须要带文件后缀， 例如开启前 import './foo' 能正常工作，开启后就必须写成 import './foo.js'
        enforceExtension:false,
    }
    
}

module.exports = config;