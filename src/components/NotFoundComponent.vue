<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Sorry the page you are looking for does not exist.</h3>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>