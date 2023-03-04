import { createRouter, createWebHashHistory } from "vue-router";

const userRoute = {
  name: "user",
  path: "user",
  component: () => import("@/layouts/BasicLayout"),
  meta: {
    icon: "User",
    title: "用户相关",
  },
  children: [
    {
      name: "userList",
      path: "list",
      component: () => import("@/views/user/UserList"),
      meta: {
        icon: "List",
        title: "用户列表",
      },
    },
    {
      name: "userTypeList",
      path: "type/list",
      component: () => import("@/views/user/UserTypeList"),
      meta: {
        icon: "List",
        title: "用户类型",
      },
    },
  ],
};
const productRoute = {
  name: "product",
  path: "product",
  component: () => import("@/layouts/BasicLayout"),
  meta: {
    icon: "Goods",
    title: "商品相关",
  },
  children: [
    // 二级菜单
    {
      name: "productList",
      path: "list",
      component: () => import("@/views/product/ProductList"),
      meta: {
        icon: "List",
        title: "商品列表",
      },
    },
    {
      name: "productTypeList",
      path: "type/list",
      component: () => import("@/views/product/ProductTypeList"),
      meta: {
        icon: "List",
        title: "商品类型",
      },
    },
  ],
};
const orderRoute = {
  name: "order",
  path: "order",
  component: () => import("@/layouts/BasicLayout"),
  meta: {
    icon: "CreditCard",
    title: "订单相关",
  },
  children: [
    {
      name: "orderList",
      path: "list",
      component: () => import("@/views/order/OrderList"),
      meta: {
        icon: "List",
        title: "订单列表",
      },
    },
  ],
};
const newsRoute = {
  name: "news",
  path: "news",
  component: () => import("@/layouts/BasicLayout"),
  meta: {
    icon: "MessageBox",
    title: "订单相关",
  },
  children: [
    {
      name: "newsList",
      path: "list",
      component: () => import("@/views/news/NewsList"),
      meta: {
        icon: "List",
        title: "新闻列表",
      },
    },
  ],
};

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    // 登录
    {
      name: "login",
      path: "/login",
      component: () => import("@/views/user/Login"),
      meta: {
        title: "登录",
      },
    },
    // 根菜单
    {
      name: "root",
      path: "/",
      redirect: "/product/list",
      children: [userRoute, productRoute, orderRoute, newsRoute],
    },
  ],
});
