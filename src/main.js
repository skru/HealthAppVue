import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from 'vue-toasted';
import VueFuse from 'vue-fuse'

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

//toasted
Vue.use(Toasted, { position: "top-right", duration: 3000, fullWidth: true})

// fuse.js
Vue.use(VueFuse)
