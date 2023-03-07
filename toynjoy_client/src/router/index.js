import VueRouter from "vue-router";

//#region 组件
import Home from "@/pages/Home";
import Product_Info from "@/pages/Product_Info";
import Login from "@/pages/Login";
import UserInfo from "@/pages/User_Info";
import Store from "@/pages/Store";
import Register from "@/pages/Register";
import WishList from "@/pages/Wish_List";
import ShoppingCart from "@/pages/Shopping_Cart";
import PayCallback from "@/pages/Pay_Callback";
import Library from "@/pages/Library";
import News from "@/pages/News";
import NewsContent from "@/pages/NewsContent";
//#endregion

export default new VueRouter({
  routes: [
    {
      path: "/",
      // hidden: true,
      redirect: "home",
    },
    {
      name: "home",
      path: "/Home",
      component: Home,
      meta: {
        title: "首页",
      },
    },
    {
      name: "product",
      path: "/Product/:id",
      component: Product_Info,
      meta: {
        title: "商品详情",
      },
      props({ query, params }) {
        return { ...query, ...params };
      },
    },
    {
      name: "login",
      path: "/Login",
      component: Login,
      meta: {
        title: "登录",
      },
    },
    {
      name: "register",
      path: "/Register",
      component: Register,
      meta: {
        title: "注册",
      },
    },
    {
      name: "userInfo",
      path: "/UserInfo",
      component: UserInfo,
      meta: {
        title: "个人中心",
      },
    },
    {
      name: "store",
      path: "/Store",
      component: Store,
      meta: {
        title: "商店",
      },
    },
    {
      name: "library",
      path: "/Library",
      component: Library,
      meta: {
        title: "库",
      },
    },
    {
      name: "wishlist",
      path: "/WishList",
      component: WishList,
      meta: {
        title: "愿望单",
      },
    },
    {
      name: "shoppingCart",
      path: "/ShoppingCart",
      component: ShoppingCart,
      meta: {
        title: "购物车",
      },
    },
    {
      name: "payCallback",
      path: "/PayCallback",
      component: PayCallback,
      meta: {
        title: "支付回调",
      },
      props({ query, params }) {
        return { ...query, ...params };
      },
    },
    {
      name: "news",
      path: "/News",
      component: News,
      mate: {
        title: "新闻",
      },
      props({ query, params }) {
        return { ...query, ...params };
      },
    },
    {
      name: "newsContent",
      path: "/News/Content",
      component: NewsContent,
      mate: {
        title: "新闻内容",
      },
      props({ query, params }) {
        return { ...query, ...params };
      },
    },
  ],
});
