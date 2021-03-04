<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :contentShow="true"
        inputText="面授课名称"
        api="getSubscribeClassroomList"
        @getTable="getTableList"
      ></search2>
      <el-button type="primary" @click="toEditfaceCourse">新建面授课</el-button>
    </div>
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
          prop="subscribe_classroom_name"
          label="面授课名称"
          show-overflow-tooltip
          min-width="130"
        ></el-table-column>
        <el-table-column
          prop="chapter_name"
          label="课程内容"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="teacher_name"
          label="任课老师"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="specific_time_range"
          label="上课时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="address"
          label="上课地点"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="subscribe_num"
          label="预约人数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="max_num"
          label="最大预约人数"
          min-width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="has_sign_num"
          label="签到人数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="操作"
          width="170"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button type="text" @click="toEditfaceCourse(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="toStudentdetail(scope.row)"
                >学生详情</el-button
              >

              <el-button type="text" @click="toSigncode(scope.row)"
                >签到码</el-button
              >
            </div>
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
  name: 'faceMessage',
  data() {
    return {
      page: 1,
      schoolData: [],
      problem_course_id: 0,
      course_id: 0,
      datas: {},
    }
  },
  created() {
    this.problem_course_id = this.$route.query.problem_course_id
    this.course_id = this.$route.query.course_id
    console.log(this.problem_course_id)
    this.$api.getSubscribeClassroomList(this, 'schoolData')
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
    toEditfaceCourse(ab) {
      console.log(ab)
      let query = {}
      if (ab.subscribe_classroom_id != undefined) {
        query = {
          subscribe_classroom_id: ab.subscribe_classroom_id,
          course_id: this.course_id,
          problem_course_id: this.problem_course_id,
        }
      } else {
        query = {
          problem_course_id: this.problem_course_id,
          course_id: this.course_id,
        }
      }
      this.$router.push({
        path: '/eda/editFaceCourse',
        query: query,
      })
    },
    toStudentdetail(zx) {
      this.$router.push({
        path: '/eda/studentDetail',
        query: {
          subscribe_classroom_id: zx.subscribe_classroom_id,
          course_id: this.$route.query.course_id,
          problem_course_id: this.$route.query.problem_course_id,
        },
      })
    },
    toSigncode(zx) {
      console.log(zx)
      this.$router.push({
        path: '/eda/signCode',
        query: {
          subscribe_classroom_id: zx.subscribe_classroom_id,
          subscribe_classroom_name: zx.subscribe_classroom_name,
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
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
