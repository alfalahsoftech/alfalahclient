var webpack = require('webpack');

// use resolve() to normalize paths between unix/windows environments
var path = require('path');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}
const TEST_ASSETS = /assets[\/\\].*\.less$/;
module.exports = {

    mode: 'production',

    entry: {
    'polyfills': '../src/polyfills.ts',
    'vendor': '../src/vendor.ts',
    'app': '../src/main.ts'
  },

    output: {
        path: path.resolve(__dirname, '../app'),
        filename: '[name].min.js'
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    module: {
    rules: [
      // { test: /\.scss$/, exclude: TEST_ASSETS, loaders: ['raw-loader', 'sass-loader'] },
      {
        test: TEST_ASSETS,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }]
      },
      // load scss from app as raw css strings
      {
        test: /\.less$/,
        exclude: TEST_ASSETS,
        use: [{
          loader: "to-string-loader"
        }, {
          loader: "css-loader",
          options: {
            sourceMap: true
          }
        }, {
          loader: "less-loader",
          options: {
            sourceMap: true
          }
        }]
      },
      {
        test: /\.css$/,
        exclude: path.resolve(__dirname, 'app'),
        use: [{
            loader: "style-loader"
          },
          {
            loader: "css-loader?sourceMap"
          }
        ]
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'raw-loader'
      },
      {
        test: /\.jpg$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff(2)?|ttf|eot|gif|jpe?g|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ]
  },

    resolve: {
    extensions: ['.ts', '.js','.css']
  },

    plugins: [
        // ensure that we get a production build of any dependencies
        // this is primarily for React, where this removes 179KB from the bundle
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]

};