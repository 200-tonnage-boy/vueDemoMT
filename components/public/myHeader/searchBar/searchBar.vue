<template>
  <div class="search-bar">
    <a-row class="search-top">
      <a-col :span="6" class="search-logo">
        <img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团">
      </a-col>
      <a-col :span="16" class="search-input">
        <div class="antd-input-box">
          <a-input placeholder="搜索商家或地点"/>
          <a-button type="primary">
            <a-icon type="search" />
          </a-button>
        </div>
        <div class="surrding">
          <a href="#">大熊猫繁殖基地</a>
          <a href="#">成都失恋博物馆</a>
          <a href="#">成都欢乐谷</a>
          <a href="#">成都海昌极地公园</a>
          <a href="#">成都动物园</a>
        </div>
      </a-col>
    </a-row>
    <a-row class="search-bottom">
      <ul class="search-nav">
        <li><nuxt-link to="#" class="a-yellow">美团外卖</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">猫眼电影</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">美团酒店</nuxt-link></li>
        <li><nuxt-link to="#" class="a-yellow">民宿/公寓</nuxt-link></li>
        <li><nuxt-link to="#">商家入驻</nuxt-link></li>
        <li><nuxt-link to="#" class="a-red">美团公益</nuxt-link></li>
      </ul>
    </a-row>
  </div>
</template>
<script>
export default {
  // methods: {
  //   onSearch () {
  //     alert('搜索test')
  //   }
  // }
}
</script>


