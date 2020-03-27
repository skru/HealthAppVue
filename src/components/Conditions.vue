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
export default {
  data() {
    return {
      search_query: "",
      search_results: [],
      errors: "",
    };
  },
  methods: {
    textSearch() {
      this.$search(this.search_query, this.$store.getters.getConditionsData, { keys: ['title'] }).then(result => {
        this.search_results = result
      })
    },
  },
};
</script>