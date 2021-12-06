<template>
  <div class="student-order-detail" v-loading="loading">
    <div class="student-order-title">
      <h3>{{ detailData.surname }}-{{ detailData.project_name }}</h3>
      <span class="student-order-status">机构学生单</span>
    </div>
    <Title text="回款信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">回款日期：</span>
        <span class="info-item__value">{{ detailData.order_no }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">机构名称：</span>
        <span class="info-item__value">{{ detailData.create_time }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ detailData.surname }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">关联订单数：</span>
        <span class="info-item__value">{{ detailData.staff_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">回款总金额：</span>
        <span class="info-item__value"
          >￥{{ detailData.order_money || 0 }}</span
        >
      </div>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ detailData.tips || "--" }}</span>
      </div>
    </div>
    <Title text="关联订单"></Title>
    <el-table
      :key="detailData.type"
      :data="getTableData"
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
        min-width="70"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="project_name"
      >
      </el-table-column>
      <el-table-column
        prop="has_question"
        label="客户姓名"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="class_type_name"
        label="项目名称"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="订单总金额"
        align="center"
        min-width="100"
        prop="price"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> ￥{{ row.price }} </span>
        </template>
      </el-table-column>
      <el-table-column
        label="已回款金额"
        align="center"
        min-width="100"
        prop="price"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span> ￥{{ row.price }} </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="pay_progress"
        label="回款进度"
        min-width="140"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-progress
            :percentage="+(row.pay_progress || '').split('%')[0] || 0"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="支付状态"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag size="small" :type="row.pay_status | orderTagType">{{
            row.pay_status | orderStatus
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" min-width="100">
        <template slot-scope="{ row }">
          <el-button type="text" @click="toCrmOrderDetail(row.order_id)"
            >订单详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCrmOrderDetail } from "@/api/crm";
export default {
  name: "studentOrderDetail",
  data() {
    return {
      loading: false,
      detailData: {
        pay_plan: [],
        pay_log: [],
        project: "[]",
        verify_step: [],
        verify_status: 0,
      },
    };
  },
  computed: {
    getTableData() {
      const tableData = JSON.parse(this.detailData.project) || [];
      console.log(tableData);
      return tableData;
    },
  },
  created() {
    this.getCrmOrderDetail();
  },
  methods: {
    async getCrmOrderDetail() {
      const data = {
        order_id: this.$route.query.id,
      };
      this.loading = true;
      const res = await getCrmOrderDetail(data).catch(() => {});
      this.loading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
    toCrmOrderDetail(id) {
      this.$router.push({
        name: "crmOrderDetail",
        query: {
          id,
        },
      });
    },
  },
};
</script>
<style lang="less">
.student-order-detail {
  padding: 16px;
  .student-order-title {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
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
        min-width: 300px;
        line-height: 1.5;
      }
    }
  }
}
</style>


