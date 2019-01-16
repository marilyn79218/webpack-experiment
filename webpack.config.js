const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: './src/app.js',
    // 特地把一些 modules 列出來，成為另一個 static/js/vendor.[hash].js
    // 接著在 CommonsChunkPlugin 搭配下，因為這些 modules 同時在 app.js & vendor.js 中用到，
    // 所以相同的 modules 會被獨立切分為另一個 common-vendors.js
    vendor: [
      // List the module names which can be found in node_modules/
      'ramda',
      'moment'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
          // On-demand loading js chunk
          plugins: ['@babel/plugin-syntax-dynamic-import']
        },
      },
      {
      	// Critical css module using style tag for faster rendering
      	test: /\.cr\.css$/,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
            },
          }
        ],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader', // In case of extract failed
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      }
    ]
  },
  // resolve: {
  //   // Tell webpack what directories should be searched when resolving modules.
  //   // This resolves node_modules hierachically. (The default configuration as well, can be omitted)
  //   // See: https://github.com/webpack/webpack/issues/6505
  //   modules: [
  //     'node_modules'
  //   ]
  // },
  plugins: [
    new ExtractTextPlugin('static/css/style.css'),
    // Add <script> and <link> into template html
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileWhitelist: [/\.jpe?g/],
    }),
    // Used to extract the same modules between entry points
    new webpack.optimize.CommonsChunkPlugin({
      // Specify the common chunk's name.
      // If it's same as one of entry, the extracted modules will be merge into that entry file
      name: 'common-vendors'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new CleanWebpackPlugin(
      ['dist'],
      {
        watch: true,
      }
    ),
    new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 告訴 Webpack：每當在 old-ramda-dependency 中遇到 `import ... from 'ramda';` 時，
    // 就變成「到隔壁同樣相依 ramda@0.18.0 的 old-ramda-dependency node_modules 中引用 ramda」。
    // See: https://github.com/webpack/webpack/issues/5593#issuecomment-390356276
    new webpack.NormalModuleReplacementPlugin(/^ramda$/, function(resource) {
      if (resource.context.includes('node_modules/old-ramda-dependency-2')) {
        resource.request = '../old-ramda-dependency/node_modules/ramda';
      }
    }),
  ],
  watch: true,
  // ref: https://www.youtube.com/watch?v=fGed9phNkto
  // It's a neat method of getting access to the original source code when debugging compiled applications
  devtool: 'cheap-module-source-map',
  // ref: https://ithelp.ithome.com.tw/articles/10184852
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
  },
};
