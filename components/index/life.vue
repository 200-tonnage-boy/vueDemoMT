<template>
  <div class="top-lifeBox">
    <a-row class="life-nav">
      <ul class="search-nav">
        <li><nuxt-link to="#" class="a-yellow">美团外卖</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">猫眼电影</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">美团酒店</nuxt-link></li>
        <li><nuxt-link to="#" class="a-yellow">民宿/公寓</nuxt-link></li>
        <li><nuxt-link to="#">商家入驻</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">美团公益</nuxt-link></li>
      </ul>
    </a-row>
    <a-row class="top-lifeBox-topRow">
      <a-col :span="14" class="life-slider">
        <slider />
      </a-col>
      <a-col :span="4" class="life-relax">
        <img src="@/assets/image/index/relax-life.jpg" alt="">
      </a-col>
      <a-col :span="6" class="life-login">col-8</a-col>
    </a-row>
    <a-row class="top-lifeBox-bottomRow">
      <a-col :span="7" class="life-hotel">
        <img src="@/assets/image/index/hotel.png" alt="">
      </a-col>
      <a-col :span="7" class="life-funny">
        <img src="@/assets/image/index/funny.jpg" alt="">
      </a-col>
      <a-col :span="4" class="life-cooper">
        <img src="@/assets/image/index/cooper.jpg" alt="">
      </a-col>
      <a-col :span="6" class="life-QRcode">
       
      </a-col>
    </a-row>
  </div>
</template> 
<script>
import Slider from '@/components/index/slider'
export default {
  components: {
    Slider
  }
}
</script>

