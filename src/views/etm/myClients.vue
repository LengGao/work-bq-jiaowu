<template>
  <section class="mainwrap">
    <div class="client_head">
      <search
        :classNameHide="false"
        api="getMyclient"
        :statusNum="1"
        @getTable="getTableList"
        :teacherHide="false"
      ></search>
      <el-button type="primary" @click="toIntentionEntry">意向录入</el-button>
    </div>
    <!-- <Breadcrumb></Breadcrumb> -->
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%;"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
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
        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="课程类型"
          min-width="100"
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
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="teacher_name"
          label="所属老师"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="sources"
          label="渠道来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="成交状态" min-width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.type | dealType }}
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="scope">
            <div style="display: flex;">
              <el-button
                type="text"
                v-if="scope.row.type != '3'"
                @click="toIntentionEntry(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type == '1' || scope.row.type == '3'"
                @click="topayment(scope.row)"
                >缴费</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type == '1'"
                @click="jumpSea(scope.row)"
                >跳海</el-button
              >
              <el-button
                type="text"
                v-if="scope.row.type == '1'"
                @click="toSwapStudent"
                >转交</el-button
              >
              <el-button
                type="text"
                @click="topayment(scope.row, (refund = 'refund'))"
                v-if="scope.row.type == '2'"
                >退费</el-button
              >
              <el-button
                type="text"
                @click="toRefundDetail(scope.row)"
                v-if="scope.row.type == '3'"
                >退费情况</el-button
              >
              <el-button type="text" @click="toStudentDetail(scope.row)"
                >详情</el-button
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
  name: 'myClients',
  data() {
    return {
      schoolData: [],
      page: 1,
      status: 1,
      datas: {},
    }
  },
  created() {
    // this.page = this.$store.state.page.pageNum
    // console.log(page)
    this.status = 1
  },
  mounted() {
    // let field_text = '渠道来源'
    // this.$api.getfieldinfo(this, 'channelist', field_text)
    this.$api.getMyclient(this, 'schoolData')
  },
  filters: {
    dealType(type) {
      if (type == '2') {
        return '已成交'
      } else if (type == '3') {
        return '已退费'
      } else {
        return '未成交'
      }
    },
  },
  methods: {
    getTableList(state, val, datas) {
      console.log(state, val, datas)
      if (state == 'page') {
        this.page = val
        this.datas = datas
        console.log(this.datas)
      } else if (state == 'data') {
        this.schoolData = val
      }
    },
    toSwapStudent() {
      this.$router.push({
        path: '/etm/swapStudent',
      })
    },
    topayment(yz, zx) {
      this.$router.push({
        path: '/etm/payMent',
        query: { intent_id: yz.intent_id, refund: zx, lastPage: this.page },
      })
    },
    toRefundDetail(ab) {
      console.log(ab)
      this.$router.push({
        path: '/etm/refundDetail',
        query: { intent_id: ab.intent_id },
      })
    },
    toStudentDetail(zx) {
      console.log(zx)
      let intent_id = zx.intent_id
      let uid = zx.uid
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: intent_id, uid: uid },
      })
    },
    toIntentionEntry(ab) {
      console.log(ab)
      let intent_id = ab.intent_id
      this.$router.push({
        path: '/etm/IntentionEntry',
        query: { intent_id: intent_id, lastPage: this.page },
      })
    },
    jumpSea(ab) {
      let intent_id = ab.intent_id
      this.$confirm('确定要把学员转交到公海吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$api.jumpSea(this, intent_id)
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!',
          // })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    doPageChange(page) {
      this.page = page
      this.$api.getMyclient(this, 'schoolData', this.datas)
    },
  },
  //
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
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
