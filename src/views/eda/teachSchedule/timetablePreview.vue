<template>
  <div class="mainwrap">
    <div class="timetable">
      <div class="time-head">
        <p>
          班级名称 <span> {{ param.classroom_name }}</span>
        </p>
        <p>
          所属分类 <span> {{ param.category_name }}</span>
        </p>
        <p>
          学生人数 <span> {{ param.total_people }}</span>
        </p>
        <p>
          开课日期 <span> {{ param.frist_class_time }}</span>
        </p>
      </div>
      <div class="calendar">
        <div class="date-select">
          <el-select v-model="checkedYear" @change="changTime">
            <el-option
              :value="year"
              :label="year + '年'"
              v-for="year in years"
              :key="year"
            ></el-option>
          </el-select>
          <el-select v-model="checkedMonth" @change="changTime">
            <el-option
              :value="item"
              :label="item + '月'"
              v-for="item in months"
              :key="item"
            ></el-option>
          </el-select>
        </div>
        <el-calendar :value="calendarDate" :ShowNextPrevMonth="false">
          <template slot="dateCell" slot-scope="{ date, data }">
            <div
              class="day"
              :class="{
                'class-date': allDay.includes(data.day),
              }"
              @click="handleOpen(infoMap[data.day], data)"
            >
              <div style="display:flex;justify-content:space-between">
                <span>{{
                  data.day
                    .split('-')
                    .slice(1)
                    .join('-')
                }}</span>

                <i
                  class="el-icon-delete "
                  @click.stop="deleteClass(infoMap[data.day])"
                  v-if="allDay.includes(data.day)"
                ></i>
              </div>

              <div v-if="allDay.includes(data.day)" class="day-info">
                <p>
                  时间：{{
                    infoMap[data.day].period &&
                      infoMap[data.day].period.substr(11)
                  }}
                </p>
                <p>老师：{{ infoMap[data.day].teacher_name }}</p>
              </div>

              <div id="productStatus" v-if="allDay.includes(data.day)">
                <span
                  :class="
                    infoMap[data.day].teaching_type == 1
                      ? 'bgcolor'
                      : 'bgcolor2'
                  "
                >
                  <em>{{ typeMap[infoMap[data.day].teaching_type] }}</em>
                </span>
              </div>

              <div class="addBtnBox">
                <p
                  v-if="data.isSelected == true && !allDay.includes(data.day)"
                  class="addBtn"
                  @click="addProgramme(data)"
                >
                  添加日程
                </p>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
      <!-- <CourseDialog v-model="detailDialog" :datas="courseData" /> -->
    </div>
    <!-- <el-calendar>
      <template slot="dateCell" slot-scope="{ date, data }" class="calItem">
        <div
          :class="data.isSelected ? 'is-selected' : ''"
          @click="calClick(data)"
        >
          <p class="dayItem" v-if="data.day.substr(-2) < 10">
            {{ data.day.substr(-1) }}
          </p>
          <p class="dayItem" v-else>{{ data.day.substr(-2) }}</p>
          <div v-for="(item, index) in calendarData" :key="index">
            <div
              v-if="
                item.years.indexOf(data.day.split('-').slice(0)[0]) != -1 &&
                  item.months.indexOf(data.day.split('-').slice(1)[0]) != -1 &&
                  item.days.indexOf(
                    data.day
                      .split('-')
                      .slice(2)
                      .join('-')
                  ) != -1
              "
            >
              <div class="deleteIcon" @click="deleteClass(item)">
                <i class="el-icon-delete "></i>
              </div>

              <el-tooltip :content="item.things" placement="right">
                <div class="mark" v-html="item.things"></div>
              </el-tooltip>
            </div>
            <div v-else></div>
          </div>
          <p
            class="addBtn"
            v-show="data.isSelected == true"
            @click="addProgramme()"
          >
            添加日程
          </p>
        </div>
      </template>
    </el-calendar> -->
    <el-dialog
      title="添加上课信息"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="上课时间" prop="name">
          <div
            v-for="(item, index) in lessonTime"
            :key="index"
            class="lessonTime"
          >
            <el-time-picker
              is-range
              v-model="item.classTimeArr"
              style="width:240px"
              format="HH:mm"
              value-format="HH:mm"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
            <span
              class="el-icon-plus"
              style="padding-left:10px"
              @click="addTime()"
            ></span>
            <span
              class="el-icon-minus"
              style="padding-left:5px"
              @click="delTime(index)"
            ></span>
          </div>
        </el-form-item>
        <el-form-item label="授课老师" prop="name">
          <el-select
            v-model="ruleForm.teacher_id"
            class="common-width"
            placeholder="请选择默认老师"
          >
            <el-option
              v-for="item in teacherData"
              :key="item.teacher_id"
              :label="item.teacher_name"
              :value="item.teacher_id"
            ></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="授课方式" prop="name">
          <el-select
            v-model="ruleForm.teaching_type"
            placeholder="请选择授课方式"
            class="common-width"
          >
            <el-option
              v-for="item in regionData"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课教室" prop="name">
          <el-select
            v-model="ruleForm.schoolroom_id"
            placeholder="请选择"
            class="common-width"
          >
            <el-option
              v-for="item in roomData"
              :key="item.id"
              :label="item.room_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跟班人员" prop="name">
          <el-select
            v-model="ruleForm.staff_id"
            placeholder="请选择"
            multiple
            class="common-width"
          >
            <el-option
              v-for="item in staffData"
              :key="item.staff_id"
              :label="item.staff_name"
              :value="item.staff_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注信息" prop="remark">
          <el-input
            placeholder="请输入备注信息"
            class="common-width"
            v-model="ruleForm.remark"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </span>
    </el-dialog>
    <CourseDialog v-model="detailDialog" :datas="courseData" />
  </div>
