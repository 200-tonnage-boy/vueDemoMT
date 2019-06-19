import Router from 'koa-router';
import axios from './utils/axios'
import Menu from '../dbs/models/menu'

let router = new Router({prefix: '/geo'})// 添加统一前缀

router.get('/getPosition', async (ctx) => {
  let myip = ctx.ip
  if(myip == '127.0.0.1') {myip = '113.54.201.197'}
  let {status,data} = await axios.get(`http://restapi.amap.com/v3/ip?ip=${myip}&key=32c0352854e7f569d5cff1347edae42e`)
  if(status===200&&data.status==='1') {
    ctx.body = {
      province: data.province,
      city: data.city
    }
  } else {
    ctx.body = {
      province: '',
      city: ''
    }
  }
})
//首页菜单数据
router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
    ctx.body = {
      menu: result.menu
    }
})
//获得全部省份
router.get('/getProvince', async (ctx) => {
  let {data}=await axios.get('https://restapi.amap.com/v3/config/district',{
    params: {
      keywords: '中国',
      subdistrict: 1,
      key: '32c0352854e7f569d5cff1347edae42e'
    }
  })
  if (data.status === '1') {
    let districts = data.districts[0].districts
    let res = []
    districts.forEach((item) => {
      res.push(item.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g,""))
    })
    ctx.body = {
      code: 0,
      province: res
    }
  } else {
    ctx.body = {
      code: -1,
      province: ''
    }
  }
})

// 获得省份对应的城市
//首页菜单数据
router.get('/getCity', async (ctx) => {
  let province = ctx.query.province// 获取传递过来的省份
  if (province) {
    let {data}=await axios.get('https://restapi.amap.com/v3/config/district',{
      params: {
        keywords: province,
        subdistrict: 1,
        key: '32c0352854e7f569d5cff1347edae42e'
      }
    })
    if (data.status==='1') {
      let res = []
      data.districts[0].districts.forEach((item) => {
        res.push(item.name.replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|藏族|羌族|彝族|朝鲜族|土家族|苗族|侗族|布依族|哈尼族|傣族|自治州|白族|景颇族|僳僳族|蒙古族|黎族|自治县/g,""))
      })
      ctx.body = {
        code: 0,
        city: res
      }
    } else {
      ctx.body = {
        code: -1,
        city: 'server err'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      city: 'no params'
    }
  }
})

export default router