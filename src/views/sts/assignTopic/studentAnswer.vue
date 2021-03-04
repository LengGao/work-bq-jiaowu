<template>
  <section class="mainwrap">
    <search2
      :contentShow="true"
      :campusShow="true"
      :organShow="true"
      :classShow="true"
      api="getSelfDeterminationInfo"
      inputText="学员姓名,手机号码"
      :organList="organData.list"
      :classList="classDate.list"
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
          prop="realname"
          label="学员姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="update_time"
          label="做题时间"
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
        <el-table-column
          prop="use_time"
          label="做题用时"
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
      organData: [],
      classDate: [],
    }
  },
  created() {
    this.$api.getSelfDeterminationInfo(this, 'schoolData')
    //所属机构
    this.$api.getRecommender(this, 'organData')
    //班级名称
    this.$api.getClassroomList(this, 'classDate')
    // this.$api.getCategoryList(this, 'selectData')
  },
  methods: {
    getTableList(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getSelfDeterminationInfo(this, 'schoolData')
    },
    toClockStaff() {
      this.$router.push({
        path: '/sts/clockStaff',
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
