<template>
  <div class="container">
    <h2 class="text-center">Conditions</h2>
    <p>NHS text</p>
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
        <div class="alert alert-danger" v-if="errors.non_field_errors">
            {{ errors.non_field_errors[0] }}
        </div>
        <div class="form-group">
          <label for="search_query">Search Health Conditions/Symptoms</label>
            <input v-model="search_query" type="text" class="form-control" id="search_query" placeholder="Sore throat" required>
        </div>
        <button v-on:click="textSearch" class="btn btn-block btn-primary">
          Search
        </button>
        <div v-for="condition in results" :key="condition.title">
          <br>
          <div class="card">
            <div class="card-header">
              {{ condition.title }}
            </div>
            <div class="card-body">
              <p class="card-text">{{ condition.description }}</p>
              <a :href="condition.url" class="btn btn-primary">Read more via the NHS</a>
            </div>
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
      search_query: "",
      search_results: [],
      errors: "",
      results: [],
      conditions: null
    };
  },
  methods: {
    textSearch() {
      let self = this;
      axios
          .get(SETTINGS.http + SETTINGS.domain + "/api/conditions/", self.$data)
          .then(function (response) {
            let data = response.data
            let options = {
              keys: ['title',]
            };
            try{
              self.$search(self.$data.search_query, data, { keys: ['title'] }).then(result => {
                self.$data.results = result
                self.$data.search_results = result
              })
            } catch (error) {
              window.console.log(error);
            }
          })
          .catch(function (error) {
            if (error.response) {
              if (error.response.data){
                window.console.log(error.response)
                self.$data.errors = error.response.data
              }
            } 
          });

    },
  },
  created () {
    this.$on('results', results => {
      this.results = results
    })
  }
};
</script>