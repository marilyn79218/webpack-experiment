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
    // Each of entry point is an independent chunk
    app: './src/app.js',
    page: './src/page.js',
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

    // Non-entry chunk filename (Eg, dynamic loaded file's name)
    // See: https://webpack.js.org/configuration/output/#outputchunkfilename
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

    // ****************** CommonsChunkPlugin START (CCP) ******************
    // ------ Simple CCP ------
    // Used to extract the common modules which exists in all entry points
    new webpack.optimize.CommonsChunkPlugin({
      /* Specify its `chunk name` */
      /* 1. If it's same as one of entry (an entry is a chunk as well),
       * then the extracted modules will be merge into that entry file
      */
      /* 2. If not, modules that match this CommonsChunkPlugin config
       * will be putted into this `my-vendors.js` file, where the chunk name is `common-vendors`
       * (And `vendor.js` will be a very small chink in this case)
      */
      name: 'common-vendors',
      // Give it a specific filename rather than using chunk name as filename
      // Notice that we're using `[chunkhash]` in filename but not `[hash]`
      // They are different, see: https://medium.com/@sahilkkrazy/hash-vs-chunkhash-vs-contenthash-e94d38a32208
      filename: 'my-vendors.[chunkhash].js',
      // 1. Number: 表示對 module 而言，唯有當它「同時存在於 n 個 chunks 中」時，該 module 才會被放到 common-vendors.js 中
      // Default is the number of current chunks/ entries
      minChunks: 2
      // 2. Function: 符合此 function 的 module，才會被放到 common-vendors.js 中
      // minChunks: (module, count) =>
      //   module.resource && (/ramda|moment/).test(module.resource) && count >= 2,
    }),
    // Extract out manifest chunk (manifest.js)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new webpack.HashedModuleIdsPlugin(),
    // Result: 把同時出上述三個 entries (chunks) 中出現 2 次 (即 count) 的 module，都放到 common-vendors.[hash].js 中

    // ------ Nested CCP ------
    // 在使用多個 CCP 時，每一回的 CCP 都會從上一次的「萃取結果」中繼續萃取 modules
    // 也就是說，不斷把一個 chunk 中的某些 module 再次萃取出來，成為另一個 chunk。
    // See: https://github.com/webpack/webpack/issues/4638#issuecomment-292583989
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: (m) => /node_modules/.test(m.context)
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'ramda',
    //   minChunks: (m) => /node_modules\/(?:ramda|moment)/.test(m.context)
    // }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'moment',
    //   minChunks: (m) => /node_modules\/(?:moment)/.test(m.context)
    // }),
    // Result: 得到「ramda, moment, vendor」三者互相獨立的 [name].[hash].js。
    // ****************** CommonsChunkPlugin END (CCP) ******************

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
