<template>
  <section class="mainwrap">
    <div class="head">
      <search2
        :contentShow="true"
        api="getRoleList"
        inputText="角色名称"
        @getTable="getTableList"
      ></search2>
      <el-button type="primary" @click="toAddRole">添加角色</el-button>
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
        <!-- <el-table-column type="selection" width="30"></el-table-column> -->
        <el-table-column
          prop="role_id"
          label="角色编号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="role_name"
          label="角色"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="备注信息"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="toAddRole(scope.row)"
              >编辑</el-button
            >
            <el-button type="text" @click="handleDelete(scope.row)"
              >删除</el-button
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
export default {
  name: 'faceTeach',
  data() {
    return {
      page: 1,
      schoolData: [],
      courseName: [],
      courseType: [],
      datas: {},
    }
  },
  created() {
    this.$api.getRoleList(this, 'schoolData')
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
      this.$api.getRoleList(this, 'schoolData', this.datas)
    },
    handleDelete(av) {
      this.$confirm('确定要删除当前角色吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.deleteRegister(this, av.role_id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    toAddRole(ab) {
      this.$router.push({
        path: '/smt/addRole',
        query: {
          role_id: ab.role_id,
        },
      })
    },
    selectCoursetype() {},
    saveLink() {},
    toChapter() {
      this.$router.push({
        path: '/eda/faceMessage',
      })
    },
    // toFaceBlacklist() {
    //   this.$router.push({
    //     path: '/eda/faceBlacklist',
    //   })
    // },
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
