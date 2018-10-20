import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import course from '../components/course'
import commit from '../components/utils/repair/commit'


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
      path: '/commit',
      name: 'commit',
      component: commit
    }
  ]
})
