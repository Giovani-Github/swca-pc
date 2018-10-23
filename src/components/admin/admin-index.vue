<template>
  <div class="layout">
    <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
      <div class="user-admin">
        <Avatar size="large" class="avatar" src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        <div class="user-name-admin">
          你真好看
        </div>
        <Tag color="orange">管理员</Tag>
        <div>
          <Button type="success">个人中心</Button>
          <Button type="error">退出</Button>
        </div>
      </div>
      <Menu active-name="1" theme="dark" width="auto" :open-names="['1']">
        <MenuItem name="1">
          <Icon type="ios-keypad"></Icon>
          成员管理
        </MenuItem>
        <router-link :to="{name:'repairAdmin'}">
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            维修订单管理
          </MenuItem>
        </router-link>
        <Submenu name="3">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            首页管理
          </template>
          <MenuItem name="3-1">轮播图</MenuItem>
          <MenuItem name="3-2">新消息发布</MenuItem>
        </Submenu>
        <Submenu name="4">
          <template slot="title">
            <Icon type="ios-keypad"></Icon>
            计算机教程
          </template>
          <MenuItem name="4-1">教程管理</MenuItem>
          <MenuItem name="4-2">教程发布</MenuItem>
        </Submenu>

      </Menu>
    </Sider>
    <Layout :style="{marginLeft: '200px'}">
      <Content :style="{padding: '0 16px 16px', marginTop:'10px'}">
        <Card style="min-height: 600px">
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

