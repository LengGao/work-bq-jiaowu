<template>
  <section class="mainwrap">
    <search2
      api="getSelfDeterminationList"
      :contentShow="true"
      @getTable="getTableList"
      inputText="试卷名称"
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
          prop="chapter_name"
          label="试卷名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="total_problem"
          label="题目数量"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="examMark"
          label="试卷总分"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_people"
          label="练习人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="答题学生">
          <template slot-scope="scope">
            <el-button type="text" @click="toStudentAnswer(scope.row)"
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
  name: 'assignTopic',
  data() {
    return {
      page: 1,
      problem_chapter_id: '',
      schoolData: [],
    }
  },
  created() {
    this.problem_chapter_id = this.$route.query.problem_course_id
    this.$api.getSelfDeterminationList(this, 'schoolData')
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
      this.$api.getSelfDeterminationList(this, 'schoolData')
    },
    toStudentAnswer(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/studentAnswer',
        query: {
          problem_chapter_id: zx.problem_chapter_id,
        },
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
