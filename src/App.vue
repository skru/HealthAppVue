<template>
  <div id="app" >
    <nav class="navbar navbar-expand-md fixed-top navbar-dark nav-background">
      <div class="container">
        <router-link to="/" class="nav-logo" data-toggle="collapse" data-target=".navbar-collapse.show">
          <img src="@/assets/logo.png" height="50" class="d-inline-block align-middle" alt="Procative Healthcare logo">
          <span id="tagline" class="d-none d-lg-inline">&nbsp;Proactive Healthcare</span>
        </router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar1">
              <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse text-center" id="navbar1">
            <ul class="navbar-nav nav ml-auto">
              <li class="nav-item">
                <router-link to="/about" class="nav-link nav-text" data-toggle="collapse" data-target=".navbar-collapse.show">About</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/conditions" class="nav-link nav-text" data-toggle="collapse" data-target=".navbar-collapse.show">Conditions</router-link>
              </li>
              <li class="nav-item">
                  <router-link to="/chat" class="nav-link nav-text  text-truncate">
                    Your&nbsp;
                    <span v-if="!isPractitioner">Practitioners</span>
                    <span v-else>Patients</span>
                  </router-link>
              </li>
            </ul>
            <span v-if="!isAuthed">
              <ul class="navbar-nav nav ml-auto">
                <li class="nav-item">
                    <router-link to="/auth" class="nav-link nav-text" data-toggle="collapse" data-target=".navbar-collapse.show">Login</router-link>
                </li>
              </ul>
            </span>
            <span v-else>
              <ul class="navbar-nav nav ml-auto">
                <li class="nav-item">
                    <router-link to="/account" class="nav-link nav-text" data-toggle="collapse" data-target=".navbar-collapse.show">Account</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/logout" class="nav-link nav-text" data-toggle="collapse" data-target=".navbar-collapse.show">Logout</router-link>
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
        <transition
          name="fade"
          mode="out-in"
        >
          <router-view/>
        </transition>
      </div>
      <div class="col-md-4">
        <span v-if="isAuthed">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Signed in as: </h4>
              <span class="card-text">
                <p>
                  <span v-if="isPractitioner">Practitioner </span>
                  <span v-else>Patient </span>
                  {{ full_name }}
                </p>
              </span>
            </div>
          </div>
          <br>
        </span>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Important Contacts</h4>
            <span class="card-text">
              <p>If you think it's an emergency:</p>
              <ul>
                <li><a href="tel:999">call 999</a></li>
              </ul>
              <p>If you need help now, but it's not an emergency:</p>
              <ul>
                <li>go to 111.nhs.uk or <a href="tel:111">call 111</a></li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  </main>
  <br><br>
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

function getConditionsApi(self){
  axios
      .get(SETTINGS.http + SETTINGS.domain + "/api/conditions/", self.$data)
      .then(function (response) {
        setConditionsCache(response.data);
      })
      // .catch(function (error) {

      // });
}

function setConditionsCache(data){
  localStorage.setItem('conditions', JSON.stringify(data));
}

function getConditionsCache(){
  let conditions = localStorage.getItem('conditions');
  if (conditions) {
    return true;
  } else {
    return null;
  }
}

function setAuth(self){
  if (sessionStorage.getItem('authToken') !== null) {
    self.isAuthed = true;
    self.full_name = sessionStorage.getItem('full_name');
    self.isPractitioner = JSON.parse(sessionStorage.getItem('isPractitioner'));
    axios.defaults.headers.common['Authorization'] = "Token " + sessionStorage.getItem('authToken');
  } else {
    self.isAuthed = null;
    self.full_name = "";
    self.isPractitioner = "";
  }
}

export default {

  data() {
    return {
      isAuthed: null,
      full_name: "",
      isPractitioner: false,
      //notification: this.$store.getters.getNotification,
    };
  },

  updated() {
    setAuth(this);
    // this.notification = this.$store.getters.getNotification;
    // setTimeout(() => {
    //   this.$store.commit("setNotification", "");
    //   this.notification = ""}, 5000)
    // console.log(this.notification)
  },

  created () {
    setAuth(this);

    let self = this;
    if (getConditionsCache()) {
      //console.log("conditions in cache. set to store")
    } else {
      getConditionsApi(self);
    }
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
  background: #487A7B;
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
  font-size: 1rem;
  color: white !important;
  border-radius: 12px;
  font-weight: 100;
}

.nav-text {
  font-size: 1.3rem;
  color: white !important;
  border-radius: 12px;
}

.router-link-exact-active {
  /*color: #487A7B !important;
  background: white;*/
  border: 2px solid white;
  margin: 0 auto;
}

.nav-logo {
  background: #487A7B;
  border: none;
  margin: 0;
}

#app-content {
  margin-top: 100px;
}

.fixed-bottom {
  height: 34px;
}

.contact-image {
  padding: 30px;

}

/* page transitions */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}



</style>
