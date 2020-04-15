	<template>
<div>
	<p class="lead">
      Share this link so others can join: <a :href="pageUrl">{{ pageUrl }}</a>
    </p>
    <hr><br>
    <div class="card">
      <div class="card-body">
		<form v-on:submit.prevent="addMessage">
		<div class="form-group">

		    <textarea class="form-control" id="chat-log" cols="100" rows="10" readonly></textarea><br/>
		    <label for="chat-log">Enter text</label>
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
  // import Peer from 'peerjs';

	const $ = window.jQuery;
	let chatSocket = null;

	// navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

	//   let peerClient;
	//   let currentPeerConnection;
	//   let localMediaStream;
	  //let videoMyself = document.querySelector('#js-video-myself');	

	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        username: sessionStorage.getItem('username'),
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

		    // PEER.JS
		 //    var peer = new Peer({key: 'lwjd5qra8257b9'});
		 // //    peer.on('open', function(id) {
			// //   console.log('My peer ID is: ' + id);
			// // });
			// var conn = peer.connect('dest-peer-id');
			// conn.on('open', function() {
			//   // Receive messages
			//   conn.on('data', function(data) {
			//     console.log('Received', data);
			//   });

			//   // Send messages
			//   conn.send('Hello!');
			// });

			// navigator.getUserMedia({video: true, audio: true}, function(stream) {
		 //      document.querySelector('#js-video-myself').src = URL.createObjectURL(stream);
		 //      document.querySelector('#js-video-myself').play();
		 //      localMediaStream = stream;
		 //    });

			// var call = peer.call('dest-peer-id', localMediaStream);
			
	    },

		methods: {
			addMessage: function () {
				chatSocket.send(JSON.stringify({
					"type": "add_message",
					"chat_id": this.roomId,
				    "message": this.message,
				    "command": "add_message",
				    "author": this.username,
				}));
				this.message = '';
			}
		},
	}
 
</script>
