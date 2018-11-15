<!-- 前台主框架，头部导航 -->
<template>
  <div class="header" :style="{position: 'fixed', width: '100%'}">

    <Menu class="menu" mode="horizontal" :active-name="activeName" @on-select="onSelect">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col :sm="1" offset="1" class="home">
          <router-link :to="{name:'index'}">
            <img @click="homeClick" src="../assets/swca-logo.png" alt="" class="layout-logo">
          </router-link>
        </Col>

        <Col :sm="6" offset="1" class="search">
          <Input @on-search="onSearch" search enter-button placeholder="Enter something..."/>
        </Col>

        <Col :sm="7" offset="7" :xs="0">
          <div class="layout-nav">
            <router-link :to="{name: 'course'}">
              <MenuItem name="2">
                <Icon class="icon" type="md-book"/>
                计算机教程
              </MenuItem>
            </router-link>
            <Submenu name="3">
              <template slot="title">
                <Icon class="icon" type="md-ionic"/>
                工具
              </template>
              <MenuGroup title="电脑报修">
                <router-link :to="{name:'commit'}">
                  <MenuItem name="3-1">申请维修</MenuItem>
                </router-link>
                <router-link :to="{name:'orderList'}">
                  <MenuItem name="3-2">维修进度</MenuItem>
                </router-link>
              </MenuGroup>
              <MenuGroup title="其他">
                <MenuItem name="3-4">课表查询</MenuItem>
                <MenuItem name="3-5">公交路线</MenuItem>
                <MenuItem name="3-6">成绩查询</MenuItem>
              </MenuGroup>
            </Submenu>

            <Submenu v-if="!isLogin" name="4">
              <template slot="title">
                <Icon class="icon" type="ios-contact"/>
                登录/注册
              </template>
              <MenuItem name="4-1">登录</MenuItem>
              <MenuItem name="4-2">注册</MenuItem>
            </Submenu>

            <Submenu v-if="isLogin" name="5">
              <template slot="title">
                <!-- 用户头像取用户名第一个字母大写 -->
                <Avatar :style="{background: userColor}">{{getUserInfo().charAt(0).toUpperCase()}}</Avatar>
                <span class="userName">{{getUserInfo()}}</span>
              </template>
              <div v-if="isLogin">
                <MenuItem name="5-1">个人中心</MenuItem>
                <MenuItem name="5-2">退出登录</MenuItem>
              </div>
            </Submenu>
          </div>
        </Col>
      </Row>
    </Menu>
    <login-panel :panelPopup="logPanelPopup" @on-panelPopup-change="onLogPopupChange"
                 @on-isLogin-change="onIsLoginChange"></login-panel>
    <register-panel :panelPopup="regPanelPopup" @on-panelPopup-change="onRegPopupChange"></register-panel>
  </div>
</template>

<script>
  import LoginPanel from "./user/login-panel";
  import RegisterPanel from "./user/register-panel";

  const ColorList = ['#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9', '#BEEDC7', '#D6D5B7', '#D1BA74', '#E6CEAC', '#ECAD9E', '#F4606C'];

  export default {
    name: "header-sw",
    components: {RegisterPanel, LoginPanel},
    data() {
      return {
        activeName: 1, // 导航当前焦点
        userColor: ColorList[0], // 用户头像颜色
        isLogin: false, // 是否登录
        logPanelPopup: false, // 登录面板是否弹出
        regPanelPopup: false, // 注册面板是否弹出
      }
    },
    methods: {

      // 获取用户信息
      getUserInfo() {
        if (sessionStorage.getItem('userName') != '') {
          return sessionStorage.getItem('userName');
        } else {
          return sessionStorage.getItem('phoneNum');
        }
      },

      // 登录面板中，myPanelPopup属性值改变后，调用该方法
      onLogPopupChange(val) {
        this.logPanelPopup = val;
      },
      // 注册面板中，myPanelPopup属性值改变后，调用该方法
      onRegPopupChange(val) {
        this.regPanelPopup = val;
      },
      // 登录面板中，IsLogin属性值改变后，调用该方法
      onIsLoginChange(val) {
        this.isLogin = val;
      },

      // 点击logo时，把导航栏焦点清除
      homeClick: function () {
        this.activeName = 1;
      },

      // 选择菜单（MenuItem）时触发
      onSelect: function (name) {
        // 更改导航焦点
        this.activeName = name;

        // 弹出登录面板
        if (name == "4-1") {
          // 需要使用组件的props双向绑定，请阅读错误总结.md
          this.logPanelPopup = true;
        }

        // 弹出注册面板
        if (name == "4-2") {
          this.regPanelPopup = true;
        }

        // 退出登录
        if (name == "5-2") {
          this.isLogin = false;
          // 清除token,用户名，和手机号码
          sessionStorage.clear('token');
          sessionStorage.clear('userName');
          sessionStorage.clear('phoneNum');
          this.$router.push({name: 'index'})
        }

        // 个人中心
        if (name == '5-1') {
          this.$store.commit('setUserCenter', true);
        }
      },
      onSearch: function () {

      }
    },
    created() {
      // 每次刷新页面，随机更换一次头像的颜色
      this.userColor = ColorList[Math.floor(Math.random() * 10)];

      // 每次刷新页面，都判断用户是否已经登陆
      if (sessionStorage.getItem('token') != '' && sessionStorage.getItem('token') != undefined) {
        this.isLogin = true;
      }
    },

  }
</script>

<style scoped lang='less'>
  @import "../common/less/global";

  .header {
    z-index: 999;
  }

  /*.menu {*/
  /*background-color: rgba(255, 255, 255, 0.94);*/
  /*-moz-box-shadow: 0px 6px 10px #eee;*/
  /*-webkit-box-shadow: 0px 6px 10px #eee;*/
  /*box-shadow: 0px 4px 6px #eee;*/
  /*}*/

  .search {
    height: 60px;
    display: flex; /*Flex布局*/
    display: -webkit-flex; /* Safari */
    align-items: center; /*指定垂直居中*/
  }

  .layout-logo {
    width: 50px;
    height: 50px;
    position: relative;
    top: 5px;

  }

  .layout-nav {
    width: 520px;
  }

  .userName {
    margin-left: 8px;
  }

  .icon {
    font-size: 20px;
  }

  // 导航下边框去除
  .ivu-menu-horizontal.ivu-menu-light:after {
    height: 0px;
  }

</style>
