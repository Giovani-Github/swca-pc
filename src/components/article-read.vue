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
      <div v-html="article.content"></div>
    </Card>
  </div>
</template>

<script>
  export default {
    name: "article-read",
    data() {
      return {
        // 文章详情
        article: ''

      }
    },
    created() {
      // 根据路由传过来的文章id，获取文章详情
      this.$api.indexFront.getArticleById(this.$route.params.articleId).then(
        res => {
          this.article = res.data.article;
          console.log(this.article);
        }
      );
    }
  }
</script>

<style scoped>

</style>
