<template>
  <div>
    <template v-if="user">
      欢迎您，<span class="">{{ user }}</span>
      [<span @click="exit" class="exit">退出</span>]
    </template>
    <template v-else>
      <nuxt-link to="/login">立即登录</nuxt-link>
      <nuxt-link to="/register">注册</nuxt-link>
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
  mounted () {
    this.$axios.get('/users/getUser').then(({status,data}) => {
      if(status===200) {//响应成功
        this.user = data.user
      }
    })
  },
  methods: {
    exit (e) {
       e.preventDefault();//阻止跳转
       this.$axios.get('/users/exit').then(({status,data}) => {
         if(status === 200 && data.code === 0) {
           window.location.href = '/' 
         }
       })
    },
  }
}
</script>
<style lang="scss" scoped>
.exit {
  &:hover {
    cursor: pointer;
    color: #41B883;
  }
}
</style>


