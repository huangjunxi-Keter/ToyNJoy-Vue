import { createApp } from "vue";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
// 统一导入el-icon图标
import * as ElIconModules from "@element-plus/icons-vue";

import App from "./App.vue";

import router from "./router";
import store from "./store";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus, {
  locale: zhCn,
});
// 统一注册el-icon图标
for (let iconName in ElIconModules) {
  app.component(iconName, ElIconModules[iconName]);
}
app.mount("#app");
