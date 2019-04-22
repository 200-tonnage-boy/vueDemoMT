<template>
  <div class="m-topBar">
     <a-row class="center-width">
      <a-col :span="5" class="topbar-col"><top-city /></a-col>
      <a-col :span="5" class="topbar-col"><top-user /></a-col>
      <a-col :span="14" class="topbar-col">导航</a-col>
    </a-row>
  </div>
</template>
<script>
import topCity from './city'
import topUser from './user'
export default {
  components: {
    topCity,
    topUser,
  }
}
</script>
<style lang="scss">
@import '@/assets/public/header/topbar.scss';
</style>
