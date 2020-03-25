import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UserAuth from "@/components/UserAuth";
import ChatRooms from "@/components/ChatRooms";
import Room from "@/components/Room";
import NotFoundComponent from "@/components/NotFoundComponent";
import LogOut from "@/components/LogOut";
import UpdatePassword from "@/components/UpdatePassword";

import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [
  { path: '*', component: NotFoundComponent },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/logout",
    name: "Logout",
    component: LogOut
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
    path: "/auth",
    name: "UserAuth",
    component: UserAuth
  },

  {
    path: "/chat",
    name: "ChatRooms",
    component: ChatRooms,
    beforeEnter(to, from, next) {
      try {
        var hasPermission =  store.state.auth_token;
        if (hasPermission !== "") {
          next()
        } else {
          next({
            name: "UserAuth" // back to safety route //
          })
        }
      } catch (e) {
        next({
          name: "UserAuth" // back to safety route //
        })
      }
    }
  },
  {
    path: "/chat/:roomId",
    name: "Room",
    component: Room,
    beforeEnter(to, from, next) {
      try {
        var hasPermission =  store.state.auth_token;
        if (hasPermission !== "") {
          next()
        } else {
          next({
            name: "UserAuth" // back to safety route //
          })
        }
      } catch (e) {
        next({
          name: "UserAuth" // back to safety route //
        })
      }
    }
  },
  {
    path: "/password",
    name: "UpdatePassword",
    component: UpdatePassword
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (sessionStorage.getItem("authToken") !== null || to.path === "/auth") {
//     next();
//   } else {
//     next("/auth");
//   }
// });

export default router;
