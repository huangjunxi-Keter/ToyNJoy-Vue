import { createStore } from "vuex";

import user from "./modules/user";
import system from "./modules/system";
import product from "./modules/product";

export default createStore({
  state: {},
  actions: {},
  mutations: {},
  modules: { user, system, product },
});
