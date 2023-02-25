const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 8001,
    proxy: {
      "/api": {
        target: "https://localhost:7046/",
        pathRewrite: { "^/api": "" }, // 重写请求路径
        ws: true, // 用于支持 websocket（默认 true）
        changeOrigin: true, // 用于控制请求头中的 host值（true：伪装成与服务器同源；false：提供真实 host。默认 true）
      },
    }
  },
});
