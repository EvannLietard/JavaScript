const path = require('path');
const webpack = require('webpack');

const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PRODUCTION = false;

module.exports = {
  entry: {
    'auctioneer' : path.resolve(__dirname, './src/scripts/auctioneer.js'),
    'bidder' : path.resolve(__dirname, './src/scripts/bidder.js')
},

output: {
    path: path.resolve(__dirname, '../server/'),
    filename: 'public/scripts/[name]-bundle.js'
},

  mode :  (PRODUCTION ? 'production' : 'development'),
  devtool : (PRODUCTION ? undefined : 'eval-source-map'),

  devServer: {
      static: {
	       publicPath: path.resolve(__dirname, '..', 'server', 'public'),
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
        template: path.resolve(__dirname,'src/html', 'auctioneer.html'),
        filename: path.resolve(__dirname, '../server/public', 'auctioneer.html'),
        chunks: ['auctioneer'],
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'src/html', 'bidder.html'),
      filename: path.resolve(__dirname, '../server/public', 'bidder.html'),
      chunks: ['bidder'],
    }),
      new CopyPlugin({
          patterns: [
            {
              context: path.resolve(__dirname,'src','html'),
              from: "**/*.html",
              to:  'public/html',
              noErrorOnMissing: true,
              globOptions: { }
            },
            {
              context: path.resolve(__dirname,'src','images'),
              from: '**/*',
              to:  'public/images/[name][ext]',
              noErrorOnMissing: true,
            },
            {
             context: path.resolve(__dirname,'src','style'),
             from: '**/*.css',
             to:  'public/style/[name][ext]',
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
