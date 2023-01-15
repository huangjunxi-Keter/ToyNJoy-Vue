import VueRouter from "vue-router";

//#region 组件
import Home from '../pages/Home';
import Product_Info from '../pages/Product_Info'
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
                return { ...query, ...params };
            }
        },
    ]
});