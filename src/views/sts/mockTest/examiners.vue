<template>
  <section class="mainwrap">
    <search2
      :contentShow="true"
      :campusShow="true"
      :organShow="true"
      :classShow="true"
      api="getExamTestList"
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
          prop="campus_name"
          label="所属校区"
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
          prop="exam_num"
          label="考试次数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="max_mark"
          label="最高成绩"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="考试情况">
          <template slot-scope="scope">
            <el-button type="text" @click="toExamination(scope.row)"
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
  name: 'practice',
  data() {
    return {
      page: 1,
      schoolData: [],
      organData: [],
      classDate: [],
      datas: {},
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    this.$api.getExamTestList(this, 'schoolData')
    //所属机构
    this.$api.getRecommender(this, 'organData')
    //班级名称
    this.$api.getClassroomList(this, 'classDate')
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    doPageChange(page) {
      this.page = page
      this.$api.getExamTestList(this, 'schoolData', this.datas)
    },
    toExamination(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/examination',
        query: { problem_course_id: zx.problem_course_id, uid: zx.uid },
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
