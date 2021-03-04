<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :courseTypeShow="true"
        :contentShow="true"
        api="getCourseClass"
        typeTx="punch"
        inputText="课程名称"
        @getTable="getTableList"
        :selectList="organData.list"
      ></search2>
      <!-- <el-button type="primary"
                 @click="dialogVisible = true">添加课程</el-button> -->
    </div>

    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.data"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'left' }"
        :cell-style="{ 'text-align': 'left' }"
      >
        <el-table-column
          prop="course_id"
          label="序号"
          show-overflow-tooltip
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="310"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程分类"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="class_number"
          label="班级数量"
          min-width="50"
          show-overflow-tooltip
        ></el-table-column>
       <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="scope">
            <div style="display:flex;justify-content:left">
              <el-button type="text" @click="toClassDetail(scope.row)"
                >管理班级</el-button
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
  name: 'classManage',
  data() {
    return {
      organData: [],

      ruleForm: {},
      page: 1,
      datas: {},
      schoolData: [{ course_students_id: '1', mobile: 1 }],
    }
  },
  created() {
    this.$api.getCategoryList(this, 'organData')
    // this.$api.getCourseManage(this, 'Courname')
    this.$api.getCourseClass(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getCourseClass(this, 'schoolData', this.datas)
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
    toClassDetail(zx) {
      this.$router.push({
        path: '/eda/classDetail',
        query: {
          course_id: zx.course_id,
        },
      })
    },
    addCourse() {
      // this.dialogVisible = true
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

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}

.is-leaf{
  width: 150px !important;
}

</style>
