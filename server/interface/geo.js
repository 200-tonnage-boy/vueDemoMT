import Router from 'koa-router'
import axios from './utils/axios'
import Menu from '../dbs/models/menu'
import pinyin from 'node-pinyin'
import fs from'fs'
let router = new Router({prefix: '/geo'})// 添加统一前缀

router.get('/getPosition', async (ctx) => {
  let myip = ctx.ip
  if(myip == '127.0.0.1') {myip = '113.54.201.197'}
  let {status,data} = await axios.get(`http://restapi.amap.com/v3/ip?ip=${myip}&key=32c0352854e7f569d5cff1347edae42e`)
  if(status===200&&data.status==='1') {
    ctx.body = {
      province: data.province,
      city: data.city,
      adcode: data.adcode,
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
// 所有城市
router.get('/getCityList', async (ctx) => {
  let {data}=await axios.get('https://restapi.amap.com/v3/config/district',{
    params: {
      keywords: '中国',
      subdistrict: 2,
      key: '32c0352854e7f569d5cff1347edae42e'
    }
  })
  if (data.status === '1') {
    let receive = [],res = [],s,cityPinyin // receive接收从高德接口返回的数据   // res为返回客户端的数据，s为临时变量
    data.districts[0].districts.forEach((item) => {
      //此处item是省份
      item.districts.forEach((ele) => {
        // 此处ele为市一级城市
        
        receive.push(ele.name.replace(/市|特别行政区|/g,""))
      })
    })

    for (let i=65; i<=90; i++) {//创建A-Z的分类   每个对象有一个title  一个city数组
      s = String.fromCharCode(i)
      res.push({
        title: s,
        city: []
      })
    }
    let test = []
    receive.forEach((item) => {
      cityPinyin = pinyin(item, {style: 'normal'})[0][0].slice(0,1).toUpperCase()//获取城市的拼音首字母
      test.push(cityPinyin)
      res.forEach((ele) => {// ele为对象  包含title和city数组
        if (ele.title === cityPinyin) {
          ele.city.push(item)
          return false
        }
      })
    })
    let allCity = res.filter(item => item.city.length > 0)// 把没有城市的部分剔除掉  如I O等
    //测试部分
    let testS = JSON.stringify(allCity)
    fs.writeFile('/static/city.json',testS,(err)=>{
      if (err) {
        console.log('err:'+err)
      } else {
        console.log('sucss')
      }
    })
    //测试部分
    ctx.body = {
      code: 0,
      allCity,
    }

  } else {
    ctx.body = {
      code: -1,
      msg:'接口错误'
    }
  }
})

export default router