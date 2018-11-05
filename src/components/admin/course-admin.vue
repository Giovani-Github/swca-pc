<!-- 教程管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'courseAdmin'}">
          <Icon type="ios-book"/>
          教程管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      教程管理
    </Card>
  </div>
</template>

<script>
  export default {
    name: "course-admin",
    created() {
      // 设置当前侧边栏选择项是4-2
      this.$store.commit('setAdminMenuActive', '4-2');
    }
  }
</script>

<style scoped>

</style>
