exports.js = {
  test: /\.js$/i,
  exclude: /node_modules/,
  loader: "babel-loader",
  options: {
    presets: ["@babel/preset-env"],
  },
};

exports.staticImage = {
  test: /\.(svg|png|gif|jpe?g)$/i,
  loader: "file-loader",
  options: {
    outputPath: "images",
    name: "[name].[contenthash:7].[ext]",
  },
};

// Deprecated
exports.htmlImageSource = ({ minimize }) => ({
  test: /\.html$/i,
  loader: "html-loader",
  options: {
    esModule: false,
    minimize,
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
});

exports.css = () => {
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const isProductionMode = process.env.NODE_ENV === "production";

  return {
    test: /\.s?[ac]ss$/i,
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
      "sass-loader",
    ],
  };
};
