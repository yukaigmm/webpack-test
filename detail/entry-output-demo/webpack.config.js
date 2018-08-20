const path = require("path");
const config = {
    entry: {
        // 如果 entry 是一个 string 或 array，就只会生成一个 Chunk，这时 Chunk 的名称是 main；
        // 如果 entry 是一个 object，就可能会出现多个 Chunk，这时 Chunk 的名称是 object 键值对里键的名称。

        
        // 多个入口的文件，在编译时，chunk的名称就是键值对中键的名称，
        // 因此，output里面就直接用[name].js作为占位，然后会输出对应的文件名称
        main: "./main.js",
        index: "./index.js"
    },
    output:{
        // output.path 配置输出文件存放在本地的目录，必须是 string 类型的绝对路径。通常通过 Node.js 的 path 模块去获取绝对路径：
        path: path.resolve(__dirname,"./dist"),
        // 在这个地方用[name].js接收chunk的名称;
        //  Webpack 会为每个 Chunk取一个名称，可以根据 Chunk 的名称来区分输出的文件名;
        // 内置变量包括（其中 hash 和 chunkhash 的长度是可指定的，[hash:8] 代表取8位 Hash 值，默认是20位）：
        // 注意 ExtractTextWebpackPlugin 插件是使用 contenthash 来代表哈希值而不是 chunkhash， 原因在于 ExtractTextWebpackPlugin 提取出来的内容是代码内容本身而不是由一组模块组成的 Chunk。
        // id --- chunk的唯一标识，从0开始
        // name --- chunk的名称
        // hash --- chunk唯一标识的hash值
        // chunkhash --- chunk内容的hash值
        filename:"[name].js"
    },
    module:{
        rules:[
            {
                test:/\.css/,
                use:["style-loader","css-loader"]
            }
        ]
    },
    mode: "production"
}

module.exports = config;