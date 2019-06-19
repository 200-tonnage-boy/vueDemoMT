<template>
  <div>
    <a-icon type="reload" />
    <span>{{$store.state.geo.position.city}} </span>
    <nuxt-link to="/changeCity" class="change-city">切换城市</nuxt-link>
    [郫县 春熙 天府]
  </div>
</template>
<script>
export default {
  
}
</script>

