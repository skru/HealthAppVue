<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> | 
      <router-link to="/conditions">Conditions</router-link> | 
      <router-link to="/chat">Chat</router-link> |
      <span v-if="!isAuthed">
        <router-link to="/auth">Login</router-link>
      </span>
      <span v-else>
        <router-link to="/password">Update Password</router-link> | 
        <router-link to="/logout">Logout</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');

export default {

  data() {
    return {
      isAuthed: this.$store.getters.getAuthToken,
    };
  },

  updated() {
      this.isAuthed = this.$store.getters.getAuthToken;
  },

  created () {
    let self = this;
    axios
      .get(SETTINGS.http + SETTINGS.domain + "/api/conditions/", self.$data)
      .then(function (response) {
        self.$store.commit('setConditionsData', response.data)
      })
      // .catch(function (error) {

      // });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  margin-bottom: 50px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
