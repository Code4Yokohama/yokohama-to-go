import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    displayType: "map",
    keyword: ""
  },
  mutations: {
    setDisplayType(state, payload) {
      state.displayType = payload;
    },
    setKeyword(state, payload) {
      state.keyword = payload;
    }
  },
  actions: {
    setDisplayType({ commit }, payload) {
      commit("setDisplayType", payload);
    },
    setKeyword({ commit }, payload) {
      commit("setKeyword", payload);
    }
  },
  modules: {}
});
