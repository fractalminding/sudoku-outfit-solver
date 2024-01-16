// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = 'style-loader';



const config = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'),
                    to: path.resolve(__dirname, 'dist/assets')
                },
                {
                    from: path.resolve(__dirname, 'src/assets.css'),
                    to: path.resolve(__dirname, 'dist/assets.assets')
                }
            ],
          }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.js$/i,
                loader: 'babel-loader',
            },
            {
                test: /\main.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            }
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: false,
        port: 9000,
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
