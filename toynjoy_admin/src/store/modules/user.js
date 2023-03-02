import { login, getUserData } from "@/api/user";
import { cloneObj } from '@/utils/basic'

export default {
  namespaced: true,
  actions: {
    login: async ({ commit }, params) => {
      let response = await login(params);
      if (response.data.code) {
        localStorage.setItem("AdminToken", response.headers.token);
        commit("SET_USER", response.data);
      }
      return !!response.data.code;
    },
    logout: ({ commit }) => {
      localStorage.setItem("AdminToken", "");
      commit("SET_USER", {});
    },
    renovate_user: async ({ commit }) => {
      let userData = await getUserData();
      commit("SET_USER", userData);
    },
  },
  mutations: {
    SET_USER: (state, userData) => {
      state.loginUser = userData;
    },
    SET_EDIT_USER: (state, userData) => {
      state.editUser = cloneObj(userData);
    }
  },
  state: {
    loginUser: {},
    editUser: null
  },
};
