<template>
  <div class="index-iStyle">
    <div class="iStyle-tab">
      <ul @mouseover="tagEnter">
        <li class="tab-item tab-title" kind='all' keyWord="景点">有格调</li>
        <li class="tab-item" kind='all' :class="{active:kind==='all'}" keyWord="景点">全部</li>
        <li class="tab-item" kind='party' :class="{active:kind==='party'}" keyWord="餐厅">约会聚餐</li>
        <li class="tab-item" kind='spa' :class="{active:kind==='spa'}" keyWord="SPA">丽人SPA</li>
        <li class="tab-item" kind='move' :class="{active:kind==='move'}" keyWord="电影院">电影演出</li>
        <li class="tab-item" kind='travel' :class="{active:kind==='travel'}" keyWord="旅游">品质出游</li>
      </ul>
    </div>
    <div class="iStyle-container">
      <ul class="iStyle-show">
        <li class="show-item" v-for="(item, index) of curiStyle" :key="index">
          <div class="item-img">
            <img :src="item.img" alt="">
          </div>
          <ul>
            <li class="item-title">{{item.title}}</li>
            <li class="item-price">￥{{item.price}}/人</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      kind: 'all',
      list: {
        all: [],
        party: [],
        spa: [],
        move: [],
        travel: []
      }
    }
  },
  computed: {
    curiStyle () {
      return this.list[this.kind]
    }
  },
  mounted () {
    this.$axios.get('/search/iStyle',{
      params: {
        keyWord: '景点',
        city: this.$store.state.geo.position.city
      }
    }).then(({status,data}) => {
      if (status===200&&data) {
        this.list[this.kind]  = data.resList
      }
    })
  },
  methods: {
    tagEnter (e) {
      let dom = e.target
      let tagName = dom.tagName.toLowerCase()
      if (tagName === 'li') {
        this.kind = dom.getAttribute('kind')
        let keyWord = dom.getAttribute('keyWord')
        this.$axios.get('/search/iStyle',{
          params: {
            keyWord,
            city: this.$store.state.geo.position.city
          }
        }).then(({status,data}) => {
          if (status===200&&data) {
            this.list[this.kind]  = data.resList
          }
        })
      } 
    }
  }
}
</script>

