<template>
  <section class="index-container">
    <a-row class="index-top">
      <a-col :span="5" class="top-menu-uibox">
        <top-menu />
      </a-col>
      <a-col :span="19">col-12</a-col>
    </a-row>
  </section>
</template>

<script>
import TopMenu from '@/components/index/menu.vue'
export default {
  components: {
    TopMenu,
  }
}
</script>
<style lang="scss">
  @import '@/assets/index/index.scss';
</style>

