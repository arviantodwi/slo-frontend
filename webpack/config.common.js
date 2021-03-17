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
    // Main app entry
    app: path.join(srcDir, "app.js"),

    // Add shared components below. Only for dependencies.
    swiper: "swiper",
    "dom-purify": "dompurify",
    "progress-bar": "progressbar.js",

    // Page entries. Add other page entries below.
    index: {
      import: path.join(viewsDir, "Index/index.js"),
      dependOn: ["dom-purify", "swiper", "progress-bar"],
    },
    explore: {
      import: path.join(viewsDir, "Explore/explore.js"),
      dependOn: ["dom-purify"],
    },
    contentDetail: {
      import: path.join(viewsDir, "ContentDetail/contentDetail.js"),
      dependOn: ["swiper"],
    },
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
        includeEntries: ["dom-purify", "swiper", "progress-bar", "index"],
        title: "SLO v2-dev",
      })
    ),
    // Add other HtmlWebpackPlugin view instances like the one below:
    new HtmlWebpackPlugin(
      template("Explore/layout.html", {
        includeEntries: ["dom-purify", "explore"],
        title: "Explore – SLO v2-dev",
        filename: "explore/index.html",
      })
    ),
    new HtmlWebpackPlugin(
      template("ContentDetail/layout.html", {
        includeEntries: ["swiper", "contentDetail"],
        title: "Sample Demo Course – SLO v2-dev",
        filename: "course/sample-demo-course.html",
      })
    ),
  ],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};
