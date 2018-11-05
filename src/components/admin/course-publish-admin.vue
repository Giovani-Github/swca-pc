<!-- 教程发布 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'coursePublishAdmin'}">
          <Icon type="ios-book"/>
          教程发布
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      教程发布
    </Card>
  </div>
</template>

<script>
  export default {
    name: "course-publish-admin",
    created() {
      // 设置当前侧边栏选择项是4-2
      this.$store.commit('setAdminMenuActive', '4-2');
    }
  }
</script>

<style scoped>

</style>
