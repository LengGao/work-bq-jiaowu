<template>
  <section class="mainwrap">
    <search2
      api="getClassroomList"
      :contentShow="true"
      :illustrateShow="true"
      @getTable="getTableList"
      inputText="班级名称,班主任"
    ></search2>
    <!--表格-->
    <div class="userTable">
      <p class="illustrate">{{illustrate}}</p>
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        style="width: 100%"
        class="min_table"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column
          prop="classroom_id"
          label="编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>

        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="master_teacher_id"
          label="班主任"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="student_number"
          label="班级人数"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex">
              <!-- <el-button type="text" @click="toStudentDetail">详情</el-button> -->
              <el-button type="text" @click="changeClass(scope.row)"
                >转至此班</el-button
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
  name: 'studentManage',
  data() {
    return {
      page: 1,
      schoolData: [],
      illustrate:'',
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    if(this.$route.query.realname){
      this.illustrate = '您将把学员' + decodeURIComponent(this.$route.query.realname) + '转至以下的班级，请选择对应的班级。'
    }
    // this.$api.getCategoryList(this, 'selectData')
    // this.$api.getCourseManage(this, 'Courname')
    this.$api.getClassroomList(this, 'schoolData')
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val, datas)
      if (state == 'page') {
        this.page = val
        this.datas = datas
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toStudentDetail() {
      this.$router.push({
        path: '/etm/studentDetail',
        // query: { id: 'row.id' }
      })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getClassroomList(this, 'schoolData', this.datas)
    },
    changeClass(zx) {
      console.log(zx)
      let uid = this.$route.query.uid
      console.log(uid)
      if (uid != undefined) {
        this.$api.batchchangestudents(this, zx.classroom_id)
      } else {
        this.$api.exchangestudents(this, zx.classroom_id)
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
.illustrate{
    margin-bottom: 5px;
    color: #606266;
    font-size: 14px;
}
</style>
