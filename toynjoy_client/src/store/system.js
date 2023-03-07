export default {
    namespaced: true,
    mutations: {
        UPDATE_LOGIN_STATE(state, value) {
            state.isLogin = (value != null && value != '');
            localStorage.setItem('LoginUserToken', value);
        },
        SET_ISLOADING(state, value) {
            state.isLoading = value;
        }
    },
    state: {
        isLogin: (localStorage.getItem('LoginUserToken') != null && localStorage.getItem('LoginUserToken') != ''),
        isLoading: false
    }
}