</template>
<script>
import CourseDialog from '@/components/CourseDialog/index'
export default {
  name: 'calendar',
  components: {
    CourseDialog,
  },
  data() {
    return {
      typeMap: {
        1: '面',
        2: '直',
      },
      courseData: {},
      years: [],
      param: {},
      detailDialog: false,
      allDay: [],
      calendarDate: new Date(),
      infoMap: {},
      detailLoading: false,
      rules: {},
      checkedYear: new Date().getFullYear(),
      checkedMonth: new Date().getMonth() + 1,
      classTimeArr: '',
      lessonTime: [{ classTimeArr: '' }],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      ruleForm: {
        date: '',
        title: '',
        classroom_id_arr: [],
        category_id: '',
        teacher_id: '',
        teaching_type: '',
        schoolroom_id: '',
        start_time: '',
        end_time: '',
        staff_id: [],
        remark: '',
        class_hour: [],
      },
      staffData: {},
      roomData: [],
      teacherData: [],
      regionData: [
        {
          value: 1,
          name: '面授',
        },
        {
          value: 2,
          name: '直播',
        },
      ],
      formData: {
        data: '',
        content: '',
      },
      dialogVisible: false,
      calendarData: [
        { years: ['2020'], months: ['08', '11'], days: ['14'], things: '杂志' },
      ],
      value: new Date(),
    }
  },
  created() {
    this.createYears()

    this.param = JSON.parse(this.$route.query.param)
    this.ruleForm.category_id = this.param.category_id
    this.ruleForm.classroom_id = this.param.classroom_id
    this.ruleForm.classroom_id_arr.push(this.param.classroom_id)
    this.$api.getTeacherSublist(this, 'teacherData') //老师列表
    this.$api.getRoomSelect(this, 'roomData') //教室列表
    this.$api.getClassScheduling(this, this.schoolData)
    this.$api.getStaffSelect(this, 'staffData') //跟班人员下拉列表
  },
  watch: {
    // calendarDate() {
    //   this.$api.getClassScheduling(this, this.schoolData)
    // },
  },
  methods: {
    changTime() {
      console.log('3243')
      this.calendarDate = `${this.checkedYear}-${this.checkedMonth}`
      this.$api.getClassScheduling(this, this.schoolData)
    },
    handleOpen(data, ab) {
      console.log(data)
      console.log('点会')
      console.log(ab.day.split('-')[1])
      console.log(this.checkedYear)
      if (this.checkedYear != ab.day.split('-')[0]) {
        this.checkedYear = ab.day.split('-')[0]
      }

      if (this.checkedMonth != ab.day.split('-')[1]) {
        this.checkedMonth = parseInt(ab.day.split('-')[1])
      }
      this.calendarDate = `${this.checkedYear}-${this.checkedMonth}-${
        ab.day.split('-')[2]
      }`
      // this.checkedYear = ab.day.split('-')[0]
      // this.checkedMonth = ab.day.split('-')[1]
      if (!data) return
      this.courseData = data
      this.detailDialog = true
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
    addProgramme(data) {
      console.log(data)

      this.dialogVisible = true
      this.ruleForm = {
        date: data.day,
        title: data.day,
        classroom_id_arr: [],
        category_id: '',
        teacher_id: '',
        teaching_type: '',
        schoolroom_id: '',
        start_time: '',
        end_time: '',
        staff_id: [],
        remark: '',
        class_hour: [],
      }
      this.ruleForm.category_id = this.param.category_id
      this.ruleForm.classroom_id_arr.push(this.param.classroom_id)
      this.lessonTime = [{ classTimeArr: '' }]
    },
    addTime() {
      let obj = {}
      this.lessonTime.push(obj)
    },
    delTime(index) {
      if (this.lessonTime.length > 1) {
        this.lessonTime.splice(index, 1)
      }
    },
    calClick(item) {
      console.log(item)
      this.ruleForm.date = item.day
      this.ruleForm.title = item.day
      this.formData.data = item.day
    },
    handleClose(done) {
      done()
    },
    handleAdd() {
      var date = new Date()
      // console.log(this.lessonTime)
      // this.lessonTime[0]
      // var a = this.lessonTime[0].classTimeArr[0].split(':')
      // console.log(date.setHours(a[0], a[1]))
      // console.log(this.lessonTime)
      this.lessonTime.forEach((i) => {
        // console.log(i)
        var obj = {
          start_time: i.classTimeArr[0],
          end_time: i.classTimeArr[1],
        }
        // console.log(obj)
        this.ruleForm.class_hour.push(obj)
      })
      var min = date.setHours(
        this.ruleForm.class_hour[0].start_time.split(':')[0],
        this.ruleForm.class_hour[0].start_time.split(':')[1]
      )
      var max = date.setHours(
        this.ruleForm.class_hour[0].end_time.split(':')[0],
        this.ruleForm.class_hour[0].end_time.split(':')[1]
      )
      console.log(min, max)
      var minIndex = 0
      var maxIndex = 0
      this.ruleForm.class_hour.forEach((v, it) => {
        var a = v.start_time.split(':')
        var b = v.end_time.split(':')
        // console.log(date.setHours(a[0], a[1]))
        if (min > date.setHours(a[0], a[1])) {
          min = date.setHours(a[0], a[1])
          minIndex = it
        }
        if (max < date.setHours(b[0], b[1])) {
          max = date.setHours(b[0], b[1])
          maxIndex = it
        }
      })
      console.log(minIndex, maxIndex)
      this.ruleForm.start_time = this.ruleForm.class_hour[minIndex].start_time
      this.ruleForm.end_time = this.ruleForm.class_hour[maxIndex].end_time
      // this.dialogVisible = false
      console.log(this.ruleForm)
      this.ruleForm.classroom_id_arr
      // console.log(this.calendarData)
      var arr = []

      arr.push(this.ruleForm)

      this.$api.addScheduling(this, arr, 2)
      // var a = {
      //   years: [date[0]],
      //   months: [date[1]],
      //   days: [date[2]],
      //   things: this.formData.content,
      // }
      // this.calendarData.push(a)
    },
    deleteClass(ab) {
      this.$confirm('此操作将删除该排课, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteClass(this, ab.id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })

      console.log(ab)
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-calendar__header {
  border-bottom: none;
}
.main {
  /deep/.el-calendar__body {
    padding: 12px 0px 35px 0;
  }
}
.bgcolor {
  border-bottom: 2rem solid #ff00ff !important;
}
.bgcolor2 {
  border-bottom: 2rem solid #199fff !important;
}
.deleteIcon {
  font-size: 16px;
  display: flex;
  justify-content: flex-end;
  color: #199fff;
  // position: relative;
  // top: -15px;
  // right: -140px;
}
/deep/.el-calendar-table .el-calendar-day {
  height: 120px;
}
.mark {
  font-size: 16px;
  color: #199fff;
  // line-height: 32px;
}
.addBtnBox {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 79px;
  .addBtn {
    background: #199fff;
    width: 102px;
    height: 32px;
    color: #fff;
    display: flex;
    justify-content: center;
    border-radius: 20px;
    align-items: center;
  }
}

.lessonTime {
  margin-bottom: 10px;
}
.timetable {
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
      position: relative;
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
.day-type {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
#productStatus {
  position: absolute;
  right: -8px;
  top: 88px;
  height: 1.81rem;
  width: 1.81rem;
  display: flex;
  align-items: center;
  span {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 0;
    border-bottom: 2rem solid #81d8d0;
    border-left: 2rem solid transparent;
    em {
      position: absolute;
      font-style: normal;
      top: 0.8rem;
      right: 0rem;
      height: 1.27rem;
      width: 1.27rem;
      line-height: 1.2rem;
      text-align: center;
      font-size: 0.29rem;
      color: #fff;
      transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
    }
  }
}
</style>
