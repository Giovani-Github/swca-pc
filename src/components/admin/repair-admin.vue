<!-- 维修订单管理 -->
<template>
  <div>
    <Table highlight-row border :columns="orderColumns" :data="orderList"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <!--<Page :total="100" :current="1" @on-change="changePage"></Page>-->
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "repair-admin",
    data() {
      return {
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
                      fontSize: '20px',
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
                      fontSize: '20px',
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
            width: 100
          },
          {
            align: 'center',
            title: '地址',
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
          },
          {
            align: 'center',
            title: '维修者id',
            key: 'acceptId',
            width: 100,
          },

          {
            align: 'center',
            title: '申请时间',
            key: 'submitTime',
            width: 180
          },
          {
            align: 'center',
            title: '接受时间',
            key: 'acceptTime',
            width: 180
          },
          {
            align: 'center',
            title: '维修完成时间',
            key: 'successTime',
            width: 180
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
                      this.show(params.index)
                    }
                  }
                }, '接受'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '维修完成')
              ]);
            }
          }
        ],
        orderList: []
      }
    },
    created() {
      this.$api.repairAdmin.findAllOrder().then(
        res => {
          console.log(res.data[0]);
          this.orderList = res.data[0];
        }
      ).catch(
        error => {
          console.log(error);
        }
      )
    }
  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";
</style>
