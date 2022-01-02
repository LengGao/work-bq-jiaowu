<template>
  <div class="institutional-collection">
    <div class="student-order-title">
      <h3>{{ rebateData.institution_name }}-返点{{ rebateData.standard_rebate_price }}元</h3>
      <span class="student-order-status">机构返点订单</span>
      <div class="actions">
        <el-button
          type="danger"
          plain
          v-if="rebateData.status == 0"
          >待审批</el-button
        >
        <el-button
          type="primary"
          plain
          v-if="rebateData.status == 1"
          >已通过</el-button
        >
        <el-tag
          type="danger"
          plain
          v-if="rebateData.status == 2"
          >已驳回</el-tag
        >
      </div> 
    
    </div>
    <Title text="返点信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">机构名称：</span>
        <span class="info-item__value">{{ rebateData.institution_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">关联订单数：</span>
        <span class="info-item__value">{{ rebateData.order_count }}</span>
      </div>
        <div class="info-item">
        <span class="info-item__name">应返点金额：</span>
        <span class="info-item__value">{{
          rebateData.standard_rebate_price
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">申请返点金额：</span>
        <span class="info-item__value">{{
          rebateData.apply_rebate_price
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">支付方式：</span>
        <span class="info-item__value">{{ rebateData.pay_type }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ rebateData.remark || "--" }}</span>
      </div>
    </div>
    <Title text="关联订单"></Title>
    <el-table
      :data="listData"
      style="border: 1px solid #f1f1f1"
      v-loading="false"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{
        'text-align': 'center',
        'background-color': '#f8f8f8',
      }"
    >
      <el-table-column
        label="订单编号"
        min-width="140"
        align="center"
        prop="order_no"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="toStudentOrderDetail(row.order_id)">{{
            row.order_no
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="create_time"
      >
      </el-table-column>
      <el-table-column
        prop="user_realname"
        label="客户姓名"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
       <el-table-column
        prop="type_name"
        label="学历形式"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
       <el-table-column
        prop="university_name"
        label="院校名称"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="level_name"
        label="层次名称"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="major_name"
        label="专业名称"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="project_name"
        label="项目名称"
        min-width="220"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="订单总金额"
        align="center"
        min-width="100"
        prop="order_money"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="返点比例"
        align="center"
        min-width="100"
        prop="rebate_rate"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="返点金额"
        align="center"
        min-width="100"
        prop="pay_money"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> {{ row.pay_money | moneyFormat }} </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="返点状态"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      <template slot-scope="{ row }">
              <span
                v-if="row.status == 0"
                >待审批</span>
              <span
                v-if="row.status == 1"
                >已通过</span
              >
              <span v-if="row.status == 2" 
                >已驳回
              </span>
            </template>
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="100"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="toStudentOrderDetail(row.order_id)"
            >订单详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rebateDetail } from "@/api/rebate";
export default {
  name: "institutionalRebateDetail",
  data() {
    return {
      addRebateVisible:false,
      currentId:"",
      rebateData:{},
      listData:[],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.rebateDetail()
  },
  methods: {
    handlePageChange(val) {
      this.pageNum = val;
      // this.getOrgReceivableList();
    },

    async rebateDetail() {
      const data = {
        id: this.$route.query.id,
      };
      this.loading = true;
      const res = await rebateDetail(data);
      this.loading = false;
      if (res.code === 0) {
        this.rebateData = res.data;
        this.listData = res.data.order_list;
      }
    },
     toStudentOrderDetail(id) {
      this.$router.push({
        name: "studentOrderDetail",
        query: {
          id,
        },
      });
    },

  },
};
</script>

<style lang="scss" scoped>
.institutional-collection{
  padding: 16px;
  .student-order-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .actions {
      margin-left: auto;
      margin-right: 30px;
    }
    .student-order-status {
      margin-left: 20px;
      color: #999;
      &::before {
        display: inline-block;
        content: "";
        width: 8px;
        height: 8px;
        background-color: #43d100;
        border-radius: 50%;
        margin-right: 4px;
      }
    }
  }
  .info-block {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    .info-item {
      padding: 16px 10px;
      color: #666;
      display: flex;
      &__name {
        min-width: 100px;
      }
      &__value {
        min-width: 250px;
        line-height: 1.5;
      }
    }
  }
}
</style>
