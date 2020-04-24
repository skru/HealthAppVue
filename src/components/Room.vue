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
<!-- 
	 <form @submit.prevent="peerConnect">
      <textarea v-model="incoming"></textarea>
      <button v-on:click="addMessage">submit</button>
    </form>
    <div >{{outgoing}}</div> -->

      
</div>
</template>

<script>
  import { SETTINGS } from "@/deploy_vars.js"
  import ReconnectingWebSocket from 'reconnecting-websocket';
 //  import SimplePeer from 'simple-peer';
	//const $ = window.jQuery;
	let chatSocket = null;
 //      const p = new SimplePeer({
 //        initiator: location.hash === '#1',
 //        trickle: false
 //      })
 //      console.log(p)
 //      p.on('error', err => console.log('error', err))
 //      p.on('signal', data => {
 //        console.log('SIGNAL', JSON.stringify(data))
 //        //document.querySelector('#outgoing').textContent = JSON.stringify(data)
 //        this.outgoing = JSON.stringify(data)
 //      })
 //      // document.querySelector("#peer-form").addEventListener('submit', ev => {
 //      //   ev.preventDefault()
 //      //   p.signal(JSON.parse(document.querySelector('#incoming').value))
 //      // })
 //      p.on('connect', () => {
 //        console.log('CONNECT')
 //        p.send('whatever' + Math.random())
 //      })
 //      p.on('data', data => {
 //        console.log('data: ' + data)
 //      })

	export default {

		data() {
	      return {
	        message: "",
	        chatLog: "",
	        username: sessionStorage.getItem('username'),
	        roomId: this.$route.params.roomId,
          	pageUrl: SETTINGS.domain + this.$route.path,
          	messages: [],
          	// incoming: "",
          	// outgoing: "",
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

			// peerConnect: function () {
			// 	//console.log("TESDT", document.querySelector('#incoming').value)
			// 	p.signal(JSON.parse(this.incoming))
			// },
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