export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a')
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
//金额格式转换
export function parsePrice(s) {
  var n = 2 //设置保留的小数位数
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  var l = s
    .split('.')[0]
    .split('')
    .reverse()
  var r = s.split('.')[1]
  var t = ''
  for (var i = 0; i < l.length; i++) {
    t += l[i]
  }
  console.log(t)
  return (
    // '￥' +
    t
      .split('')
      .reverse()
      .join('') +
    '.' +
    r
  )
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

//对时间字符串处理'20210316'
export function timestampToTime(date) {
  //20200904针对str类型的时间进行格式转换
  var date = date.toString()

  var year = date.substr(0, 4)
  var month = date.substr(4, 2)
  var day = date.substr(6, 2)
  // var start = date.substr(9, 5)
  // var end = date.substr(15, 5)
  // var time = date.substr(9)
  return year + '-' + month + '-' + day
  // return year + '年' + month + '月' + day + '日' + ' ' + start + '~' + end
}

//获取星期几
export function getweek(time) {
  var timestamp = 1400000000
  var a = new Date(timestamp * 1000)
  var days = [
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六',
  ]
  var dayOfWeek = days[a.getDay()]
  return dayOfWeek
}
//获取星期几
export function getweekday(date) {
  var weekArray = new Array(
    '星期天',
    '星期一',
    '星期二',
    '星期三',
    '星期四',
    '星期五',
    '星期六'
  )
  var week = weekArray[new Date(date).getDay()] //注意此处必须是先new一个Date
  return week
}
//两个时间戳之间相隔多少天多少小时多少分多少秒
//dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。

export function timeago(dateTimeStamp) {
  var minute = 1000 * 60 //把分，时，天，周，半个月，一个月用毫秒表示
  var hour = minute * 60
  var day = hour * 24
  var week = day * 7
  var halfamonth = day * 15
  var month = day * 30
  var now = new Date().getTime() / 1000 //获取当前时间毫秒
  console.log(now)
  var diffValue = dateTimeStamp - now //时间差

  if (diffValue < 0) {
    return
  }
  var minC = diffValue / minute //计算时间差的分，时，天，周，月
  var hourC = diffValue / hour
  var dayC = diffValue / day
  var weekC = diffValue / week
  var monthC = diffValue / month
  if (monthC >= 1 && monthC <= 3) {
    result = ' ' + parseInt(monthC) + '月前'
  } else if (weekC >= 1 && weekC <= 3) {
    result = ' ' + parseInt(weekC) + '周前'
  } else if (dayC >= 1 && dayC <= 6) {
    result = ' ' + parseInt(dayC) + '天前'
  } else if (hourC >= 1 && hourC <= 23) {
    result = ' ' + parseInt(hourC) + '小时前'
  } else if (minC >= 1 && minC <= 59) {
    result = ' ' + parseInt(minC) + '分钟前'
  } else if (diffValue >= 0 && diffValue <= minute) {
    result = '刚刚'
  } else {
    var datetime = new Date()
    datetime.setTime(dateTimeStamp)
    var Nyear = datetime.getFullYear()
    var Nmonth =
      datetime.getMonth() + 1 < 10
        ? '0' + (datetime.getMonth() + 1)
        : datetime.getMonth() + 1
    var Ndate =
      datetime.getDate() < 10 ? '0' + datetime.getDate() : datetime.getDate()
    var Nhour =
      datetime.getHours() < 10 ? '0' + datetime.getHours() : datetime.getHours()
    var Nminute =
      datetime.getMinutes() < 10
        ? '0' + datetime.getMinutes()
        : datetime.getMinutes()
    var Nsecond =
      datetime.getSeconds() < 10
        ? '0' + datetime.getSeconds()
        : datetime.getSeconds()
    var result = Nyear + '-' + Nmonth + '-' + Ndate
  }
  return result
}

//1、获取出生日期：

export function getBirth(cardId) {
  console.log(cardId)
  var birth =
    cardId.substring(6, 10) +
    '-' +
    cardId.substring(10, 12) +
    '-' +
    cardId.substring(12, 14)

  return birth
}

//2、获取性别：

export function getSex(cardId) {
  if (parseInt(cardId.substr(16, 1)) % 2 == 1) {
    return 1 //男
  } else {
    return 2 //女
  }
}

//3、获取年龄：

function getAge(cardId) {
  var myDate = new Date()
  var month = myDate.getMonth() + 1
  var day = myDate.getDate()
  var age = myDate.getFullYear() - cardId.substring(6, 10) - 1
  if (
    cardId.substring(10, 12) < month ||
    (cardId.substring(10, 12) == month && cardId.substring(12, 14) <= day)
  ) {
    age++
  }
  return age
}
export function cloneOptions(data, optionLabel, optionValue, childrenName) {
  const newData = []
  const deep = (data, newData) => {
    data.forEach((item, index) => {
      newData[index] = {}
      newData[index].value = item[optionValue]
      newData[index].label = item[optionLabel]
      if (item[childrenName] && item[childrenName].length) {
        newData[index].children = []
        deep(item[childrenName], newData[index].children)
      }
    })
  }
  data && deep(data, newData)
  return newData
}
// 代办事项跳转路由
export const followRoute = {
  1: 'cusdetail',
  2: 'certificates',
  3: 'finance',
  4: 'teachSchedule',
  8: 'finance',
  9: 'finance',
  10: 'returnVisit',
}
// a 标签下载
export const download = async (url, filename = '') => {
  const splitArr = url.split('.')
  const currentSuffix = splitArr[splitArr.length - 1]
  const imgSuffix = ["png", "jpg", "jpeg", "gif"];
  const videoSuffix = ['mp4', 'MOV', 'AVI', 'QT', 'ASF', 'WMV', 'm3u8', 'ASF', 'WebM', 'Ogg', 'flv', '']
  console.log(currentSuffix)
  // 视频或者没有后缀的url 打开新窗口
  if (videoSuffix.includes(currentSuffix) || currentSuffix.length > 5) {
    window.open(url)
    return Promise.resolve()
  }
  //只有图片通过请求之后在下载，其他的直接下载
  if (imgSuffix.includes(currentSuffix)) {
    const blob = await fetch(url).then(async res => await res.blob())
    url = URL.createObjectURL(blob)
  }
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  return Promise.resolve()
}