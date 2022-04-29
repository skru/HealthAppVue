import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Conditions from "@/components/Conditions";
import UserAuth from "@/components/UserAuth";
import ChatRooms from "@/components/ChatRooms";
import Room from "@/components/Room";
import NotFoundComponent from "@/components/NotFoundComponent";
import LogOut from "@/components/LogOut";
import UpdatePassword from "@/components/UpdatePassword";

import store from "../store/index.js";

const axios = require('axios');

Vue.use(VueRouter);

function checkAuthBeforePage(to, from, next){
  // Check user is authorised (has token) redirect to login if fails
   if (sessionStorage.getItem('authToken') !== null || to.path === '/auth') {
    next()
  } else {
    router.app.$root.$toasted.info('Login Required');
    store.commit('setNotification', 'Login required');

    next({
      name: "Login" // back to safety route //
    })
  }
}

function checkChatAuth(to, from, next){
  // Check user is authorised to access chat url, retunr 404 if not
   if (sessionStorage.getItem('authToken') !== null || to.path === '/auth') {
    axios.defaults.headers.common['Authorization'] = "Token " + sessionStorage.getItem('authToken');
    axios
      .get(process.env.API + "/api/chats/" + sessionStorage.getItem('username') + "/")
      .then(function (response) {
        for(let a of response.data) {
           if(a.chat_uuid === to.params.roomId) {
            next();
            break;
           } 
        }
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.data){
            next({
              name: "404 not found"
            })
          }
        } 
      });
    
    
  } else {
    router.app.$root.$toasted.info('Login Required');
    next({
      name: "Login" // back to safety route //
    })
  }
}

const routes = [
  { path: '*', component: NotFoundComponent, name: '404 not found' },
  {
    path: "/",
    name: "Proactive Healthcare",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/conditions",
    name: "Conditions",
    component: Conditions
  },
  {
    path: "/auth",
    name: "Login",
    component: UserAuth
  },

  {
    path: "/chat",
    name: "Online Appointments",
    component: ChatRooms,
    beforeEnter(to, from, next) {
      checkAuthBeforePage(to, from, next)
    }
  },
  {
    path: "/chat/:roomId",
    name: "Online Appointment",
    component: Room,
    beforeEnter(to, from, next) {
      checkChatAuth(to, from, next)
    }
  },
  {
    path: "/account",
    name: "Account",
    component: UpdatePassword,
    beforeEnter(to, from, next) {
      checkAuthBeforePage(to, from, next)
    }
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogOut
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
