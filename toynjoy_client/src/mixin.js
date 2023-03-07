import axios from 'axios';
import { mapMutations } from 'vuex';

//#region  配置 axios 的默认值（反正没在 main 引入，就到这里配算了）【不能写在这里，开始是null会一直是null】
// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('LoginUserToken')}`;
//#endregion

export const mixin = {
    data() {
        return {
            requestAddress: 'http://localhost:8000/',
            serverAddress: 'https://localhost:7046/',
            emailRegEx: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
            idCardRegEx: /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/,
            phoneNumberRegEx: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
        }
    },
    methods: {
        ...mapMutations('system', ['UPDATE_LOGIN_STATE']),
        //#region 封装 axios 方法
        myAxios({ method, url, params, data, success, headers }) {
            let request = axios({
                headers,
                method: method ? method : 'get',
                url: this.requestAddress + url,
                params,
                data
            });
            request.then(response => success(response))
            request.catch(error => {
                console.log(error);
                if (error.response.status == 401) {
                    this.UPDATE_LOGIN_STATE(null);
                }
            });
        },
        //#endregion

        //#region 获取图片
        getImage(name) {
            return `${this.requestAddress}System/file/image?name=${name}`
        },
        //#endregion

        //#region 路由跳转
        go(routeName, data) {
            this.$bus.$emit('routeGo', routeName, data);
        },
        //#endregion

        //#region 邮箱验证
        isEmail(strEmail) {
            return (strEmail.search(this.emailRegEx) != -1);
        },
        //#endregion

        //#region 身份证验证
        isIdCard(strIdCard) {
            return (strIdCard.search(this.idCardRegEx) != -1);
        },
        //#endregion
    
        //#region 手机号验证
        isPhoneNumber(strphoneNumber) {
            return (strphoneNumber.search(this.phoneNumberRegEx) != -1);
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