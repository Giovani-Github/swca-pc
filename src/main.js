// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iview from './iview/components';
// 默认导入api目录下的index.js
import api from './api';
import store from './store'
import 'iview/dist/styles/iview.css';
import animated from 'animate.css';

Vue.use(animated);
Vue.use(iview);

// 挂载到Vue原型上，方便组件中调用，通过this.$api访问
Vue.prototype.$api = api;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
