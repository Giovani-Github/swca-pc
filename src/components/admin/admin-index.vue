<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
        <MenuItem name="2-1">
          <Icon type="ios-keypad"></Icon>
          成员管理
        </MenuItem>
        <router-link :to="{name:'repairAdmin'}">
          <MenuItem name="3">
            <Icon type="ios-keypad"></Icon>
            维修订单管理
          </MenuItem>
        </router-link>
        <Submenu name="1">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            首页管理
          </template>
          <MenuItem name="1-1">轮播图</MenuItem>
          <MenuItem name="1-2">新消息发布</MenuItem>
        </Submenu>
        <Submenu name="2">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            计算机教程
          </template>
          <MenuItem name="2-1">教程管理</MenuItem>
          <MenuItem name="2-2">教程发布</MenuItem>
        </Submenu>

      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Header class="header"
              :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',position: 'fixed', width: '100%', padding: 0}">
        <span class="" :style="{}">
          <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
          Giovani
        </span>
      </Header>
      <Content :style="{padding: '0 16px 16px', marginTop:'84px'}">
        <Card>
          <router-view></router-view>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script>
  export default {
    name: "admin-index",
    data() {
      return {};
    },
    computed: {}

  }
</script>

<style scoped lang='less'>

  .header {
    z-index: 999;
  }

  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
  }

</style>

