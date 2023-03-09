<template>
  <div id="app">
    <head-navigation />
    <router-view></router-view>
    <clien-footer />
    <toolbar />
  </div>
</template>

<script>
import Head_Navigation from '@/components/Basic/Head_Navigation.vue';
import Clien_Footer from '@/components/Basic/Footer.vue';
import Toolbar from '@/components/Tool/Toolbar.vue';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'App',
  components: {
    'head-navigation': Head_Navigation,
    'clien-footer': Clien_Footer,
    'toolbar': Toolbar
  },
  computed: {
    ...mapState('user', ['userData']),
    ...mapState('system', ['isLogin', 'isLoading'])
  },
  methods: {
    ...mapMutations('user', ['UPDATE_USER_DATA'])
  },
  mounted() {
    // 如果本地有token，获取一下用户信息
    if (this.isLogin) {
      //#region 获取用户信息
      this.myAxios({
        url: `User/get`,
        params: { id: this.id },
        success: (response) => {
          this.UPDATE_USER_DATA(response.data);
        }
      });
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
}

body {
  background-color: #f5f5f5 !important;
}

.bodyer {
  margin: 5vw auto 0 auto;
  padding: 5vw auto 0 auto;
  min-width: 1300px;
  min-height: calc(100vh - 5vw - 195px);
}

.btn:focus,
.btn:active:focus,
.btn.active:focus,
.btn.focus,
.btn:active.focus,
.btn.active.focus {
  outline: none;
  box-shadow: none;
}

input:focus {
  border: 1px solid #ced4da !important;
  box-shadow: none !important;
}

.alert {
  position: absolute;
  top: 6vw;
}
</style>
