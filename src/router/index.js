import Vue from 'vue'
import Router from 'vue-router'
import frontIndex from '../components/front-index'
import adminIndex from '../components/admin/admin-index'
import index from '../components/index'
import course from '../components/course'
import commit from '../components/utils/repair/commit'
import orderList from '../components/utils/repair/order-list'
import repairAdmin from '../components/admin/repair-admin'
import loginAdmin from '../components/admin/login-admin'
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    // 前台首页
    {
      path: '/',
      name: 'frontIndex',
      component: frontIndex,
      redirect: "/index",
      children: [
        // 前台首页
        {
          path: "/index",
          name: 'index',
          component: index
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

    },

    // 后台页面
    {
      path: '/admin',
      name: 'admin',
      component: adminIndex,
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "/repairAdmin",
          name: 'repairAdmin',
          component: repairAdmin
        }
      ]
    },
    // 后台登录
    {
      path: '/loginAdmin',
      name: 'loginAdmin',
      component: loginAdmin
    }

  ]
});

// 每次加载页面都会执行，即每次刷新时
// 如果存在token，就重新获取token，以防刷新后丢失token
// if (store.state.global.token) {
//   console.log(store.state.global.token);
// }
// console.log(store.state.global.token);

/**
 * 判断是否需要登录权限 以及是否登录
 */
router.beforeEach((to, from, next) => {

  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (store.state.global.token) {   //判断是否已经登录
      next();
    } else {
      next({
        path: '/loginAdmin',
        // query: {redirect: to.fullPath}   //登录成功后重定向到当前页面
      });
    }
  } else {
    next();
  }
});

export default router;
