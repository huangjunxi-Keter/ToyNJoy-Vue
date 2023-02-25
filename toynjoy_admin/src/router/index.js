import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
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
      children: [
        // 一级菜单：商品
        {
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
              name: "list",
              path: "list",
              component: () => import("@/views/product/ProductList"),
              meta: {
                icon: "List",
                title: "商品列表",
              },
            },
          ],
        },
      ],
    },
  ],
});
