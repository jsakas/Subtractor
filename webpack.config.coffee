path = require('path')
ExtractTextPlugin = require('extract-text-webpack-plugin')
extractSass = new ExtractTextPlugin({
    filename: 'subtractor.css'
})

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
        path: path.resolve(__dirname, 'docs')
    resolve:
        alias:
            'web-audio-test-api': path.resolve(__dirname, 'node_modules/web-audio-test-api')
            'custom-elements': path.resolve(__dirname, 'node_modules/@webcomponents/custom-elements/custom-elements.min')
            'shadydom': path.resolve(__dirname, 'node_modules/@webcomponents/shadydom/shadydom.min')
    devServer:
        contentBase: path.join(__dirname, 'docs')
        port: 7200
    module:
        rules: [
            test: /\.js$/
            include: [
                path.resolve(__dirname, 'src')
            ]
            loader: 'babel-loader'
        ,
            test: /\.json$/
            loader: 'json-loader'
        ,
            test: /\.scss$/
            include: [
                path.resolve(__dirname, 'src/sass')
            ]
            exclude: [
                path.resolve(__dirname, 'src/sass/subtractor.scss')
            ]
            use: [
                loader: 'css-loader'
            ,
                loader: 'sass-loader'
            ]
        ,
            test: path.resolve(__dirname, 'src/sass/subtractor.scss')
            use: extractSass.extract(
                use: [
                    loader: 'css-loader'
                ,
                    loader: 'sass-loader'
                ]
            )
        ]
    plugins: [
        extractSass
    ]
