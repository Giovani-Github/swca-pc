<!-- 注册登录面板 -->
<template>
  <Modal class-name="logReg animated jackInTheBox" :closable="false" v-model="myLogRegPopup" width="360">

    <div slot="header" style="color:#f60;text-align:center">
      <Menu mode="horizontal" active-name="1">

        <router-link :to="{name: 'login'}">
          <MenuItem name="1">
            登录
          </MenuItem>
        </router-link>

        <router-link :to="{name:'register'}">
          <MenuItem name="2">
            注册
          </MenuItem>
        </router-link>

      </Menu>
    </div>

    <div style="text-align: center">
      <transition name="fade" enter-active-class="animated  fadeIn"
                  leave-active-class="animated  fadeOut">
        <router-view name="logReg"></router-view>
      </transition>
    </div>

    <div slot="footer">
      <!--<Button type="error" size="large" long :loading="modal_loading" @click="del">Delete</Button>-->
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "log-reg-panel",
    data() {
      return {
        myLogRegPopup: this.logRegPopup, // 注册登录面板是否弹出
        modal_loading: false,
        oldRouter: "/", // 注册登录面板弹出之前的router
      }
    },
    methods: {
      del() {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          this.modal2 = false;
          this.$Message.success('Successfully delete');
        }, 2000);
      }
    },
    props: {

      // 注册登录面板是否弹出
      logRegPopup: {
        type: Boolean,
        default: false,
      },

    },
    watch: {

      // 监测logRegPopup属性的值是否改变，val：改变后的值
      logRegPopup(val) {
        this.myLogRegPopup = val;
      },

      // 监测myLogRegPopup属性的值是否改变, val：改变后的值
      myLogRegPopup(val) {

        // 通知父组件，调用on-logRegPopup-change方法，传递val参数
        this.$emit("on-logRegPopup-change", val);

        // 如果登录注册面板被打开，则路由跳转到/login
        // 关闭面板时，路由回退到原来的位置
        if (val == true) {

          // 记录面板打开之前的router路径，以便关闭面板时，回到原先router路径
          this.oldRouter = this.$router.currentRoute;
          // 前往指定router , 在history 添加新记录
          this.$router.push({name: 'login'});

        } else {

          // 前往指定router , 不会在history 添加新记录。替换掉当前的 history 记录。
          this.$router.replace({name: this.oldRouter.name});

        }
      }

    }

  }
</script>

<style lang='less'>
  @import "../../common/less/global";

  .logReg {
    .full-center;
    .ivu-modal {
      top: 0px;
    }

    .ivu-modal-header {
      border-bottom: none;
      padding: 0px 10px;
    }

    .ivu-modal-body {
      /*padding: 10px;*/
    }

    .ivu-modal-footer {
      border-top: none;
      padding: 0px;
      margin: 0px;
    }

  }

</style>
