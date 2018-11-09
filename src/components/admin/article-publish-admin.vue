<!-- 首页文章发布 -->
<template>
  <div>
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          前台首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{name:'articlePublishAdmin'}">
          <Icon type="ios-navigate"></Icon>
          文章发布
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>
    <Card style="margin-top: 20px">
      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>
      <p slot="title">文章发布</p>
      <div id="editor"></div>
      <Button @click="publish" style="margin-top: 20px;" type="primary">发布</Button>
    </Card>
  </div>
</template>

<script>
  import Editor from 'wangeditor';
  export default {
    name: "article-publish-admin",
    data() {
      return {
        editor: '',
        spinShow: false
      }
    },
    created() {
      // 设置当前侧边栏选择项是3-2
      this.$store.commit('setAdminMenuActive', '3-2');
    },
    methods: {
      /**
       * 发布文章
       */
      publish: function () {
        this.spinShow = true;
        console.log(this.editor.txt.html());

        this.$api.indexAdmin.articlePublish(
          {
            article: this.editor.txt.html()
          }
        ).then(
          res => {
            this.spinShow = false;
            this.$Message.success("发布成功");
          }
        ).catch(
          error => {
            this.spinShow = false;
          }
        )
      },
      /**
       * 初始化富文本编辑器
       */
      initEditor() {
        /* 括号里面的对应的是html里div的id */
        this.editor = new Editor('#editor');
        /* 创建编辑器 */
        this.editor.create()
      }
    },
    mounted() {
      // 初始化富文本编辑器
      this.initEditor()
    }
  }
</script>

<style scoped>

</style>
