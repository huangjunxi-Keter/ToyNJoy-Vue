<template>
  <el-menu active-text-color="#ffffff" background-color="#001529" text-color="#ffffffA6" default-active="2"
    :collapse="computeds.isCollapse" router>
    <div class="logo">游戏商城管理系统</div>
    <template v-for="menu in menus">
      <!-- 组 -->
      <el-sub-menu :index="`/${menu.path}`" v-if="menu.children.length > 1">
        <!-- 标题 -->
        <template #title>
          <component class="icon" :is="menu.meta.icon"></component>
          <span>{{ menu.meta.title }}</span>
        </template>
        <!-- 按钮 -->
        <el-menu-item v-for="children in menu.children" :index="`/${menu.path}/${children.path}`">
          <component class="icon" :is="children.meta.icon"></component>
          <template #title>{{ children.meta.title }}</template>
        </el-menu-item>
      </el-sub-menu>

      <!-- 按钮 -->
      <el-menu-item v-else :index="`/${menu.path}/${menu.children[0].path}`">
        <component class="icon" :is="menu.meta.icon"></component>
        <template #title>{{ menu.children[0].meta.title }}</template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { reactive, computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "SideMenu",
  props: ["menus"],
  setup() {
    const store = useStore();

    // 数据绑定
    const data = reactive({
      computeds: {
        isCollapse: computed(() => store.state.system.SideMenu.isCollapse)
      }
    });

    // 
    const eventCallbacks = {

    };

    return { ...data, ...eventCallbacks };
  },
};
</script>

<style scoped>
.logo {
  width: 100%;
  height: 60px;
  line-height: 60px;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.icon {
  height: 1.3em;
  width: 1.3em;
  margin-right: 0.8em;
}
</style>
