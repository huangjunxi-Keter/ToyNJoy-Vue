import Vue from 'vue'
import router from './router';

Vue.config.productionTip = false

// mixin 全局配置
import { mixin } from './mixin'
Vue.mixin(mixin);

import App from './App.vue'

import VueRouter from 'vue-router';
Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
  }
}).$mount('#app')
