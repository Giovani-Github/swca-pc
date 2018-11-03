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
        <!--<span>维修人员 {{getAcceptByOrderId(order.acceptId).userName}}</span>-->
        <!--<span>联系电话 {{getAcceptByOrderId(order.acceptId).phoneNum}}</span>-->
      </p>
    </Card>
    <Page :total="orderTotal" :page-size="pageSize" @on-change="pageChange"/>
  </div>
</template>

<script>
  export default {
    name: "order-list",
    data() {
      return {
        // 订单列表
        orderList: [],
        // 接单人列表，与订单列表的订单接收人id对应
        acceptList: [],
        // 当前页码
        pageNum: 1,
        // 每页条数
        pageSize: 2,
        // 订单总数
        orderTotal: 1
      }
    },
    methods: {
      /**
       * 页码改变
       * @param orderId
       */
      pageChange: function (currentPageNum) {
        this.pageNum = currentPageNum;
        this.getOrderList();
      },
      /**
       * 根据订单状态获取接单步骤的标题内容
       * @param orderId
       */
      getAcceptByOrderId(acceptId) {
        for (var i = 0; i < this.acceptList.length; i++) {
          if (this.acceptList[i].userId == acceptId) {
            return this.acceptList[i];
          }
        }
      },
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
      },
      /**
       * 分页获取订单列表
       * @param order
       */
      getOrderList() {
        this.$api.repair.findAllOrder(
          {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
        ).then(
          res => {
            // 判断是否查询到订单信息
            if (res.data[0].list.length != 0) {
              console.log(res.data[0]);
              // 保存订单信息
              this.orderList = res.data[0].list;
              // 保存订单总条数
              this.orderTotal = res.data[0].total;
              for (var i = 0; i < this.orderList.length; i++) {
                // 如果是已经被接单的订单，获取到接单人的信息
                if (this.orderList[i].acceptId != '' && this.orderList[i].acceptId != undefined) {
                  this.$api.user.getUserByUserId(this.orderList[i].acceptId).then(
                    res => {
                      // 保存接单人信息, 数组要用push，否则页面无法检测到数据已经更新，导致书信数据
                      this.acceptList.push(res.data.user)
                    }
                  );
                }
              }
            } else {
              this.$Message.info({
                content: "您未申请过维修",
                duration: 10,
                closable: true
              });
            }
          }
        );
      }
    },
    created() {
      this.getOrderList();
    }
  }
</script>

<style scoped lang='less'>
  @import "../../../common/less/global";
  span {
    margin-left: 10px;
  }
</style>
