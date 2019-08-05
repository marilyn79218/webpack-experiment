const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    syncJs: './src/sync.js',
    asyncJs01: './src/async01.js',
    asyncJs02: './src/async02.js',
    deferJs: './src/defer.js',
    preloadJs: './src/preload.js',
    vendor: [
      'ramda',
      'moment'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/js/[name].js',

    /*
     * When Webpack is bundling your project, it'll resolve assets pathname with publicPath ('RRR/').
     *
     * For example, In bundled index.html:
     * You originally have links: href="static/css/style.css" or src="static/js/[name].[hash].js"
     * Then you got href="RRR/static/css/style.css" or src="RRR/static/js/[name].[hash].js" in bundled index.html, respectively.
     *
    */
    // Using `yarn build` to observe index.html with this property.
    // Ref: https://www.evernote.com/shard/s353/nl/157489688/686a11e9-2257-441c-b5a5-9797d5714fec/
    // publicPath: 'RRR/',
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
      // These chunks are put into html manually
      excludeChunks: ['syncJs', 'asyncJs01', 'asyncJs02'],
    }),
    new ScriptExtHtmlWebpackPlugin({
      // Result: sync/ defer scripts (i.e., preloadJs & deferJs) are ensuered to execute before DCL, but async script is not.
      // Result: If we remove deferJs, DCL evevnt will be triggered immediately when DOM parsed, i.e., when syncJs are execute finished
      defer: 'deferJs',
      preload: 'preloadJs',
    }),
    // ref: https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'allAssets',
      fileWhitelist: [/\.jpe?g/],
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
