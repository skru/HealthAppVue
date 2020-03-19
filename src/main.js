import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// import VueResource from 'vue-resource';



// function getCookie(name) {
//     var cookieValue = null;
//     if (document.cookie && document.cookie !== '') {
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i].trim();
//             // Does this cookie string begin with the name we want?
//             if (cookie.substring(0, name.length + 1) === (name + '=')) {
//                 cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
//                 break;
//             }
//         }
//     }
//     return cookieValue;
// }

Vue.config.productionTip = false;
// Vue.use(VueResource)
// Vue.http.headers.common['HTTP_X_CSRFTOKEN'] = getCookie('csrftoken');

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
