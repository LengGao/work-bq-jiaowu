<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :organShow="true"
        :contentShow="true"
        api="getBlacklist"
        :isRelation="false"
        inputText="学生姓名"
        @getTable="getTableList"
        :organList="organData.list"
      ></search2>
      <el-button type="primary" @click="toAddStudent">添加学生</el-button>
    </div>
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
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
        <!-- <el-table-column prop="classNum"
                         label="所属老师"
                         min-width="100"
                         show-overflow-tooltip></el-table-column> -->

        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <div style="display:flex; justify-content:center">
              <el-button type="text" @click="handleDelete(scope.row)"
                >移除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="schoolData.count"
            :curpage="page"
            @pageChange="doPageChange"
          />
        </div>
      </div>
    </div>
    <el-button type="danger" style="margin-top:20px" @click="batchDelete"
      >批量删除</el-button
    >
  </section>
</template>

<script>
export default {
  name: 'faceBlacklist',
  data() {
    return {
      course_id: '',
      datas: {},
      page: 1,
      blacklist_id: [],
      schoolData: [],
      organData: [],
    }
  },
  created() {
    //推荐机构列表
    // this.$api.getRecommender(this)
    this.$api.getBlacklist(this, 'schoolData')
    this.$api.getRecommender(this, 'organData')
    this.course_id = this.$route.query.course_id
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getBlacklist(this, 'schoolData', this.datas)
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
    batchDelete() {
      if (this.blacklist_id.length > 0) {
        this.$confirm('此操作将批量移除该学员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.$api.removeBlacklist(this, this.blacklist_id)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消移除',
            })
          })
      } else {
        this.$message({
          type: 'warning',
          message: '请勾选需要移除的学员',
        })
      }
    },
    handleSelectionChange(val) {
      this.blacklist_id = val.map((i) => {
        return i.blacklist_id
      })
      console.log(this.blacklist_id)
    },
    toAddStudent() {
      this.$router.push({
        path: '/eda/addStudent',
        query: {
          problem_course_id: this.$route.query.problem_course_id,
          course_id: this.$route.query.course_id,
        },
      })
    },
    handleDelete(ab) {
      console.log(ab)
      let blacklist_idStr = '[' + ab.blacklist_id + ']'
      let blacklist_idArr = eval('(' + blacklist_idStr + ')')
      this.blacklist_id = blacklist_idArr
      this.$confirm('此操作将移除该学员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.removeBlacklist(this, this.blacklist_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消移除',
          })
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
