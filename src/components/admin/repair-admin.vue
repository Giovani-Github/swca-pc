<!-- 维修订单管理 -->
<template>
  <div>
    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在加载</div>
    </Spin>

    <Table highlight-row border :columns="orderColumns" :data="orderList"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="orderTotal" :page-size="pageSize" @on-change="pageChange"></Page>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "repair-admin",
    data() {
      return {
        // 加载中是否显示
        spinShow: true,
        // 当前页码
        pageNum: 1,
        // 每页条数
        pageSize: 6,
        // 订单总数
        orderTotal: 1,
        // 根据Userid查询出来的用户名
        userName: '',
        orderColumns: [
          {
            align: 'center',
            type: 'index',
            title: '#',
            width: 60,
            fixed: 'left'
          },
          {
            align: 'center',
            title: '姓名',
            tooltip: true,
            key: 'name',
            width: 120,
            fixed: 'left'
          },
          {
            align: 'center',
            title: '性别',
            key: 'gender',
            width: 100,
            render: (h, params) => {
              if (params.row.gender === 'female') {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'md-female',
                    },
                    style: {
                      fontSize: '18px',
                      color: '#FF6666'
                    }
                  }),
                ]);
              } else {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'md-male',
                    },
                    style: {
                      fontSize: '18px',
                      color: '#2b85e4'
                    }
                  }),
                ]);
              }

            }
          },
          {
            align: 'center',
            title: '状态',
            key: 'state',
            width: 120,
            render: (h, params) => {
              if (params.row.state === this.$store.state.global.repairState.COMMIT_INIT) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-radio-button-on',
                    },
                    style: {
                      fontSize: '14px',
                      color: '#2b85e4'
                    }
                  }),
                  h('span', {
                    style: {
                      marginLeft: '6px'
                    }
                  }, "已提交")
                ]);
              } else if (params.row.state === this.$store.state.global.repairState.ACCEPT) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-radio-button-on',
                    },
                    style: {
                      fontSize: '14px',
                      color: '#FF9900'
                    }
                  }),
                  h('span', {
                    style: {
                      marginLeft: '6px'
                    }
                  }, "已接单")
                ]);
              } else if (params.row.state === this.$store.state.global.repairState.SUCCESS) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-radio-button-on',
                    },
                    style: {
                      fontSize: '14px',
                      color: '#99CC33'
                    }
                  }),
                  h('span', {
                    style: {
                      marginLeft: '6px'
                    }
                  }, "已完成")
                ]);
              } else if (params.row.state === this.$store.state.global.repairState.CANCEL) {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'ios-radio-button-on',
                    },
                    style: {
                      fontSize: '14px',
                      color: '#CC3333'
                    }
                  }),
                  h('span', {
                    style: {
                      marginLeft: '6px'
                    }
                  }, "已取消")
                ]);
              }

            }
          },
          {
            align: 'center',
            title: '地址',
            tooltip: true,
            key: 'addres',
            width: 100
          },
          {
            align: 'center',
            title: '联系电话',
            key: 'phoneNum',
            width: 120
          },
          {
            align: 'center',
            title: '问题描述',
            key: 'remark',
            tooltip: true,
            width: 100
          },
          {
            align: 'center',
            title: '订单id',
            key: 'orderId',
            width: 100,
          },
          {
            align: 'center',
            title: '申请者id',
            key: 'userId',
            width: 100,
            render: (h, params) => {
              return h('div', [
                h('Tooltip', {
                  props: {
                    content: this.userName,

                  },
                  on: {
                    // Tooltip显示时调用
                    'on-popper-show': (event) => {
                      this.getUserName(params.row.userId);
                    }
                  }
                }, params.row.userId)
              ]);
            }
          },
          {
            align: 'center',
            title: '维修者id',
            key: 'acceptId',
            width: 100,
            render: (h, params) => {
              if (params.row.acceptId != '' && params.row.acceptId != undefined) {
                return h('Tooltip', {
                  props: {
                    content: this.userName,
                  },
                  on: {
                    // Tooltip显示时调用
                    'on-popper-show': (event) => {
                      this.getUserName(params.row.acceptId);
                    }
                  }
                }, params.row.acceptId);
              } else {
                return h('p', {}, '未接单');
              }
            }
          },

          {
            align: 'center',
            title: '申请时间',
            key: 'submitTime',
            width: 180,
            render: (h, params) => {
              if (params.row.submitTime != '' && params.row.submitTime != undefined) {
                return h('p', {}, new Date(params.row.submitTime).toLocaleString())
              } else {
                return h('p', {}, "申请未提交")
              }
            }
          },
          {
            align: 'center',
            title: '接单时间',
            key: 'acceptTime',
            width: 180,
            render: (h, params) => {
              if (params.row.acceptTime != '' && params.row.acceptTime != undefined) {
                return h('p', {}, new Date(params.row.acceptTime).toLocaleString())
              } else {
                return h('p', {}, "未接单")
              }
            }
          },
          {
            align: 'center',
            title: '维修完成时间',
            key: 'successTime',
            width: 180,
            render: (h, params) => {
              if (params.row.successTime != '' && params.row.successTime != undefined) {
                return h('p', {}, new Date(params.row.successTime).toLocaleString())
              } else {
                return h('p', {}, '维修未完成');
              }

            }
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            fixed: 'right',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.accept(params.row.orderId)
                    }
                  }
                }, '接受'),
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.success(params.row.orderId)
                    }
                  }
                }, '完成维修')
              ]);
            }
          }
        ],
        orderList: []
      }
    },
    methods: {
      /**
       * 维修完成
       * @param orderId
       */
      success: function (orderId) {
        this.$api.repairAdmin.success(orderId).then(
          res => {
            if (res.status == this.$store.state.global.status.OK) {
              // 刷新当前页面
              this.$router.go(0);
            }
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
      },

      /**
       * 接受订单
       * @param orderId
       */
      accept: function (orderId) {
        this.$api.repairAdmin.accept(orderId).then(
          res => {
            if (res.status == this.$store.state.global.status.OK) {
              // 刷新当前页面
              this.$router.go(0);
            }
          }
        ).catch(
          error => {
            console.log(error);
          }
        )
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
       * 获取用户名
       * @param userId
       */
      getUserName(userId) {
        this.$api.user.getUserNameByUserId(userId).then(
          res => {
            this.userName = res.data.userName;
          }
        );
      },

      getOrderList() {

        this.spinShow = true;

        this.$api.repairAdmin.findAllOrder(
          {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
        ).then(
          res => {
            console.log(res.data[0].list);
            this.orderTotal = res.data[0].total;
            this.orderList = res.data[0].list;

            this.spinShow = false;
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
      // 设置当前侧边栏选择项是2
      this.$store.commit('setAdminMenuActive', '2');
    }
  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";
</style>
