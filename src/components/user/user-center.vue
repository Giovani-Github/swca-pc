<!-- 用户中心 -->
<template>

  <Drawer @on-close="close" width="400" :mask-closable="false" title="个人中心" :closable="true"
          v-model="$store.state.global.userCenter">

    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在加载</div>
    </Spin>

    <p>
      用戶名：{{user.userName ? user.userName : '未设置用户名'}}
      <Input v-model="newUser.userName" placeholder="输入用户名" clearable style="width: 200px;margin-left: 20px"/>
    </p>
    <p style="margin-top: 20px">
      手机号码：{{user.phoneNum}}
    </p>
    <p style="margin-top: 20px">
      邮箱：{{user.email ? user.email : '未绑定邮箱'}} <Input v-model="newUser.email" placeholder="输入邮箱" clearable
                                                      style="width: 200px;margin-left: 20px"/>
    </p>
    <p style="margin-top: 20px">
      性别：
      <RadioGroup v-model="newUser.gender">
        <Radio label="male">男</Radio>
        <Radio label="female">女</Radio>
      </RadioGroup>
    </p>
    <p style="margin-top: 20px">
      学号：{{user.stuNum ? user.stuNum : '未认证' }}
      <Button style="margin-left: 20px" size="small" type="primary">点击认证</Button>
    </p>
    <div class="demo-drawer-footer">
      <Button type="primary" @click="changeUser()">保存</Button>
    </div>
  </Drawer>
</template>

<script>
  export default {
    name: "user-center",
    data() {
      return {
        // 加载中是否显示
        spinShow: true,
        // 用戶信息
        user: '',
        // 更改后的用户信息
        newUser: {
          userName: '',
          email: '',
          gender: '',
          userId: ''
        }

      }
    },

    methods: {
      /**
       * 更改用户信息
       */
      changeUser() {

        if (!this.newUser.userName && !this.newUser.email && this.newUser.gender == this.user.gender) {
          this.$Message.info("信息没有更改");
          return;
        }

        this.$api.user.changeUser({
          userName: this.newUser.userName,
          email: this.newUser.email,
          gender: this.newUser.gender,
          userId: this.newUser.userId
        }).then(
          res => {
            this.newUser = {};
            this.$Message.success("更改成功");
            // 重新获取用户信息
            this.getUserInfo();
          }
        )
      },

      /**
       * 获取用户信息
       */
      getUserInfo() {
        this.spinShow = true;
        var userId = sessionStorage.getItem("userId");
        if (userId) {
          this.$api.user.getUserByUserId(userId).then(
            res => {
              this.spinShow = false;
              this.user = res.data.user;
              this.newUser.userId = res.data.user.userId;
              this.newUser.gender = this.user.gender;
            }
          ).catch(
            error => {
              this.spinShow = false;
            }
          );
        }
      },

      /**
       * 个人中心抽屉关闭
       */
      close() {
        this.$store.commit('setUserCenter', false);
      }
    },
    created() {
      // 获取用户信息
      this.getUserInfo();
    }
  }
</script>

<style scoped lang="less">
  .demo-drawer-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
