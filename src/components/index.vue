<!-- 前台主框架，首页 -->
<template>
  <div class="index">
    <Row>
      <Col :sm="24" :xs="0">
        <Carousel autoplay v-model="value2" loop>
          <CarouselItem>
            <div class="demo-carousel">

              <img
                src="http://swca-file.oss-cn-qingdao.aliyuncs.com/a.jpg?Expires=1541731277&OSSAccessKeyId=TMP.AQHTWovX8q9BUPe7fctY7XKU-JbMk0110lVaoPLHjTG_m1JHSZlKQIMd95x7AAAwLAIUN3bxdna_bwn5ZRX5Vhisugid5zUCFHnJ25tmNaSDX_JwxOn0M0jQDFJu&Signature=u8RL1eoK90HjpJgaOWyKEwJBtnY%3D"
                alt="">

            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              2
              <!--<img src="../assets/tu.jpg" alt="">-->
            </div>
          </CarouselItem>
          <CarouselItem>
            <div class="demo-carousel">
              1
              <!--<img src="../assets/tu.jpg" alt="">-->
            </div>
          </CarouselItem>
        </Carousel>
      </Col>
    </Row>

    <div style="padding: 0px 30px 10px 30px">
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
        value2: 0
      }
    },
    created() {
      // 设置后台侧边栏选择项是1
      this.$store.commit('setAdminMenuActive', '1');
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  @import "../common/less/global";

  .demo-carousel {
    height: 400px;
    /*完全居中*/
    .full-center;
  }

  .index {
    /*min-height: 520px;*/
  }
</style>
