import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/area/:name",
    name: "area_index",
    component: () => import("../views/Home.vue")
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
