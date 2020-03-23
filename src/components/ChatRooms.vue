<template>
  <div class="container">
    <h2 class="text-center">Chat Room</h2>
    <p>Enter the name of a room to join or create</p>
    <div class="row">
      <div class="col-sm-6 offset-sm-3">
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
    </div>
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