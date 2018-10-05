<template>
  <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
</template>

<script>
    export default {
        name: "footer-sw"
    }
</script>

<style scoped lang='less'>
  @import "../common/less/global";

  .layout-footer-center {
    padding: 20px;
    background-color: @Background;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
