<template>
  <div class="m-header">
    <a-row>
      <a-col :span="24"><top-bar /></a-col>
    </a-row>
    <a-row>
      <span>searchBar</span>
    </a-row>
  </div>
</template>
<script>
import topBar from './topBar/topBar.vue'
export default {
  components: {
    topBar,
  }
}
</script>


