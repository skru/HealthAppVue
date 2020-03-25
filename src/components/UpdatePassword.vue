<template>
  <div class="container">
    <h2 class="text-center">Update Password</h2>
    <div id="auth-container" class="row">
      <div class="col-sm-6 offset-sm-3 text-left">
        <div class="alert alert-danger" v-if="errors.non_field_errors">
            {{ errors.non_field_errors[0] }}
        </div>
        <div class="form-group">
          <label for="current_password">Current Password</label>
            <input v-model="current_password" type="password" class="form-control" id="current_password" required>
            <div class="invalid-feedback" v-if="errors.current_password != null">
                {{ errors.current_password[0]}}
            </div>
        </div>
        <div class="form-group">
          <label for="new_password">New Password</label>
            <input v-model="new_password" type="password" class="form-control" id="new_password" required>
            <div class="invalid-feedback" v-if="errors.new_password != null">
                {{ errors.new_password[0]}}
            </div>
        </div>
        <button v-on:click="updatePassword" class="btn btn-block btn-primary">Update Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');
// const $ = window.jQuery;
export default {
  data() {
    return {
      current_password: "",
      new_password: "",
      errors: "",
    }
  },
  methods: {
    updatePassword(data) {
      let self = this;
      // const credentials = {
      //   current_password: self.current_password,
      //   new_password: self.new_password,
      //   //re_new_password: self.re_new_password,
      //   //"Authorisation": "Token " + this.$store.getters.getAuthToken
      // };

      // axios
      //     .post(SETTINGS.http + SETTINGS.domain + "/api/auth/users/set_password/", credentials)
      //     .then(function (response) {
      //       // self.$store.commit('setAuthToken', response.data.auth_token)
      //       // self.$router.push("/chat");
      //       alert("success");
      //     })
      //     .catch(function (error) {
      //       if (error.response) {
      //         // The request was made and the server responded with a status code
      //         // that falls out of the range of 2xx
      //         console.log(error.response.data);
      //         console.log(error.response.status);
      //         console.log(error.response.headers);
      //       } else if (error.request) {
      //         // The request was made but no response was received
      //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      //         // http.ClientRequest in node.js
      //         console.log(error.request);
      //       } else {
      //         // Something happened in setting up the request that triggered an Error
      //         console.log('Error', error.message);
      //       }
      //       console.log(error.config);
      //     });

      axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/users/set_password/", self.$data)
          .then(function (response) {
            alert("success");
          })
          .catch(function (error) {
            if (error.response) {
              console.log(error.request.response)
              console.log(error.response.data);
              if (error.response.data){
                self.$data.errors = error.response.data
              }
            } 
          });

    }
  }
};
</script>


