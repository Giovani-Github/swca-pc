<!-- 后台管理主框架 -->
<template>
  <div class="admin-index">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <div class="user-admin">
        <Avatar size="large" class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        <div class="user-name-admin">
          <span class="userName">{{getUserInfo()}}</span>
        </div>
        <Tag v-if="auth === 3" color="red">超级管理员</Tag>
        <Tag v-if="auth === 2" color="orange">管理员</Tag>
        <div>
          <Button @click="userCenter" type="success">个人中心</Button>
          <Button type="error" @click="logout()">退出</Button>
        </div>
      </div>
      <Menu :active-name="$store.state.global.adminMenuActive" theme="dark" width="auto" :open-names="['2']">
        <router-link :to="{name:'personnelAdmin'}">
          <MenuItem name="1">
            <Icon class="icon" type="ios-people"/>
            会员管理
          </MenuItem>
        </router-link>
        <router-link :to="{name:'repairAdmin'}">
          <MenuItem name="2">
            <Icon class="icon" type="ios-build"/>
            维修订单管理
          </MenuItem>
        </router-link>
        <Submenu name="3">
          <template slot="title">
            <Icon class="icon" type="ios-navigate"></Icon>
            首页管理
          </template>
          <router-link :to="{name:'slideAdmin'}">
            <MenuItem name="3-1">轮播图</MenuItem>
          </router-link>
          <router-link :to="{name:'articlePublishAdmin'}">
            <MenuItem name="3-2">文章或教程发布</MenuItem>
          </router-link>
          <router-link :to="{name:'articleAdmin'}">
            <MenuItem name="3-3">文章或教程管理</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <div class="layout" :style="{marginLeft: '200px', padding:'20px'}">
      <router-view></router-view>
    </div>

    <!-- 个人中心-->
    <user-center></user-center>
  </div>
</template>

<script>
  import FooterSw from "../footer-sw";
  import UserCenter from "../user/user-center";

  export default {
    name: "admin-index",
    components: {UserCenter, FooterSw},
    data() {
      return {
        // 用户权限
        auth: 0
      };
    },
    computed: {},
    methods: {
      /**
       * 个人中心
       */
      userCenter: function () {
        this.$store.commit('setUserCenter', true);
      },

      // 退出登陆
      logout: function () {
        // 清除token,用户名，和手机号码
        sessionStorage.clear('token');
        sessionStorage.clear('userName');
        sessionStorage.clear('phoneNum');
        this.$router.push({name: 'index'})
      },

      // 获取用户信息
      getUserInfo() {
        if (sessionStorage.getItem('userName') != '') {
          return sessionStorage.getItem('userName');
        } else {
          return sessionStorage.getItem('phoneNum');
        }
      },
    },
    created() {
      // 获取登录用户的手机号码
      let claims = sessionStorage.getItem('token').split(".")[1];
      claims = JSON.parse(Base64.decode(claims));
      
      // 获取该用户的所有权限列表
      this.$api.user.getUserRolesByPhoneNum(claims.phoneNum).then(
        res => {
          // 循环查找是否有admin权限
          if (res.data.roles.length === 3) {
            // 超级管理员
            this.auth = 3;
          } else if (res.data.roles.length === 2) {
            // 管理员
            this.auth = 2;
          }
        });

    }

  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";

  .user-admin {
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;

    div {
      margin-top: 6px;
    }

    .user-name-admin {
      color: #f8f8f9;
    }
  }

  .icon {
    font-size: 20px;
  }

</style>

