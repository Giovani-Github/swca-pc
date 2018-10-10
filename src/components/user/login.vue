<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="60">
    <FormItem label="用户名" prop="username">
      <Input type="text" v-model="formCustom.username"></Input>
    </FormItem>
    <FormItem label="密码" prop="password">
      <Input type="password" v-model="formCustom.password"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
      <span>OR</span>
      <Button @click="handleReset('formCustom')" style="margin-left: 8px">微信</Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: "login",
    data() {
      const validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('用户名错误'));
        } else {
          callback();
        }
      };

      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('密码错误'));
        } else {
          callback();
        }
      };

      return {
        formCustom: {
          username: '',
          password: '',
        },
        ruleCustom: {
          username: [
            {validator: validateUsername, trigger: 'blur'}
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
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";

  .ivu-form-item-content {
    margin-left: 10px !important;

  }

</style>
