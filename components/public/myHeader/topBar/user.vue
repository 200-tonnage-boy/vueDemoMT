<template>
  <div>
    <template v-if="user">
      欢迎您，<span class="">{{ user }}</span>
      [<nuxt-link to="#">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to="#">立即登录</nuxt-link>
      <nuxt-link to="#">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:''
    }
  },
}
</script>

