<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :contentShow="true"
        inputText="班级名称,班主任"
        api="getClassroomList"
        @getTable="getTableList"
      ></search2>
      <!-- <router-link to="/eda/editClasses"> -->
      <el-button type="primary" @click="toEditClasses">添加班级</el-button>
      <!-- </router-link> -->
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="classroom_id"
          label="编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="master_teacher_id"
          label="班主任"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="班级人数"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:space-around;">
              <el-button type="text" @click="toEditClasses(scope.row)"
                >编辑</el-button
              >
              <el-button type="text" @click="toLearnerManage(scope.row)"
                >学员管理</el-button
              >
              <el-button type="text" @click="toMassMessage(scope.row)"
                >群发消息</el-button
              >
              <!-- <el-button type="text" @click="handleDelete">删除</el-button> -->
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
  name: 'classDetail',
  data() {
    return {
      course_id: 0,
      page: 1,
      schoolData: [],
      datas: {},
    }
  },
  created() {
    this.course_id = this.$route.query.course_id
    console.log(this.course_id)

    // this.$api.getCategoryList(this, 'selectData')
    // this.$api.getCourseManage(this, 'Courname')
    this.$api.getClassroomList(this, 'schoolData')
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
      this.$api.getClassroomList(this, 'schoolData', this.datas)
    },
    toEditClasses(zx) {
      // let course_id = ''
      // if(this.course_id!=undefined){
      //   course_id
      // }
      this.$router.push({
        path: '/eda/editClasses',
        query: {
          classroom_id: zx.classroom_id,
          course_id: this.course_id,
        },
      })
    },
    toLearnerManage(ab) {
      console.log(ab)
      this.$router.push({
        path: '/eda/learnerManage',
        query: {
          course_id: ab.course_id,
          classroom_id: ab.classroom_id,
          category_id: ab.category_id,
        },
      })
    },
    toMassMessage(ab) {
      this.$router.push({
        path: '/eda/massMessage',
        query: {
          course_id: ab.course_id,
          classroom_id: ab.classroom_id,
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
