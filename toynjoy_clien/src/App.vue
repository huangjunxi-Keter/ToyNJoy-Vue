<template>
  <div id="app">
    <head-navigation />
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Head_Navigation from './components/Head_Navigation.vue'

export default {
  name: 'App',
  components: {
    'head-navigation': Head_Navigation
  },
  mounted() {
    this.$bus.$on('routeGo', function (routeName) {
      if (this.$route.name != routeName) {
        this.$router.push({ name: routeName });
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
