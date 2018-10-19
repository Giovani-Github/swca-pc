<template>
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
    <FormItem :label-width="0">
      <Button type="primary" @click="handleSubmit('formUser')">登录</Button>
      <!--<span>OR</span>-->
      <Button @click="handleReset('formUser')" style="margin-left: 8px">微信</Button>
      <Button @click="handleReset('formUser')" style="margin-left: 8px">QQ</Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: "login",
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
        isLogin: false,

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
      handleSubmit(name) {

        this.$refs[name].validate((valid) => {

          if (valid) {

            this.$api.user.login(
              {
                phoneNum: this.formUser.phoneNum,
                password: this.formUser.password
              }
            ).then(
              res => {
                console.log(res.data);
                this.$Message.success(res.data);
              }
            ).catch(
              error => {
                this.$Message.error(error)
              }
            );
          } else {
            this.$Message.error('登录失败');
          }
        });
      },

      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";

</style>
