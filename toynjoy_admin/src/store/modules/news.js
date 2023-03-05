import { cloneObj } from "@/utils/basic";

export default {
  namespaced: true,
  actions: {},
  mutations: {
    SET_EDIT_NEWS: (state, editNews) => {
      state.editNews = cloneObj(editNews);
    },
  },
  state: {
    editNews: null,
  },
};