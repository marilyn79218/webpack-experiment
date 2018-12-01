const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		path: './dist',
		filename: 'static/js/build.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract({
					fallback: 'style-loader', // In case extract failed
					loader: 'css!sass',
				})
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
	],
	watch: true,
};
