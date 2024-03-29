const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
  entry: {
    'register' : path.resolve(__dirname, './public/javascripts/register.js'),
    'login' : path.resolve(__dirname, './public/javascripts/login.js')
},

output: {
    path: path.resolve(__dirname, '../serveur/public/'),
    filename: 'javascripts/[name]-bundle.js'
},

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, '..', 'serveur', 'public'),
	       watch : true
      },
      host : 'localhost',
      port : 8080,
      open : true
  },

  module: {
    rules: [
      {
        test: /\.(m?js$|jsx)/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)/i,
        use: {
          loader: 'file-loader',
          options: {
            name : '[name].[ext]',
            outputPath : 'images'
          }
        }
      }
    ]
  },

  plugins: [
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'public/html', 'login.html'),
        filename: path.resolve(__dirname, '../serveur/public', 'login.html'),
        chunks: ['login'],
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'public/html', 'register.html'),
      filename: path.resolve(__dirname, '../serveur/public', 'register.html'),
      chunks: ['register'],
    }),
      new CopyPlugin({
          patterns: [
            {
              context: path.resolve(__dirname,'public','html'),
              from: "**/*.html",
              to:  'public/html',
              noErrorOnMissing: true,
              globOptions: { }
            },
            {
              context: path.resolve(__dirname,'public','images'),
              from: '**/*',
              to:  'public/images/[name][ext]',
              noErrorOnMissing: true,
            },
            {
             context: path.resolve(__dirname,'public','stylesheets'),
             from: '**/*.css',
             to:  'public/stylesheets/[name][ext]',
	           noErrorOnMissing: true,
           },
         ]
       }),
     ],


  // gestion de bibliothèques externes à exclure du bundle, ici cas de React
  externals : {
    react: 'React',
    reactdom: 'ReactDom'
  },


  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
