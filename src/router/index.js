import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import course from '../components/course'
import register from '../components/user/register'
import login from '../components/user/login'

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
    },
    {
      path: '/login',
      name: 'login',
      components: {
        logReg: login
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        logReg: register
      }
    },
  ]
})
