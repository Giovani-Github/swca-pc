<template>
  <div style="padding: 30px;">
    <Card :bordered="false" :key="index" v-for="(order, index) in orderList" style="margin-bottom: 30px;">
      <p slot="title">
        {{order.name}}
      <p>
        <Steps :current="order.state === 3 ? 1 : order.state" :status="order.state === 3 ? 'error' : 'process'">
          <Step title="已提交" :content="(new Date(order.submitTime)).toLocaleString()"></Step>
          <Step :title="getAcceptStepTitle(order.state)" :content="getAcceptStepContent(order)"></Step>
          <Step :title="getSuccessStepTile(order.state)" :content="getSuccessStepContent(order)"></Step>
        </Steps>
      </p>

      <p style="margin-top: 10px;" v-if="order.state >= 1 && order.state != 3">
        <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg"/>
        <span>维修人员 李庆旺  {{order.accept.userName}}</span>
        <span>联系电话 15219331778</span>
      </p>
    </Card>
    <Page :total="100"/>
  </div>
</template>

<script>
  export default {
    name: "orderList",
    data() {
      return {
        orderList: [],
      }
    },
    methods: {
      /**
       * 根据订单状态获取接单步骤的标题内容
       * @param state
       */
      getAcceptStepTitle(state) {
        if (state >= 1 && state != 3) {
          return "已接单";
        } else if (state === 3) {
          return "已取消";
        } else {
          return "待接单";
        }
      },

      /**
       * 根据订单，获取接单步骤的详细内容
       * @param order
       */
      getAcceptStepContent(order) {
        if (order.state >= 1 && order.state != 3) {


          // 如果已经接单，查询出接单者详细信息
          if (order.acceptId !== '' && order.acceptId !== undefined) {

          }
          return new Date(order.acceptTime).toLocaleString();

        } else if (order.state === 3) {
          return "你已经取消订单";
        } else {
          return "等待维修人员接单维修"
        }
      },

      /**
       * 根据订单状态获取完成步骤的标题内容
       * @param state
       */
      getSuccessStepTile(state) {
        if (state === 2) {
          return "已完成";
        } else if (state === 3) {
          return "已取消";
        } else {
          return "待维修"
        }
      },
      /**
       * 根据订单，获取完成步骤的详细内容
       * @param order
       */
      getSuccessStepContent(order) {
        if (order.state === 2) {
          return new Date(order.successTime).toLocaleString();
        } else if (order.state === 3) {
          return "你已经取消订单";
        } else {
          return "等待维修"
        }
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

  span {
    margin-left: 10px;
  }
</style>
