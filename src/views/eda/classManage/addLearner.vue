<template>
  <section class="mainwrap">
    <search
      :classNameHide="false"
      :channelHide="false"
      :dealStatusHide="false"
      @getTable="getTableList"
      api="getStudentManage"
    ></search>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.data"
        style="width: 100%"
        class="min_table"
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
          prop="create_time"
          label="注册时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程类型"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
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
          prop="schoole_name"
          label="所属校区"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="所属老师"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="操作"
          fixed="right"
          min-width="250"
          align="center"
        >
          <template slot-scope="scope">
            <div style="display:flex;justify-content:center">
              <el-button type="text" @click="addStudent(scope.row)"
                >添加</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer_btn"></div>
      <el-button type="success">批量添加</el-button>

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
  name: 'addLearner',
  data() {
    return {
      schoolData: [],
      intent_id: 0,
      type: 2,
      page: 1,
      classroom_id: 0,
      course_students_id: 0,
    }
  },
  mounted() {
    this.$api.getStudentManage(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getStudentManage(this, 'schoolData', this.datas)
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
    addStudent(zx) {
      console.log(zx)
      this.intent_id = zx.intent_id
      this.classroom_id = zx.classroom_id
      this.course_students_id = zx.course_students_id
      this.$api.addstudents(this)
    },
    toAddLearner() {
      this.$router.push({
        path: '/eda/addLearner',
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
