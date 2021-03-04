<template>
  <section class="mainwrap">
    <search2
      api="getRealTopicLogList"
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
          prop="total_people"
          label="练习人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column
          prop="cardPerson"
          label="答题总人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column> -->
        <el-table-column label="模式">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="toBrushTopic(scope.row, (operation_type = 0))"
              >刷题模式</el-button
            >
            <el-button
              type="text"
              @click="toBrushTopic(scope.row, (operation_type = 1))"
              >考试模式</el-button
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
  name: 'answer',
  data() {
    return {
      page: 1,
      problem_course_id: 0,
      schoolData: [],
      datas: {},
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    this.$api.getRealTopicLogList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getRealTopicLogList(this, 'schoolData', this.datas)
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
    toBrushTopic(zx, a) {
      this.$router.push({
        path: '/sts/brushTopic',
        query: {
          problem_chapter_id: zx.problem_chapter_id,
          operation_type: a,
        },
      })
    },
    toAnswer() {},
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
