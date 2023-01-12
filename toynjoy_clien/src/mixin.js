import axios from 'axios';

export const mixin = {
    methods: {
        axiosGet(url, params) {
            let result = axios({
                method: 'get',
                url: `http://localhost:8080/${url}`,
                params
            });
            return result;
        },
        axiosPost(url, data) {
            let result = axios({
                method: 'post',
                url: `http://localhost:8080/${url}`,
                data
            });
            return result;
        },
        getImage(name) {
            return `http://localhost:8080/System/file/image?name=${name}`
        }
    },
    computed: {
        isLogin() {
            return localStorage.getItem('LoginUser');
        }
    }
}