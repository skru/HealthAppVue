<template>
  <div><p class="lead">
      Update your account information.
    </p>
    <hr><br>
    <div class="card">
      <div class="card-body">
        <div class="alert alert-danger" v-if="errors.non_field_errors">
            {{ errors.non_field_errors[0] }}
        </div>
        <div class="form-group">
          <label for="current_password">Current Password</label>
            <input v-model="current_password" type="password" class="form-control" id="current_password" required>
            <div class="alert alert-danger" v-if="errors.current_password != null">
                {{ errors.current_password[0]}}
            </div>
        </div>
        <div class="form-group">
          <label for="new_password">New Password</label>
            <input v-model="new_password" type="password" class="form-control" id="new_password" required>
            <div class="alert alert-danger" v-if="errors.new_password != null">
                {{ errors.new_password[0]}}
            </div>
        </div>
        <button v-on:click="updatePassword" class="btn btn-block btn-success">Update Password</button>
      </div>
    </div>
  
  </div>
</template>

<script>
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
      axios
          .post(process.env.API + "/api/auth/users/set_password/", self.$data)
          .then(function (response) {
            self.$toasted.success('Password Updated');
            self.$router.push("/");
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


