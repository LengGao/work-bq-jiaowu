<template>
  <section class="main">
    <div class="client_head">
      <search :hideTime="false"></search>
      <router-link to="/recruitView/intentionEntry">
        <el-button type="primary">意向录入</el-button>
      </router-link>

    </div>
    <!--表格-->
    <div class="userTable">
      <el-table ref="multipleTable"
                :data="schoolData"
                tooltip-effect="light"
                stripe
                style="width: 100%"
                class="min_table">

        <el-table-column prop="uid"
                         label="学员编号"
                         show-overflow-tooltip
                         min-width="90"></el-table-column>
        <el-table-column prop="nickname"
                         label="学生姓名"
                         min-width="110"
                         show-overflow-tooltip></el-table-column>

        <el-table-column prop="mobile"
                         label="手机号码"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="注册时间"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName"
                         label="课程类型"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="organizationName"
                         label="课程名称"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="所属机构"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="所属老师"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="渠道来源"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classNum"
                         label="成交状态"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>

        <el-table-column label="操作"
                         fixed="right"
                         min-width="200">

          <template>
            <div style="display:flex">
              <el-button type="text">编辑</el-button>
              <el-button type="text"
                         @click="topayment">缴费</el-button>
              <el-button type="text"
                         @click="jumpSea">跳海</el-button>
              <el-button type="text"
                         @click="topayment">退费</el-button>
              <el-button type="text"
                         @click="toStudentDetail">详情</el-button>

            </div>

          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="table_bottom">
        <div class="table_bottom">
          <page :data="schoolData.count"
                :curpage="page"
                @pageChange="doPageChange" />
        </div>
      </div> -->
    </div>
  </section>

</template>

<script>
export default {
  data() {
    return {
      schoolData: [
        { nickname: '聊', mobile: '1500333' },
        { nickname: '聊', mobile: '1500333' }
      ]
    }
  },
  methods: {
    topayment() {
      this.$router.push({
        name: 'payMent'
      })
    },
    toStudentDetail() {
      this.$router.push({
        name: 'studentDetail'
      })
    },
    jumpSea() {
      this.$confirm('确定要把学员转交到公海吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
  //   mounted() {}
}
</script>

<style lang='scss' scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.main {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>