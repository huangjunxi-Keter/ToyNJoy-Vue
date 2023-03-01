export default {
  namespaced: true,
  actions: {},
  mutations: {
    CHANGE_SIDE_MENU_COLLAPSE: (state) => {
      state.SideMenu.isCollapse = !state.SideMenu.isCollapse;
    },
  },
  state: {
    SideMenu: {
      isCollapse: false,
    },
  },
};
