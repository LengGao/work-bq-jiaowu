<template>
  <div class="about">
    <div class="wrapper-header" v-if="wrapperShow">
      <div>
        <h1>Hi，欢迎使用东培学堂学生管理平台！</h1>
        <h2>轻松管理您的网课平台，提升工作效率，降低业务成本。</h2>
      </div>
      <div class="wrapper-header-exbtn" @click="shoWrapper">
        <img src="../../assets/images/exbtn.png" alt="" />
      </div>
    </div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p
              style="font-weight: 400;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;"
            >
              今日销售总额
            </p>
            <span
              style="font-size: 30px;color: rgba(0, 0, 0, 0.847058823529412);line-height: 38px;margin-top:20px"
            >
              ￥{{ todaySaleMoney.todayAmount }}</span
            >
            <div>
              <span
                style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;margin-right:10px"
                >日环比</span
              >
              <span style="margin-right:10px"
                >{{ todaySaleMoney.dayCircleRate }}%</span
              ><span
                :class="
                  todaySaleMoney.dayCircleTrend == 'down'
                    ? 'el-icon-caret-top green'
                    : 'el-icon-caret-bottom red'
                "
                style="margin-right:10px"
              ></span>
              <span
                style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;margin-right:10px"
                >周环比</span
              >
              <span>{{ todaySaleMoney.weekCircleRate }}%</span
              ><span
                :class="
                  todaySaleMoney.weekCircleTrend == 'down'
                    ? 'el-icon-caret-top green'
                    : 'el-icon-caret-bottom red'
                "
                style="margin-right:10px"
              ></span>
            </div>
          </div>
          <div
            class="text item"
            style="font-size: 14px; color: rgba(0, 0, 0, 0.647058823529412);text-align: left;"
          >
            <span style="margin-right:15px">本月销售额</span
            ><span>￥</span>4987562
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p>今日支付订单</p>
            <p style="fontSize:30px;margin-top:4px;margin-bottom:3px">
              {{ todayOrder.todayTotal }}
            </p>
            <div style="width:100%;height:25px;position:relative;top:-50px">
              <smallEachert
                :lines="msg"
                :xdata="todayOrder.xAry"
                :Yseries="todayOrder.yAry"
              />
            </div>
          </div>
          <div
            class="text item"
            style="font-size: 14px; color: rgba(0, 0, 0, 0.647058823529412);text-align: left;"
          >
            <span
              style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);margin-right:20px"
              >日环比</span
            >
            <span style="margin-right:10px"
              >{{ todayOrder.dayCircleRate }}%</span
            >
            <span
              :class="
                todayOrder.dayCircleRateTrend == 'down'
                  ? 'el-icon-caret-bottom red'
                  : 'el-icon-caret-top green'
              "
              style="margin-right:10px"
            ></span>
            <span
              style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);margin-right:20px"
              >周环比</span
            >
            <span style="margin-right:10px"
              >{{ todayOrder.weekCircleRate }}%</span
            >
            <span
              :class="
                todayOrder.weekCircleRateTrend == 'down'
                  ? 'el-icon-caret-bottom red'
                  : 'el-icon-caret-top green'
              "
              style="margin-right:10px;color:"
            ></span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p
              style="font-weight: 400;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;"
            >
              今日新增用户
            </p>
            <span
              style="font-size: 30px;color: rgba(0, 0, 0, 0.847058823529412);line-height: 38px;margin-top:20px"
              >{{ registerNum.today_new_user_count }}</span
            >
            <div>
              <span
                style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;margin-right:10px"
                >日环比</span
              >
              <span style="margin-right:10px">{{ registerNum.from_day }}%</span>
              <span
                :class="
                  registerNum.from_day < 0
                    ? 'el-icon-caret-bottom red'
                    : 'el-icon-caret-top green'
                "
                style="margin-right:10px"
              ></span>
              <span
                style="font-weight: 400;font-style: normal;color: rgba(0, 0, 0, 0.427450980392157);line-height: 22px;margin-right:10px"
                >周环比</span
              >
              <span>{{ registerNum.from_week }}%</span>
              <span
                :class="
                  registerNum.from_week < 0
                    ? 'el-icon-caret-bottom red'
                    : 'el-icon-caret-top green'
                "
                style="margin-right:10px"
              ></span>
            </div>
          </div>
          <div
            class="text item"
            style="font-size: 14px; color: rgba(0, 0, 0, 0.647058823529412);text-align: left;"
          >
            <span style="margin-right:15px">用户数</span
            ><span>{{ registerNum.user_total_count }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <p>实时访问量</p>
            <p style="fontSize:30px;margin-top:4px;margin-bottom:3px">
              {{ visitornum.recent_visit_num }}
            </p>
            <div style="width:100%;height:25px;position:relative;top:-60px">
              <smallbar :lines="msg" :xdata="allvis.x" :Yseries="allvis.y" />
            </div>
          </div>
          <div
            class="text item"
            style="font-size: 14px; color: rgba(0, 0, 0, 0.647058823529412);text-align: left;"
          >
            <span style="margin-right:15px">今日访问量</span
            ><span>{{ visitornum.today_visit_num }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="wrapper-charts">
      <ul class="wrapper-top-fun">
        <li
          v-for="(item, index) in content"
          @click="doActive(index)"
          :class="{ active: index == current }"
          :key="item.id"
        >
          <span>{{ item.name }}</span>
        </li>
        <div class="wrapper-time-list">
          <li
            v-for="(item, index) in timeList"
            @click="doActiveTime(index)"
            :class="{ activeTime: index == currentTime }"
            :key="item.id"
          >
            <span @click="ChangeData(item)">{{ item.name }}</span>
          </li>
        </div>
      </ul>
      <eachertline
        :lines="msg"
        :xdata="allvis.x"
        :Yseries="allvis.y"
        v-if="!current"
      />
      <eachertbar
        :lines="msg"
        :xdata="allMoney.xAry"
        :Yseries="allMoney.yAry"
        v-if="current"
      />
      <ul class="wrapper-info" v-if="!current">
        <li>
          <p style="font-size: 12px;color: #989898;">累计在线人数</p>
          <p style="font-size: 28px;color: #666666;">
            {{ allvis.total_count }}
          </p>
          <p>
            <span :class="allvis.total_count_from_past < 0 ? ' red' : ' green'"
              >{{ allvis.total_count_from_past }}%</span
            >
            <i
              :class="
                allvis.total_count_from_past < 0
                  ? 'el-icon-caret-bottom red'
                  : 'el-icon-caret-top green'
              "
            ></i
            >{{
              currentTime == 0
                ? '同比昨日'
                : currentTime == 1
                ? '同比上周'
                : currentTime == 2
                ? '同比上个月'
                : '同比去年'
            }}
          </p>
        </li>
        <li>
          <p style="font-size: 12px;color: #989898;">PC端在线人数</p>
          <p style="font-size: 28px;color: #666666;">{{ allvis.pc_count }}</p>
          <p>
            <span :class="allvis.pc_count_from_past < 0 ? ' red' : ' green'"
              >{{ allvis.pc_count_from_past }}%</span
            >
            <i
              :class="
                allvis.pc_count_from_past < 0
                  ? 'el-icon-caret-bottom red'
                  : 'el-icon-caret-top green'
              "
            ></i
            >{{
              currentTime == 0
                ? '同比昨日'
                : currentTime == 1
                ? '同比上周'
                : currentTime == 2
                ? '同比上个月'
                : '同比去年'
            }}
          </p>
        </li>
        <li>
          <p style="font-size: 12px;color: #989898;">小程序在线人数</p>
          <p style="font-size: 28px;color: #666666;">
            {{ allvis.wechat_count }}
          </p>
          <p>
            <span :class="allvis.wechat_count_from_past < 0 ? 'red' : ' green'"
              >{{ allvis.wechat_count_from_past }}%</span
            >
            <i
              :class="
                allvis.wechat_count_from_past < 0
                  ? 'el-icon-caret-bottom red'
                  : 'el-icon-caret-top green'
              "
            ></i
            >{{
              currentTime == 0
                ? '同比昨日'
                : currentTime == 1
                ? '同比上周'
                : currentTime == 2
                ? '同比上个月'
                : '同比去年'
            }}
          </p>
        </li>
      </ul>
      <ul class="wrapper-listRang" v-if="current">
        <span class="paiming">销售额排名</span>
        <p v-if="!salesRanking.length">暂无销售额数据</p>
        <li
          v-for="(item, index) in salesRanking"
          :key="index"
          v-if="salesRanking.length"
        >
          <p :class="index + 1 <= 3 ? 'acs' : 'frdd'">{{ index + 1 }}</p>
          <p>{{ item.staff_name }}</p>
          <p>{{ item.amount }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'About',
  data() {
    return {
      msg: [],
      xdata: [],
      current: 0,
      set: null,
      content: [
        { name: '访问量', id: '132124' },
        { name: '销售额', id: '132125' },
      ],
      timeList: [
        { name: '今日', id: '1', action: 'day' },
        { name: '本周', id: '2', action: 'week' },
        { name: '本月', id: '3', action: 'month' },
        { name: '全年', id: '4', action: 'year' },
      ],
      contentlist: [
        { name: '发发', money: '342121' },
        { name: '烦人', money: '342121' },
        { name: '纷纷', money: '342121' },
        { name: '服气', money: '342121' },
        { name: '发发', money: '342121' },
        { name: '烦人', money: '342121' },
        { name: '纷纷', money: '342121' },
        { name: '服气', money: '342121' },
        { name: '纷纷', money: '342121' },
        { name: '服气', money: '342121' },
      ],
      todayTotal: '10',
      currentTime: 0,
      value1: '',
      wrapperShow: true,
      Yseries: [],
      changeChar: false,
      todayOrder: null,
      allvis: null,
      allMoney: [],
      salesRanking: [],
      registerNum: [],
      todaySaleMoney: [],
      visitornum: [],
    }
  },
  mounted() {
    // this.ChangeData('today')
    this.$api.payOrderNum(this, 'todayOrder') // 今日支付订单
    this.$api.getVisitNumChart(this, 'allvis') // 访问量
    this.$api.MountQuota(this, 'allMoney') //销售额
    this.$api.salesRanking(this, 'salesRanking')
    this.$api.getRegisterNum(this, 'registerNum')
    this.$api.quotaCensus(this, 'todaySaleMoney')
    this.$api.getVisitNum(this, 'visitornum')
  },
  methods: {
    shoWrapper() {
      this.wrapperShow = false
    },
    doActive(index) {
      this.current = index
    },
    doActiveTime(index) {
      this.currentTime = index
    },
    ChangeData(data) {
      console.log(data)

      if (this.current == 0) {
        this.$api.getVisitNumChart(this, 'allvis', data) // 访问量
      } else {
        this.$api.MountQuota(this, 'allMoney', data) //销售额
      }

      this.$api.salesRanking(this, 'salesRanking', data)

      //   console.log('嗨')
      //   axios.interceptors.request.use(
      //     (config) => {
      //       if (config.method === 'post') {
      //         config.data = qs.stringify(config.data)
      //       }
      //       return config
      //     },
      //     (error) => {
      //       // 对请求错误做些什么
      //       return Promise.reject(error)
      //     }
      //   )
      //   let that = this
      //   axios({
      //     method: 'get',
      //     url: '/api/data',
      //     data: JSON.stringify({
      //       data: data,
      //     }),
      //   })
      //     .then((res) => {
      //       console.log(that.Yseries, res.data.data[0])
      //       that.xdata = res.data.data[0].data
      //       res.data.data.splice(0, 1)
      //       //get()中的参数要与mock.js文件中的Mock.mock()配置的路由保持一致
      //       if (that.Yseries.length != 0) {
      //         that.Yseries.length = 0
      //       }
      //       console.log(that.Yseries, that.Yseries.length)
      //       for (let item of res.data.data) {
      //         that.Yseries.push(item.attention_degree)
      //       }
      //       console.log(that.Yseries) //在console中看到数据
      //     })
      //     .catch((res) => {
      //       console.log('wrong')
      //     }) //获取本地模拟数据
    },
  },
  beforeDestroy() {},
}
</script>
<style lang="scss" scoped>
.paiming {
  font-size: 14px;
  font-weight: 600;
  color: #000;
  margin-top: 8px;
  margin-bottom: 18px;
}
.red {
  color: #fa0101;
}
.green {
  color: green;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.about {
  padding: 23px 23px 0 23px;
}
.wrapper-charts {
  width: 100%;
  height: 530px;
  background: #ffffff;
}
.wrapper-top-fun {
  display: flex;
  align-items: center;
  // justify-content: space-between;
  height: 55px;
  cursor: pointer;
  border-bottom: 1px solid rgba(232, 232, 232, 1);
  margin-bottom: 50px;
  padding-right: 20px;
  position: relative;
  li {
    font-size: 16px;
    position: relative;
    width: 115px;
    line-height: 54px;
    text-align: center;
    span {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
.wrapper-time-list {
  display: flex;
  align-items: center;
  float: right;
  position: absolute;
  right: 20px;
  li {
    width: 65px;
  }
}
ul li {
  list-style: none;
}
.active {
  color: #1890ff;
}
.active span::after {
  content: '';
  display: inline-block;
  width: 80%;
  height: 2px;
  border-radius: 6px;
  background: rgba(16, 141, 233, 1);
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.activeTime {
  color: #1890ff;
}
.wrapper-info {
  display: flex;
  flex-direction: column;
  width: 10%;
  float: right;
  li {
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    p {
      margin-bottom: 5px;
      .el-icon-bottom {
        color: #00a950;
        font-size: 14px;
      }
      span {
        font-size: 12px;
        margin-left: 16px;
      }
    }
  }
}
.wrapper-header {
  width: 100%;
  height: 120px;
  background: #247fff;
  margin-bottom: 20px;
  border-radius: 10px;
  padding: 25px 0 0 20px;
  display: flex;
  justify-content: space-between;
  background: url('../../assets/images/visualimg.png');
  h1 {
    display: block;

    font-size: 30px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 30px;
  }
  h2 {
    margin-top: 15px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 18px;
    opacity: 0.5;
  }
  .wrapper-header-exbtn {
    padding-right: 15px;
    img {
      width: 20px;
      height: 20px;
    }
  }
}
.wrapper-listRang {
  display: flex;
  flex-direction: column;
  li {
    display: flex;
    align-items: center;
    margin-top: 15px;
    position: relative;
    .acs {
      border-radius: 50%;
      background: #314659;
      width: 20px;
      height: 20px;
      color: #ffffff;
      text-align: center;
    }
    p {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      line-height: 20px;
      margin-left: 20px;
    }
    p:nth-child(1) {
      width: 20px;
      height: 20px;
      text-align: center;
      margin-left: 0;
    }
    p:nth-child(3) {
      position: absolute;
      right: 15px;
    }
  }
  li:nth-child(1) {
    margin-top: 0;
  }
}
/deep/ .el-card__header {
  padding: 10px 15px !important;
}
/deep/ .el-card__body {
  padding: 10px !important;
}
</style>
