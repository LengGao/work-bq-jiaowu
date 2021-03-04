<template>
  <section class="mainwrap">
    <search2
      api="getSubscribeList"
      :contentShow="true"
      @getTable="getTableList"
      inputText="面授课名称"
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
          prop="subscribe_classroom_name"
          label="面授课名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="chapter_name"
          label="课程内容"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teacher_name"
          label="任课老师"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specific_time_range"
          label="上课时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="上课地点"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="subscribe_num"
          label="预约人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sign_in_total"
          label="签到人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="attendance_rate"
          label="到课率"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="上课学员">
          <template slot-scope="scope">
            <el-button type="text" @click="toFollowerDetail(scope.row)"
              >学生详情</el-button
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
  name: 'faceManagement',
  data() {
    return {
      page: 1,
      problem_chapter_id: '',
      schoolData: [],
      datas: {},
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    this.$api.getSubscribeList(this, 'schoolData')
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
      this.$api.getSubscribeList(this, 'schoolData', this.datas)
    },
    toFollowerDetail(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/followerDetail',
        query: {
          subscribe_classroom_id: zx.subscribe_classroom_id,
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
