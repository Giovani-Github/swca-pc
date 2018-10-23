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
  </Layout>
</template>

<script>

  import HeaderSw from "./header-sw";
  import FooterSw from "./footer-sw";

  export default {
    name: "front-index",
    components: {FooterSw, HeaderSw},
  }
</script>

<style scoped>

</style>
