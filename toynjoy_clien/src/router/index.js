import VueRouter from "vue-router";

//#region 组件
import Home from '../pages/Home';
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
        }
    ]
});