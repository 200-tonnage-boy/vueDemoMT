<template>
  <div class="top-menuBox">
    <dl @mouseleave="lostMouse">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in $store.state.menu.menu" 
        :key="index"
        @mouseenter="getMouse(item.type)">
        <i :class="item.type" />
        <span>{{item.name}}</span>
        <span class="arrow"> > </span>  
      </dd>
    </dl>
    <div class="show-box" v-if="selected"
      @mouseenter="removeTimer"
      @mouseleave="hidBox">
      <template v-for="(item,index) in selectedShow.child">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="ele in item.child" 
          :key="ele">
          {{ele}}
        </span>
      </template> 
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      timer: '',//清理selected的定时器
      selected: '',//用于保存鼠标进入的item
      // menu: [
      //   {
      //     type: 'food',
      //     name: '美食',
      //     child: [
      //       {
      //         title: '美食',
      //         list: ['代金券', '火锅', '日韩料理', '麻辣烫', '烤肉', '寿喜烧',]
      //       },
      //     ]
      //   },
      //   {
      //     type: 'takeout',
      //     name: '外卖',
      //     child: [
      //       {
      //         title: '外卖',
      //         list: ['外卖']
      //       },
      //     ]
      //   },
      //   {
      //     type: 'hotel',
      //     name: '酒店',
      //     child: [
      //       {
      //         title: '酒店星级',
      //         list: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
      //       },
      //     ]
      //   },
      //   {
      //     type: 'homestay',
      //     name: '榛果民宿',
      //     child: [
      //       {
      //         title: '热门城市',
      //         list: ['北京', '上海', '成都', '武汉', '西安', '深圳',]
      //       },
      //       {
      //         title: '热门房源',
      //         list: ['复式', '别墅']
      //       },
      //     ]
      //   },
      // ]
    }
  },
  methods: {
    getMouse (type) {    
      this.selected = type
    },
    lostMouse () {
      this.timer = setTimeout(()=>{
        this.selected = ''
      },200)
    },
    removeTimer () {
      clearTimeout(this.timer)
    },
    hidBox () {
      this.selected = ''
    }
  },
  computed: {
    selectedShow () {
      return this.$store.state.menu.menu.filter(ele => ele.type === this.selected)[0]
    }
  }
}
</script>
