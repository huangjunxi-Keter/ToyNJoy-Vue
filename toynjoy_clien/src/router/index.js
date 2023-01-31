import VueRouter from "vue-router"

//#region 组件
import Home from '@/pages/Home'
import Product_Info from '@/pages/Product_Info'
import Login from '@/pages/Login'
import UserInfo from '@/pages/User_Info'
import Store from '@/pages/Store'
import Register from '@/pages/Register'
import WishList from '@/pages/Wish_List'
import ShoppingCart from '@/pages/Shopping_Cart'
//#endregion

export default new VueRouter({
    routes: [
        {
            path: '/',
            // hidden: true,
            redirect: 'home',
        },
        {
            name: 'home',
            path: '/Home',
            component: Home,
            meta: {
                title: '首页'
            }
        },
        {
            name: 'product',
            path: '/Product/:id',
            component: Product_Info,
            meta: {
                title: '商品详情'
            },
            props({query, params}) {
                return { ...query, ...params }
            }
        },
        {
            name: 'login',
            path: '/Login',
            component: Login,
            meta: {
                title: '登录'
            }
        },
        {
            name: 'register',
            path: '/Register',
            component: Register,
            meta: {
                title: '注册'
            }
        },
        {
            name: 'userInfo',
            path: '/UserInfo',
            component: UserInfo,
            meta: {
                title: '个人中心'
            }
        },
        {
            name: 'store',
            path: '/Store',
            component: Store,
            meta: {
                title: '商店'
            }
        },
        {
            name: 'wishlist',
            path: '/WishList',
            component: WishList,
            meta: {
                title: '愿望单'
            }
        },
        {
            name: 'shoppingCart',
            path: '/ShoppingCart',
            component: ShoppingCart,
            meta: {
                title: '购物车'
            }
        },
    ]
});