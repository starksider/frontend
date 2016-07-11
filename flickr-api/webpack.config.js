'use strict';

module.exports = {
    entry: "./scripts/app",
    output: {
        path: './scripts/out/',
        filename: "build.js"
    },

    watch: true,

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel'
        }]
    }
};