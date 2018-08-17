const path = require('path');
const webpack = require("webpack");
const LatestBuildTimestamp = require('latest-build-timestamp-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: {
        app: ['./app/assets/entry.js'],
        style: [ './app/assets/css/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [

        ],
        loaders: [
            {
                test: /\.(scss|sass)$/i,
                include: [
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'app/assets/css'),
                ],
                loaders: ["css", "sass"]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new LatestBuildTimestamp(),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: { warnings: false }
        // }),
        new HtmlWebpackPlugin({
            filename: "./index.ejs",
            inject: 'body',
            template: "./app/views/index.ejs"
        })
    ]
};
