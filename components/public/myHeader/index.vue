<template>
  <div class="m-header">
    <a-row class="bgc">
      <a-col :span="24">
        <top-bar />
      </a-col>
    </a-row>
    <a-row :span="24">
      <search-bar />
    </a-row>
  </div>
</template>
<script>
import topBar from './topBar/topBar.vue'
import searchBar from './searchBar/searchBar'
export default {
  components: {
    topBar,
    searchBar,
  }
}
</script>
<style lang="scss">
  @import '@/assets/public/header/header.scss';
</style>


