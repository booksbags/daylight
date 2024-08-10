const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    mode:"development",
    resolve:{
        extensions:[".ts", ".tsx", ".json", ".js", ".jsx"],
        alias:{
            "@pages":path.resolve(__dirname, "./src/pages"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@utils":path.resolve(__dirname, "./src/utils"),
            "@hooks":path.resolve(__dirname, "./src/hooks")
        }
    },
    output:{
        path: path.resolve(__dirname, "./output"),
        filename: "[name].[chunkhash:5].js",
        publicPath: "/"
    },
    module:{
        rules:[
            {
                test: /\.tsx?$/,
                use:["babel-loader"]
            },
        ]
    },
    plugins:[
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "./public/index.html")
        })
    ],
    devServer:{
        port:8089,
        historyApiFallback:true
    },
    stats: "minimal"
}