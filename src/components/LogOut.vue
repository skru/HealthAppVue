<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');
export default {
	data() {
	    return {
	      auth_token: this.$store.getters.getAuthToken
	    }
	  },
	render() {
		return null;
	},
    created: function() {
    	let self = this;
     	axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/token/logout/")
          .then(function (response) {
          	console.log("LOGGED OUT");
          	axios.defaults.headers.common['Authorization'] = ""; //remove auth header
            self.$store.commit('setAuthToken', "");
			self.$router.push("/");
          })
          .catch(error => window.console.log(error.response))
    }
 }
</script>
