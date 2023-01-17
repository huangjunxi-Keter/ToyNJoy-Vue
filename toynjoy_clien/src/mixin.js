import axios from 'axios';

//#region  配置 axios 的默认值（反正没在 main 引入，就到这里配算了）
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('LoginUserToken')}`;
//#endregion

export const mixin = {
    data() {
        return {
            serverPath: 'http://localhost:8080/'
        }
    },
    methods: {
        //#region 封装 axios 方法
        myAxios({ method, url, params, data, success }) {
            let request = axios({
                method: method ? method : 'get',
                url: this.serverPath + url,
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
            return `${this.serverPath}System/file/image?name=${name}`
        },
        //#endregion

        //#region 路由跳转
        go(routeName) {
            this.$bus.$emit('routeGo', routeName);
        },
        //#endregion
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