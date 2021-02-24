const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const MINIFY_HTML = false;

const isProductionMode = process.env.NODE_ENV === "production";

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

const makeHtmlWebpackPluginOption = (templateDir, htmlName, entries) => ({
  template: path.join(viewsDir, `${templateDir}/${htmlName}`),
  inject: "body",
  chunks: ["app", ...entries],
  filename: htmlName,
  minify: MINIFY_HTML,
});

const js = {
  test: /\.js$/i,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"],
  },
};

const css = {
  test: /\.css$/i,
  use: [
    isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
    {
      loader: "css-loader",
      options: { importLoaders: 1 },
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            [
              "autoprefixer",
              {
                cascade: false,
              },
            ],
          ],
        },
      },
    },
  ],
};

const scss = {
  test: /\.s[ac]ss$/i,
  use: [...css.use].concat("sass-loader"),
};

const staticImage = {
  test: /\.(svg|png|gif|jpe?g)$/i,
  loader: "file-loader",
  options: {
    outputPath: "images",
    name: "[name].[contenthash:7].[ext]",
  },
};

const htmlImageSource = {
  test: /\.html$/i,
  loader: "html-loader",
  options: {
    esModule: false,
    minimize: MINIFY_HTML,
    sources: {
      list: [
        {
          tag: "img",
          attribute: "src",
          type: "src",
        },
      ],
    },
  },
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
    // about: path.join(viewsDir, 'your_page_dir/your_js_file.js'),
  },

  module: {
    rules: [js, css, scss, staticImage, htmlImageSource],
  },

  plugins: [
    new HtmlWebpackPlugin(
      makeHtmlWebpackPluginOption("Index", "index.html", ["index"])
    ),
    // Add other HtmlWebpackPlugin view instances like the one below:
    // new HtmlWebpackPlugin(makeHtmlWebpackPluginOption("About", "about.html", ["about"])),
  ],
};
