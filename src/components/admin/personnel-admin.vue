<!-- 会员管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'personnelAdmin'}">
          <Icon type="ios-people"/>
          会员管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>

      <Table highlight-row border :columns="orderColumns" :data="userList"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="userTotal" :page-size="pageSize" @on-change="pageChange"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "personnel-admin",

    data() {
      return {
        // 用户信息列表
        userList: [],
        // 用户权限列表，对应用户手机号码
        userRoleList: [],
        // 加载中是否显示
        spinShow: true,
        // 当前页码
        pageNum:
          1,
        // 每页条数
        pageSize:
          2,
        // 订单总数
        userTotal: 1,

        orderColumns:
          [
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
              key: 'userName',
              width: 120,
              fixed: 'left',
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
              title: '邮箱',
              key: 'email',
              width: 120,
              render: (h, params) => {
                if (params.row.email) {
                  return h('span', params.row.email)
                } else {
                  return h('span', "未绑定邮箱");
                }
              }
            },
            {
              align: 'center',
              title: '手机号码',
              key: 'phoneNum',
              width: 120
            },
            {
              align: 'center',
              title: '学号',
              key: 'stuNum',
              width: 130,
              render: (h, params) => {
                if (params.row.stuNum) {
                  return h('span', params.row.stuNum)
                } else {
                  return h('span', "未认证学生身份");
                }
              }
            },
            {
              align: 'center',
              title: '用户id',
              key: 'userId',
              width: 100
            },
            {
              align: 'center',
              title: '用户权限',
              width: 120,
              render: (h, params) => {

                // 根据手机号码，从权限列表中取出权限
                let authString = this.getAuthString(params.row.phoneNum);

                if (authString === '普通会员') {
                  return h('Tag', {
                    props: {
                      color: 'geekblue'
                    }
                  }, authString)

                } else if (authString === '管理员') {

                  return h('Tag', {
                    props: {
                      color: 'orange'
                    }
                  }, authString)

                } else if (authString === '超级管理员') {

                  return h('Tag', {
                    props: {
                      color: 'red'
                    }
                  }, authString)

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
                        this.updateAuth(params.row.userId)
                      }
                    }
                  }, '修改用户权限')
                ]);
              }
            }
          ],
      }
    },
    methods: {

      /**
       * 根据手机号码，从权限列表中获取权限
       * @param phoneNum
       */
      getAuthString: function (phoneNum) {
        for (var i = 0; this.userRoleList.length; i++) {
          if (this.userRoleList[i].phoneNum === phoneNum) {
            if (this.userRoleList[i].roles.length === 1) {
              return "普通会员";
            } else if (this.userRoleList[i].roles.length === 2) {
              return "管理员";
            } else if (this.userRoleList[i].roles.length === 3) {
              return "超级管理员";
            }
          }
        }
      },

      /**
       * 修改用户权限
       * @param userId
       */
      updateAuth: function (userId) {
        console.log(userId)
      },

      /**
       * 页码改变
       * @param currentPageNum
       */
      pageChange: function (currentPageNum) {
        this.pageNum = currentPageNum;
        this.getUserList();
      }
      ,

      getUserList() {

        this.spinShow = true;

        this.$api.personnelAdmin.findAllUser(
          {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          }
        ).then(
          res => {
            console.log(res.data[0].list);
            this.userTotal = res.data[0].total;
            this.userList = res.data[0].list;

            for (var i = 0; i < this.userList.length; i++) {

              console.log("手机号码：" + this.userList[i].phoneNum);

              // 获取该用户的所有权限列表
              this.$api.user.getUserRolesByPhoneNum(this.userList[i].phoneNum).then(
                res => {

                  console.log(res.data);

                  // 向当前的userRoleList中添加
                  // 每条数据包含用户手机号码，和用户权限。可根据用户手机号码获取权限
                  this.userRoleList.push(res.data);

                }
              );
            }

            this.spinShow = false;
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        );
      }
    }
    ,
    created() {
      this.getUserList();
      // 设置当前侧边栏选择项是1
      this.$store.commit('setAdminMenuActive', '1');
    }
  }
</script>

<style scoped>

</style>
