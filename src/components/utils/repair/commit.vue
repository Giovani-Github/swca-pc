<template>
  <div class="full-center">
    <div style="padding: 40px; width: 80%">
      <Card :bordered="false">
        <p slot="title">申请维修</p>
        <Alert type="warning" show-icon>
          温馨提示
          <template slot="desc">
            维修就维修哈，不要乱搞，很容易进小黑屋的
          </template>
        </Alert>
        <Form ref="formOrder" :model="formOrder" :rules="ruleOrder" :label-width="80">
          <FormItem label="姓名" prop="name">
            <Input v-model="formOrder.name" placeholder="输入你的名字"></Input>
          </FormItem>
          <FormItem label="手机号码" prop="phoneNum">
            <Input v-model="formOrder.phoneNum" placeholder="输入你的手机号码"></Input>
          </FormItem>
          <FormItem label="地址" prop="addres">
            <Input v-model="formOrder.addres" placeholder="输入你的地址【例如：A区-2栋-203】"></Input>
          </FormItem>
          <FormItem label="性别" prop="gender">
            <RadioGroup v-model="formOrder.gender">
              <Radio label="male">男</Radio>
              <Radio label="female">女</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="问题描述" prop="remark">
            <Input v-model="formOrder.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder="请描述你计算机所出现的问题，请尽量详细的描述，方便维修人员准备工具"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formOrder')">提交申请</Button>
            <Button @click="handleReset('formOrder')" style="margin-left: 8px">重新输入</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "commit",
    data() {
      const validatePhoneNum = (rule, value, callback) => {
        // 手机号码正则
        let regexp = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;

        if (value === '' || value === undefined) {
          callback(new Error('请输入手机号码'));
        } else if (!regexp.test(value)) {
          callback(new Error('手机号码格式非法'));
        } else {
          callback();
        }
      };

      return {
        formOrder: {
          name: '',
          gender: '',
          phoneNum: '',
          addres: '',
          remark: ''
        },
        ruleOrder: {
          name: [
            {required: true, message: "请输入姓名", trigger: 'blur'}
          ],
          gender:
            [
              {required: true, message: "请选择性别", trigger: 'blur'}
            ],
          phoneNum:
            [
              {required: true, validator: validatePhoneNum, trigger: 'blur'}
            ],
          addres:
            [
              {required: true, message: "请输入地址", trigger: 'blur'}
            ],
          remark:
            [
              {required: true, message: "请描述你的问题", trigger: 'blur'},
            ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

            this.$api.repair.commit({
              name: this.formOrder.name,
              gender: this.formOrder.gender,
              phoneNum: this.formOrder.phoneNum,
              addres: this.formOrder.addres,
              remark: this.formOrder.remark
            }).then(
              res => {
                this.$Message.success({
                  content: '提交成功，请耐心等待工作人员上门维修',
                  duration: 10,
                  closable: true
                });

                this.$refs[name].resetFields();
              }
            ).catch(
              error => {
                if (error.response.status === this.$store.state.global.status.FORBIDDEN) {
                  this.$Message.error({
                    content: '请先登陆后在提交',
                    duration: 10,
                    closable: true
                  });
                } else if (error.response.status === this.$store.state.global.status.INTERNAL_SERVER_ERROR) {
                  this.$Message.error({
                    content: error.response.data.msg,
                    duration: 10,
                    closable: true
                  });
                }
              }
            );
          } else {
            this.$Message.error({
              content: '提交失败，请重新提交',
              duration: 10,
              closable: true
            });
          }
        })
      }
      ,
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  }
</script>

<style scoped lang='less'>
  @import "../../../common/less/global";
</style>
