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

  import HeaderSw from "./components/header-sw";
  import FooterSw from "./components/footer-sw";
  export default {
  name: 'App',
  components: {FooterSw, HeaderSw}
}
</script>

<style lang="less">
  .layout {
    /*background: #eee;*/
  }

  .footer {

  }
</style>
