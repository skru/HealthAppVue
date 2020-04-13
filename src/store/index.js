import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth_token: "",
    username: "",
    conditions_data: []
  },
  
  mutations: {
    setAuthToken: (state, payload) => {
      state.auth_token = payload
    },
    setUsername: (state, payload) => {
      state.username = payload
    },
    setConditionsData: (state, payload) => {
      state.conditions_data = payload
    }
  },
  getters: {
    getAuthToken: state => {
      return state.auth_token;
    },
    getUsername: state => {
      return state.username;
    },
    getConditionsData: state => {
      return state.conditions_data;
    }
  }
});
