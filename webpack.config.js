const path = require('path');
const webpack = require("webpack");

module.exports = {
    entry: './app/assets/entry.js',
    output: {
        path: path.join(__dirname, "/app/assets/bin/"),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.sass$/, loader: 'style!css!sass!scss' }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ]
};