export default {
    namespaced: true,
    mutations: {
        UPDATE_USER_DATA(state, value) {
            state.userData = value
        },
        UPDATE_USER_INFO(state, value) {
            state.userInfo = value
        }
    },
    state: {
        userData: {},
        userInfo: {}
    }
}