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
	    <button type="submit" class="btn btn-block btn-success">Enter</button>
	 </form>

	 <form @submit.prevent="peerInit">
      <textarea v-model="incoming"></textarea>
      
      <button type="submit" class="btn ">video</button>
    </form>
    <button v-on:click="peerMessage">MESSAGE</button>
    <div >{{outgoing}}</div>
    <video id="chat-video" autoplay></video>

      
</div>
</template>

<script>
  import { SETTINGS } from "@/deploy_vars.js"
  import ReconnectingWebSocket from 'reconnecting-websocket';
  import SimplePeer from 'simple-peer';
	const $ = window.jQuery;
	let chatSocket = null;
	let peer = null;

	


	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        username: sessionStorage.getItem('username'),
	        roomId: this.$route.params.roomId,
          	pageUrl: SETTINGS.domain + this.$route.path,
          	messages: [],
          	incoming: "",
          	outgoing: "",
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
				peer.addStream(stream);
			  	peer.on('stream', stream => {
			    // got remote video stream, now let's show it in a video tag
			    //let video = document.querySelector('video')

			    let video = document.getElementById("chat-video")
			    window.console.log("video", video)

			    if ('srcObject' in video) {
			      video.srcObject = stream
			    } else {
			      video.src = window.URL.createObjectURL(stream) // for older browsers
			    }

			    video.play()
			  })
			},

			setupPeer: function(peer) {
				peer.on('error', err => window.console.log('error', err))

				peer.on('signal', data => {
					window.console.log('SIGNAL', JSON.stringify(data))

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
					}
					
				})

				peer.on('connect', () => {
					window.console.log("CONNECTED PEERS")
					peer.send('whatever' + Math.random())
					try {
						navigator.mediaDevices.getUserMedia({
						  video: { frameRate: { ideal: 10, max: 15 } },
						  audio: true
						}).then(this.gotMedia).catch((e) => {window.console.log(e)})

						
					}catch(e){
						window.console.log(e)
					}

					

				})

				peer.on('data', data => {
					window.console.log('data: ' + data)
				})
			},
			

			peerInit: function () {
				peer = new SimplePeer({
					initiator: true,
					trickle: false,
					//stream: stream
				})
				this.setupPeer(peer)
			},

			peerMessage: function () {
				peer.send('MESSAGE' + Math.random())
			}
		},

	    created(){
	    	let self = this
	    	chatSocket = new ReconnectingWebSocket(
		       SETTINGS.ws + SETTINGS.domain + '/api/ws/chat/' + this.roomId.normalize() + '/'
		    );  
	    	chatSocket.onmessage = function(e) {
	    		
		        var messageData = JSON.parse(e.data);
		        window.console.log(messageData)

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
		        	}	

		        } else if (messageData['message']["type"] === "answer_peer") {
		        	
		        	if (messageData['message']["author"] !== self.$data.username){
		        		window.console.log("ANSWER PEEP: ",messageData['message'])
		        		peer.signal(messageData['message']["message"])
		        	}		        	
		        }
		    };

		    chatSocket.onclose = function() {
		        //window.console.error('Chat socket closed unexpectedly');
		    };

		    this.getMessages();


		    //PEER.JS
		    peer = new SimplePeer({
			initiator: location.hash ===  "#1",
				trickle: false,
				//stream: stream
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
</style>