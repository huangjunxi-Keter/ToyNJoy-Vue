import axios from 'axios';

export const mixin = {
    methods: {
        //#region 封装 axios get 方法
        axiosGet({ url, params, success }) {
            let request = axios({
                method: 'get',
                url: `http://localhost:8080/${url}`,
                params
            });
            request.then(response => success(response))
            request.catch(error => {
                console.log(error);
            });
        },
        //#endregion
        //#region 封装 axios post 方法
        axiosPost(url, data) {
            let result = axios({
                method: 'post',
                url: `http://localhost:8080/${url}`,
                data
            });
            return result;
        },
        //#endregion
        //#region 获取图片
        getImage(name) {
            return `http://localhost:8080/System/file/image?name=${name}`
        }
        //#endregion
    },
    computed: {
        isLogin() {
            return localStorage.getItem('LoginUser');
        }
    }
}