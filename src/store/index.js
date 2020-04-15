import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth_token: "",
    username: "",
    is_practitioner: false,
    conditions_data: []
  },
  
  mutations: {
    setAuthToken: (state, payload) => {
      state.auth_token = payload
    },
    setUsername: (state, payload) => {
      state.username = payload
    },
    setIsPractitioner: (state, payload) => {
      state.is_practitioner = payload
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
    getIsPractitioner: state => {
      return state.is_practitioner;
    },
    getConditionsData: state => {
      return state.conditions_data;
    }
  }
});
