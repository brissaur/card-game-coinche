const path = require('path');

module.exports = {
    entry: [
        './src/players/index.js',
        './src/tables/index.js',
        //'./src/tricks/index.js',
        './src/index.js',
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    externals: ['firebase-functions', 'firebase-admin'],
    module: {
        rules: [
            {
                test: /^(?!.*\.spec\.js$).*\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['babel-preset-env']
                    }
                }
            }
        ]
    }
};