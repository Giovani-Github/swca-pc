import Vue from 'vue'
import Router from 'vue-router'
import frontIndex from '../components/front-index'
import adminIndex from '../components/admin/admin-index'
import index from '../components/index'
import course from '../components/course'
import commit from '../components/utils/repair/commit'
import orderList from '../components/utils/repair/order-list'
import repairAdmin from '../components/admin/repair-admin'
import articleAdmin from '../components/admin/article-admin'
import articlePublishAdmin from '../components/admin/article-publish-admin'
import courseAdmin from '../components/admin/course-admin'
import coursePublishAdmin from '../components/admin/course-publish-admin'
import personnelAdmin from '../components/admin/personnel-admin'
import slideAdmin from '../components/admin/slide-admin'
import loginAdmin from '../components/admin/login-admin'
import api from '../api';
import {Message, LoadingBar} from "iview";

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
      redirect: "/personnelAdmin",
      // 需要登录才能进入的页面可以增加一个meta属性
      meta: {
        requireAuth: true
      },
      children: [
        // 维修订单管理
        {
          path: "/repairAdmin",
          name: 'repairAdmin',
          component: repairAdmin
        },
        // 文章管理
        {
          path: "/articleAdmin",
          name: 'articleAdmin',
          component: articleAdmin
        },
        // 文章发布
        {
          path: "/articlePublishAdmin",
          name: 'articlePublishAdmin',
          component: articlePublishAdmin
        },
        // 教程管理
        {
          path: "/courseAdmin",
          name: 'courseAdmin',
          component: courseAdmin
        },
        // 教程发布
        {
          path: "/coursePublishAdmin",
          name: 'coursePublishAdmin',
          component: coursePublishAdmin
        },
        // 会员管理
        {
          path: "/personnelAdmin",
          name: 'personnelAdmin',
          component: personnelAdmin
        },
        // 轮播图管理
        {
          path: "/slideAdmin",
          name: 'slideAdmin',
          component: slideAdmin
        },
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

// 路由执行前
router.beforeEach((to, from, next) => {

  LoadingBar.start();

  /**
   * 判断是否需要登录权限 以及是否登录
   */
  if (to.matched.some((r) => r.meta.requireAuth)) {

    if (sessionStorage.getItem('token')) {   //判断是否已经登录

      // 获取登录用户的手机号码
      let claims = sessionStorage.getItem('token').split(".")[1];
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
      });
    }
  } else {
    next();
  }
});

// 路由执行后
router.afterEach(route => {
  LoadingBar.finish();
});

export default router;
