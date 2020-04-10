<template>
  <div>
    <p class="lead">
      Enter the name of a room to join or create
    </p>
    <hr><br>
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="selectRoom">
          <label for="room-name-input">Room name</label>
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
      //window.location.pathname = "/chat/" + this.room + "/";
      this.$router.push({ path: 'chat/' + this.room })
    }
  }
};
</script>