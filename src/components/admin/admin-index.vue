<!-- 后台管理主框架 -->
<template>
  <div class="admin-index">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <div class="user-admin">
        <Avatar size="large" class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        <div class="user-name-admin">
          <span class="userName">{{getUserInfo()}}</span>
        </div>
        <Tag color="orange">管理员</Tag>
        <div>
          <Button type="success">个人中心</Button>
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
            <MenuItem name="3-2">文章发布</MenuItem>
          </router-link>
          <router-link :to="{name:'articleAdmin'}">
            <MenuItem name="3-3">文章管理</MenuItem>
          </router-link>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-book"/>
            计算机教程
          </template>
          <router-link :to="{name:'courseAdmin'}">
            <MenuItem name="4-1">教程管理</MenuItem>
          </router-link>
          <router-link :to="{name:'coursePublishAdmin'}">
            <MenuItem name="4-2">教程发布</MenuItem>
          </router-link>
        </Submenu>
      </Menu>
    </Sider>
    <div class="layout" :style="{marginLeft: '200px', padding:'20px'}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import FooterSw from "../footer-sw";

  export default {
    name: "admin-index",
    components: {FooterSw},
    data() {
      return {};
    },
    computed: {},
    methods: {
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
      // 一到首页，就重新定位到会员管理
      this.$router.push({name: 'personnelAdmin'})
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

