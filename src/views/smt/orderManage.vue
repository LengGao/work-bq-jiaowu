<template>
  <section class="mainwrap">
    <search2
      :hideTime="true"
      :courseTypeShow="true"
      :contentShow="true"
      api="getOrdersList"
      inputText="学生姓名.手机号码"
      selectText="订单状态"
      @getTable="getTableList"
      :selectList="selectList"
    ></search2>
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
          prop="order_no"
          label="订单编号"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="add_time"
          label="订单时间"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="user_realname"
          label="学员姓名"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="telphone"
          label="联系方式"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="购买课程"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="order_amount"
          label="应收金额"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pay_amount"
          label="实收金额"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="refunds_amount"
          label="退费金额"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pay_type"
          label="订单来源"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remarks"
          label="备注信息"
          min-width="150"
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
  name: 'orderManage',
  data() {
    return {
      schoolData: [],
      page: 1,
      datas: {},
      selectList: [
        { category_id: 1, category_name: '已付款' },
        { category_id: 2, category_name: '已退款' },
        { category_id: 3, category_name: '已失效' },
      ],
      // courseName: [],
      // courseType: [],
    }
  },
  mounted() {
    this.$api.getOrdersList(this, 'schoolData')
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
      this.$api.getOrdersList(this, 'schoolData', this.datas)
    },
    toAddRole() {
      this.$router.push({
        path: '/smt/addRole',
      })
    },
    selectCoursetype() {},
    saveLink() {},
    toChapter() {
      this.$router.push({
        path: '/eda/faceMessage',
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
.userTable {
  margin-top: 20px;
}
</style>
