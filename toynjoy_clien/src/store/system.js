export default {
    namespaced: true,
    mutations: {
        UPDATE_LOGIN_USER(state, value) {
            state.isLogin = (value != null);
            localStorage.setItem('LoginUserToken', value);
        }
    },
    state: {
        isLogin: (localStorage.getItem('LoginUserToken') != null),
    }
}