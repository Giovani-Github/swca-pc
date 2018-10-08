<template>
  <Header class="header" :style="{position: 'fixed', width: '100%'}">

    <Menu class="menu" mode="horizontal" :active-name="activeName" @on-select="onSelect">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col :sm="1" offset="1" class="home">
          <router-link to="/">
            <img @click="homeClick" src="../assets/swca-logo.png" alt="" class="layout-logo">
          </router-link>
        </Col>

        <Col :sm="6" offset="1" class="search">
          <Input @on-search="onSearch" search enter-button placeholder="Enter something..."/>
        </Col>

        <Col :sm="7" offset="7" :xs="0">
          <div class="layout-nav">
            <router-link to="/course">
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
                <MenuItem name="3-1">申请维修</MenuItem>
                <MenuItem name="3-2">维修进度</MenuItem>
              </MenuGroup>
              <MenuGroup title="其他">
                <MenuItem name="3-4">课表查询</MenuItem>
                <MenuItem name="3-5">公交路线</MenuItem>
                <MenuItem name="3-6">成绩查询</MenuItem>
              </MenuGroup>
            </Submenu>

            <MenuItem v-if="!isLog" name="4">
              <Avatar style="margin-right: 6px" icon="ios-person"/>
              登录/注册
            </MenuItem>

            <Submenu v-if="isLog" name="5">
              <template slot="title">
                <!-- 用户头像取用户名第一个字母大写 -->
                <Avatar :style="{background: userColor}">{{userName.charAt(0).toUpperCase()}}</Avatar>
                <span class="userName">{{userName}}</span>
              </template>
              <div v-if="!isLog">
                <MenuItem name="5-1">登录</MenuItem>
                <MenuItem name="5-2">注册</MenuItem>
              </div>
              <div v-if="isLog">
                <MenuItem name="5-1">个人中心</MenuItem>
                <MenuItem name="5-2">退出登录</MenuItem>
              </div>
            </Submenu>
          </div>
        </Col>
      </Row>
    </Menu>

    <log-reg-panel :logRegPopup="logRegPopup" @on-logRegPopup-change="onLogRegPopupChange"></log-reg-panel>
  </Header>
</template>

<script>
  import LogRegPanel from "./user/log-reg-panel";

  const ColorList = ['#19CAAD', '#8CC7B5', '#A0EEE1', '#BEE7E9', '#BEEDC7', '#D6D5B7', '#D1BA74', '#E6CEAC', '#ECAD9E', '#F4606C'];

  export default {
    name: "header-sw",
    components: {LogRegPanel},
    data() {
      return {
        activeName: 1, // 导航当前焦点
        userName: 'Giovani',
        userColor: ColorList[0], // 用户头像颜色
        isLog: false, // 是否登录
        logRegPopup: false, // 登录注册面板是否弹出
      }
    },
    methods: {

      // 注册登录面板中，myLogRegPopup属性值改变后，调用该方法
      onLogRegPopupChange(val) {
        this.logRegPopup = val;
      },

      // 点击logo时，把导航栏焦点清除
      homeClick: function () {
        this.activeName = 1;
      },

      // 选择菜单（MenuItem）时触发
      onSelect: function (name) {
        // 更改导航焦点
        this.activeName = name;

        // 弹出注册登录面板
        if (name == 4) {
          // 需要使用组件的props双向绑定，请阅读错误总结.md
          this.logRegPopup = true;
        }
      },

      // 点击搜索或按下回车，调用该方法
      onSearch: function (value) {
        console.log(value);
      }
    },
    created() {
      // 每次刷新页面，随机更换一次头像的颜色
      this.userColor = ColorList[Math.floor(Math.random() * 10)];
    }

  }
</script>

<style scoped lang='less'>
  @import "../common/less/global";

  .header {
    z-index: 999;
  }

  .menu {
    background-color: rgba(255, 255, 255, 0.94);
    -moz-box-shadow: 0px 6px 10px #eee;
    -webkit-box-shadow: 0px 6px 10px #eee;
    box-shadow: 0px 4px 6px #eee;
  }

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
