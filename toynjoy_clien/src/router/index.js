import VueRouter from "vue-router";

//#region 组件
import Home from '../pages/Home';
//#endregion

export default new VueRouter({
    routes: [
        {
            path: '/Home',
            component: Home
        }
    ]
});