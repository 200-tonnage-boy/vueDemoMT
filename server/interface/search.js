import Router from 'koa-router';
import axios from './utils/axios'

let router = new Router({prefix: '/search'})// 添加统一前缀
// 搜索功能
router.get('/inputWords', async (ctx) => {
  let keyWords = ctx.query.words //用户输入的词
  let city = ctx.query.city
  //console.log()
  //.replace('市','').toString()
  //console.log(city)
  let {status,data}=await axios.get('https://restapi.amap.com/v3/place/text?',{
    params: {
      keywords: keyWords,
      city,
      offset: 5,
      page: 1,
      key: '32c0352854e7f569d5cff1347edae42e'
    }
  })
  if(status === 200 && data.status === '1'){
    let resList = []
    data.pois.forEach((item)=>{
      resList.push(item.name)
    })
    ctx.body = {
      resList
    }
  }
})
// 首页istyle部分初始化
router.get('/iStyle',async (ctx) => {
  let keyWord = ctx.query.keyWord
  let city = ctx.query.city.replace('市','').toString()
  let {status,data}=await axios.get('https://restapi.amap.com/v3/place/text?',{
    params: {
      keywords: keyWord,
      city,
      offset: 20,
      page: 1,
      key: '32c0352854e7f569d5cff1347edae42e'
    }
  })
  if(status === 200 && data.status === '1'){
    let resList = []
    data.pois.forEach((item)=>{
      if (item.photos && item.photos.length>0) {
        resList.push({
          title: item.name,
          img: item.photos[0].url,
          price: (item.biz_ext==[] || item.biz_ext.cost.length==0) ? '暂无报价' :item.biz_ext.cost 
        })
      }
    })
    ctx.body = {
      resList: resList.length<5 ? resList :resList.slice(0,6)
    }
  }
})
// 商品列表的初始化
router.get('/goodsInit',async (ctx) => {
  let keyWord = ctx.query.keyWord
  let city = ctx.query.city.replace('市','').toString()
  let {status,data}=await axios.get('https://restapi.amap.com/v3/place/text?',{
    params: {
      keywords: keyWord,
      city,
      offset: 20,
      page: 1,
      key: '32c0352854e7f569d5cff1347edae42e'
    }
  })
  if(status === 200 && data.status === '1'){
    let resList = []
    data.pois.forEach((item)=>{
      if (item.photos && item.photos.length>0) {
        resList.push({
          title: item.name,
          img: item.photos[0].url,
          price: (item.biz_ext==[] || item.biz_ext.cost.length==0) ? '暂无报价' :item.biz_ext.cost,
          rate: item.biz_ext.rating ? item.biz_ext.rating : '0'
        })
      }
    })
    ctx.body = {
      resList: resList.length<5 ? resList :resList.slice(0,6)
    }
  }
})

export default router