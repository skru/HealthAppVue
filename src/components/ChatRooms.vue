<template>
  <div>
    <h2>What chat room would you like to enter?</h2>
    <br />
    <form @submit.prevent="selectRoom">
      <input
        id="room-name-input"
        type="text"
        size="100"
        v-model="room"
        class="form-control"
        required
      /><br />
      <button type="submit" class="btn btn-block btn-primary">
        Enter
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      room: ""
    };
  },

  methods: {
    selectRoom() {
      window.location.pathname = "/chat/" + this.room + "/";
    }
  }
};
</script>
