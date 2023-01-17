import Vue from 'vue';
import VueRouter from 'vue-router';

import VueParticles from 'vue-particles';

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

import { mixin } from './mixin';
import router from './router';
import store from './store';

import App from './App.vue';

Vue.config.productionTip = false;

// mixin 全局配置
Vue.mixin(mixin);

Vue.use(VueRouter);
// 粒子特效
Vue.use(VueParticles);

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; //全局事件总线
  }
}).$mount('#app');
