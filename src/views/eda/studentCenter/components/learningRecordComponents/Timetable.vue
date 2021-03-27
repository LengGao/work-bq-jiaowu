<template>
  <!-- 课表信息 -->
  <div class="timetable">
    <Title text="课表信息" />
    <div class="calendar">
      <div class="date-select">
        <el-select v-model="checkedYear">
          <el-option
            :value="year"
            :label="year + '年'"
            v-for="year in years"
            :key="year"
          ></el-option>
        </el-select>
        <el-select v-model="checkedMonth">
          <el-option
            :value="item"
            :label="item + '月'"
            v-for="item in months"
            :key="item"
          ></el-option>
        </el-select>
      </div>
      <el-calendar :value="calendarDate">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div
            class="day"
            :class="{
              'class-date': allDay.includes(data.day),
            }"
            @click="handleOpen(infoMap[data.day])"
          >
            <span>{{ data.day.split("-").slice(1).join("-") }}</span>
            <div v-if="allDay.includes(data.day)" class="day-info">
              <p>
                上课时间：{{
                  infoMap[data.day].period &&
                  infoMap[data.day].period.substr(11)
                }}
              </p>
              <p>上课老师：{{ infoMap[data.day].teacher_name }}</p>
            </div>
          </div>
        </template>
      </el-calendar>
    </div>
    <CourseDialog v-model="detailDialog" :datas="courseData" />
  </div>
</template>

<script>
import CourseDialog from "@/components/CourseDialog/index";
import { getTable } from "@/api/eda";
export default {
  name: "Timetable",
  components: {
    CourseDialog,
  },
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      years: [],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      checkedYear: new Date().getFullYear(),
      checkedMonth: new Date().getMonth() + 1,
      detailDialog: false,
      allDay: [],
      infoMap: {},
      courseData: {},
    };
  },
  computed: {
    calendarDate() {
      this.getTable();
      return `${this.checkedYear}-${this.checkedMonth}`;
    },
  },
  created() {
    this.createYears();
  },
  methods: {
    handleOpen(data) {
      if (!data) return;
      this.courseData = data;
      this.detailDialog = true;
    },
    //获取课表信息
    async getTable() {
      const data = {
        uid: this.uid,
        year: this.checkedYear,
        month:
          this.checkedMonth < 10 ? "0" + this.checkedMonth : this.checkedMonth,
      };
      const res = await getTable(data);
      if (res.code === 0) {
        const data = res.data || [];
        this.allDay = data.map((item) => item.date);
        data.forEach((item) => {
          this.infoMap[item.date] = item;
        });
      }
    },
    createYears() {
      const years = [];
      let startYear = 2019;
      const currentYear = new Date().getFullYear();
      const deepAdd = () => {
        if (startYear <= currentYear) {
          years.push(startYear++);
          deepAdd();
        }
      };
      deepAdd();
      this.years = [...years];
    },
  },
};
</script>

<style lang="scss" scoped>
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
    }
    .day-info {
      margin-top: 5px;
    }
  }
}
</style>