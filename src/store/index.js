import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth_token: ""
  },
  
  mutations: {
    setAuthToken: (state, payload) => {
      state.auth_token = payload
    }
  },
  getters: {
    getAuthToken: state => {
      return state.auth_token;
    }
  }
  //modules: {}
});
