const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
        './src/players/index.js',
        './src/tables/index.js',
        //'./src/tricks/index.js',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    target: 'node',
    externals: ['firebase-functions', 'firebase-admin'],
    module: {
        rules: [
            {
                test: /^(?!.*\.spec\.js$).*\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};