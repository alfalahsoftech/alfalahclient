var webpack = require('webpack');
var helpers = require('./config/helpers');
// use resolve() to normalize paths between unix/windows environments
var path = require('path'); //path is not a varibale it is an object it has so many methods like resolve,dirName...
console.log(path)
const {
  AngularCompilerPlugin
} = require('@ngtools/webpack');

let aotOptions = {
  tsConfigPath: './tsconfig.json',
  skipCodeGeneration : true,
  mainPath :'./main.ts'
}

function resolve (dir) {
    return path.join(__dirname, '..', dir)
} 
const TEST_ASSETS = /assets[\/\\].*\.less$/;
console.log(__filename);
module.exports = {

    mode: 'production',

    entry: {
    'polyfills': './polyfills.ts',
    'vendor': './vendor.ts',
    'app': './main.ts',
    'style': './assets/main.less'
  },
  context: __dirname,
  node: {
    __filename: true
  },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
// for production mode 
    // optimization: {
        
    //     splitChunks: {
    //         cacheGroups: {
    //             commons: {
    //                 test: /[\\/]node_modules[\\/]/,
    //                 name: 'vendor',
    //                 chunks: 'all'
    //             }
    //         }
    //     }
    // },

    module: {
    rules: [
        // {
        //     test: /\.ts$/,
        //     loaders: [
        //       {
        //         loader: 'awesome-typescript-loader',
        //         options: { configFileName: helpers.root('src', 'tsconfig.json') }
        //       } , 'angular2-template-loader'
        //     ]
        //   },
        {
          test: /\.ts$/,
          loader: '@ngtools/webpack'
        },
      
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
      new AngularCompilerPlugin(aotOptions),
      // new ProvidePlugin({
      //   jQuery: 'jquery',
      //   $: 'jquery',
      //   jquery: 'jquery'
      // })

        // ensure that we get a production build of any dependencies
        // this is primarily for React, where this removes 179KB from the bundle
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': '"production"'
        // })
    ]

};