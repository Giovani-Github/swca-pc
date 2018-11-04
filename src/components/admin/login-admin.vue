<template>
  <Layout class="layout full-center" style="min-height: 620px">
    <Card :bordered="false">
      <div slot="title" class="title">
        <router-link :to="{name:'index'}">
          <img style="width: 40px; height: 40px" src="../../assets/swca-logo.png" alt="">

        </router-link>

        <span>
          <p style="font-size: 14px">计算机协会后台登录</p>
        </span>
      </div>
      <div>
        <div>
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
          <Button type="primary" @click="handleSubmit('formUser')">登录</Button>
        </div>
      </div>
    </Card>
  </Layout>
</template>

<script>
  export default {
    name: "login-admin",
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

            this.$api.user.loginAdmin(
              {
                phoneNum: this.formUser.phoneNum,
                password: this.formUser.password
              }
            ).then(
              res => {
                // 拿到jwt，存入sessionStorage
                sessionStorage.setItem('token', res.data.jwt);
                //
                // // 解析jwt，获取用户名和手机号码，存入sessionStorage
                let claims = res.data.jwt.split(".")[1];
                claims = JSON.parse(Base64.decode(claims));
                sessionStorage.setItem('userName', claims.userName);
                sessionStorage.setItem('phoneNum', claims.phoneNum);


                this.$Message.success("登录成功");

                // 跳转到后台页面
                this.$router.replace({name: 'admin'})

              }
            );
          } else {
            this.$Message.error('登录失败');
          }
        });
      },

    },
  }
</script>

<style scoped lang='less'>
  @import "../../common/less/global";

  .title {
    position: relative;

    span {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      margin-left: 10px;
    }
  }
</style>
