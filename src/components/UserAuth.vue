<template>
  <div>
    <p class="lead">
      Sign in using your credentials or sign up to create an account
    </p>
    <hr><br>

    <div class="card">
      <div class="card-body">
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
              <br>
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
                <label for="username">Username</label>
                  <input v-model="username" type="text" class="form-control" id="username" placeholder="e.g. John" required>
                  <div class="alert alert-danger" v-if="errors.username != null">
                      {{ errors.username[0] }}
                  </div>
              </div>

              <div class="form-group">
                <label for="practitioners">Your Practitioner</label>
                <select v-model="practitioner" class="form-control" id="practitioners" required>
                  <option disabled value="" class="option-select">Please select one</option>
                  <option v-for="pract in practitionerArray" 
                    v-bind:value="pract.value" 
                    v-bind:key="pract.text"
                    class="option-select">
                    {{ pract.value }}
                  </option>
                </select>
                <div class="alert alert-danger" v-if="errors.username != null">
                      {{ errors.practitionerArray[0] }}
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
              <br>
              <button type="submit" class="btn btn-block btn-success">
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
              <br>
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
              <br>
              <button type="submit" class="btn btn-block btn-success">
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

export default {

  data() {
    return {
      email: "",
      username: "",
      password: "",
      errors: "",
      practitioner: '',
      practitionerArray: []
    };
  },

  created () {
    let self = this;
    // get all practitioners to fill select field
    axios
      .get(SETTINGS.http + SETTINGS.domain + "/api/practitioners/")
      .then(function (response) {
        for (var index in response.data) {
          let username = response.data[index].username;
          self.practitionerArray.push({ text: username, value: username});
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data){
            self.$data.errors = error.response.data
          }
        } 
      });
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
      const credentials = {
        username: this.username,
        password: this.password,
        practitioner: this.practitioner
      };

      axios
        .post(SETTINGS.http + SETTINGS.domain + "/api/auth/token/login/", credentials)
        .then(function (response) {

          axios.defaults.headers.common['Authorization'] = "Token " + response.data.auth_token; //set auth header
          sessionStorage.setItem('isPractitioner',JSON.stringify(response.data.is_practitioner));
          sessionStorage.setItem('authToken', response.data.auth_token);
          sessionStorage.setItem('username', self.username);

          self.$router.push("/chat");
          self.$toasted.success('Successfully signed in');
        })
        .catch(function (error) {
          if (error.response) {
            self.$data.errors = error.response.data
          } 
        });
    },
  }
};
</script>

<style>
  /*.option-select {}*/
</style>