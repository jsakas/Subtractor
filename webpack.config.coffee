path = require('path')

module.exports =
    entry: [
        'custom-elements'
        'shadydom'
        './src/Subtractor.js'
        './src/components/Fader.js'
        './src/components/Keyboard.js'
        './src/components/Knob.js'
    ]
    output:
        filename: 'subtractor.js'
        path: path.resolve(__dirname, 'dist')
    resolve:
        alias:
            'web-audio-test-api': path.resolve(__dirname, 'node_modules/web-audio-test-api')
            'custom-elements': path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements/custom-elements.min')
            'shadydom': path.resolve(__dirname, 'node_modules/@webcomponents/shadydom/shadydom.min')
    devServer:
        contentBase: path.join(__dirname),
        port: 7200
    module:
        rules: [
            test: /\.js$/
            include: [
                path.resolve(__dirname, "src")
            ]
            loader: 'babel-loader'
        ,
            test: /\.json$/
            loader: 'json-loader'
        ,
            test: /\.scss$/,
            use: [
                loader: "css-loader" # translates CSS into CommonJS
            ,
                loader: "sass-loader" # compiles Sass to CSS  
            ]
        ]
