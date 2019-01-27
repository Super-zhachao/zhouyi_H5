import Vue from 'vue';
import App from './app.vue';
import VueRouter from 'vue-router';
import routes from './route.config.js';
import * as vClickOutside from 'v-click-outside-x';
import Axios from 'axios';
import store from './store.js';

import {Popup, Picker, DatetimePicker} from 'vant';
import 'vant/lib/index.css';

Vue.prototype.$http = Axios;
Axios.interceptors.request.use(function (request) {
  request.withCredentials = true
  return request
}, function (error) {
  return Promise.reject(error)
})

Vue.use(Popup);
Vue.use(Picker);
Vue.use(DatetimePicker);

Vue.use(VueRouter);
Vue.use(vClickOutside);


const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
});

// router.beforeEach((to, from, next) => {
//   if (!store.state.user.id && to.path != '/author') {
//     next('/author');
//     return false
//   }
//   next()
// });

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});
