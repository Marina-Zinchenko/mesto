const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  entry: './src/pages/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
        publicPath: ''},
        mode: 'development',
        devServer: {
          static: path.resolve(__dirname, './dist'), 
          compress: true, 
          port: 8080, 
          open: true 
        },
        module:{
        rules: [
          {
            test: /\.js$/,
            use: 'babel-loader',
            exclude: '/node_modules/'
          },
            {
            test: /\.css$/,
             use: [MiniCssExtractPlugin.loader, {
              loader: 'css-loader',
             options: { importLoaders: 1 }
            },'postcss-loader'
            ]
          },
          {
            test: /\.(svg|jpg)$/,
            type: 'asset/resource',
            generator: {
              filename: 'images/[hash][ext]'
            }
          },
            {
              test: /\.(woff|woff2)$/,
              type: 'asset/resource',
              generator: {
                filename: 'fonts/[hash][ext]'
              }
            }
          ],
      },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin()
  ]
}