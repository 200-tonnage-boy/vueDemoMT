<template>
  <div id="components-layout-demo-basic">
    <a-layout>
      <a-layout-header class="header"><my-header /></a-layout-header>
      <a-layout-content><nuxt /></a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </div>
</template>
<script>
import myHeader from '@/components/public/myHeader/index.vue'
export default {
  components: {
    myHeader,
  }
}
</script>
<style lang="scss" scoped>
.header {
  height: 200px;
} 
</style>

