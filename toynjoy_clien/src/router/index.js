import VueRouter from "vue-router"

//#region 组件
import Home from '@/pages/Home'
import Product_Info from '@/pages/Product_Info'
import Login from '@/pages/Login'
import UserInfo from '@/pages/User_Info'
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
            name: 'userInfo',
            path: '/UserInfo',
            component: UserInfo,
            meta: {
                title: '个人中心'
            }
        }
    ]
});