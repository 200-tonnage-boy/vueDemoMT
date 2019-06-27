<template>
  <div id="city-page">
    <a-row>
      <city-select />
    </a-row>
    <a-row>
      <hot-city />
    </a-row>
    <a-row>
      <history-city />
    </a-row>
    <a-row>
      <city-list />
    </a-row>
  </div>
</template>
<script>
import citySelect from '@/components/changeCity/citySelect'
import cityList from '@/components/changeCity/cityList'
import hotCity from '@/components/changeCity/hotCity'
import historyCity from '@/components/changeCity/historyCity'
export default {
  components: {
    citySelect,
    cityList,
    hotCity,
    historyCity,
  }
}
</script>
<style lang="scss">
@import '@/assets/changeCity/index.scss';
</style>

