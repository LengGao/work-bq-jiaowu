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
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
          </p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<script>
export default {
  name: "Timetable",
  data() {
    return {
      years: [],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      checkedYear: new Date().getFullYear(),
      checkedMonth: new Date().getMonth() + 1,
    };
  },
  computed: {
    calendarDate() {
      return `${this.checkedYear}-${this.checkedMonth}`;
    },
  },
  created() {
    this.createYears();
  },
  methods: {
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
  }
}
</style>