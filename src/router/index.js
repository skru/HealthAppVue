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

Vue.use(VueRouter);

function checkAuthBeforePage(to, from, next){
  // Check user is authorised (has token) redirect to login if fails
   if (sessionStorage.getItem('authToken') !== null || to.path === '/auth') {
    next()
  } else {
    router.app.$root.$toasted.info('Login Required');
    next({
      name: "Login" // back to safety route //
    })
  }
  // try {
  //   var hasPermission =  store.state.auth_token;
  //   if (hasPermission !== "") {
  //     next()
  //   } else {
  //     router.app.$root.$toasted.info('Login Required');
  //     next({
  //       name: "Login" // back to safety route //
  //     })
  //   }
  // } catch (e) {
  //   next({
  //     name: "Login" // back to safety route //
  //   })
  // }
}

const routes = [
  { path: '*', component: NotFoundComponent },
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
    name: "Your Practitioner",
    component: ChatRooms,
    beforeEnter(to, from, next) {
      checkAuthBeforePage(to, from, next)
    }
  },
  {
    path: "/chat/:roomId",
    name: "Room",
    component: Room,
    beforeEnter(to, from, next) {
      checkAuthBeforePage(to, from, next)
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
