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
          <a-input placeholder="搜索商家或地点" 
            @focus="searchFocus"
            @blur="searchBlur"
            @input="searchInput"
            v-model="search" />
          <a-button type="primary">
            <a-icon type="search" />
          </a-button>
          <dl class="searchList" v-if="searchListTag&&search">
            <dd v-for="(item,index) of searchList" :key="index">{{item}}</dd>
          </dl>
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
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: '',
      searchList: [],
      inputTimer: '',
      searchListTag: false,
    }
  },
  methods: {
    searchFocus () {
      this.searchListTag = true
    },
    searchBlur () {
      this.searchListTag = false
    },
    searchInput () {
      if (this.inputTimer) {
        return 
      } 
      this.inputTimer = setTimeout (() => {
        //axios
        this.searchList = []
        this.$axios.get('/search/inputWords',{
          params: {
            words: this.search,
            city: this.$store.state.geo.position.city
          }
        })
        .then(({status, data}) => {
          if (status===200) {
            this.searchList = data.resList
          } 
        })
        clearTimeout(this.inputTimer)
        this.inputTimer = ''
      },300)
    }
  }
}
</script>


