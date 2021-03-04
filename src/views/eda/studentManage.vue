<template>
  <section class="main">
    <search
      :channelHide="false"
      api="getStudentManage"
      @getTable="getTableList"
      :dealStatusHide="false"
    ></search>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.data"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="realname"
          label="学员姓名"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程类型"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
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
          prop="schoole_name"
          label="所属校区"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="所属老师"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
          label="所属班级"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="学习情况" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" @click="toStudentDetail(scope.row)"
                >详情</el-button
              >
              <el-button type="text" @click="toChangeClass(scope.row)"
                >转班</el-button
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
    <!-- <el-button type="success" style="margin-top:20px" @click="batchShift">批量转班</el-button> -->
  </section>
</template>

<script>
export default {
  name: 'studentManage',
  data() {
    return {
      page: 1,
      type: 0,
      schoolData: [],
      datas: {},
    }
  },
  created() {
    this.$api.getStudentManage(this, 'schoolData')
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
      this.$api.getStudentManage(this, 'schoolData', this.datas)
    },
    toStudentDetail(ab) {
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: ab.intent_id, uid: ab.uid },
      })
    },

    toChangeClass(zx) {
      console.log(zx);
      this.$router.push({
        path: '/eda/changeClass',
        query: {
          course_id: zx.course_id,
          classroom_id: zx.classroom_id,
          intent_id: zx.intent_id,
          course_students_id: zx.course_students_id,
          realname: encodeURIComponent(zx.realname),
        },
      })
    },
    handleSelectionChange(val) {
      console.log(val)
      this.uids = val.map((i) => {
        return i.uid
      })
      this.course_students_ids = val.map((i) => {
        return i.course_students_id
      })
      console.log(this.uids)
      console.log(this.course_students_ids)
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
  background: #fff;
  padding: 20px;
  margin: 20px;
}
.userTable {
  margin-top: 20px;
}
</style>
