<!-- 文章阅读 -->
<template>
  <div style="padding: 10px">
    <Card>
      <Breadcrumb>
        <BreadcrumbItem to="/">
          <Icon type="ios-home-outline"></Icon>
          首页
        </BreadcrumbItem>
        <BreadcrumbItem :to="{path: `/articleRead/${article.articleId}`}">
          <Icon type="ios-navigate"></Icon>
          文章阅读
        </BreadcrumbItem>
      </Breadcrumb>
    </Card>

    <Card style="margin-top: 20px">

      <Spin fix v-if="spinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>

      <p class="title">{{article.title}}</p>
      <p class="assist">发布时间：{{new Date(article.publishTime).toLocaleString()}}</p>
      <p class="assist">阅读量：
        <Badge type="success" :show-zero="true" :count="article.reading"></Badge>
      </p>
      <p class="assist">类型：
        <span v-if="article.type === 0">
          <Badge type="info" :show-zero="true" text="普通文章"></Badge>
        </span>
        <span v-if="article.type === 1">
          <Badge type="info" :show-zero="true" text="教程文章"></Badge>
        </span>
      </p>
      <p class="assist">作者：
        <Badge type="warning" :show-zero="true" :text="user.userName"></Badge>
      </p>
      <Divider>正文</Divider>
      <div v-html="article.content"></div>
      <a href="">
        <Icon type="md-heart"/>
      </a>
      <a href="">
        <Icon type="md-heart-outline"/>
      </a>
      <Badge type="success" :show-zero="true" :count="article.parise"></Badge>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "article-read",
    data() {
      return {
        // 文章详情
        article: '',
        // 文章发布者
        user: '',
        // 是否显示正在加载
        spinShow: false

      }
    },
    created() {

      this.spinShow = true;
      // 根据路由传过来的文章id，获取文章详情
      this.$api.indexFront.getArticleById(this.$route.params.articleId).then(
        res => {
          this.article = res.data.article;
          this.spinShow = false;
          console.log(this.article);

          // 获取文章发布者信息
          this.$api.indexFront.getAuthorByUserId(this.article.userId).then(
            res => {
              this.user = res.data.user;
              console.log(this.user);
            }
          );

          // 阅读量+1
          this.$api.indexFront.readingAdd(this.$route.params.articleId);
        }
      );
    }

  }
</script>

<style scoped lang="less">
  .title {
    font-size: 16px;
    font-weight: bold;
    color: rgb(70, 76, 91);
  }

  .assist {
    margin-left: 20px;
    float: right;
    margin-top: 6px;
    color: rgb(158, 167, 180);
  }
</style>
