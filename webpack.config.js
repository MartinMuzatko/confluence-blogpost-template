var webpack = require('webpack')
var autoprefixer = require('autoprefixer')

module.exports = {
    entry: './index.js',
    output: {
        path: './',
        filename: '[name].js',
        sourceMapFilename: "[name].js.map",
    },
    module: {
        preLoaders: [
            { test: /\.html$/, loader: 'riotjs' },
            { test: /\.js$/, loader: 'eslint!source-map' },
        ],
        loaders: [
            { test: /\.html$|\.js$/, loader: 'babel', query: { presets: 'es2015-riot' }},
            { test: /\.less$/, loader: 'style!css!postcss!less'},
            { test: /\.scss$/, loader: 'style!css!postcss!sass'}
        ]
    },
    postcss: () => {
        return [
            autoprefixer({browsers: 'last 2 versions'})
        ];
    },
    plugins: [
        new webpack.ProvidePlugin({
            riot: 'riot'
        }),
    ],
    eslint: {
        configFile: './.eslintrc'
    },
    devtool: 'source-map'
}
