<!-- 会员管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'personnelAdmin'}">
          <Icon type="ios-people"/>
          会员管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      会员管理
    </Card>
  </div>
</template>

<script>
  export default {
    name: "personnel-admin",
    created() {
      // 设置当前侧边栏选择项是1
      this.$store.commit('setAdminMenuActive', '1');
    }
  }
</script>

<style scoped>

</style>
