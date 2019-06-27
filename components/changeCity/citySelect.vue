<template>
  <div id="city-select">
    <h3>按省份选择：</h3>
    <div class="select-area">
      <div class="select-province" 
        @focus="showTag = true" 
        @blur="showTag = false"
        tabindex="-1">
        {{curProvince}}<a-icon type="caret-down" />
        <ul class="province-list" 
          :class="{show:showTag&&province.length}"
          @click="selectProvince">
          <li v-for="item in province" :key="item">{{item}}</li>
        </ul>
      </div>
      <div class="select-city" 
        :class="{cityCursor:city.length, cityshow:city.length&&cityShowTag}"
        @focus="cityShowTag = true"
        @blur="cityShowTag = false"
        tabindex="-1">
        城市<a-icon type="caret-down" />
        <ul class="city-list">
          <li v-for="item in city" :key="item">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showTag: false,// 省份选择列表显示控制
      cityShowTag: false,// 市区选择列表显示控制
      curProvince: '省份',
      province: [],
      city: []
    }
  },
  methods: {
    selectProvince (e) {// 省份选择事件
      let province = e.target.innerText + ''
      this.$axios.get('/geo/getCity', {
        params: {
          province,
        }
      }).then((res) => {
        if (res.status===200&&res.data.code===0) {
          this.city = res.data.city
          this.curProvince = province
          this.showTag = false
        }
      })
    }
  },
  mounted () {
    //页面初始化即获得所有省的名字
    this.$axios.get('/geo/getProvince').then(({status,data}) => {
      if (status===200 && data.code===0) {
        this.province = data.province
      }
    })
  }
}
</script>
