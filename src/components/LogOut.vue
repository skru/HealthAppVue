<script>
import { SETTINGS } from "@/deploy_vars.js"
const axios = require('axios');

function logoutAuthed(self){
  axios.defaults.headers.common['Authorization'] = ""; //remove auth header
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('isPractitioner');
  self.$toasted.success('Successfully Logged Out');
  self.$router.push("/");
}

export default {
	data() {
	    return {
	      auth_token: sessionStorage.getItem('authToken')
	    }
	  },
	render() {
		return null;
	},
    created: function() {
    	let self = this;
      try {
        // try to remove token from backend. will fail if no backend available (500)
        // so remove session data whatever happens. 
        // user will recieve new token on login
        axios
          .post(SETTINGS.http + SETTINGS.domain + "/api/auth/token/logout/")
          .then(function (response) {
            logoutAuthed(self)
          })
          .catch(function (error) {
            if (error.response) {
              logoutAuthed(self)
            } 
          });

      } catch {
        logoutAuthed(self)

      }
     	
    }
 }
</script>
