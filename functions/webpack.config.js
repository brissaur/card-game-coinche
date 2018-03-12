const path = require('path');

module.exports = {
    entry: [
        'babel-polyfill',
<<<<<<< HEAD
        './src/index.js'
=======
        './src/players/index.js',
        './src/tables/index.js',
        //'./src/tricks/index.js',
        './src/index.js',
>>>>>>> 16977a009a549c45c282ecf03e1df17bfa10ef64
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    target: 'node',
<<<<<<< HEAD
    externals:[
        'firebase-functions',
        'firebase-admin'
    ],
=======
    externals: ['firebase-functions', 'firebase-admin'],
>>>>>>> 16977a009a549c45c282ecf03e1df17bfa10ef64
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