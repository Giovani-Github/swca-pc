<template>
  <div style="padding: 30px;">
    <Card :bordered="false" v-for="(order, index) in orderList" style="margin-bottom: 30px;">
      <p slot="title">{{order.name}}</p>
      <p>{{order.remark}} </p>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "orderList",
    data() {
      return {
        orderList: []
      }
    },
    created() {

      this.$api.repair.findAllOrder().then(
        res => {
          console.log(res.data[0])

          if (res.data[0].length !== 0) {

            this.orderList = res.data[0];

          } else {
            this.$Message.info({
              content: "您未申请过维修",
              duration: 10,
              closable: true
            });
          }
        }
      ).catch(
        error => {
          if (error.response.status === this.$store.state.global.status.FORBIDDEN) {
            this.$Message.warning({
              content: "请登录后再查看",
              duration: 10,
              closable: true
            });
          }
        }
      )
    }
  }
</script>

<style scoped lang='less'>
  @import "../../../common/less/global";
</style>
