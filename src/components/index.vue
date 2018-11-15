<!-- 前台主框架，首页 -->
<template>
  <div class="index">
    <Row>
      <Col :sm="24" :xs="0">
        <Carousel autoplay loop :autoplay-speed=7000>
          <CarouselItem :key="index" v-for="(slide, index) in slideList">
            <div class="banner-img" :style="{background: 'url(' + slide.addres + ')'}"></div>
            <!--<img class="f" style="width: 1024px;height: 600px" :src="slide.addres" alt="">-->
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>

    <div style="padding: 0px 30px 10px 30px;margin-top: 20px">
      <Card :bordered="true">
        <p slot="title">普通文章</p>
        <div style="margin-bottom: 10px" :key="index" v-for="(informArticle, index) in newInformArticleList">
          <a class="articletitle" @click="aclik(informArticle.articleId)">{{informArticle.title}}</a>
          <Time style="color: rgb(158, 167, 180); margin-left: 6px" :time="informArticle.publishTime"></Time>
        </div>
      </Card>
    </div>

    <div style="padding: 0px 30px 10px 30px">
      <Card :bordered="true">
        <p slot="title">教程文章</p>
        <div :key="index" v-for="(courseArticle, index) in hotCourseArticleList">
          <a class="articletitle" @click="aclik(courseArticle.articleId)">{{courseArticle.title}}</a>

          <Time style="color: rgb(158, 167, 180); margin-left: 6px" :time="courseArticle.publishTime"></Time>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>

  import UserCenter from "./user/user-center";
  export default {

    name: 'HelloWorld',
    components: {UserCenter},
    data() {
      return {
        // 轮播图列表
        slideList: [],
        // 前20条普通文章
        newInformArticleList: [],
        // 阅读量最多的20篇教程文章
        hotCourseArticleList: []

      }
    },
    methods: {
      /**
       * 文章被点击
       */
      aclik: function (articleId) {
        this.$router.push({path: `/articleRead/${articleId}`});
      },

      /**
       * 获取所有轮播图
       */
      getAllSlide() {
        this.$api.indexFront.getAllSlide().then(
          res => {
            this.slideList = res.data[0];
            console.log(this.slideList);
          }
        );
      },

      /**
       * 获取前20篇普通文章
       */
      getNewInformArticle() {
        console.log("执行");
        this.$api.indexFront.getNewInformArticle().then(
          res => {
            this.newInformArticleList = res.data[0].list;
            console.log(this.newInformArticleList);
          }
        );
      },

      /**
       * 获取阅读量最多的20篇教程文章
       */
      getHotCourseArticle() {
        this.$api.indexFront.getHotCourseArticle().then(
          res => {
            this.hotCourseArticleList = res.data[0].list;
            console.log(this.hotCourseArticleList);
          }
        );
      },
    },
    created() {
      // 设置后台侧边栏选择项是1
      this.$store.commit('setAdminMenuActive', '1');
      // 获取所有轮播图
      this.getAllSlide();
      // 获取前20篇普通文章
      this.getNewInformArticle();
      // 获取阅读量最多的20篇教程文章
      this.getHotCourseArticle();
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../common/less/global";

  .articletitle {
    font-size: 14px;
    font-weight: bold;
    color: rgb(70, 76, 91);
  }

  .banner-img {
    padding-top: 29%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }


</style>
