const env = require("./env");
const common = require("./config.common");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlBeautifyPlugin = require("@nurminen/html-beautify-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
  mode: "production",

  devtool: "eval-source-map",

  output: {
    filename: "[name].[fullhash:20].js",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({}),
    ],
  },
});

if (!env.useMinifyProcess) {
  module.exports.plugins.push(
    new HtmlBeautifyPlugin({
      config: {
        html: {
          indent_size: 2,
          indent_char: " ",
          indent_with_tabs: false,
          end_with_newline: false,
          preserve_newlines: true,
        },
      },
    })
  );
}
