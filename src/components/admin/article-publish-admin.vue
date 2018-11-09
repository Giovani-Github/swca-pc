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
      return {editor: ''}
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
        console.log(this.editor.txt.html());
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
