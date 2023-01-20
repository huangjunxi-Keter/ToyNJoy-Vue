import Vue from "vue";
import Vuex from 'vuex';

import system from "./system";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        system,
        user
    }
});