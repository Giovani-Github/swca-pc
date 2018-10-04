<template>
  <Layout>
    <header-sw></header-sw>
    <Content :style="{margin: '66px 0px 20px 0px'}">
      <router-view/>
    </Content>
    <footer-sw></footer-sw>
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

<style>

</style>
