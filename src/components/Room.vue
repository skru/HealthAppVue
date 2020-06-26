	<template>
<div>
	<p class="lead">
		Chat using the form below
    </p>
    <hr><br>
    <div class="scroll">
		<span v-for="(line, index) in messages" :key="index" >
			<div class="" v-bind:class="{'text-right':(line.author !== username)}">
			  <div class="card-body">
			    <p class="card-subtitle mb-2 text-muted">{{line.author_name}} {{line.timestamp}}</p>
			    <p class="card-text">{{line.message}}</p>
			  </div>
			</div>
	    </span>
	</div>
	<br>
	<form @submit.prevent="addMessage" class="form-group">
	    <label for="chat-log">Enter text</label>
	    <input class="form-control" ref="message" type="text" v-model="message" required/><br/>
	    <button type="submit" class="btn btn-block btn-success">Enter text</button>	    
	 </form>

    <button type="button" v-on:click="peerInit" class="btn btn-block btn-success" data-toggle="modal" data-target="#chat-modal">Start video chat</button>

	<div class="modal fade" id="chat-modal" tabindex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
	  <div class="modal-dialog modal-xl modal-dialog-centered">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalCenterTitle">Video</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close" v-on:click="peerDestroy">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <div class="modal-body">
	        <video id="chat-video" autoplay></video>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-secondary" data-dismiss="modal"  v-on:click="peerDestroy">Close</button>
	      </div>
	    </div>
	  </div>
	</div>     
</div>
</template>

<script>
  import { SETTINGS } from "@/deploy_vars.js"
  import ReconnectingWebSocket from 'reconnecting-websocket';
  import SimplePeer from 'simple-peer';
  import adapter from 'webrtc-adapter';

	const $ = window.jQuery;
	let chatSocket = null;
	let peer = null;
	let localStream = null;

	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        username: sessionStorage.getItem('username'),
	        roomId: this.$route.params.roomId,
          	pageUrl: SETTINGS.domain + this.$route.path,
          	messages: [],
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
			},

			gotMedia: function (stream) {
				localStream = stream
				peer.addStream(localStream);
			  	
			},

			setupPeer: function(peer) {
				peer._debug = window.console.log
				peer.on('error', err => window.console.log('error', err))

				peer.on('signal', data => {
					//window.console.log('SIGNAL', JSON.stringify(data))

					if (data.type === "offer"){
						chatSocket.send(JSON.stringify({
							"type": "init_peer",
							"chat_id": this.roomId,
							"message": data,
							"author": this.username,
						}));
					} else if (data.type === "answer"){
						chatSocket.send(JSON.stringify({
							"type": "answer_peer",
							"chat_id": this.roomId,
							"message": data,
							"author": this.username,
						}));
					} else if (data.renegotiate === true){
						chatSocket.send(JSON.stringify({
							"type": "init_peer",
							"chat_id": this.roomId,
							"message": data,
							"author": this.username,
						}));
					}
					
				})

				peer.on('connect', () => {
					window.console.log("CONNECTED PEERS")
					var videoPrompt = confirm("Allow video chat"); 
		            if (videoPrompt != null) { 
		                try {
							navigator.mediaDevices.getUserMedia({
							  video: { frameRate: { ideal: 10, max: 10 } },
							  audio: true
							}).then(this.gotMedia).catch((e) => {window.console.log(e)})
						}catch(e){
							window.console.log(e)
						}
		            } 
					
				})

				peer.on('stream', stream => {
				    // got remote video stream, now let's show it in a video tag
				    let video = document.getElementById("chat-video")
				    if ('srcObject' in video) {
				      video.srcObject = stream
				    } else {
				      video.src = URL.createObjectURL(stream) // for older browsers
				    }

				    video.play()
				  })
			},
			
			peerInit: function () {
				peer.destroy();
				peer = new SimplePeer({
					initiator: true,
					trickle: false,
				})
				this.setupPeer(peer)
			},

			peerDestroy: function () {
				chatSocket.send(JSON.stringify({
					"type": "close_peer",
					"chat_id": this.roomId,
					"author": this.username,
				}));
			},
		},

	    created(){
	    

	    	let self = this
	    	chatSocket = new ReconnectingWebSocket(
		       SETTINGS.ws + SETTINGS.domain + '/api/ws/chat/' + this.roomId.normalize() + '/'
		    );  
	    	chatSocket.onmessage = function(e) {
		        var messageData = JSON.parse(e.data);
		        //window.console.log("MESSAGEDATA",messageData)

		        if (messageData['message']["type"] === "get_messages"){
		        	messageData['message']["message"].forEach(function (value) {
					  self.$data.messages.push(value)
					  
					});

		        } else if (messageData['message']["type"] === "add_message") {
		        	self.$data.messages.push(messageData['message'])


		        } else if (messageData['message']["type"] === "init_peer") {
		        	
		        	if (messageData['message']["author"] !== self.$data.username){
		        		window.console.log("FROM INIT PEEP: ",messageData['message'])
		        		peer.signal(messageData['message']["message"])
		        		$('#chat-modal').modal('show')
		        	}	

		        } else if (messageData['message']["type"] === "answer_peer") {
		        	
		        	if (messageData['message']["author"] !== self.$data.username){
		        		window.console.log("FROM ANSWER PEEP: ",messageData['message'])
		        		peer.signal(messageData['message']["message"])
		        	}	

		        } else if (messageData['message']["type"] === "close_peer") {
		        	
		        	$('#chat-modal').modal('hide')

		        	// stop camera/microphone
		        	const tracks = localStream.getTracks();
					tracks.forEach(function(track) {
						track.stop();
					});

					// destroy p2p connection;
		        	peer.destroy();

		        	// initiate new peer objects
		        	peer = new SimplePeer({
						initiator: false,
						trickle: false,
					})
					self.setupPeer(peer);
		        }
		    };

		    chatSocket.onclose = function() {
		        //window.window.console.error('Chat socket closed unexpectedly');
		    };

		    this.getMessages();

			peer = new SimplePeer({
				initiator: false,
				trickle: false,
			})

			this.setupPeer(peer);
	    },
	}
</script>

<style scoped>
.scroll {
	display: block;
    max-height: 90vh;
    overflow-y: scroll;
}
.card-subtitle {
	font-size: 0.8rem;
}

#chat-video {
	width: 100%;
	height: auto;
}
</style>