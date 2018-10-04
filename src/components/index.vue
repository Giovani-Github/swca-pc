<template>
  <div class="index">
    <Carousel autoplay v-model="value2" loop>
      <CarouselItem>
        <div class="demo-carousel">
          1
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="demo-carousel">
          2
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      value2: 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .demo-carousel {
    height: 400px;
    /*完全居中*/
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .index {

    background: #FFFFFF;
    min-height: 500px;
  }
</style>
