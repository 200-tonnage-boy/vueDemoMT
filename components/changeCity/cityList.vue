<template>
  <div id="city-list">
    <div class="top-letterList">
      <h3>按拼音首字母选择：</h3>
      <div class="letter-box">
        <a :href="'#'+item.title" v-for="item in list" :key="item.title">{{item.title}}</a>
      </div>
    </div>
    <div class="city-box" v-for="item in list" :key="item.title" :id="item.title">
        <span class="title">{{item.title}}</span>
        <span class="cityItem-box">
          <a href="#" class="city" v-for="cityItem in item.city" :key="cityItem">{{cityItem}}</a>
        </span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      letter: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      list:[]
      // list:[{
      //   title: 'A',
      //   city:['阿拉善盟','鞍山市','安庆市','安阳市','阿坝','阿里地区','安康市','阿克苏地区','阿勒泰地区','阿尔拉市',]
      // },{
      //   title: 'B',
      //   city:['北京','保定市','包头市','巴彦淖尔市','本溪市','白山市','白城市','蚌埠市','豪州市','滨州市','北海市',
      //   '百色市','白沙','宝鸡','毕节地区','白银市','博尔塔拉']
      // }],
    }
  },
  async mounted () {
    // let {status, data} = await  this.$axios.get('/geo/getCityList')
    // if (status===200 && data.code === 0) {
    //   this.list = data.allCity
    // }
    let data = await this.$axios.get('city.json')
    if (data.status===200 && data.data) {
       this.list = data.data
    }
  }
}
</script>

