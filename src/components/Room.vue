<template>
<div class="container">
    <h2 class="text-center">Chat</h2>
    <p>Share this link so others can join: <a :href="pageUrl">{{ pageUrl }}</a>
    <div class="row">
      	<div class="col-sm-6 offset-sm-3">
          <form v-on:submit.prevent="addMessage">
    			<div class="form-group">
    			    <textarea class="form-control" id="chat-log" cols="100" rows="10" readonly></textarea><br/>
    			    <input class="form-control" type="text" v-model="message"/><br/>
    			    <button v-on:click="addMessage" class="btn btn-block btn-primary">Enter</button>
    			 </div>
          </form>
    		</div>
	</div>
</div>
</template>

<script>
  import { SETTINGS } from "@/deploy_vars.js"
	const $ = window.jQuery;
	let chatSocket = null;

	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        roomId: this.$route.params.roomId,
          pageUrl: SETTINGS.domain + this.$route.path,
	      };
	    },

	    created(){
	    	chatSocket = new WebSocket(
		       SETTINGS.ws + SETTINGS.domain + '/api/ws/chat/' + this.roomId + '/'
		    );  
	    	chatSocket.onmessage = function(e) {
		        var data = JSON.parse(e.data);
		        $('#chat-log').val($('#chat-log').val() + data['message'] + '\n');
		    };

		    chatSocket.onclose = function() {
		        //console.error('Chat socket closed unexpectedly');
		    };
	    },

		methods: {
			addMessage: function () {
				chatSocket.send(JSON.stringify({
				    'message': this.message
				}));
				this.message = '';
			}
		},
	}
 
</script>
