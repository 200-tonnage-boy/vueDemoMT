<template>
  <div class="m-topBar center-width">
     <a-row >
      <a-col :span="5" class="topbar-col"><top-city /></a-col>
      <a-col :span="5" class="topbar-col"><top-user /></a-col>
      <a-col :span="14" class="topbar-col"><top-nav /></a-col>
    </a-row>
  </div>
</template>
<script>
import topCity from './city'
import topUser from './user'
import topNav from './nav'
export default {
  components: {
    topCity,
    topUser,
    topNav,
  }
}
</script>

