<template>
  <div class="goods-list">
    商品列表
    <div class="sort">
      不同规则排序
    </div>
    <div class="list">
      <Item  v-for="(item,index) in list" :key="index" :detail="item"/>
      <!-- <li v-for="(item,index) in list" :key="index">
        {{item.title}}
        <img :src="item.img" alt="">
      </li> -->
    </div>

  </div>
</template>
<script>
import Item from '@/components/goodList/good.vue'
export default {
  props: {
    list: Array
  },
  components: {
    Item,
  },
  // mounted () {
  //   console.log(this.list)
  // }
}
</script>
