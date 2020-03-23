<template>
  <div class="container">
    <h2 class="text-center">Account</h2>
    <div id="auth-container" class="row">
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
            <form @submit.prevent="signUp">
              <div class="form-group">
                <input
                  v-model="email"
                  type="email"
                  class="form-control"
                  id="email"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <input
                    v-model="username"
                    type="text"
                    class="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div class="form-group col-md-6">
                  <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="password1"
                    placeholder="Password1"
                    required
                  />
                </div>
                <!-- <div class="form-group col-md-6">
                  <input
                    v-model="password2"
                    type="password"
                    class="form-control"
                    id="password2"
                    placeholder="Password2"
                    required
                  />
                </div> -->
              </div>
             
               <!-- <input type="hidden" name="csrfmiddlewaretoken" v-model="csrfmiddlewaretoken" />  -->
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
            <form @submit.prevent="signIn">
              <div class="form-group">
                <input
                  v-model="username"
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div class="form-group">
                <input
                  v-model="password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
                <!-- <input type="hidden" name="csrfmiddlewaretoken" v-model="csrfmiddlewaretoken" />   -->  
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
const $ = window.jQuery;
const axios = require('axios');
//axios.defaults.xsrfCookieName = 'csrftoken'
//axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

export default {

  data() {
    return {
      email: "",
      username: "",
      password: "",
      //password2: "",
    };
  },
  methods: {
    signUp() {
      let self = this;
      axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/users/", self.$data)
          .then(function (response) {
            self.signIn(self.$ata);
          })
          .catch(error => window.console.log(error.response))
    },
    signIn(data) {
      let self = this;
      const credentials = { username: this.username, password: this.password};
      axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/token/login/", credentials)
          .then(function (response) {
            self.$store.commit('setAuthToken', response.data.auth_token)
            self.$router.push("/chat");
          })
          .catch(error => window.console.log(error))
    }
  }
};
</script>

<style scoped>
#auth-container {
  margin-top: 50px;
}
.tab-content {
  padding-top: 20px;
}
</style>
