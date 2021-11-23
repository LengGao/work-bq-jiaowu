<template>
  <div class="student-order-detail">
    <div class="student-order-title">
      <h3>{{ detailData.surname }}-{{ detailData.project_name }}</h3>
      <span class="student-order-status">机构学生单</span>
    </div>
    <Title text="订单信息"></Title>
    <div class="info-block">
      <div class="info-item">
        <span class="info-item__name">订单编号：</span>
        <span class="info-item__value">{{ detailData.order_no }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单时间：</span>
        <span class="info-item__value">{{ detailData.create_time }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">客户姓名：</span>
        <span class="info-item__value">{{ detailData.surname }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">业绩归属：</span>
        <span class="info-item__value">{{ detailData.staff_name }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">订单金额：</span>
        <span class="info-item__value"
          >￥{{ detailData.order_money || 0 }}</span
        >
      </div>
      <div class="info-item">
        <span class="info-item__name">已回款金额：</span>
        <span class="info-item__value">￥{{ detailData.pay_money || 0 }}</span>
      </div>
      <div class="info-item">
        <span class="info-item__name">未回款金额：</span>
        <span class="info-item__value"
          >￥{{ detailData.overdue_money || 0 }}</span
        >
      </div>
      <div class="info-item">
        <span class="info-item__name">报名类型：</span>
        <span class="info-item__value">{{
          detailData.type === 1 ? "学历教育" : "职业教育"
        }}</span>
      </div>
      <template v-if="detailData.type === 1">
        <div class="info-item">
          <span class="info-item__name">考前辅导费：</span>
          <span class="info-item__value"
            >￥{{ detailData.pre_tutor || 0 }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__name">报考费：</span>
          <span class="info-item__value"
            >￥{{ detailData.examination || 0 }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__name">教材费：</span>
          <span class="info-item__value">￥{{ detailData.textbook || 0 }}</span>
        </div>
        <div class="info-item">
          <span class="info-item__name">毕设指导费：</span>
          <span class="info-item__value"
            >￥{{ detailData.graduation_guidance || 0 }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__name">论文答辩费：</span>
          <span class="info-item__value"
            >￥{{ detailData.thesis_defense || 0 }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__name">平台费：</span>
          <span class="info-item__value"
            >￥{{ detailData.platform_fee || 0 }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-item__name">其他费用：</span>
          <span class="info-item__value">￥{{ detailData.others || 0 }}</span>
        </div>
      </template>
      <div class="info-item">
        <span class="info-item__name">订单备注：</span>
        <span class="info-item__value">{{ detailData.tips || "--" }}</span>
      </div>
    </div>
    <template v-if="detailData.type === 1">
      <Title text="学历信息"></Title>
      <el-table
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
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="学历形式"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="type.value"
        >
        </el-table-column>
        <el-table-column
          prop="university.value"
          label="院校名称"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="层次名称"
          align="center"
          prop="level.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="专业名称"
          align="center"
          prop="major.value"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="关联项目"
          align="center"
          min-width="100"
          prop="project_name"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="项目班型"
          align="center"
          min-width="100"
          prop="class_type.value"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="渠道价格"
          align="center"
          min-width="100"
          prop="class_type.price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              ￥{{ (row.class_type && row.class_type.price) || "" }}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template v-else>
      <Title text="项目信息"></Title>
      <el-table
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
          label="序号"
          min-width="70"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="project_name"
        >
        </el-table-column>
        <el-table-column
          prop="has_question"
          label="所属分类"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="class_type_name"
          label="项目班型"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="渠道价格"
          align="center"
          min-width="100"
          prop="price"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span> ￥{{ row.price }} </span>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import { getCrmOrderDetail } from "@/api/crm";
export default {
  name: "studentOrderDetail",
  data() {
    return {
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
      const res = await getCrmOrderDetail(data);
      if (res.code === 0) {
        this.detailData = res.data;
      }
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


