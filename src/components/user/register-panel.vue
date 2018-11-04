<!-- 用户注册面板 -->
<template>
  <Modal v-model="myPanelPopup" width="360">

    <Spin fix v-if="spinShow">
      <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
      <div>正在注册</div>
    </Spin>

    <p slot="header" style="text-align:center">
      <span>注册</span>
    </p>
    <div style="text-align:center">
      <Form ref="formUser" :model="formUser" :rules="ruleUser" :label-width="60">
        <FormItem label="账号：" prop="phoneNum">
          <Input type="text" v-model="formUser.phoneNum" placeholder="请输入手机号码">
            <Icon type="md-contact" slot="prefix"/>
          </Input>
        </FormItem>
        <FormItem label="用户名：" prop="userName">
          <Input type="text" v-model="formUser.userName" placeholder="中文、英文、数字包括下划线">
            <Icon type="md-person" slot="prefix"/>
          </Input>
        </FormItem>
        <FormItem label="密码：" prop="password">
          <Input type="password" v-model="formUser.password" placeholder="字母开头6~18位只能包含字母数字下划线">
            <Icon type="md-key" slot="prefix"/>
          </Input>
        </FormItem>
        <FormItem label="确认密码：" prop="verifyPassword">
          <Input type="password" v-model="formUser.verifyPassword" placeholder="确认密码">
            <Icon type="md-key" slot="prefix"/>
          </Input>
        </FormItem>
      </Form>
    </div>
    <div slot="footer" style="text-align:center">
      <Button type="primary" @click="register('formUser')">注册</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "register-panel",
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        // 手机号码正则
        let regexp = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;

        if (value === '' || value === undefined) {
          callback(new Error('输入手机号码'));
        } else if (!regexp.test(value)) {
          callback(new Error('手机号码格式非法'));
        } else {
          callback();
        }
      };

      // 用户名是可选的，只有在填写的时候再进行校验
      const validateUserName = (rule, value, callback) => {
        // 中文、英文、数字包括下划线
        let regexp = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;

        if (!(value === '' || value === undefined)) {
          if (!regexp.test(value)) {
            callback(new Error('用户名格式非法'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };

      const validatePassword = (rule, value, callback) => {
        // 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        let regexp = /^[a-zA-Z]\w{5,17}$/;

        if (value === '' || value === undefined) {
          callback(new Error('请输入密码'));
        } else if (!regexp.test(value)) {
          callback(new Error('密码格式非法'));
        } else {
          callback();
        }
      };

      const validateVerifyPassword = (rule, value, callback) => {
        // 以字母开头，长度在6~18之间，只能包含字母、数字和下划线
        let regexp = /^[a-zA-Z]\w{5,17}$/;

        if (value === '' || value === undefined) {
          callback(new Error('请输入密码'));
        } else if (!regexp.test(value)) {
          callback(new Error('密码格式非法'));
        } else if (!(this.formUser.password === value)) {
          callback(new Error('两次密码输入不一致'));
        } else {
          callback();
        }
      };

      return {
        // 是否打开面板
        myPanelPopup: this.panelPopup,
        modal_loading: false,
        // 加载中是否显示
        spinShow: false,

        formUser: {
          phoneNum: '',
          password: '',
          verifyPassword: '',
          userName: '',
        },
        ruleUser: {
          phoneNum: [
            {required: true, validator: validatePhoneNum, trigger: 'blur'}
          ],
          password: [
            {required: true, validator: validatePassword, trigger: 'blur'}
          ],
          verifyPassword: [
            {required: true, validator: validateVerifyPassword, trigger: 'blur'}
          ],
          userName: [
            {validator: validateUserName, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      /**
       * 注册
       * @param name
       */
      register(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

            this.spinShow = true;

            this.$api.user.reg({

              // 携带提交数据
              phoneNum: this.formUser.phoneNum,
              password: this.formUser.password,
              userName: this.formUser.userName

            }).then(
              res => {
                console.log(res.data);
                this.$Message.success('注册成功');
                this.myPanelPopup = false;
                this.spinShow = false;
                this.$refs['formUser'].resetFields();
              }
            ).catch(
              error => {
                this.spinShow = false;
              }
            );
          } else {
            this.$Message.error('注册失败');
            this.spinShow = false;
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    },
    props: {

      // 注册面板是否弹出
      panelPopup: {
        type: Boolean,
        default:
          false,
      },

    },
    watch: {

      // 监测panelPopup属性的值是否改变，val：改变后的值
      panelPopup(val) {
        this.myPanelPopup = val;

        if (val === false) {
          this.spinShow = false;
        }
      },

      // 监测myPanelPopup属性的值是否改变, val：改变后的值
      myPanelPopup(val) {
        // 通知父组件，调用on-panelPopup-change方法，传递val参数
        this.$emit("on-panelPopup-change", val);
      }

    }
  }
</script>

<style scoped lang="less">
  @import "../../common/less/global";

</style>
