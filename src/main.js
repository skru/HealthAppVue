import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import Toasted from 'vue-toasted';

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");

Vue.use(Toasted, { position: "top-center", duration: 3000, fullWidth: true})
