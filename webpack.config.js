const path = require('path');

module.exports = {
    entry: './webpack/input/scripts.js',
    output: {
        filename: 'scripts.js',
        path: path.join(__dirname, 'webpack/output/')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        }]
    },
    mode: "development"
};