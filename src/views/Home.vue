<template>
  <div>
  	<p class="lead">
      Your healthcare online. 
    </p>
    <hr><br>
   	<div class="card-group">
   		
	  <div class="card">
	    <img class="card-img-top img-fluid" src="img/stethoscope.jpeg" alt="Card image cap">
	    <div class="card-body">
	      <h5 class="card-title">Your Health</h5>
	      <p class="card-text">Search for information on common health conditions and symptoms.</p>
	    </div>
	    <div class="card-footer text-center">
	      <router-link to="/conditions" class="btn btn-primary">Conditions</router-link>
	    </div>
	  </div>

	  <div class="card">
	    <img class="card-img-top img-fluid" src="img/practitioner.jpeg" alt="Card image cap">
	    <div class="card-body">
	      <h5 class="card-title">Your Practitioner</h5>
	      <p class="card-text">Contact your practitioner and request an online appointment.</p>
	    </div>
	    <div class="card-footer text-center">
	      <router-link to="/chat" class="btn btn-primary">Your&nbsp;Practitioner</router-link>
	    </div>
	  </div>
	  <div class="card">
	    <img class="card-img-top img-fluid" src="img/paperwork.jpeg" alt="Card image cap">
	    <div class="card-body">
	      <h5 class="card-title">Your Account</h5>
	      <p class="card-text">Manage your online account information.</p>
	    </div>
	    <div class="card-footer text-center">
	      <router-link to="/account" class="btn btn-primary">Account</router-link>
	    </div>
	  </div>
	</div>
	<br>
	<div class="card">
      <div class="card-body">
	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fermentum pellentesque ullamcorper. Fusce efficitur orci vel ligula lacinia, a tincidunt nibh sodales. Integer rhoncus sit amet augue accumsan aliquet. Duis ut tempus diam, vel commodo metus. Integer magna augue, consectetur eu arcu non, auctor iaculis massa. Morbi luctus in urna sollicitudin tempor. Aenean dignissim ultrices metus vitae ornare. Nulla efficitur mattis ultrices. Donec ut auctor nunc. Aliquam erat volutpat. Duis vel tempus ex. Praesent mattis nisi velit, et aliquam lacus pretium ultricies. Integer non dignissim augue. Pellentesque vitae luctus enim. Mauris hendrerit mi in lectus blandit, eget mattis ante porttitor.

	</p>
</div>
</div>

  </div>
</template>

<script>
export default {
  name: "Home"

};
</script>

<style>
.card-img-top {
	height:170px;
}
</style>
