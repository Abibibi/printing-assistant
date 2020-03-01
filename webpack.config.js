const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    // 1
    entry: './src/index.js',
    // 2
    output: {
      path: __dirname + '/dist',
      publicPath: './',
      filename: 'bundle.js'
    },
    // 3
    devServer: {
      contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Assistant d\'impression',
            template: './src/index.html'
        })
    ]
};