import axios from 'axios';

export const mixin = {
    methods: {
        //#region 封装 axios 方法
        myAxios({ method, url, params, data, success }) {
            let request = axios({
                method: method ? method : 'get',
                url: `http://localhost:8080/${url}`,
                params,
                data
            });
            request.then(response => success(response))
            request.catch(error => {
                console.log(error);
            });
        },
        //#endregion

        //#region 获取图片
        getImage(name) {
            return `http://localhost:8080/System/file/image?name=${name}`
        },
        //#endregion

        //#region 路由跳转
        go(routeName) {
            this.$bus.$emit('routeGo', routeName);
        },
        //#endregion
    },
    computed: {
        isLogin() {
            return localStorage.getItem('LoginUserToken');
        }
    },
    filters: {
        timeformater(dateStr) {
            if (dateStr) {
                dateStr = dateStr.split('T')[0];
                let dateArr = dateStr.split('-');
                dateStr = `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
            }
            return dateStr;
        }
    },
}