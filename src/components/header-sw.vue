<template>
  <Header :style="{position: 'fixed', width: '100%'}">

    <Menu mode="horizontal" active-name="1">
      <Row type="flex" justify="start" class="code-row-bg">
        <Col :sm="1" offset="1">
          <a href="">
            <img src="../assets/swca-logo.png" alt="" class="layout-logo">
          </a>
        </Col>

        <Col :sm="6" offset="1">
          <Input placeholder="Enter something..." style="width: 300px"/>
        </Col>

        <Col :sm="7" offset="7" :xs="0">
          <div class="layout-nav">
            <router-link to="/course">
              <MenuItem name="2">
                <Icon type="ios-people"/>
                计算机教程
              </MenuItem>
            </router-link>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-stats"/>
                工具
              </template>
              <MenuGroup title="电脑保修">
                <MenuItem name="3-1">提交保修订单</MenuItem>
                <MenuItem name="3-2">报修管理</MenuItem>
              </MenuGroup>
              <MenuItem name="3-4">课表查询</MenuItem>
              <MenuItem name="3-5">公交路线</MenuItem>
              <MenuItem name="3-5">成绩查询</MenuItem>
            </Submenu>

            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-stats"/>
                个人中心
              </template>
              <MenuGroup title="电脑保修">
                <MenuItem name="3-1">提交保修订单</MenuItem>
                <MenuItem name="3-2">报修管理</MenuItem>
              </MenuGroup>
              <MenuItem name="3-4">课表查询</MenuItem>
              <MenuItem name="3-5">公交路线</MenuItem>
              <MenuItem name="3-5">成绩查询</MenuItem>
            </Submenu>
          </div>
        </Col>
      </Row>
    </Menu>
  </Header>
</template>

<script>
  export default {
    name: "header-sw"
  }
</script>

<style scoped>
  .layout-logo {
    width: 50px;
    height: 50px;
    position: relative;
    top: 6px;
  }

  .layout-nav {
    width: 520px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
