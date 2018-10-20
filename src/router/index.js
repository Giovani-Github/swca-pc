import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/index'
import course from '../components/course'
import commit from '../components/utils/repair/commit'
import orderList from '../components/utils/repair/orderList'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      childer: {}

    },
    // 计算机教程
    {
      path: '/course',
      name: 'course',
      component: course
    },
    // 提交维修订单
    {
      path: '/commit',
      name: 'commit',
      component: commit
    },
    // 查询维修进度
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
  ]
})
