<template>
<div class="container">
    <h1 class="text-center">{{pageUrl}}</h1>
    <div id="auth-container" class="row">
      	<div class="col-sm-4 offset-sm-4">
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
  const domain = "jm1179.xyz:11030";
	const $ = window.jQuery;
	let chatSocket = null;


	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        roomId: this.$route.params.roomId,
	        url: domain,
          pageUrl: domain + this.$route.path,
	        
	      };
	    },

	    created(){

	    	chatSocket = new WebSocket(
		       'wss://' + this.url + '/ws/chat/' + this.roomId + '/'
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
