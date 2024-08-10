const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    entry: path.resolve("./src/index.tsx"),
    mode:"development",
    resolve:{
        extensions:[".ts", ".tsx", ".json", ".js", ".jsx"]
    },
    output:{
        path: path.resolve("./output"),
        filename: "[filename].[chunk:5].js",
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
            template: path.resolve("./public/index.html")
        })
    ],
    devServer:{
        port:8089
    },
    stats: "minimal"
}