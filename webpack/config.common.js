const path = require("path");
const env = require("./env");
const rules = require("./rules");
const webpack = require("webpack");
const template = require("./template");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

module.exports = {
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: env.isProductionMode ? "browserslist" : "web",

  output: {
    path: path.join(rootDir, "dist"),
  },

  entry: {
    app: path.join(srcDir, "app.js"),
    index: path.join(viewsDir, "Index/index.js"),
    // Add other script entries like the one below:
    explore: path.join(viewsDir, "Explore/explore.js"),
  },

  module: {
    rules,
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash",
    }),

    new HtmlWebpackPlugin(
      template("Index/index.html", {
        includeEntries: "index",
        title: "SLO v2-dev",
      })
    ),
    // Add other HtmlWebpackPlugin view instances like the one below:
    new HtmlWebpackPlugin(
      template("Explore/layout.html", {
        includeEntries: ["explore"],
        title: "Explore – SLO v2-dev",
        filename: "explore/index.html",
      })
    ),
  ],
};
