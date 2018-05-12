/* eslint import/no-extraneous-dependencies: "off" */

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const library = 'cspaceUIPluginExtUCBNHCollectionObject';
const isProduction = process.env.NODE_ENV === 'production';
const filename = `${library}${isProduction ? '.min' : ''}.js`;

const config = {
  entry: './src/index.js',
  output: {
    filename,
    library,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[folder]-[name]--[local]',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      [`${library}.packageName`]: JSON.stringify(process.env.npm_package_name),
      [`${library}.packageVersion`]: JSON.stringify(process.env.npm_package_version),
    }),
    // Replace react-intl with a stub. For messages to be extracted by babel-plugin-react-intl,
    // react-intl must be imported, and the defineMessages marker function must be called. This
    // would cause the entire react-intl package to be bundled with this package, needlessly
    // increasing its size.
    new webpack.NormalModuleReplacementPlugin(
      /^react-intl$/,
      path.resolve(__dirname, 'react-intl-stub.js')
    ),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    contentBase: __dirname,
    historyApiFallback: true,
    inline: true,
  },
};

if (isProduction) {
  config.plugins.push(new UglifyJsPlugin());
}

module.exports = config;
