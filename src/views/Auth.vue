<template>
  <div class="auth">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Variable HERE" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/UserAuth.vue";

export default {
  name: "UserAuth",
  components: {
    Userauth
  }
};
</script>