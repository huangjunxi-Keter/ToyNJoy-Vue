import Vue from "vue";
import Vuex from 'vuex';
import createVuexAlong from 'vuex-along'

import system from "./system";
import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createVuexAlong()],
    modules: {
        system,
        user
    }
});