const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: [
      'ramda',
      'moment',
      'react',
      'react-dom'
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
          presets: ['@babel/preset-env', '@babel/preset-react'],
          // On-demand loading js chunk
          plugins: ['@babel/plugin-syntax-dynamic-import']
        },
      },
      {
      	// Critical css using style tag for faster rendering
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
      // Transpiling css from react-bootstrap purpose
      { test: /\.css$/,
        use: ['style-loader', 'css-loader'],
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
  plugins: [
    new ExtractTextPlugin('static/css/style.css'),
    // Add <script> and <link> into template html
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
      minify: isProduction ? {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      } : {},
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileWhitelist: [/\.jpe?g/],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor' // Specify the common bundle's name.
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
    new webpack.HotModuleReplacementPlugin(),
    // ref: https://www.jianshu.com/p/8499842defbe
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }
    }),
    // ref: https://github.com/marilyn79218/vis-large-app-starter-kit/blob/master/config/webpack.config.prod.js#L357
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new BundleAnalyzerPlugin(),
  ].concat(isProduction ? [
    // ref: https://remarkablemark.org/blog/2017/02/25/webpack-ignore-module/
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        comparisons: false,
      },
      output: {
        comments: false,
        ascii_only: true,
      },
    }),
  ] : []),
  watch: true,
  // Webpack CLI: --display-modules
  // See: https://webpack.js.org/configuration/stats/#stats
  stats: {
    // Module hidden if returns true
    // i.e., Shows modules about react-bootstrap only
    excludeModules: moduleSource => !(/react-bootstrap/.test(moduleSource)),
  },
  // ref: https://www.youtube.com/watch?v=fGed9phNkto
  // It's a neat method of getting access to the original source code when debugging compiled applications
  devtool: 'cheap-module-source-map',
  // ref: https://ithelp.ithome.com.tw/articles/10184852
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    // For webpack-dev-server, put stats option in devServer
    // See: https://webpack.js.org/configuration/dev-server/#devserver-stats-
    stats: {
      excludeModules: moduleSource => !(/react-bootstrap/.test(moduleSource)),
    },
  },
};
