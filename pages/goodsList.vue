<template>
  <div id="page-goodsList">
    <good-class />
    <good-list :list="list"/>
  </div>
</template>
<script>
import goodClass from '@/components/goodList/goodClass'
import goodList from '@/components/goodList/goodsList'
export default {
  data () {
    return {
      list:'',
    }
  },
  components: {
    goodClass,
    goodList,
  }, 
  mounted () {
    //console.log(this.list)
  },
  async asyncData (ctx) {
    let keyWord=ctx.query.keyWord
    let city = ctx.store.state.geo.position.adcode
    let {status,data} = await ctx.$axios.get('/search/goodsInit',{
      params: {
        keyWord,
        city
      }
    })
    return {
      list: data.resList
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/goodsList/index.scss'
</style>

