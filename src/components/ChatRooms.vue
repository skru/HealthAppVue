<template>
  <div>
    <p class="lead">
      Talk to your 
      <span v-if="!isPractitioner">Practitioners </span>
      <span v-else>Patients </span>
      online using the form below.
    </p>
    <hr><br>
    <div v-for="(line, index) in participants" :key="index">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            <span v-for="(p_line, p_index) in line.participants" :key="p_index" >
              <span v-if="p_line.username !== username">{{p_line.get_full_name}}</span>
            </span>
          </h5>
          <p class="card-text">Start or continue an online appointment session.</p>
        </div>
       
        <div class="card-body">
          <button v-on:click="selectRoom(line.chat_uuid)" class="btn btn-block btn-success">start</button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');

export default {
  data() {
    return {
      room: "",
      contactName: "",
      contactUsername: "",
      username: sessionStorage.getItem('username'),
      participants: [],
      isPractitioner: JSON.parse(sessionStorage.getItem('isPractitioner')),

    };
  },
  
  methods: {
    selectRoom(chat_uuid) {
      this.$router.push({ path: 'chat/' + chat_uuid })
    }
  },
  created () {
    let self = this;
    axios
      .get(SETTINGS.http + SETTINGS.domain + "/api/chats/" + self.$data.username + "/")
      .then(function (response) {
        self.$data.participants = response.data
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data){
            self.$data.errors = error.response.data
          }
        } 
      });
  },
};
</script>