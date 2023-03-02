<template>
  <el-container v-loading="other.isloading">
    <!-- 左侧菜单 -->
    <el-aside class="aside-content">
      <SideMenu class="side-menu" :menus="menus" />
    </el-aside>
    <el-container class="rigth-container">
      <!-- 头部 -->
      <el-header class="header-content">
        <div class="header-content-right">
          <!-- 头像 -->
          <el-avatar :size="30">
            {{
              computed.user.saName ? computed.user.saName[0].toUpperCase() : ""
            }}
          </el-avatar>
          <!-- 下拉菜单 -->
          <el-dropdown>
            <span class="user-name">{{ computed.user.saName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="Setting">个人设置</el-dropdown-item>
                <el-dropdown-item icon="SwitchButton" @click="logout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 面包屑导航 -->
      <!-- <el-breadcrumb class="breadcrumb-navigation" separator=">">
        <el-breadcrumb-item v-for="cr in currentRoute">
          {{ cr.meta.title }}
        </el-breadcrumb-item>
      </el-breadcrumb> -->
      <!-- 内容 -->
      <el-main class="main-content">
        <RouterView />
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </el-container>
</template>

<script>
import { reactive, computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SideMenu from "@/components/Menu/SideMenu.vue";
import { ElMessageBox } from "element-plus";

export default {
  name: "BasicLayout",
  components: {
    SideMenu,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    // 数据绑定
    const data = reactive({
      // 通过路由获取导航数据
      menus: router.getRoutes().find((item) => item.name === "root").children,
      // 获取当前路由地址
      currentRoute: router.currentRoute.value.matched.filter(
        (item) => !!item.meta.title
      ),
      // 计算属性
      computed: {
        user: computed(() => store.state.user.loginUser),
      },
      other: {
        isloading: true
      }
    });

    // 事件回调
    const eventCallbacks = {
      // 侧边菜单折叠
      chnageSideMenu: () => {
        store.commit("system/CHANGE_SIDE_MENU_COLLAPSE");
      },
      // 登出
      logout: () => {
        ElMessageBox.confirm("确定要注销吗？", "信息", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/logout");
          router.push("/login");
        });
      },
    };

    onMounted(() => {
      // 刷新当前用户数据
      store.dispatch("user/renovate_user");
      data.other.isloading = false;
    });

    return {
      ...data,
      ...eventCallbacks,
    };
  },
};
</script>

<style scoped>
/* 左侧菜单 */
.aside-content {
  width: auto;
  z-index: 10;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  user-select: none;
}

.side-menu {
  height: 100%;
  min-height: 100vh;
}

.side-menu:not(.el-menu--collapse) {
  width: 260px;
}

/* 右侧 */
.rigth-container {
  height: 100vh;
  background-color: #f0f2f5;
}

/* 顶部 */
.header-content {
  /* elementplus 的 el-header 默认有 padding */
  padding: 0;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  user-select: none;
}

.header-content-right {
  position: absolute;
  right: 0;
  height: 100%;
  padding: 0 20px;
  /* 垂直居中 */
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.user-name {
  padding-left: 10px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
    "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  cursor: pointer;
}

.breadcrumb-navigation {
  background-color: #fff;
  padding: 20px;
  user-select: none;
  white-space: nowrap;
}

/* 路由 */
.main-content {
  width: 100%;
}
</style>
