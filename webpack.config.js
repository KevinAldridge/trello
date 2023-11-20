const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: 'development',
    entry: './src/viewModel.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
            // You can add more rules for handling other file types if needed
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            ko: 'knockout',
            'window.ko': 'knockout',
        }),
    ],
    resolve: {
        extensions: ['.js'],
        alias: {
            knockout: path.resolve(__dirname, 'node_modules/knockout/build/output/knockout-latest.js'),
            'jquery-ui': path.resolve(__dirname, 'node_modules/jquery-ui-dist/jquery-ui.js'),
            'jquery-ui/ui/widgets': path.resolve(__dirname, 'node_modules/jquery-ui-dist/jquery-ui.js')
        },
    }
};
