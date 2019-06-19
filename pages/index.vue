<template>
  <section class="index-container">
    <a-row class="index-top">
      <a-col :span="5" class="top-menu-uibox">
        <top-menu />
      </a-col>
      <a-col :span="19">
        <top-life />
      </a-col>
    </a-row>
    <a-row class="index-iStyle-wrapper">
      <i-style />
    </a-row>
  </section>
</template>

<script>
import topMenu from '@/components/index/menu.vue'
import topLife from '@/components/index/life.vue'
import iStyle from '@/components/index/style.vue'
export default {
  components: {
    topMenu,
    topLife,
    iStyle,
  }
}
</script>
<style lang="scss">
  @import '@/assets/index/index.scss';
</style>

