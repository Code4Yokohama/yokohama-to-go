import Vue from "vue";
import App from "./App.vue";
import VueGtm from "vue-gtm";
import router from "./router";
import store from "./store";
import * as VueGoogleMaps from "vue2-google-maps";
import VueScrollTo from "vue-scrollto";
import axios from "axios";

Vue.config.productionTip = false;
if (process.env.VUE_APP_GOOGLE_TAG_MANAGER_ID) {
  Vue.use(VueGtm, {
    id: process.env.VUE_APP_GOOGLE_TAG_MANAGER_ID,
    debug: true, // Whether or not display console logs debugs (optional)
    vueRouter: router // Pass the router instance to automatically sync with router (optional)
  });
}
Vue.use(VueScrollTo, {
  container: ".home__left",
  offset: -61 // ヘッダー分
});

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAPS_API_KEY,
    libraries: "places"
  }
});

const base = axios.create({
  baseURL: process.env.VUE_APP_API_URL
});

Vue.prototype.$http = base;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
