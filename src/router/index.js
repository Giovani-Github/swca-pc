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
import api from '../api';
import {Message} from "iview";

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

      // 获取登录用户的手机号码
      let claims = store.state.global.token.split(".")[1];
      claims = JSON.parse(Base64.decode(claims));

      // 获取该用户的所有权限列表
      api.user.getUserByPhoneNum(claims.phoneNum).then(
        res => {
          let isAdmin = false;

          // 循环查找是否有admin权限
          for (var i = 0; i < res.data.roles.length; i++) {
            if (res.data.roles[i] === "ROLE_ADMIN") {
              isAdmin = true;
            }
          }

          if (isAdmin) {
            next();
          } else {
            Message.error({
              content: "非管理员",
              duration: 10,
              closable: true
            });
          }

        }
      );


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
