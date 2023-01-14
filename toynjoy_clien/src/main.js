import Vue from 'vue'
import router from './router';
import { mixin } from './mixin'
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.vue'

Vue.config.productionTip = false

// mixin 全局配置
Vue.mixin(mixin);

Vue.use(VueRouter);

new Vue({
  render: h => h(App),
  router,
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
  }
}).$mount('#app')
