<template>
  <div>
    <button @click="demo1">点击测试</button>
  </div>
</template>

<script>
  export default {
    name: "Course",
    methods: {
      demo1() {
        this.$api.demo.demo1().then(
          res => {
            this.$Message.info(res.data);
          }
        ).catch(
          error => {
            this.$Message.error(error);
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
