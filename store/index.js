import Vue from 'vue'
import Vuex from 'vuex'
import geo from './module/geo'
import menu from './module/menu'

Vue.use(Vuex)

const store  = () => new Vuex.Store({
  modules: {
    geo,
    menu
  },
  actions: {
    async nuxtServerInit ({commit}, {app}) {//app代指vue根实例
      const {status,data:{province,city,adcode}} = await app.$axios.get('/geo/getPosition')
      commit('geo/setPosition',status===200?{city,province,adcode}:{city:'',province:'',adcode:''})
      const {status:status2,data:{menu}}=await app.$axios.get('/geo/menu')
      commit('menu/setMenu',status2===200?menu:[])
      //console.log(menu)
    }
  }
})

export default store