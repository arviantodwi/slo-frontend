const path = require("path");
const env = require("./env");
const { js, staticImage, partialTemplates, css } = require("./rules");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlBeautifyPlugin = require("@nurminen/html-beautify-webpack-plugin");

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

const makeHwpOption = (templateFilePath, entries = [], optionToMerge = {}) => {
  const defaultOption = {
    template: path.join(srcDir, templateFilePath),
    filename: templateFilePath.split("/").pop(),
    inject: "body",
    chunks: ["app", ...entries],
    minify: {
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: env.useMinifyProcess,
    },
  };

  return Object.assign({}, defaultOption, optionToMerge);
};

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
