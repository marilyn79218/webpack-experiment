const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: './dist/build.js'
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
		new ExtractTextPlugin('dist/style.css'),
		// Add <script> and <link> into template html
		new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
	],
	watch: true,
};
