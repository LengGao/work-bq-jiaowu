//引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
//使用mockjs模拟数据
Mock.mock('/api/data', (req, res) => {
  //当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
  let type = JSON.parse(req.body).data
  console.log(type,'hai,我在这里')
  let list = []
  let num = 7,
    monthDta,
    yearData,
    weekData,
    dayData,
    low,
    hight
  if (type == 'today') {
    num = 24
    low = 50
    hight = 200
    dayData = {
      data: [],
    }
    for (let i = 0; i <= 24; i++) {
      dayData.data.push(i + '点')
    }
    console.log(dayData)
    list.push(dayData)
  } else if (type == 'toWeek') {
    num = 7
    low = 700
    hight = 7000
    weekData = {
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    }
    list.push(weekData)
  } else if (type == 'toMonth') {
    num = 30
    low = 3000
    hight = 30000
    monthDta = {
      data: [],
    }
    for (let i = 1; i < 31; i++) {
      monthDta.data.push(i + '号')
    }
    console.log(monthDta)
    list.push(monthDta)
  } else if (type == 'toYear') {
    num = 12
    low = 30000
    hight = 100000
    yearData = {
      data: [],
    }
    for (let i = 1; i < 13; i++) {
      yearData.data.push(i + '月份')
    }
    list.push(yearData)
  }
  for (let i = 0; i <= num; i++) {
    let listObject = {
      title: Random.csentence(5, 10), //随机生成一段中文文本。
      company: Random.csentence(5, 10),
      attention_degree: Random.integer(low, hight), //返回一个随机的整数。
      photo: Random.image('114x83', '#00405d', '#FFF', 'Mock.js'),
    }
    list.push(listObject)
  }
  return {
    data: list,
  }
})
