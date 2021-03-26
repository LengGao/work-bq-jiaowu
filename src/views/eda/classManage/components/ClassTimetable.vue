<template>
  <!-- 班级课表 -->
  <div class="timetable">
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
          <!-- :class="data.isSelected ? 'is-selected' : ''" -->
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
import { getClassArrangeList } from "@/api/eda";
export default {
  name: "ClassTimetable",
  components: {
    CourseDialog,
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
      this.getClassArrangeList();
      return `${this.checkedYear}-${this.checkedMonth}`;
    },
  },
  created() {
    this.createYears();
    // this.getClassArrangeList();
  },
  methods: {
    handleOpen(data) {
      if (!data) return;
      this.courseData = data;
      this.detailDialog = true;
    },
    async getClassArrangeList() {
      const data = {
        classroom_id: this.$route.query?.id,
        year: this.checkedYear,
        month:
          this.checkedMonth < 10 ? "0" + this.checkedMonth : this.checkedMonth,
      };
      const res = await getClassArrangeList(data);
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