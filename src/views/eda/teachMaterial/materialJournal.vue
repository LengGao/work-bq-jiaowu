<template>
  <section class="mainwrap">
    <search
      :organHide="false"
      :schoolHide="false"
      :classNameHide="false"
      :dealStatusHide="false"
      :teacherHide="false"
      @getTable="getTableList"
      api="getMyclient"
      :statusNum="3"
    ></search>
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
        <el-table-column
          prop="dispense_id"
          label="序号"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>

        <el-table-column
          prop="create_time"
          label="操作时间"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="books_name"
          label="教材名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop=""
          label="仓库名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="num"
          label="发放数量"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="type"
          label="发放形式"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.type | dealType }}
          </template>
        </el-table-column>
        <el-table-column
          prop="staff_name"
          label="操作人"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="remark"
          label="备注信息"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
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
  name: 'seaStudent',
  data() {
    return {
      schoolData: [],
      page: 1,
      status: 3,
      datas: {},
    }
  },
  mounted() {
    this.$api.getDispenseLog(this, 'schoolData')
  },
  filters: {
    dealType(type) {
      switch (type) {
        case 1:
          return '现场发放'
          break
        case 2:
          return '快递'
          break
        default:
          return '未知'
      }
    },
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

    toStudentDetail(zx) {
      console.log(zx)
      let intent_id = zx.intent_id
      this.$router.push({
        path: '/etm/studentDetail',
        query: { intent_id: intent_id, uid: zx.uid },
      })
    },
    receiveStudent(zx) {
      console.log(zx)
      this.$api.receive(this, zx.intent_id)
    },
    doPageChange(page) {
      this.page = page
      // this.$api.getMyclient(this, 'myclient', status)
      this.$api.getDispenseLog(this, 'schoolData')
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
/deep/.timeCard {
  color: #666666;
}
/deep/.studentTag ul li {
  color: #666666;
}
</style>
