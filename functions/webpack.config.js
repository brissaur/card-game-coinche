const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs',
    },
    target: 'node',
    externals: ['firebase-functions', 'firebase-admin', 'common'],
    module: {
        rules: [
            {
                test: /^(?!.*\.spec\.js$).*\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
