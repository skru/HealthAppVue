import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth_token: "",
    is_authed: false,
    username: "",
    is_practitioner: "",
    conditions_data: [],
    //participants_data: [],
  },
  
  mutations: {
    setAuthToken: (state, payload) => {
      state.auth_token = payload
    },
    setIsAuthed: (state, payload) => {
      state.is_authed = payload
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
    // setParticipantsData: (state, payload) => {
    //   state.participants_data = payload
    // }
  },
  getters: {
    getAuthToken: state => {
      return state.auth_token;
    },
    getIsAuthed: state => {
      return state.is_authed;
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
    // getParticipantsData: state => {
    //   return state.cparticipants_data;
    // }
  }
});
