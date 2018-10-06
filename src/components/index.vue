<template>
  <div class="index">
    <Row>
      <Col :sm="24" :xs="0">
        <Carousel autoplay v-model="value2" loop>
          <CarouselItem>
            <div class="demo-carousel">
              <img src="../assets/tu.jpg" alt="">
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
