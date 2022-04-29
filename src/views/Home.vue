<template>
  <div>
  	<p class="lead">
      Your healthcare online. 
    </p>
    <hr><br>
   	<div class="card-group">
   	  
   	  <div class="card">
   	  	<router-link to="/about" class="menu-router-link">
	    <div class="card-body">
	      <h5 class="card-title">About</h5>
	      <hr>
	      <p class="card-text">A University project demonstrating the use of a Progressive Web App frontend and REST API backend. Vue frontend, Django REST Framework backend </p>
	    </div>
		</router-link>
	  </div>
	  
   		
	  <div class="card">
	  	<router-link to="/conditions" class="menu-router-link">
	    <!-- <img class="card-img-top img-fluid" src="img/stethoscope.png" alt="stethoscope"> -->
	    <div class="card-body">
	      <h5 class="card-title">Your Health</h5>
	      <hr>
	      <p class="card-text">Search for information on common health conditions and symptoms.</p>
	    </div>
	    </router-link>
	  </div>

	</div>
	<div class="card-group">

	  <div class="card">
	  	<router-link to="/chat" class="menu-router-link">
	    <!-- <img class="card-img-top img-fluid" src="img/practitioner.png" alt="practitioner"> -->
	    <div class="card-body">
	      <h5 class="card-title">Your Practitioner</h5>
	      <hr>
	      <p class="card-text">Contact your practitioner and request an online appointment.</p>
	    </div>
	    </router-link>
	  </div>
	  <div class="card">
	  	<router-link to="/account" class="menu-router-link">
	    <!-- <img class="card-img-top img-fluid" src="img/paperwork.png" alt="paperwork"> -->
	    <div class="card-body">
	      <h5 class="card-title">Your Account</h5>
	      <hr>
	      <p class="card-text">Manage your online account information.</p>
	    </div>
	    </router-link>
	  </div>
	</div>
	<br>


  </div>
</template>

<script>
export default {
  name: "Home"

};
</script>

<style>
.menu-router-link {
	color: #2c3e50;
}
.menu-router-link:hover {
	color: #2c3e50;
	text-decoration: none; 
}
</style>
