<template>
  <section class="mainwrap">
    <search2
      :courseTypeShow="true"
      :contentShow="true"
      api="getCourseList"
      typeTx="selfDetermination"
      inputText="课程名称"
      @getTable="getTableList"
      :selectList="selectData.list"
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

        <el-table-column label="序号" min-width="110" show-overflow-tooltip>
          <template slot-scope="scope">
            <div>
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程分类"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="hasNumber"
          label="答题总人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="答题情况">
          <template slot-scope="scope">
            <el-button type="text" @click="toAnswerSituation(scope.row)"
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
      datas: {},
      schoolData: [],
      type: '',
      selectData: [],
    }
  },
  created() {
    this.type = 'selfDetermination'
    this.$api.getCategoryList(this, 'selectData')
    this.$api.getCourseList(this, 'schoolData')
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
      this.$api.getCourseList(this, 'schoolData', this.datas)
    },
    toAnswerSituation(zx) {
      this.$router.push({
        path: '/sts/answerSituation',
        query: { problem_course_id: zx.problem_course_id },
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
