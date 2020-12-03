const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devMode= process.env.NODE_ENV !=='production'; //esto nos permitira saber si estamos en entorno de produccion para que los estilos solo cargen en este modo
const MiniCssExtractPlugin= require('mini-css-extract-plugin') //sera el default de style

module.exports = {
    //con esta configuracion le indicamos que convierta el codigo de javascript
    entry: './frontend/app.js',
    output: {
        path: path.join(__dirname, 'backend/public'),
        filename: 'js/bundle.js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    //de esta manera podemos enterder css con JS
                   devMode? 'style-loader' : MiniCssExtractPlugin.loader, //carga los estilos dentro del js
                    'css-loader'
                ]
            }
        ]

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './frontend/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            }

        }),
        new MiniCssExtractPlugin({
            filename: 'css/bundle.css'
        })

    ],
    //lo siguiente nos permitira saber en que linea se cometio un error
    devtool: 'source-map',
    // devServer: {
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: true,
    //     port: 9000
    //   }

};