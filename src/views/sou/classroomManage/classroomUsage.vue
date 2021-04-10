<template>
  <!-- 班级课表 -->
  <div class="timetable">
    <div class="time-head">
      <p>
        教室名称 <span> {{ param.room_name }}</span>
      </p>
      <p>
        详细地址 <span> {{ param.address }}</span>
      </p>
      <p>
        容纳人数 <span> {{ param.max_num }}</span>
      </p>
      <p>
        备注信息 <span> {{ param.comment }}</span>
      </p>
    </div>
    <div class="calendar">
      <div class="date-select">
        <el-select v-model="checkedYear">
          <el-option :value="year" :label="year + '年'" v-for="year in years" :key="year"></el-option>
        </el-select>
        <el-select v-model="checkedMonth">
          <el-option :value="item" :label="item + '月'" v-for="item in months" :key="item"></el-option>
        </el-select>
      </div>
      <el-calendar :value="calendarDate">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div class="day" :class="{
              'class-date': allDay.includes(data.day),
            }" @click="handleOpen(infoMap[data.day])">
            <span>{{
              data.day
                .split('-')
                .slice(1)
                .join('-')
            }}</span>
            <div v-if="allDay.includes(data.day)" class="day-info" style="">

              <p v-for="(item, index) in infoMap[data.day]" :key="index" style="line-height:26px;background:#fff;padding-left:2px;">
                时间：{{ item.period && item.period.substr(11) }} ({{ infoMap[data.day].teacher_name }})
              </p>
              <!-- <p>上课老师：{{ infoMap[data.day].teacher_name }}</p> -->
              <!-- <p>
                上课时间：{{
                  infoMap[data.day].period &&
                    infoMap[data.day].period.substr(11)
                }}
              </p> -->
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
    <UsageDialog v-model="detailDialog" :datas="courseData" />
  </div>
</template>

<script>
// import CourseDialog from '@/components/CourseDialog/index'
import UsageDialog from './components/UsageDialog'
import { schoolroomUsage } from '@/api/sou'
import { timestampToTime } from '@/utils/index'
export default {
  name: 'ClassTimetable',
  components: {
    UsageDialog,
  },
  data() {
    return {
      param: {},
      years: [],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      checkedYear: new Date().getFullYear(),
      checkedMonth: new Date().getMonth() + 1,
      detailDialog: false,
      allDay: [],
      infoMap: {},
      courseData: [],
    }
  },
  computed: {
    calendarDate() {
      this.schoolroomUsage()
      return `${this.checkedYear}-${this.checkedMonth}`
    },
  },
  created() {
    this.param = JSON.parse(this.$route.query.param)
    // this.createYears()
  },
  methods: {
    handleOpen(data) {
      if (!data) return
      console.log(data)
      this.courseData = data
      this.detailDialog = true
    },
    //获取课表信息
    async schoolroomUsage() {
      const data = {
        id: this.$route.query?.id,
        year: this.checkedYear,
        month: this.checkedMonth < 10 ? '0' + this.checkedMonth : this.checkedMonth,
      }
      console.log(data)
      const res = await schoolroomUsage(data)
      if (res.code === 0) {
        const data = res.data || {}
        // this.allDay = data.map((item) =>
        // item.date
        // )
        let allDay = []
        let infoMap = {}
        for (var i in data) {
          allDay.push(timestampToTime(i))
          infoMap[timestampToTime(i)] = data[i]
        }
        this.allDay = allDay
        this.infoMap = infoMap
        console.log(infoMap)

        // data.forEach((item) => {
        //   this.infoMap[item.date] = item
        // })
      }
    },
    //获取年
    createYears() {
      const years = []
      let startYear = 2019
      const currentYear = new Date().getFullYear()
      const deepAdd = () => {
        if (startYear <= currentYear) {
          years.push(startYear++)
          deepAdd()
        }
      }
      deepAdd()
      this.years = [...years]
    },
  },
}
</script>

<style lang="scss" scoped>
/deep/.el-calendar-table .el-calendar-day {
  height: 120px;
}
/deep/.el-calendar__header {
  border-bottom: none;
}
.timetable {
  padding: 20px;
  margin: 20px;
  background: #fff;
  .calendar {
    position: relative;
    /deep/.el-calendar__button-group {
      display: none;
    }
    .date-select {
      top: 0;
      right: 0;
      position: absolute;
      .el-select {
        width: 90px;
        margin-left: 10px;
      }
    }
    .day {
      font-size: 14px;
    }
    .class-date {
      color: cornflowerblue;
    }
    .day-info {
      margin-top: 5px;
    }
  }
}
.time-head {
  width: 80%;
  font-family: 'Microsoft YaHei UI', sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  p {
    color: #999999;
    span {
      margin-left: 20px;
      color: #666666;
    }
  }
}
</style>
