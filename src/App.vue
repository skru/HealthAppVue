<template>
  <div id="app" >
    <nav class="navbar navbar-expand-sm fixed-top navbar-dark nav-background">
              <div class="container">
                <router-link to="/" class="nav-logo">
                  <img src="@/assets/logo.png" height="50" class="d-inline-block align-middle" alt="Procative Healthcare logo">
                  <span id="tagline"> Proactive Healthcare</span>
                </router-link>
                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
                      <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse text-center" id="navbar1">
                      <ul class="navbar-nav nav ml-auto">
                          <li class="nav-item">
                            <router-link to="/about" class="nav-link nav-text ">About</router-link>
                          </li>
                          <li class="nav-item">
                              <router-link to="/conditions" class="nav-link nav-text ">Conditions</router-link>
                          </li>
                          <li class="nav-item">
                              <router-link to="/chat" class="nav-link nav-text  text-truncate">Your&nbsp;Practitioner</router-link>
                          </li>
                        </ul>
                          <span v-if="!isAuthed">
                            <ul class="navbar-nav nav ml-auto">
                              <li class="nav-item">
                                  <router-link to="/auth" class="nav-link nav-text ">Login</router-link>
                              </li>
                            </ul>
                          </span>
                          <span v-else>
                            <ul class="navbar-nav nav ml-auto">
                              <li class="nav-item">
                                  <router-link to="/account" class="nav-link nav-text ">Account</router-link>
                              </li>
                              <li class="nav-item">
                                  <router-link to="/logout" class="nav-link nav-text ">Logout</router-link>
                              </li>
                            </ul>
                          </span>
                    
                  </div>
              </div>
          </nav>
        <main id="app-content" class="container">
          <div class="row">
            <div class="col-md-8">
              <h1 class="display-4">{{ $route.name }}</h1>

              <router-view />
            </div>
            <div class="col-md-4">
              
                  <span v-if="isAuthed">
                    <div class="card" style="width: 18rem;">
                      <div class="card-body">
                        <h5 class="card-title">Signed in as</h5>
                        <h6 class="card-subtitle mb-2 text-muted">[[username]]</h6>
                        <p class="card-text"></p>
                      </div>
                    </div>
                  </span>
               
            </div>
          </div>
          
        </main>

        <footer>
            <nav class="navbar fixed-bottom navbar-light bg-light">
              <p class="pull-left">Copyright Joseph T Mohan 2020.</p>
              <p class="pull-right">Contact: jm1179@canterbury.ac.uk</p>
            </nav>
        </footer>
  
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
  text-align: left;
  color: #2c3e50;
}

.nav-background {
  background: #005eb8;
}


#nav a {
  font-weight: bold;
  color: white !important;
}

#nav a.router-link-exact-active {
  color: white;
}

.nav-link {
  margin: 2px;
}

#tagline {
  font-size: 1.3rem;
  color: white !important;
  border-radius: 12px;
}

.nav-text {
  font-size: 1.3rem;
  color: white !important;
  border-radius: 12px;
}

.router-link-exact-active {
  /*color: #005eb8 !important;
  background: white;*/
  border: 2px solid white;
  margin: 0 auto;
}

.nav-logo {
  background: #005eb8;
  border: none;
  margin: 0;
}

#app-content {
  margin-top: 100px;
}

.fixed-bottom {
  height: 34px;
}




</style>
