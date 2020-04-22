	<template>
<div>
	<p class="lead">
		Chat using the form below
    </p>
    <hr><br>

    <div class="scroll">
		<span v-for="(line, index) in messages" :key="index" >
			<div  v-bind:class="{'card':true, 'text-right':(line.author !== username)}">
			  <div class="card-body">
			    <p class="card-subtitle mb-2 text-muted">{{line.author_name}} {{line.timestamp}}</p>
			    <p class="card-text">{{line.message}}</p>
			  </div>
			</div>
	    </span>
	</div>
	<br>
	<div class="form-group">
	    <label for="chat-log">Enter text</label>
	    <input class="form-control" type="text" v-model="message"/><br/>
	    <button v-on:click="addMessage" class="btn btn-block btn-success">Enter</button>
	 </div>

      
</div>
</template>

<script>
  import { SETTINGS } from "@/deploy_vars.js"
  import ReconnectingWebSocket from 'reconnecting-websocket';
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
          	messages: []
	      };
	    },

	    methods: {
			addMessage: function () {
				chatSocket.send(JSON.stringify({
					"type": "add_message",
					"chat_id": this.roomId,
				    "message": this.message,
				    "author": this.username,
				}));
				this.message = '';
			},

			getMessages: function () {
				chatSocket.send(JSON.stringify({
					"type": "get_messages",
					"chat_id": this.roomId,
				}));
			}
		},

	    created(){
	    	let self = this
	    	chatSocket = new ReconnectingWebSocket(
		       SETTINGS.ws + SETTINGS.domain + '/api/ws/chat/' + this.roomId.normalize() + '/'
		    );  
	    	chatSocket.onmessage = function(e) {
	    		
		        var messageData = JSON.parse(e.data);

		        if (messageData['message']["type"] === "get_messages"){
		        	messageData['message']["message"].forEach(function (value) {
					  self.$data.messages.push(value)
					}); 
		        } else if (messageData['message']["type"] === "add_message") {
		        	self.$data.messages.push(messageData['message'])
		        }
		        
		    };

		    chatSocket.onclose = function() {
		        //console.error('Chat socket closed unexpectedly');
		    };

		    this.getMessages();

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

		
	}
 
</script>

<style scoped>
.scroll {
    max-height: 90vh;
    overflow-y: scroll;
}
.card-subtitle {
	font-size: 0.8rem;
}
</style>