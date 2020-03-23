<script>
	//import store from "../store/index.js";
export default {
	render() {
		return null;
	},
    created: function() {

  //       sessionStorage.removeItem("authToken");
		// sessionStorage.removeItem("username");
		this.$store.commit('setAuthToken', "")
		this.$router.push("/");
    }
 }
</script>
