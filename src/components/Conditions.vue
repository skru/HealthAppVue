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
        <div v-for="condition in search_results" :key="condition.title">
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
      this.$search(this.search_query, this.results, { keys: ['title'] }).then(result => {
        this.search_results = result
      })
    },
  },

  created () {
    let self = this;
    axios
      .get(SETTINGS.http + SETTINGS.domain + "/api/conditions/", self.$data)
      .then(function (response) {
        self.$data.results = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data){
            self.$data.errors = error.response.data
          }
        } 
      });
  }
};
</script>