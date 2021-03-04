<template>
  <section class="mainwrap">
    <search2
      :contentShow="true"
      api="getCourseList"
      typeTx="punch"
      inputText="员工姓名,手机号码"
      @getTable="getTableList"
      :organList="organData.list"
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
          label="员工编号"
          prop="staff_id"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="员工名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="hasNumber"
          label="所属校区"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="department_name"
          label="所属部门"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile_num"
          label="联系方式"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toClockDetail(scope.row)"
              >转交学员</el-button
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
import { type } from 'os'
export default {
  name: 'dailyClock',
  data() {
    return {
      page: 1,
      schoolData: [],
      type: '',
      organData: [],
    }
  },
  created() {
    this.$api.getStaffList(this, 'schoolData')
    // this.type = 'punch'
    // this.$api.getCategoryList(this, 'organData')
    // this.$api.getCourseList(this, 'schoolData')
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
    toClockDetail(zx) {
      console.log(zx)
      this.$router.push({
        path: '/sts/clockDetail',
        query: { problem_course_id: zx.problem_course_id },
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getCourseList(this, 'schoolData')
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
