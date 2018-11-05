<!-- 首页文章发布 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'articlePublishAdmin'}">
          <Icon type="ios-navigate"></Icon>
          文章发布
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      文章发布
    </Card>
  </div>
</template>

<script>
  export default {
    name: "article-publish-admin",
    created() {
      // 设置当前侧边栏选择项是3-2
      this.$store.commit('setAdminMenuActive', '3-2');
    }
  }
</script>

<style scoped>

</style>
