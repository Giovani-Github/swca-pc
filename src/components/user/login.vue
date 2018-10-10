<template>
  <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="60">
    <FormItem label="账号：" prop="phone">
      <Input type="text" v-model="formCustom.phone" placeholder="请输入手机号码">
        <Icon type="md-contact" slot="prefix"/>
      </Input>
    </FormItem>
    <FormItem label="密码：" prop="password">
      <Input type="password" v-model="formCustom.password" placeholder="请输入密码">
        <Icon type="md-key" slot="prefix"/>
      </Input>
    </FormItem>
    <FormItem :label-width="0">
      <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
      <!--<span>OR</span>-->
      <Button @click="handleReset('formCustom')" style="margin-left: 8px">微信</Button>
      <Button @click="handleReset('formCustom')" style="margin-left: 8px">QQ</Button>
    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: "login",
    data() {
      const validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('输入手机号码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('账号错误'));
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
          phone: '',
          password: '',
        },
        ruleCustom: {
          phone: [
            {validator: validatePhone, trigger: 'blur'}
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

</style>
