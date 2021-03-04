<template>
  <section class="mainwrap">
    <search :hideTime="true" :hideOtherOption="true"></search>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column
          prop="uid"
          label="编号"
          min-width="50"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseName"
          label="直播场次"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="courseType"
          label="直播名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="开始时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="结束时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="直播时长"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="最多在线人数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cardPerson"
          label="到课率"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="直播情况" fixed="right" min-width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="toLiveStatistics(scope.row)"
              >直播统计</el-button
            >
            <el-button type="text" @click="toReplayStatistics(scope.row)"
              >回播统计</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </section>
</template>

<script>
export default {
  name: 'classSituation',
  data() {
    return {
      schoolData: [
        {
          uid: 1,
          courseName: '系统集成项目管理师',
          courseType: '职称类',
          cardPerson: '123',
        },
      ],
    }
  },
  methods: {
    toLiveStatistics() {
      this.$router.push({
        path: '/sts/liveStatistics',
      })
    },
    toReplayStatistics() {
      this.$router.push({
        path: '/sts/replayStatistics',
      })
    },
  },
}
</script>
<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}

.userTable {
  margin-top: 20px;
}
</style>
