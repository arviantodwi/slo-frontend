module.exports = {
  useMinifyProcess: !!process.env.MINIFY,
  isProductionMode: process.env.NODE_ENV === "production",
};
