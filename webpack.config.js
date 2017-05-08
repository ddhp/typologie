// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');

let plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  // new webpack.optimize.DedupePlugin(),
  // new webpack.optimize.OccurenceOrderPlugin(),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
  )
}

// generate webpack asset json
plugins.push(new AssetsPlugin())

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './client-entry',
  output: {
    path: path.join(__dirname, 'static', 'js'),
    filename: '[chunkhash]-entry.js'
  },

  resolve: {
    extensions: ['.js', '.scss', '.css'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'postcss-loader',
        options: {
          plugins: function () {
            return [
              require('precss'),
              require('autoprefixer')
            ]
          }
        }
      }, {
        loader: 'sass-loader'
      }]
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
      loader: 'url-loader?limit=100000'
    }]
  },
  plugins: plugins
};
