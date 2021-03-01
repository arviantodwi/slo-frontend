const env = require("./env");
const imagesFilename = "images/[name].[contenthash:7][ext]";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const rules = {};

rules.js = {
  test: /\.js$/i,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"],
  },
};

rules.staticImage = {
  test: /\.(png|gif|jpe?g)$/i,
  type: "asset/resource",
  generator: {
    filename: imagesFilename,
  },
};

rules.svg = {
  test: /\.svg$/,
  oneOf: [
    {
      resourceQuery: /inline/,
      type: "asset/source",
    },
    {
      // Default rule to export svg file if `?inline` query not found
      // i.e. when we use svg as an image source.
      type: "asset/resource",
      generator: {
        filename: imagesFilename,
      },
    },
  ],
};

rules.css = {
  test: /\.s?[ac]ss$/i,
  use: [
    env.isProductionMode ? MiniCssExtractPlugin.loader : "style-loader",
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
    "sass-loader",
  ],
};

rules.partialTemplates = {
  test: /\.(ejs|html)$/i,
  exclude: /app\.template\.html$/i,
  use: [
    {
      loader: "ejs-loader",
      options: {
        variable: "",
        esModule: false,
      },
    },
  ],
};

module.exports = Object.entries(rules).map(([_, rule]) => rule);
