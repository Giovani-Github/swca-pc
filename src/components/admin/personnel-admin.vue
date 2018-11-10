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
      <p slot="title">多条件搜索</p>
      <Row>
        <Col span="8" style="text-align: center">
          姓名：
          <Input v-model="userInfo.userName" placeholder="输入姓名" style="width: 250px"/>
        </Col>
        <Col span="8" style="text-align: center">
          邮箱：
          <Input v-model="userInfo.email" placeholder="输入邮箱" style="width: 250px"/>
        </Col>
        <Col span="8" style="text-align: center">
          手机号码：
          <Input v-model="userInfo.phoneNum" placeholder="输入手机号码" style="width: 250px"/>
        </Col>
      </Row>
      <Row style="margin-top: 20px">
        <Col span="8" style="text-align: center">
          学号：
          <Input v-model="userInfo.stuNum" placeholder="输入学号" style="width: 250px"/>
        </Col>
        <Col span="8" style="text-align: center">
          用户id：
          <Input v-model="userInfo.userId" placeholder="输入用户id" style="width: 250px"/>
        </Col>
        <Col span="8" style="text-align: center">
          用户权限：
          <Input v-model="userInfo.role" placeholder="输入用户权限" style="width: 250px"/>
        </Col>
      </Row>
      <Row>
        <Col>
          <div style="float: right; margin-top: 20px">
            <Button @click="search" type="primary" icon="ios-search">搜索</Button>
          </div>
        </Col>
      </Row>
    </Card>

    <Card style="margin-top: 20px">
      <p slot="title">用户列表</p>

      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>
      <Table size="large" highlight-row border :columns="userColumns" :data="userList"></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="userTotal" :page-size="pageSize" @on-change="pageChange"></Page>
        </div>
        <div style="margin: 10px">
          <Icon style="font-size: 18px; color:#2d8cf0; margin-right: 6px" type="md-contacts"/>
          会员总数：{{userTotal}}
        </div>
      </div>
    </Card>
    <Modal
      title="修改权限"
      v-model="authModal"
      class-name="vertical-center-modal">
      <Spin fix v-if="modalSpinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>修改中</div>
      </Spin>
      <Select :clearable=true @on-change="optionChange" v-model="selectModel" style="">
        <Option v-for="auth in authList" :value="auth.roleId" :key="auth.roleId">{{
          auth.remark }}
        </Option>
      </Select>

      <div slot="footer" style="text-align:center">
        <Button type="primary" @click="onOk">确定</Button>
      </div>
    </Modal>
  </div>

</template>

<script>
  export default {
    name: "personnel-admin",

    data() {
      return {
        // 多条件搜索
        userInfo: {
          userName: '',
          email: '',
          phoneNum: '',
          stuNum: '',
          userId: '',
          role: ''
        },
        // 用户信息列表
        userList: [],
        // 用户权限列表，对应用户手机号码
        userRoleList: [],
        // 加载中是否显示
        spinShow: true,
        // 模态框的加载中是否显示
        modalSpinShow: false,
        // 当前页码
        pageNum: 1,
        // 每页条数
        pageSize: 6,
        // 订单总数
        userTotal: 1,
        // 修改权限模态框
        authModal: false,
        // 修改权限模态框中选择框选中的权限id
        roleId: 0,
        // 选中修改权限模态框时的用户id
        userId: 0,
        // 选中修改权限模态框时的用户手机号码
        phoneNum: '',

        // 权限列表
        authList:
          [
            {
              roleId: '1',
              remark: '普通用户'
            },
            {
              roleId: '2',
              remark: '管理员'
            },
            {
              roleId: '3',
              remark: '超级管理员'
            }
          ],
        selectModel: '',

        userColumns:
          [
            {
              align: 'center',
              type: 'index',
              title: '#',
            },
            {
              align: 'center',
              title: '姓名',
              tooltip: true,
              key: 'userName',
            },
            {
              align: 'center',
              title: '性别',
              key: 'gender',
              filters: [
                {
                  label: '男',
                  value: 1
                },
                {
                  label: '女',
                  value: 2
                }
              ],
              filterMultiple: false,
              filterMethod(value, row) {
                if (value === 1) {
                  return row.gender === 'male';

                } else if (value === 2) {
                  return row.gender === 'female';
                }
              },
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
              width: 130,
              key: 'phoneNum',
            },
            {
              align: 'center',
              title: '学号',
              key: 'stuNum',
              width: 150,
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
            },
            {
              align: 'center',
              title: '用户权限',
              render: (h, params) => {

                let phoneNum = params.row.phoneNum;

                // 根据手机号码，从权限列表中取出权限
                let authString = this.getAuthString(phoneNum);

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
                        this.authModalPopup(params.row.phoneNum, params.row.userId);
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
      // 多条件搜索
      search: function () {
        this.getUserList();
      },

      /**
       * 模态框点击了确定按钮
       * @param value
       */
      onOk: function () {

        if (this.phoneNum === sessionStorage.getItem('phoneNum')) {
          this.$Message.error({
            content: "不能修改自己的权限",
            duration: 10,
            closable: true
          });

          return;
        }

        if (this.roleId === 0) {

          this.$Message.error({
            content: "权限不能为空",
            duration: 10,
            closable: true
          });

        } else {

          this.modalSpinShow = true;

          this.$api.personnelAdmin.updateAuth(this.userId, this.roleId).then(
            res => {
              if (res.status == this.$store.state.global.status.OK) {
                // 重新加载数据
                this.getUserList();
                this.modalSpinShow = false;
                this.authModal = false;
              }
            }
          ).catch(
            error => {
              this.modalSpinShow = false;
            }
          )

        }

      },

      /**
       * 权限修改选择列表更改时触发
       * @param value
       */
      optionChange: function (value) {
        this.roleId = value;
      },

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
       * 修改用户权限模态框弹出
       * @param userId
       */
      authModalPopup: function (phoneNum, userId) {
        this.phoneNum = phoneNum;
        this.userId = userId;
        this.authModal = true;
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
        // 每次都清空权限列表。因为如果不刷新的话，权限列表是不会清空的。
        // 这会导致更新权限后，权限不能第一时间更新出来
        this.userRoleList = [];

        this.spinShow = true;

        this.$api.personnelAdmin.findAllUser(
          {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            // 多条件
            userName: this.userInfo.userName,
            email: this.userInfo.email,
            phoneNum: this.userInfo.phoneNum,
            stuNum: this.userInfo.stuNum,
            userId: this.userInfo.userId,
            role: this.userInfo.role,
          }
        ).then(
          res => {
            this.userTotal = res.data[0].total;
            this.userList = res.data[0].list;

            for (var i = 0; i < this.userList.length; i++) {

              // 获取该用户的所有权限列表
              this.$api.user.getUserRolesByPhoneNum(this.userList[i].phoneNum).then(
                res => {
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
    },

    watch: {
      // 修改权限模态框一关闭，就清空模态框内容
      authModal(val) {
        this.selectModel = '';
      }
    }
  }
</script>

<style scoped lang="less">
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;

    .ivu-modal {
      top: 0;
    }
  }
</style>
