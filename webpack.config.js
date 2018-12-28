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
    vendor: [
      'ramda',
      'moment'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].[chunkhash].js',
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
    new BundleAnalyzerPlugin(),
  ],
  watch: true,
  // ref: https://ithelp.ithome.com.tw/articles/10184852
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
  },
};
