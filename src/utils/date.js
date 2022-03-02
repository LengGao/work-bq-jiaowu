// date.js
import moment from 'moment' //导入moment模块
moment.locale('zh-cn') //设置语言
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  let dateArr = dateStr.split(separator);
  let year = parseInt(dateArr[0]);
  let month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  let day = parseInt(dateArr[2]);
  let date = new Date(year, month - 1, day);
  return date;
}
// 日期选择器的快捷配置 
export function getShortcuts(types) {
  const dateMap = {
    1: {
      text: "今天",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        picker.$emit("pick", [start, end]);
      },
    },
    2: {
      text: "昨天",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
        picker.$emit("pick", [start, start]);
      },
    },
    3: {
      text: "本周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(
          start.getTime() - 3600 * 1000 * 24 * ((end.getDay() || 7) - 1)
        );
        picker.$emit("pick", [start, end]);
      },
    },
    4: {
      text: "上周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        const currentDay = end.getDay() || 7;
        end.setTime(end.getTime() - 3600 * 1000 * 24 * currentDay);
        start.setTime(
          start.getTime() - 3600 * 1000 * 24 * (currentDay + 6)
        );
        picker.$emit("pick", [start, end]);
      }
    },
    5: {
      text: "本月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        const currentDate = end.getDate();
        start.setTime(
          start.getTime() - 3600 * 1000 * 24 * (currentDate - 1)
        );
        picker.$emit("pick", [start, end]);
      },
    },
    6: {
      text: "上月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        const currentDate = end.getDate();
        end.setTime(end.getTime() - 3600 * 1000 * 24 * currentDate);
        const lastDate = end.getDate();
        start.setTime(
          start.getTime() -
          3600 * 1000 * 24 * (currentDate + lastDate - 1)
        );
        picker.$emit("pick", [start, end]);
      },
    },
    7: {
      text: "本季度",
      onClick(picker) {
        const start = new Date();
        const end = new Date();
        const currentMonth = end.getMonth();
        const currentDate = end.getDate();
        let startMonth = 0;
        if (currentMonth <= 2) {
          startMonth = 0;
        } else if (currentMonth <= 5) {
          startMonth = 3;
        } else if (currentMonth <= 8) {
          startMonth = 6;
        } else {
          startMonth = 9;
        }
        start.setMonth(startMonth);
        start.setTime(
          start.getTime() - 3600 * 1000 * 24 * (currentDate - 1)
        );
        picker.$emit("pick", [start, end]);
      },
    },
    8: {
      text: "上季度",
      onClick(picker) {
        const start = new Date();
        const end = new Date();
        const currentMonth = end.getMonth();
        const currentDate = end.getDate();
        const lastQuarterMap = {
          0: 9,
          3: 0,
          6: 3,
          9: 6,
        };
        let currentQuarterMontn = 0;
        if (currentMonth <= 2) {
          currentQuarterMontn = 0;
        } else if (currentMonth <= 5) {
          currentQuarterMontn = 3;
        } else if (currentMonth <= 8) {
          currentQuarterMontn = 6;
        } else {
          currentQuarterMontn = 9;
        }
        const lastQuarterMontn = lastQuarterMap[currentQuarterMontn];
        end.setMonth(currentQuarterMontn);
        end.setTime(end.getTime() - 3600 * 1000 * 24 * currentDate);
        start.setMonth(lastQuarterMontn);
        start.setTime(
          start.getTime() - 3600 * 1000 * 24 * (currentDate - 1)
        );
        picker.$emit("pick", [start, end]);
      }
    },
    9: {
      text: "今年",
      onClick(picker) {
        const end = new Date();
        const start = new Date(end.getFullYear(), 0, 1);
        picker.$emit("pick", [start, end]);
      },
    },
    10: {
      text: "去年",
      onClick(picker) {
        const currentYear = new Date().getFullYear()
        const end = new Date(currentYear - 1, 11, 31);
        const start = new Date(currentYear - 1, 0, 1);
        picker.$emit("pick", [start, end]);
      },
    },
  }
  const shortcuts = types.map(item => dateMap[item]);
  console.log(shortcuts)
  return shortcuts
}

// 今天
export const today = moment().format("YYYY-MM-DD");
// 昨天
const yesterday = moment().subtract(1, "day").format("YYYY-MM-DD");
// 这个月
export const thisMonth = moment().startOf("month").format("YYYY-MM-DD");
// 上月
const lastMonthStart = moment()
  .subtract(1, "month")
  .startOf("month")
  .format("YYYY-MM-DD");
const lastMonthEnd = moment()
  .subtract(1, "month")
  .endOf("month")
  .format("YYYY-MM-DD");
// 本季度
const thisQuarterStart = moment()
  .startOf("quarter")
  .format("YYYY-MM-DD");
// 上季度
const lastQuarterStart = moment()
  .quarter(moment().quarter() - 1)
  .startOf("quarter")
  .format("YYYY-MM-DD");
const lastQuarterEnd = moment().quarter(moment().quarter() - 1).endOf('quarter').format('YYYY-MM-DD')
// 本年
const thisYearStart = moment().year(moment().year()).startOf('year').format('YYYY-MM-DD')
//去年第一天
const lastYearStart = moment().subtract(1, 'year').startOf('year').format('YYYY-MM-DD')
//去年最后一天
const lastYearEnd = moment().subtract(1, 'year').endOf('year').format('YYYY-MM-DD')
export const dateMap = {
  0: `${thisMonth},${today}`,
  1: `${lastMonthStart},${lastMonthEnd}`,
  2: `${thisQuarterStart},${today}`,
  3: `${lastQuarterStart},${lastQuarterEnd}`,
  4: `${thisYearStart},${today}`,
  5: `${lastYearStart},${lastYearEnd}`,
  6: `${today},${today}`,
  7: `${yesterday},${yesterday}`,
};