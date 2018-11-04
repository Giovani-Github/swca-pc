<!-- 用户登录面板 -->
<template>
  <Modal v-model="myPanelPopup" width="360">
    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在登录</div>
    </Spin>
    <p slot="header" style="text-align:center">
      <span>登录</span>
    </p>
    <div style="text-align:center">
      <Form ref="formUser" :model="formUser" :rules="ruleUser" :label-width="60">
        <FormItem label="账号：" prop="phone">
          <Input type="text" v-model="formUser.phoneNum" placeholder="请输入手机号码">
            <Icon type="md-contact" slot="prefix"/>
          </Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input type="password" v-model="formUser.password" placeholder="请输入密码">
            <Icon type="md-key" slot="prefix"/>
          </Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer" style="text-align:center">
      <Button type="primary" @click="login('formUser')">登录</Button>
      <Button @click="handleReset('formUser')" style="margin-left: 8px">微信</Button>
      <Button @click="handleReset('formUser')" style="margin-left: 8px">QQ</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "login-panel",
    data() {
      const validatePhoneNum = (rule, value, callback) => {

        if (value === '' || value === undefined) {
          callback(new Error('输入手机号码'));
        } else {
          callback();
        }
      };

      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };

      return {
        // 是否打开面板
        myPanelPopup: this.panelPopup,
        modal_loading: false,
        // 注册登录面板弹出之前的router
        oldRouter: "/",
        // 加载中是否显示
        spinShow: false,

        formUser: {
          phoneNum: '',
          password: '',
        },

        ruleUser: {
          phoneNum: [
            {validator: validatePhoneNum, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 登录
       * @param name
       */
      login(name) {

        this.$refs[name].validate((valid) => {

          if (valid) {

            this.spinShow = true;
            this.$api.user.login(
              {
                phoneNum: this.formUser.phoneNum,
                password: this.formUser.password
              }
            ).then(
              res => {

                // 拿到jwt，存入sessionStorage
                sessionStorage.setItem('token', res.data.jwt);

                // 解析jwt，获取用户名和手机号码，存入sessionStorage
                let claims = res.data.jwt.split(".")[1];
                claims = JSON.parse(Base64.decode(claims));
                sessionStorage.setItem('userName', claims.userName);
                sessionStorage.setItem('phoneNum', claims.phoneNum);


                this.myPanelPopup = false;
                // // 通知父组件，登录状态改变
                this.$emit("on-isLogin-change", true);
                this.$Message.success("登录成功");
                this.spinShow = false;

              }
            ).catch(
              error => {
                this.spinShow = false;
              }
            );
          } else {
            this.$Message.error('登录失败');
            this.spinShow = false;
          }
        });
      },

      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    props: {

      // 注册登录面板是否弹出
      panelPopup: {
        type: Boolean,
        default: false,
      },

    },
    watch: {

      // 监测logRegPopup属性的值是否改变，val：改变后的值
      panelPopup(val) {
        this.myPanelPopup = val;

        if (val === false) {
          this.spinShow = false;
        }
      },

      // 监测myLogRegPopup属性的值是否改变, val：改变后的值
      myPanelPopup(val) {
        // 通知父组件，调用on-panelPopup-change方法，传递val参数
        this.$emit("on-panelPopup-change", val);
      }

    }
  }
</script>

<style scoped lang='less'>
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
