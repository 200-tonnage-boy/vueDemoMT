<template>
  <div class="top-menuBox">
    <dl>
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menu" :key="index">
        <i :class="item.type" />
        <span>{{item.name}}</span>
        <span class="arrow"> > </span>  
      </dd>
    </dl>
    <div class="show-box">
      
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [
        {
          type: 'food',
          name: '美食',
          child: [
            {
              title: '美食',
              list: ['代金券', '火锅', '日韩料理', '代金券', '火锅', '日韩料理',]
            },
          ]
        },
        {
          type: 'takeout',
          name: '外卖',
          child: [
            {
              title: '外卖',
              list: ['外卖']
            },
          ]
        },
        {
          type: 'hotel',
          name: '酒店',
          child: [
            {
              title: '酒店星级',
              list: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
            },
          ]
        },
        {
          type: 'homestay',
          name: '榛果民宿',
          child: [
            {
              title: '热门城市',
              list: ['北京', '上海', '成都', '武汉', '西安', '深圳',]
            },
            {
              title: '热门房源',
              list: ['复式', '别墅']
            },
          ]
        },
      ]
    }
  }
}
</script>
