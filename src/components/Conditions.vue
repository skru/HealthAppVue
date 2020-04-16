<template>
  <div>
    <p class="lead">
      Search for information on common health conditions and symptoms.
    </p>
    <hr><br>
    <div class="card">
      <div class="card-body">
         <div class="row">
          <div class="col-md-6">  
            <p>All data is provided by the NHS.</p>
          </div>
          <div class="col-md-6">  
            <img src="img/nhs/nhs-attribution.jpg"  class="img-fluid" alt="NHS attribution image">
          </div>
        </div>
      </div>
    </div>
    <br>
    <div class="card">
      <div class="card-body">
        <div class="alert alert-danger" v-if="errors.non_field_errors">
            {{ errors.non_field_errors[0] }}
        </div>
        <div class="form-group">
          <label for="search_query">Search Health Conditions/Symptoms</label>
            <input v-model="search_query" type="text" class="form-control" id="search_query" placeholder="Sore throat" required>
        </div>
        <button v-on:click="textSearch" class="btn btn-block btn-success">
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
              <a :href="condition.url" class="btn btn-success">Read more via the NHS</a>
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
      conditions: JSON.parse(localStorage.getItem('conditions'))
    };
  },
  methods: {
    textSearch() {
      //console.log(this.conditions)
      this.$search(this.search_query, this.conditions, { keys: ['title'] }).then(result => {
        this.search_results = result
      })
    },
  },
};
</script>