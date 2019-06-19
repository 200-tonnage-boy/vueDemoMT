<template>
  <div class="slide-wraper">
    <a-carousel arrows autoplay>
      <div
        slot="prevArrow" 
        class="custom-slick-arrow"
        style="left: 10px;zIndex: 1"
      >
        <a-icon type="left-circle" />
      </div>
      <div
        slot="nextArrow" 
        class="custom-slick-arrow"
        style="right: 10px"
      >
        <a-icon type="right-circle" />
      </div>
      <div v-for="(item, index) of sliderList" :key="index">
        <img :src="item.src" alt="">
      </div> 
    </a-carousel>
  </div>
</template>
<script>
export default {
  data () {
    return {
      autoplay: true,//轮播图自动播放
      sliderList:[{
        src: '/slider-1.jpg'
      },{
        src: '/slider-2.jpg'
      },{
        src: '/slider-3.jpg'
      },{
        src: '/slider-4.jpg'
      },{
        src: '/slider-5.jpg'
      }]
    }
  }
}
</script>

<style scoped>
/*轮播图两侧箭头样式*/
.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(31,45,61,.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

</style>

