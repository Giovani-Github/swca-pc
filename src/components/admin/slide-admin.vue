<!-- 首页轮播图管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'slideAdmin'}">
          <Icon type="ios-navigate"></Icon>
          轮播图管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      轮播图管理
    </Card>
  </div>
</template>

<script>
  export default {
    name: "slide-admin",
    created() {
      // 设置当前侧边栏选择项是3-1
      this.$store.commit('setAdminMenuActive', '3-1');
    }
  }
</script>

<style scoped>

</style>
