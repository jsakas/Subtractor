path = require('path')

module.exports =
    entry: [
        './src/Subtractor.js'
    ]
    output:
        filename: 'subtractor.js'
        path: path.resolve(__dirname, 'dist')
    resolve:
        alias:
            'web-audio-test-api': '../node_modules/web-audio-test-api'
    module:
        rules: [
            test: /\.js$/
            include: [
                path.resolve(__dirname, "src")
            ]
            loader: 'babel-loader'
        ]
