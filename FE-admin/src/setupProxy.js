const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://144.24.91.7:8080",
      changeOrigin: true,
    })
  );
};
