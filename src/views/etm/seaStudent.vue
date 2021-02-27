<template>
  <section class="main">
    <search :hideTime="false"></search>
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
        <el-table-column prop="uid"
                         label="学员头像"
                         show-overflow-tooltip
                         min-width="90"></el-table-column>
        <el-table-column prop="uid"
                         label="微信昵称"
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
                         label="加入时间"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="classroomName"
                         label="意向类型"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="organizationName"
                         label="意向课程"
                         min-width="150"
                         show-overflow-tooltip></el-table-column>

        <el-table-column prop="classNum"
                         label="渠道来源"
                         min-width="100"
                         show-overflow-tooltip></el-table-column>

        <el-table-column label="操作"
                         fixed="right"
                         min-width="200">
          <template>
            <div style="display:flex">

              <el-button type="text"
                         @click="toStudentDetail">详情</el-button>
              <el-button type="text"
                         @click="toMyClients">领取</el-button>

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
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'seaStudent',
  data() {
    return {
      schoolData: [
        { nickname: '聊', mobile: '1500333' },
        { nickname: '聊', mobile: '1500333' }
      ]
    }
  },
  methods: {
    toStudentDetail() {
      this.$router.push({
        path: '/etm/studentDetail'
        // query: { id: 'row.id' }
      })
    },
    toMyClients() {
      this.$router.push({
        path: '/etm/enrollmentManagement'
        // query: { id: 'row.id' }
      })
    }
  }
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
}
.userTable {
  margin-top: 20px;
}
</style>