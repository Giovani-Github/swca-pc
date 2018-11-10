<!-- 首页轮播图管理 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'slideAdmin'}">
          <Icon type="ios-navigate"></Icon>
          轮播图管理
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      <Upload
        :before-upload="handleUpload"
        action="">
        <Button icon="ios-cloud-upload-outline">选择要上传的轮播图</Button>
      </Upload>
      <div v-if="file !== null">
        <p style="margin-top: 10px; margin-bottom: 10px">
          上传的文件名: {{ file.name }}
        </p>
        <Button type="primary" ghost @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中' : '上传' }}
        </Button>
      </div>

    </Card>
  </div>
</template>

<script>
  export default {
    name: "slide-admin",
    data() {
      return {
        file: null,
        loadingStatus: false
      }
    },
    methods: {

      /**
       * 上传组件，上传之前调用
       * @param file
       * @returns {boolean}
       */
      handleUpload(file) {
        this.file = file;
        // 表示不继续上传，即不会自动上传
        return false;
      },
      /**
       * 点击上传
       */
      upload() {
        this.loadingStatus = true;

        var params = new FormData();
        params.append('file', this.file);

        this.$api.indexAdmin.uploadSlideImg(params).then(
          res => {
            this.loadingStatus = false;
            this.$Message.success('上传成功')
          }
        ).catch(
          error => {
            this.loadingStatus = false;
          }
        );
      }
    },
    created() {
      // 设置当前侧边栏选择项是3-1
      this.$store.commit('setAdminMenuActive', '3-1');
    }
  }
</script>

<style scoped>

</style>
