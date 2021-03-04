<template>
  <section class="mainwrap">
    <search2
      :organShow="true"
      :contentShow="true"
      api="getBlackStudentsList"
      :isRelation="false"
      inputText="学生姓名"
      @getTable="getTableList"
      :organList="organData.list"
    ></search2>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        @selection-change="handleSelectionChange"
        stripe
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          prop="uid"
          label="学员编号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="学生姓名"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <!-- <el-table-column prop="classNum"
                         label="所授课程"
                         min-width="150"
                         show-overflow-tooltip></el-table-column> -->
        <el-table-column
          prop="classroom_name"
          label="所在班级"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="institution_name"
          label="所属机构"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="campus_name"
          label="所属校区"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <div style="display:flex; justify-content:center">
              <el-button type="text" @click="toEditfaceCourse(scope.row)"
                >添加</el-button
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
      <el-button type="success" style="margin-top:20px" @click="batchShift"
        >批量添加</el-button
      >
    </div>
  </section>
</template>

<script>
export default {
  name: 'addStudent',
  data() {
    return {
      schoolData: [],
      type: 0,
      problem_course_id: '',
      uid: [],
      page:1,
      organData: [],
    }
  },
  created() {
      this.$api.getBlackStudentsList(this, 'schoolData')
    //推荐机构列表
    this.$api.getRecommender(this, 'organData')
    
    // this.$api.getStudentManage(this, 'schoolData')
    this.problem_course_id = this.$route.query.problem_course_id
  },
  methods: {
      doPageChange(page) {
      this.page = page
      this.$api.getBlackStudentsList(this, 'schoolData')
    },
    batchShift() {
      if (this.uid.length > 0) {
        this.$api.insertBlacklist(this, this.uid)
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选需要添加的学员',
        })
      }
    },
    handleSelectionChange(val) {
      this.uid = val.map((i) => {
        return i.uid
      })
      console.log(this.uid)
    },
    getTableList(state, val) {
      console.log(state, val)
      if (state == 'page') {
        this.page = val
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toEditfaceCourse(zx) {
      console.log(zx)
      // let chapter_idStr = '[' + info.chapter_ids + ']'
      // let chapter_idArr = eval('(' + chapter_idStr + ')')
      let uidStr = '[' + zx.uid + ']'
      let uidArr = eval('(' + uidStr + ')')
      this.uid = uidArr
      console.log(this.uid)
      // uid.push(zx.uid)
      this.$api.insertBlacklist(this, this.uid)
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
