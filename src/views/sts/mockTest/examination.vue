<template>
  <section class="mainwrap">
    <!-- <search :hideTime="true" :hideOtherOption="true"></search> -->

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
        <el-table-column
          prop="create_time"
          label="考试时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_problem"
          label="题目总数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="right_problem"
          label="正确题数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="错误题数" min-width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            {{
              scope.row.total_problem -
                scope.row.right_problem -
                scope.row.unanswered
            }}
          </template>
        </el-table-column>
        <el-table-column
          prop="unanswered"
          label="未回答题数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="use_time"
          label="做题用时"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mark"
          label="得分"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="accuracy"
          label="正确率"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
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
  name: 'practitioner',
  data() {
    return {
      page: 1,
      schoolData: [],
    }
  },
  created() {
    this.$api.getExamTestInfo(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getExamTestInfo(this, 'schoolData')
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
