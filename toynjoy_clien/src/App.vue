<template>
  <div id="app">
    <head-navigation />
    <router-view></router-view>
    <clien-footer />
  </div>
</template>

<script>
import Head_Navigation from '@/components/Head_Navigation.vue';
import Clien_Footer from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    'head-navigation': Head_Navigation,
    'clien-footer': Clien_Footer
  },
  mounted() {
    this.$bus.$on('routeGo', function (name, params) {
      // 判断，目标路由不是当前路由再跳转（重复跳转回报错）
      if (this.$route.name != name) {
        this.$router.push({ name, params });
      } else {
        this.$router.go(0)
      }
    });
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

#bodyer {
  width: 100%;
}
</style>
