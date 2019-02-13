'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './client/index.js',

    output: {
        path: path.join(__dirname, '/public'),
        filename: 'bundle.js'
    },

    devtool: 'source-map',

    module: {
        rules: [
          {
            test: /jsx?$/,
            exclude: /(node_modules|bower_components)/,
            use: 'babel-loader'
          }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        })
    ]

};
