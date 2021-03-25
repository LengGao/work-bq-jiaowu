<template>
  <!-- 课表信息 -->
  <div class="timetable">
    <Title text="课表信息" />
    <div class="calendar">
      <div class="date-select">
        <el-select v-model="year">
          <el-option value="2021" label="2021年"></el-option>
          <el-option value="2020" label="2020年"></el-option>
          <el-option value="2019" label="2019年"></el-option>
        </el-select>
        <el-select v-model="mouth">
          <el-option value="1" label="1月"></el-option>
          <el-option value="2" label="2月"></el-option>
          <el-option value="3" label="3月"></el-option>
        </el-select>
      </div>
      <el-calendar :range="['2019-03-04', '2019-03-31']">
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
      year: 2019,
      //   mouth: new Date().getMonth() + 1,
      mouth: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.timetable {
  .calendar {
    position: relative;
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