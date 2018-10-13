// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iview from './iview/components';
import api from './api'; // 默认导入api目录下的index.js
import 'iview/dist/styles/iview.css';
import animated from 'animate.css';

Vue.use(animated);
Vue.use(iview);

Vue.prototype.$api = api; // 挂载到Vue原型上，方便组件中调用

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
