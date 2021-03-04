<template>
  <section class="mainwrap">
    <search2
      :hideTime="true"
      api="getPunchList"
      @getTable="getTableList"
    ></search2>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->

        <el-table-column
          prop="date_time"
          label="日期"
          min-width="110"
          :formatter="timestampToTime"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="total_people"
          label="打卡人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accuracy"
          label="打卡正确率"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="打卡人员">
          <template slot-scope="scope">
            <el-button type="text" @click="toClockStaff(scope.row)"
              >详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.total"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'clockDetail',
  data() {
    return {
      problem_course_id: '',
      page: 1,
      datas: {},
      schoolData: [],
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    this.$api.getPunchList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getPunchList(this, 'schoolData', this.datas)
    },
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toClockStaff(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/clockStaff',
        query: {
          problem_course_id: this.problem_course_id,
          date_time: zx.date_time,
        },
      })
    },
    timestampToTime(row, column) {
      let date = row.date_time + ''
      var year = date.substr(0, 4)
      var month = date.substr(4, 2)
      var day = date.substr(6, 2)
      return year + '/' + month + '/' + day
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
