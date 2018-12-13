<template>
  <div style="padding: 30px;">
    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在加载</div>
    </Spin>
    <Card :bordered="false" :key="index" v-for="(order, index) in orderList" style="margin-bottom: 30px;">
      <p slot="title">
        {{order.name}}
      </p>
      <p>
        <!--
          current: 当前进度条位置。
            如果当前订单已取消，那么进度条就在第二个位置，并且样式未error。
            如果当前订单没有取消，根据订单状态，选择进度条位置。订单状态和三个进度条位置对应。
            0: 为取消订单
            1：已接受
            2：已完成
            3: 取消
        -->
        <Steps :current="order.state === $store.state.global.repairState.CANCEL ? 1 : order.state"
               :status="order.state === $store.state.global.repairState.CANCEL ? 'error' : 'process'">
          <Step title="已提交" :content="(new Date(order.submitTime)).toLocaleString()"></Step>
          <Step :title="getAcceptStepTitle(order.state)" :content="getAcceptStepContent(order)"></Step>
          <Step :title="getSuccessStepTile(order.state)" :content="getSuccessStepContent(order)"></Step>
        </Steps>

        <!-- 判断当前订单状态是否是未取消或者未完成 -->
        <span
          v-if="order.state != $store.state.global.repairState.CANCEL && order.state != $store.state.global.repairState.SUCCESS"
          class="ivu-tabs-nav-right">
          <Button @click="cancel(order.orderId)" type="error" ghost>取消订单</Button>
        </span>

      </p>

      <Divider orientation="left">问题描述</Divider>
      <span>{{order.remark}}</span>

      <!-- 判断当前订单状态是否是已接受或者已完成并且未取消 -->
      <div
        v-if="order.state >= $store.state.global.repairState.ACCEPT && order.state != $store.state.global.repairState.CANCEL">
        <Divider orientation="left">接单信息</Divider>
        <Button @click="openAccept(order.acceptId)" type="primary" ghost>点击查看</Button>

        <!--<span>维修人员： <Tag color="primary">{{getAcceptByOrderId(order.acceptId).userName}}</Tag> </span>-->
        <!--<span>联系电话： <Tag color="success">{{getAcceptByOrderId(order.acceptId).phoneNum}}</Tag></span>-->
        <Modal v-model="acceptModel">
          <p>姓名：{{acceptUser.userName}}</p>
          <p>性别：<span v-if="acceptUser.gender === 'male'">男</span> <span v-else> 女</span></p>
          <p>联系方式：{{acceptUser.phoneNum}}</p>
        </Modal>
      </div>


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
        orderTotal: 1,
        // 加载中是否显示
        spinShow: false,
        // 接单信息模态框
        acceptModel: false,
        // 接单人信息
        acceptUser: ''
      }
    },
    methods: {

      /**
       * 显示接单信息模态框
       */
      openAccept: function (acceptId) {
        this.acceptModel = true;
        this.getAcceptByOrderId(acceptId);
      },

      /**
       * 获取接单信息
       * @param acceptId
       */
      getAcceptByOrderId(acceptId) {
        this.$api.user.getUserByUserId(acceptId).then(
          res => {
            // 保存接单人信息
            this.acceptUser = res.data.user;
          }
        );
      },

      /**
       * 取消订单
       * @param orderId
       */
      cancel: function (orderId) {
        this.$api.repair.cancel(orderId).then(
          res => {
            if (res.status == this.$store.state.global.status.OK) {
              // 刷新当前页面
              this.$router.go(0);
            }
          }
        );
      },

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
        this.spinShow = true;

        this.$api.repair.findAllOrder(
          {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
        ).then(
          res => {
            // 判断是否查询到订单信息
            if (res.data[0].list.length != 0) {

              this.spinShow = false;

              // 保存订单信息
              this.orderList = res.data[0].list;
              // 保存订单总条数
              this.orderTotal = res.data[0].total;

            } else {
              this.$Message.info({
                content: "您未申请过维修",
                duration: 10,
                closable: true
              });
              this.spinShow = false;

            }
          }
        ).catch(
          error => {
            this.spinShow = false;
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
    margin-left: 20px;
  }
</style>
