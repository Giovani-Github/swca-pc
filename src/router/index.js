import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import course from '../components/course'
import register from '../components/user/register-panel'
import login from '../components/user/login-panel'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      childer: {}

    },
    {
      path: '/course',
      name: 'course',
      component: course
    }
  ]
})
