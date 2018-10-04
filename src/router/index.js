import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import course from '@/components/course'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/course',
      name: 'course',
      component: course
    }
  ]
})
