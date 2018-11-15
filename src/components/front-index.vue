<!-- 前台主框架 -->
<template>
  <Layout class="layout">
    <header-sw></header-sw>
    <Content :style="{margin: '66px 0px 0px 0px', minHeight:'520px'}">
      <!--<transition name="bounce" enter-active-class="animated bounceInLeft"
                  leave-active-class="animated bounceOutRight">-->
      <router-view/>
      <!--</transition>-->
    </Content>
    <footer-sw class="footer"></footer-sw>
    <!-- 个人中心 -->
    <user-center></user-center>
  </Layout>
</template>

<script>

  import HeaderSw from "./header-sw";
  import FooterSw from "./footer-sw";
  import UserCenter from "./user/user-center";

  export default {
    name: "front-index",
    components: {UserCenter, FooterSw, HeaderSw},
  }
</script>

<style scoped>

</style>
