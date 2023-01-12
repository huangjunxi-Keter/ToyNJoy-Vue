<template>
  <div>
    <Display_Board />
    <Home_News />
  </div>
</template>

<script>
import Display_Board from '@/components/Display_Board.vue';
import Home_News from '@/components/Home_News.vue';

export default {
  name: 'Home',
  components: {
    Display_Board,
    Home_News
  }
}
</script>

<style scoped>

</style>
