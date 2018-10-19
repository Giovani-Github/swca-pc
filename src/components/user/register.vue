<template>
  <Form ref="formUser" :model="formUser" :rules="ruleUser" :label-width="60">
    <FormItem label="账号：" prop="phoneNum">
      <Input type="text" v-model="formUser.phoneNum" placeholder="请输入手机号码">
        <Icon type="md-contact" slot="prefix"/>
      </Input>
    </FormItem>
    <FormItem label="用户名：" prop="userName">
      <Input type="text" v-model="formUser.userName" placeholder="请输入用户名 [可选]">
        <Icon type="md-person" slot="prefix"/>
      </Input>
    </FormItem>
    <FormItem label="密码：" prop="password">
      <Input type="text" v-model="formUser.password" placeholder="字母开头6~18位只能包含字母数字下划线">
        <Icon type="md-key" slot="prefix"/>
      </Input>
    </FormItem>
    <FormItem label="确认密码：" prop="verifyPassword">
      <Input type="text" v-model="formUser.verifyPassword" placeholder="确认密码">
        <Icon type="md-key" slot="prefix"/>
      </Input>
    </FormItem>

    <FormItem :label-width="0">
      <Button type="primary" @click="handleSubmit('formUser')">注册</Button>

    </FormItem>
  </Form>
</template>

<script>
  export default {
    name: "register",
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
        // 中文、英文、数字但不包括下划线等符号
        let regexp = /^[\\u4E00-\\u9FA5A-Za-z0-9]+$/;

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
        formUser: {
          phoneNum: '',
          password: '',
          verifyPassword: '',
          userName: '',
        },
        ruleUser: {
          phoneNum: [
            {validator: validatePhoneNum, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
          verifyPassword: [
            {validator: validateVerifyPassword, trigger: 'blur'}
          ],
          userName: [
            {validator: validateUserName, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$api.user.reg({

              // 携带提交数据
              phoneNum: this.formUser.phoneNum,
              password: this.formUser.password,
              userName: this.formUser.userName

            }).then(
              res => {
                console.log(res.data);
                this.$Message.success('注册成功');
              }
            ).catch(
              error => {
                console.log(error);
                this.$Message.error(error);
              }
            );

          } else {
            this.$Message.error('注册失败');
          }
        });
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>
