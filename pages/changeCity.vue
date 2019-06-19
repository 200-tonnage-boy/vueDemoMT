<template>
  <div id="city-page">
    <a-row>
      <city-select />
    </a-row>
    <a-row>
      热门城市
    </a-row>
    <a-row>
      选择历史
    </a-row>
    <a-row>
      <city-list />
    </a-row>
  </div>
</template>
<script>
import citySelect from '@/components/changeCity/citySelect'
import cityList from '@/components/changeCity/cityList'
export default {
  components: {
    citySelect,
    cityList,
  }
}
</script>
<style lang="scss">
@import '@/assets/changeCity/index.scss';
</style>

