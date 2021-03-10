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
