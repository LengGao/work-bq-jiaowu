<template>
  <div class="order">
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="schoolData.list"
        tooltip-effect="light"
        stripe
        style="width: 100%"
        class="min_table"
      >
        <el-table-column
          prop="order_no"
          label="订单编号"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="add_time"
          label="订单时间"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="course_name"
          label="课程名称"
          min-width="150"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="order_amount"
          label="应收金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pay_amount"
          label="实收金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="refunds_amount"
          label="退费金额"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pay_type"
          label="缴费方式"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="inte_from"
          label="订单来源"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="remarks"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      schoolData: [],
    }
  },
  props: {
    uid: {
      type: Number,
    },
    course_id: {
      type: Number,
    },
  },
  created() {
    this.$api.getOrderList(this, 'schoolData')
  },
  methods: {
    doPageChange(page) {
      this.page = page
      this.$api.getOrderList(this, 'schoolData')
    },
  },
}
</script>

<style></style>
