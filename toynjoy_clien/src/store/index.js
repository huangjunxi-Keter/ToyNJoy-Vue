import Vue from "vue";
import Vuex from 'vuex';

Vue.use(Vuex);

// 逻辑处理
const actions = {

}

// 数据处理
const mutations = {
    UPDATE_LOGIN_USER(state, value) {
        state.isLogin = (value != null);
        localStorage.setItem('LoginUserToken', value);
    }
}

// 数据（状态）
const state = {
    isLogin: (localStorage.getItem('LoginUserToken') != null),
}

export default new Vuex.Store({
    actions,
    mutations,
    state
});