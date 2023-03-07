export default {
    namespaced: true,
    mutations: {
        UPDATE_USER_DATA(state, value) {
            state.userData = value
        },
        UPDATE_USER_INFO(state, value) {
            if (value && value.birthday)
                value.birthday = value.birthday.substring(0, 10);
            state.userInfo = value
        }
    },
    state: {
        userData: {},
        userInfo: {}
    }
}