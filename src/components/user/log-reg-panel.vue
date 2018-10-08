<!-- 注册登录面板 -->
<template>
  <Modal
    v-model="myLogRegPopup"
    title="Common Modal dialog box title"
    @on-ok="ok"
    @on-cancel="cancel">
    <p>{{myLogRegPopup}}</p>
    <p>Content of dialog</p>
    <p>Content of dialog</p>
  </Modal>

</template>

<script>
  export default {
    name: "log-reg-panel",
    data() {
      return {
        myLogRegPopup: this.logRegPopup, // 注册登录面板是否弹出
      }
    },
    methods: {
      ok() {
        console.log(this.myLogRegPopup);
      },
      cancel() {
        console.log(this.myLogRegPopup);
      },
    },
    props: {
      // 注册登录面板是否弹出
      logRegPopup: {
        type: Boolean,
        default: false,
      },
    },
    watch: {
      // 监测logRegPopup属性的值是否改变，val：改变后的值
      logRegPopup(val) {
        this.myLogRegPopup = val;
      },

      // 监测myLogRegPopup属性的值是否改变, val：改变后的值
      myLogRegPopup(val) {
        // 通知父组件，调用on-logRegPopup-change方法，传递val参数
        this.$emit("on-logRegPopup-change", val);
      }
    }

  }
</script>

<style scoped>

</style>
