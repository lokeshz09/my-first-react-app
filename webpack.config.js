const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    name: "vendors"
                    
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                include: /src/,
                options: {
                  babelrc: false,
                  presets: [
                    [
                      "env",
                      {
                        targets: {
                          browsers: ["last 2 Chrome versions"]
                        }
                      }
                    ],
                    "@babel/preset-env",
                    "@babel/preset-react"
                  ],
                  plugins: ["syntax-dynamic-import"]
                }
            }
        ]
    }
}