<!-- 前台主框架，首页 -->
<template>
  <div class="index">
    <Row>
      <Col :sm="24" :xs="0">
        <Carousel autoplay loop :autoplay-speed=7000>
          <CarouselItem :key="index" v-for="(slide, index) in slideList">
            <!--<div class="banner-img" style="background-image: url('http://swca-file.oss-cn-qingdao.aliyuncs.com/articleImg/Sun%20Nov%2011%2021%3A14%3A21%20CST%202018.jpg?Expires=1857302062&OSSAccessKeyId=LTAIQi38jwEAq9uu&Signature=KrWspsGIYvZ%2FZQHUFRnDqs%2B0r5o%3D')"></div>-->

            <div class="banner-img" :style="{background: 'url(' + slide.addres + ')'}"></div>
            <!--<div class="demo-carousel">-->
            <!--<img :src="slide.addres" alt="" width="1024px">-->
            <!--</div>-->
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>

    <div style="padding: 0px 30px 10px 30px;margin-top: 20px">
      <Card :bordered="false">
        <p slot="title">No border title</p>
        <p>Content of no border type. Content of no border type. Content of no border type. Content of no border
          type. </p>
      </Card>
    </div>
    <div style="padding: 0px 30px 10px 30px">
      <Card :bordered="false">
        <p slot="title">No border title</p>
        <p>Content of no border type. Content of no border type. Content of no border type. Content of no border
          type. </p>
      </Card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        // 轮播图列表
        slideList: []
      }
    },
    methods: {
      // 获取所有轮播图
      getAllSlide() {
        this.$api.indexFront.findAllSlide().then(
          res => {
            this.slideList = res.data[0];
            console.log(this.slideList);
          }
        );
      }
    },
    created() {
      // 设置后台侧边栏选择项是1
      this.$store.commit('setAdminMenuActive', '1');
      // 获取所有轮播图
      this.getAllSlide();

    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../common/less/global";

  .banner-img {
    padding-top: 30%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .demo-carousel {
    height: 500px;
    /*完全居中*/
    .full-center;
  }

  .index {
    /*min-height: 520px;*/
  }
</style>
