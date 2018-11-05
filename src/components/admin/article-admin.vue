<!-- 首页文章管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'articleAdmin'}">
          <Icon type="ios-navigate"></Icon>
          文章管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      文章管理
    </Card>
  </div>
</template>

<script>
  export default {
    name: "article-admin",
    created() {
      // 设置当前侧边栏选择项是3-3
      this.$store.commit('setAdminMenuActive', '3-3');
    }
  }
</script>

<style scoped>

</style>
