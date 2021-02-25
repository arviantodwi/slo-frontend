const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { js, staticImage, htmlImageSource, css } = require("./rules");

const MINIFY_HTML = false;

const isProductionMode = process.env.NODE_ENV === "production";

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

const makeHwpOption = (templateFilePath, entries = [], optionToMerge = {}) => {
  const defaultOption = {
    template: path.join(srcDir, templateFilePath),
    filename: templateFilePath.split("/").pop(),
    inject: "body",
    chunks: ["app", ...entries],
    minify: MINIFY_HTML,
  };

  return Object.assign({}, defaultOption, optionToMerge);
};

module.exports = {
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: isProductionMode ? "browserslist" : "web",

  output: {
    path: path.join(rootDir, "dist"),
    // publicPath: "/",
  },

  entry: {
    app: path.join(srcDir, "app.js"),
    index: path.join(viewsDir, "Index/index.js"),
    // Add other script entries like the one below:
    // about: path.join(viewsDir, 'path/to/about.js'),
  },

  module: {
    rules: [js, css(), staticImage, partialTemplates],
  },

  plugins: [
    new HtmlWebpackPlugin(makeHwpOption("views/Index/index.html", ["index"])),
    // Add other HtmlWebpackPlugin view instances like the one below:
    // new HtmlWebpackPlugin(makeHwpOption("path/to/about.html", ["about"], {title: 'My About Page'})),
  ],
};
