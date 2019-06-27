<template>
  <div id="classify-box">
    <div class="type-list">
      <div class="label">
        <span>分类</span>
        <span class="all">全部</span>
      </div>
      <dl class="list">
        <dd v-for="item in categroy" :key="item">{{item}}</dd>
      </dl>
    </div>
    <div class="type-list">
      <div class="label">
        <span>区域</span>
        <span class="all">全部</span>
      </div>
      <dl class="list">
        <dd v-for="item in region" :key="item">{{item}}</dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      categroy: ['美食','酒店住宿','休闲娱乐','生活服务','时尚购物','丽人SPA','运动健身','汽车服务','婚纱摄影','风景名胜'],
      region:['郫都区','青白江区','武侯区','双流区','金牛区','蜀都区','锦江区','青羊区','成华区','龙泉驿区']
    }
  }
}
</script>
