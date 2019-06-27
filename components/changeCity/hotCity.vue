<template>
  <div id="hot-city">
    <h3>热门城市：</h3>
    <div class="city-item">
      <a href="#" v-for="item in list" :key="item">{{item}}</a>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: ['北京','上海','深圳','广州','天津','成都']
    }
  }
}
</script>

