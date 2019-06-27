<template>
  <div class="item">
    <a href="#"><img :src="detail.img" alt=""></a>
    <dl class="detail">
      <dt class="title"><a href="#">{{detail.title}}</a></dt>
      <dd class="rate">
        <a-rate :defaultValue="parseFloat(detail.rate)" disabled  allowHalf />
        <span>{{detail.rate+'评分'}}</span>
      </dd>
      <dd :class="detail.price==='暂无报价' ? 'noPrice' : 'price'">
        {{detail.price==='暂无报价' ? '暂无报价' : '￥'+detail.price+'起' }}
      </dd>
    </dl>
  </div>
</template>
<script>
export default {
  props: {
    detail: {
      type: Object,
      default: {}
    },
  },
  // mounted () {
  //   console.log(detail)
  // }
}
</script>

