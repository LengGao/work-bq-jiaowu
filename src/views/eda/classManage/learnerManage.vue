<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :contentShow="true"
        :campusShow="true"
        :organShow="true"
        api="getclasstudents"
        inputText="学员姓名,手机号码"
        :organList="organData.list"
        @getTable="getTableList"
      ></search2>
      <div>
        <el-button type="primary" @click="toAddLearner">添加学员</el-button>
        <el-button type="primary">导出数据</el-button>
      </div>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.data"
        style="width: 100%"
        class="min_table"
        @selection-change="handleSelectionChange"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="user_realname"
          label="学员姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop=""
          label="所属校区"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="RealTopicLogAvg"
          label="历年真题平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ExamLogAvg"
          label="模拟考试平均分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="ProblemSelfDeterminationMax"
          label="自主出题最高分"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="regedit_time"
          label="学习时长"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="学习进度"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="做题总数"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="做题进度"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="直播到课率"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          min-width="250"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around">
              <el-button type="text" @click="toStudentDetail(scope.row)"
                >详情</el-button
              >
              <el-button type="text" @click="toChangeClass(scope.row)"
                >转班</el-button
              >
              <el-button type="text" @click="handleDelete(scope.row)"
                >移除</el-button
              >
              <!-- <el-button type="text" @click="handleDelete">删除</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="display:flex;justify-content:space-between">
        <div style="padding-top:30px">
          <el-button @click="batchShift">批量转班</el-button>
          <el-button @click="batchDelete">批量移除</el-button>
        </div>

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
    </div>
  </section>
</template>

<script>
import { constants } from 'crypto'
export default {
  name: 'learnerManage',
  data() {
    return {
      page: 1,
      schoolData: [],
      uids: [],
      course_students_ids: [],
      organData: [],
      classDate: [],
      datas: {},
    }
  },
  created() {
    this.$api.getclasstudents(this, 'schoolData')
    //所属机构
    this.$api.getRecommender(this, 'organData')
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
      this.$api.getclasstudents(this, 'schoolData', this.datas)
    },
    handleDelete(ab) {
      console.log(ab)
      this.$confirm('此操作将移除该学员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.removeLearner(this, ab.uid)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除',
          })
        })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.uids = val.map((i) => {
        return i.uid
      })
      this.course_students_ids = val.map((i) => {
        return i.id
      })

      console.log(this.course_students_ids)
    },
    batchDelete() {
      if (this.uids.length > 0) {
        this.$api.batchremove(this, this.uids)
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选需要转班的学员',
        })
      }
    },
    batchShift() {
      if (this.uids.length > 0) {
        this.$router.push({
          path: '/eda/changeClass',
          query: {
            uid: this.uids,
            course_id: this.$route.query.course_id,
            course_students_id: this.course_students_ids,
            classroom_id: this.$route.query.classroom_id,
            // intent_id: zx.intent_id,
          },
        })
        // this.$api.batchchangestudents(this, 'schoolData')
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选需要转班的学员',
        })
      }
    },
    toAddLearner() {
      this.$router.push({
        path: '/eda/addLearner',
        query: {
          classroom_id: this.$route.query.classroom_id,
          course_id: this.$route.query.course_id,
          category_id: this.$route.query.category_id,
        },
      })
    },
    toStudentDetail(ab) {
      console.log(ab)
      this.$router.push({
        path: '/etm/studentDetail',
        query: {
          intent_id: ab.intent_id,
          uid: ab.uid,
        },
      })
    },
    toChangeClass(zx) {
      console.log(zx)
      this.$router.push({
        path: '/eda/changeClass',
        query: {
          course_id: zx.course_id,
          classroom_id: this.$route.query.classroom_id,
          intent_id: zx.intent_id,
          course_students_id: zx.id,
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
.footer_btn {
  padding-top: 20px;
}
</style>
