<template>
  <div class="search-bar">
    <a-row class="search-top">
      <a-col :span="6" class="search-logo">
        <a href="/"><img
          src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
          alt="美团"></a>
      </a-col>
      <a-col :span="16" class="search-input">
        <div class="antd-input-box" tabindex="-1">
          <a-input placeholder="搜索商家或地点" 
            @blur="searchBlur" 
            @focus="searchFocus"        
            @input="searchInput"
            v-model="search" />
          <a-button type="primary">
            <a-icon type="search" />
          </a-button>
          <dl class="searchList" v-if="searchListTag&&search">
            <dd v-for="(item,index) of searchList" :key="index">
              <!-- {{item}} -->
              <nuxt-link :to="{path:'/goodsList', query:{keyWord:item}}">{{item}}</nuxt-link>
            </dd>
          </dl>
        </div>
        <div class="surrding">
          <nuxt-link :to="{path:'/goodsList', query:{keyWord:item}}" v-for="item in initList" :key="item">{{item}}</nuxt-link>
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
      initList: [],
    }
  },
  methods: {
    searchFocus () {
      this.searchListTag = true
    },
    searchBlur () {
      if (timer) {return}
      let timer = setTimeout(()=> {
        this.searchListTag = false
      },500)
    },
    searchInput () {
      if (this.inputTimer) {
        return 
      } 
      this.inputTimer = setTimeout (() => {
        //axios
        this.searchList = []
        //console.log(this.$store.state.geo.position.adcode)
        this.$axios.get('/search/inputWords',{
          params: {
            words: this.search,
            city: this.$store.state.geo.position.adcode
          }
        })
        .then(({status, data}) => {
          //console.log(data)
          if (status===200) {
            this.searchList = data.resList
          } 
        })
        clearTimeout(this.inputTimer)
        this.inputTimer = ''
      },300)
    }
  },
  mounted () {
    this.$axios.get('/search/inputWords',{
      params: {
        words: '游玩',
        city: this.$store.state.geo.position.adcode
      }
    }).then(({status, data}) => {
      if (status===200) {
        this.initList = data.resList
      } 
    })
  }
}
</script>


