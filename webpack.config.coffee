path = require('path')

module.exports =
    entry: [
        './src/Subtractor.js'
        './src/components/Slider.js'
    ]
    output:
        filename: 'subtractor.js'
        path: path.resolve(__dirname, 'dist')
    resolve:
        alias:
            'web-audio-test-api': path.resolve(__dirname, 'node_modules/web-audio-test-api')
    devServer:
        contentBase: path.join(__dirname),
        port: 8000
    module:
        rules: [
            test: /\.js$/
            include: [
                path.resolve(__dirname, "src")
            ]
            loader: 'babel-loader'
        ]
