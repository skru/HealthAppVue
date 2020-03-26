<template>
  <div class="container">
    <h2 class="text-center">Account</h2>
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li class="nav-item">
            <a
              class="nav-link active"
              id="signup-tab"
              data-toggle="tab"
              href="#signup"
              role="tab"
              aria-controls="signup"
              aria-selected="true"
            >
              Sign Up
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              id="signin-tab"
              data-toggle="tab"
              href="#signin"
              role="tab"
              aria-controls="signin"
              aria-selected="false"
            >
              Sign In
            </a>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div
            class="tab-pane fade show active"
            id="signup"
            role="tabpanel"
            aria-labelledby="signin-tab"
          >
            <form class="text-left" @submit.prevent="signUp">
               <div class="alert alert-danger" v-if="errors.non_field_errors">
                  {{ errors.non_field_errors[0] }}
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                  <input v-model="email" type="email" class="form-control" id="email" placeholder="e.g. johnsemail@email.com" required>
                  <div class="alert alert-danger" v-if="errors.emails != null">
                      {{ errors.email[0]}}
                  </div>
              </div>
              <div class="form-group">
                <label for="username">username</label>
                  <input v-model="username" type="text" class="form-control" id="username" placeholder="e.g. John" required>
                  <div class="alert alert-danger" v-if="errors.username != null">
                      {{ errors.username[0] }}
                  </div>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" required>
                  <small id="passwordHelpBlock" class="form-text text-muted">
                    Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                  </small>
                  <div class="alert alert-danger" v-if="errors.password != null">
                      {{ errors.password[0] }}
                  </div>
              </div>
              <button type="submit" class="btn btn-block btn-primary">
                Sign up
              </button>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="signin"
            role="tabpanel"
            aria-labelledby="signin-tab"
          >
            <form class="text-left" @submit.prevent="signIn">
              <div class="alert alert-danger" v-if="errors.non_field_errors">
                  {{ errors.non_field_errors[0] }}
              </div>
              <div class="form-group">
                <label for="username">Username</label>
                  <input v-model="username" type="text" class="form-control" id="username" placeholder="e.g. John" required>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                  <input v-model="password" type="password" class="form-control" id="password" placeholder="Password" required>
              </div>
              <button type="submit" class="btn btn-block btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');
// const $ = window.jQuery // JQuery
// //axios.defaults.xsrfCookieName = 'csrftoken'
// //axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
// $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
//   e.target // newly activated tab
//   e.relatedTarget // previous active tab
//   console.log("TAB")
// })
export default {

  data() {
    return {
      email: "",
      username: "",
      password: "",
      errors: "",
    };
  },
  methods: {
    signUp() {
      let self = this;
      axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/users/", self.$data)
          .then(function (response) {
            self.$toasted.success('Account created')
            self.signIn();
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.data){
                self.$data.errors = error.response.data
              }
            } 
          });

    },
    signIn() {
      let self = this;
      const credentials = { username: this.username, password: this.password};
      axios
        .post(SETTINGS.http + SETTINGS.domain + "/api/auth/token/login/", credentials)
        .then(function (response) {
          axios.defaults.headers.common['Authorization'] = "Token " + response.data.auth_token; //set auth header
          self.$store.commit('setAuthToken', response.data.auth_token)
          self.$router.push("/chat");
          self.$toasted.success('Successfully signed in')
        })
        .catch(function (error) {
          if (error.response) {
            self.$data.errors = error.response.data
          } 
        });
    }
  }
};
</script>