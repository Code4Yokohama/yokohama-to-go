import Vue from "vue";
import VueRouter from "vue-router";
import { supportedAreas, supportedAreaServed } from "../util";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/area/:area",
    name: "area_index",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (!supportedAreas.includes(to.params.area)) next({ name: "Home" });
      next();
    }
  },
  {
    path: "/areaServed/:area",
    name: "area_served_index",
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      if (!supportedAreaServed.includes(to.params.area)) next({ name: "Home" });
      next();
    }
  },
  {
    path: "/shop/:name",
    name: "shop_show",
    component: () => import("../views/shop/Show.vue")
  },
  {
    path: "/published",
    name: "published",
    component: () => import("../views/published/Index.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
