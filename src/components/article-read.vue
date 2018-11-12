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

      <p class="assist">类型：
        <span v-if="article.type === 0">
          普通文章
        </span>
        <span v-if="article.type === 1">
          教程文章
        </span>
      </p>
      <p class="assist">作者：
        {{user.userName}}
      </p>
      <p class="assist">阅读量：{{article.reading}}</p>
      <p class="assist">{{new Date(article.publishTime).toLocaleString()}}</p>
      <Divider style="margin-top: 40px"/>
      <div v-html="article.content"></div>
      <a>
        <Icon class="icon" @click="clickParise" :type="isParise ? 'md-heart' : 'md-heart-outline'"/>
      </a>
      <span style="color: rgb(158, 167, 180);">{{pariseNum}}</span>
    </Card>

    <Card style="margin-top: 20px">
      <Row>
        <Col :span="22">
          <Input v-model="commentConent" prefix="md-text" placeholder="你有什么想说的"/>
        </Col>
        <Col style="text-align: center" :span="2" maxlength="300">
          <Button :loading="commentLoding" @click="comment" type="primary">评论</Button>
        </Col>
      </Row>
    </Card>
    <Card style="margin-top: 20px">
      <Spin fix v-if="commentSpinShow">
        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
        <div>正在加载</div>
      </Spin>

      <div :key="index" v-for="(comment, index) in commentList">
        {{comment}}
        <p>
          {{getCommentUserByUserId(comment.userId)}}
        </p>
        <p>
          {{comment.content}}
        </p>
        <span style="float: right;color: rgb(158, 167, 180);">{{new Date(comment.submitTime).toLocaleString()}}</span>
        <Divider style="margin-top: 30px"/>
      </div>

    </Card>
  </div>
</template>

<script>
  export default {
    name: "article-read",
    data() {
      return {
        // 评论列表的用户信息，与评论列表的userId对应
        commentUserInfoList: [],
        // 评论列表
        commentList: [],
        // 评论按钮是否正在加载状态
        commentLoding: false,
        // 评论内容
        commentConent: '',
        // 文章详情
        article: '',
        // 文章发布者
        user: '',
        // 是否显示正在加载
        spinShow: false,
        commentSpinShow: false,
        // 是否点赞
        isParise: false,
        // 临时储存一个点赞量，点赞不用每次刷新文章数据才能展现实时点赞量
        pariseNum: 0

      }
    },

    methods: {

      // 根据用户id，获取评论列表的用户信息
      getCommentUserByUserId(userId) {
        for (var i = 0; i < this.commentUserInfoList.length; i++) {
          if (this.commentUserInfoList[i].userId === userId) {
            return this.commentUserInfoList[i].userName;
          }
        }
      },
      /**
       * 点击评论
       */
      comment() {

        this.commentLoding = true;

        if (this.commentConent != '' && this.commentConent !== undefined) {
          if (sessionStorage.getItem('token')) {  //判断是否已经登录
            // 获取登录用户的用户id
            let claims = sessionStorage.getItem('token').split(".")[1];
            claims = JSON.parse(Base64.decode(claims));

            this.$api.indexFront.comment(
              {
                userId: claims.userId,
                articleId: this.$route.params.articleId,
                content: this.commentConent
              }
            ).then(
              res => {
                this.commentLoding = false;
                this.$Message.success("评论成功");
                this.commentConent = '';
                this.getComment();
              }
            ).catch(
              error => {
                this.commentLoding = false;
              }
            )

          } else {
            this.commentLoding = false;
            this.$Message.info("请登录后评论");
          }
        } else {
          this.commentLoding = false;
          this.$Message.info("评论不能为空");
        }

      }
      ,

      /**
       * 点赞
       */
      clickParise() {
        this.isParise = !this.isParise;

        if (this.isParise) {
          // 点赞
          this.$api.indexFront.clickParise(this.$route.params.articleId).then(
            res => {
              this.pariseNum += 1;
            }
          );

        } else {
          // 取消赞
          this.$api.indexFront.cancelParise(this.$route.params.articleId).then(
            res => {
              this.pariseNum -= 1;
            }
          );
        }
      }
      ,

      /**
       * 根据路由传过来的文章id，获取文章详情
       */
      getArticle() {
        this.spinShow = true;
        this.$api.indexFront.getArticleById(this.$route.params.articleId).then(
          res => {
            this.article = res.data.article;
            this.pariseNum = res.data.article.parise;
            this.spinShow = false;

            // 获取文章发布者信息
            // this.$api.indexFront.getUserByUserId(this.article.userId).then(
            //   res => {
            //     this.user = res.data.user;
            //   }
            // );

            // 阅读量+1
            this.$api.indexFront.readingAdd(this.$route.params.articleId);
          }
        );
      }
      ,

      /**
       * 获取评论
       */
      getComment() {
        this.commentSpinShow = true;
        this.$api.indexFront.getComment(this.$route.params.articleId).then(
          res => {
            this.commentSpinShow = false;
            this.commentList = res.data[0];

            // 获取所有评论的用户信息
            for (var i = 0; i < this.commentList.length; i++) {
              this.$api.indexFront.getUserByUserId(this.commentList[i].userId).then(
                res => {
                  console.log(res.data.user);
                  this.commentUserInfoList.push(res.data.user);
                }
              );
            }
          }
        ).catch(
          error => {
            this.commentSpinShow = false;
          }
        )
      }
    },
    created() {

      // 获取评论
      this.getArticle();
      // 根据路由传过来的文章id，获取文章详情
      this.getComment();

    }

  }
</script>

<style scoped lang="less">
  .title {
    font-size: 16px;
    font-weight: bold;
    color: rgb(70, 76, 91);
  }

  .icon {
    font-size: 18px;
  }

  .assist {
    margin-left: 20px;
    float: left;
    margin-top: 6px;
    color: rgb(158, 167, 180);
  }
</style>
