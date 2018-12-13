<!-- 前台主框架，首页 -->
<template>
  <div class="index">
    <Row>
      <Col :sm="24" :xs="0">
        <Carousel autoplay loop :autoplay-speed=7000>
          <CarouselItem :key="index" v-for="(slide, index) in slideList">
            <router-link :to="{path: `/articleRead/${slide.articleId}`}" v-if="slide.articleId !== 0">
              <div class="banner-img"
                   :style="{background: 'url(' + slide.addres + ')'}"></div>
            </router-link>
            <div v-else>
              <div class="banner-img" :style="{background: 'url(' + slide.addres + ')'}"></div>
            </div>
            <!--<img class="f" style="width: 1024px;height: 600px" :src="slide.addres" alt="">-->
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>

    <div style="padding: 0px 30px 10px 30px;margin-top: 20px">
      <Card style="padding: 0px" :bordered="true">
        <p slot="title">普通文章</p>
        <CellGroup>
          <Cell
            :to="{path: `/articleRead/${informArticle.articleId}`}"
            :key="index"
            v-for="(informArticle, index) in newInformArticleList">
            <p class="articletitle"><a class="articletitle">{{informArticle.title}}</a></p>
            <Time style="color: rgb(158, 167, 180)" :time="informArticle.publishTime"></Time>
            <span style="margin-left: 6px;color: rgb(158, 167, 180)">
              阅读量：{{informArticle.reading}}
            </span>
            <Icon style="color: #2d8cf0;margin-left: 10px" type="md-heart"/>
            {{informArticle.parise > 0 ? informArticle.parise : 0}}
          </Cell>
          <Cell :to="{path: `/inform`}">查看更多</Cell>
        </CellGroup>

      </Card>
    </div>

    <div style="padding: 0px 30px 10px 30px">
      <Card :bordered="true">
        <p slot="title">教程文章</p>
        <CellGroup>
          <Cell
            :to="{path: `/articleRead/${courseArticle.articleId}`}"
            :key="index"
            v-for="(courseArticle, index) in hotCourseArticleList">
            <p class="articletitle"><a class="articletitle">{{courseArticle.title}}</a></p>
            <Time style="color: rgb(158, 167, 180)" :time="courseArticle.publishTime"></Time>
            <span style="margin-left: 6px;color: rgb(158, 167, 180)">
              阅读量：{{courseArticle.reading}}
            </span>
            <Icon style="color: #2d8cf0;margin-left: 10px" type="md-heart"/>
            {{courseArticle.parise > 0 ? courseArticle.parise : 0}}
          </Cell>
          <Cell :to="{path: `/course`}">查看更多</Cell>
        </CellGroup>

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
          }
        );
      },

      /**
       * 获取前20篇普通文章
       */
      getNewInformArticle() {
        this.$api.indexFront.getNewInformArticle().then(
          res => {
            this.newInformArticleList = res.data[0].list;
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

    width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    whitewhite-space: nowrap;
  }

  .banner-img {
    padding-top: 29%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

</style>
