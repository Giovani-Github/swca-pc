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
      <Input maxlength="150" size="large" v-model="title" placeholder="输入文章标题" clearable
             style="width: 800px;margin-bottom: 20px"/>

      <RadioGroup v-model="articleType" type="button" size="large" style="margin-bottom: 20px;margin-left: 10px">
        <Radio label="0">通知</Radio>
        <Radio label="1">教程</Radio>
      </RadioGroup>

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
        // 文章标题
        title: '',
        editor: '',
        spinShow: false,
        // 图片上传后的url
        imgUrl: '',
        // 文章类型
        articleType: "0"

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
        if (this.editor.txt.text() !== '' && this.editor.txt.text() !== undefined && this.title !== '' && this.title !== undefined) {
          this.$api.indexAdmin.articlePublish(
            {
              content: this.editor.txt.html(),
              title: this.title,
              articleType: this.articleType
            }
          ).then(
            res => {
              this.spinShow = false;
              this.editor.txt.html('');
              this.title = '';
              this.$Message.success("发布成功");
            }
          ).catch(
            error => {
              this.spinShow = false;
            }
          )
        } else {
          this.spinShow = false;
          this.$Message.error("标题和内容不能为空");
        }
      },
      /**
       * 初始化富文本编辑器
       */
      initEditor() {
        /* 括号里面的对应的是html里div的id */
        this.editor = new Editor('#editor');
        // this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片
        // 配置上传图片的地址
        this.editor.customConfig.uploadImgServer = '/swca_api/index/articleImg';
        // 上传图片时，可自定义filename，即在使用formdata.append(name, file)添加图片文件时，自定义第一个参数
        this.editor.customConfig.uploadFileName = 'file';
        // 限制一次最多上传 5 张图片
        this.editor.customConfig.uploadImgMaxLength = 5;
        //  将图片大小限制为 3M 默认为5M
        this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;

        // 自定义图片上传
        this.editor.customConfig.customUploadImg = async (files, insert) => {
          /* files 是 input 中选中的文件列表 */
          let formData = new FormData();
          formData.append('file', files[0]);
          await this.$api.indexAdmin.uploadArticleImg(formData).then(
            res => {

              this.$Message.success("上传成功");
              this.imgUrl = res.data.imgUrl;
            }
          );

          /* insert 是编辑器自带的 获取图片 url 后，插入到编辑器的方法 上传代码返回结果之后，将图片插入到编辑器中*/
          insert(this.imgUrl)
        };

        /* 创建编辑器 */
        this.editor.create();
      },
    },
    mounted() {
      // 初始化富文本编辑器
      this.initEditor()
    }
  }
</script>

<style scoped lang="less">
  .w-e-toolbar {
    flex-wrap: wrap;
    -webkit-box-lines: multiple;
  }

  .w-e-toolbar .w-e-menu:hover {
    z-index: 10002 !important;
  }

  .w-e-menu a {
    text-decoration: none;
  }

  .fullscreen-editor {
    position: fixed !important;
    width: 100% !important;
    height: 100% !important;
    left: 0px !important;
    top: 0px !important;
    background-color: white;
    z-index: 9999;
  }

  .fullscreen-editor .w-e-text-container {
    width: 100% !important;
    height: 95% !important;
  }
</style>
