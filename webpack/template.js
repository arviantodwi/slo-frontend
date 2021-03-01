const env = require("./env");
const path = require("path");
const isPlainObject = require("lodash/isPlainObject");

const defaultOptions = {
  template: path.resolve(__dirname, "../src/app.template.html"),
  filename: "index.html",
  content: "Index/index.html",
  inject: "body",
  chunks: ["app"],
  minify: {
    sortAttributes: true,
    sortClassName: true,
    collapseWhitespace: env.useMinifyProcess,
  },
  templateParameters: (compilation, assets, assetTags, options) => ({
    compilation,
    webpackConfig: compilation.options,
    htmlWebpackPlugin: {
      tags: assetTags,
      files: assets,
      options,
    },
  }),
};

const pushEntries = (entries) => {
  if (!Array.isArray(entries) && typeof entries !== "string") {
    throw new Error(
      "Additional entries to be included must be either an array or a string."
    );
  }
  const newChunks = [...defaultOptions.chunks, entries];
  defaultOptions.chunks = newChunks;
};

// const makeHwpOption = (contentFilePath, entries = [], optionToMerge = {}) => {
//   return Object.assign({}, defaultOptions, optionToMerge);
// };

module.exports = (filePath, options) => {
  try {
    if (typeof filePath !== "string") {
      throw -1;
    }
    if (!isPlainObject(options)) {
      throw -2;
    }
  } catch (code) {
    if (code === -1) {
      console.error("Value of `filePath` argument must be a string.");
    } else if (code === -2) {
      console.error("Template options must be a plain object type.");
    }
    process.exit(-1);
  }

  const _options = Object.assign({}, options);
  const _default = Object.assign({}, defaultOptions);
  if ("includeEntries" in _options) {
    try {
      pushEntries(_options.includeEntries);
      delete _options.includeEntries;
    } catch (e) {
      console.error(e);
      process.exit(-1);
    }
  }

  _default.content = filePath;
  _default.filename = filePath
    .split("/")
    .pop()
    .replace(/(\..+)$/i, ".html");

  return Object.assign({}, _default, _options);
};
