module.exports = {
    entry: [
        './source/scripts/index.js'
    ],
    output: {
        path: './public/scripts/',
        filename: "index.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel',
                test: /\.js?$/,
                query: {
                    presets: ["es2015", "stage-1"]
                },
                exclude: /node_modules/,
                resolve: {
                    extensions: ['', '.js', '.jsx']
                },
            }
        ]
    }
};