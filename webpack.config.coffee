path = require('path')

module.exports =
    entry: [
        './src/Subtractor.js'
        './src/components/Fader.js'
        './src/components/Knob.js'
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
        ,
            test: /\.scss$/,
            use: [
                loader: "css-loader" # translates CSS into CommonJS
            ,
                loader: "sass-loader" # compiles Sass to CSS  
            ]
        ]
