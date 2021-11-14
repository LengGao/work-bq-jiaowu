<template>
  <div class="refund-record">
    <div class="header">
      <div>
        <span class="title">订单总金额：</span>
        <span class="value">￥{{ data.order_money }} </span>
      </div>
      <div>
        <span class="title">已回款金额：</span>
        <span class="value">￥{{ data.pay_money }} </span>
      </div>
      <div>
        <span class="title">未回款金额：</span>
        <span class="value">￥{{ data.overdue_money }} </span>
      </div>
      <div class="actions">
        <el-button type="primary" @click="handleAddPlan"
          >配置回款计划</el-button
        >
        <el-button type="primary" @click="handleAdd">添加回款记录</el-button>
      </div>
    </div>

    <el-table
      :data="listData"
      style="width: 100%; border: 1px solid #eee; border-bottom: none"
      v-loading="listLoading"
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
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        prop="has_question"
        label="回款日期"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="回款金额"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="支付方式"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="收款人员"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="备注信息"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        align="center"
        min-width="160"
      >
        <template slot-scope="{ row }">
          <el-button type="text">催办</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p class="placeholder">或</p>
    <div class="term">
      <div class="term-header">
        <i class="el-icon-notebook-2"></i>
        <div class="info-item">
          <span>第1期回款计划：</span>
          <span>2021-11-01 </span>
        </div>
        <div class="info-item">
          <span>应收：</span>
          <span>¥ 2500.00</span>
        </div>
        <div class="info-item">
          <span>已收：</span>
          <span> ¥ 2500.00</span>
        </div>
        <div class="info-item">
          <span>进度：</span>
          <span>100%</span>
        </div>
      </div>
      <el-table
        :data="listData"
        style="width: 100%"
        v-loading="listLoading"
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
          show-overflow-tooltip
          min-width="160"
          align="center"
          prop="title"
        >
        </el-table-column>
        <el-table-column
          prop="has_question"
          label="回款日期"
          min-width="80"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="回款金额"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="支付方式"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="收款人员"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="备注信息"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="160"
        >
          <template slot-scope="{ row }">
            <el-button type="text">催办</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddCollectionRecord
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getClassTypeList"
    />
    <AddCollectionPlan
      v-model="planDialogVisible"
      :title="planDialogTitle"
      :id="currentId"
      @on-success="getClassTypeList"
    />
  </div>
</template>

<script>
import { getClassTypeList } from "@/api/institution";
import AddCollectionRecord from "@/views/crm/changeManage/components/AddCollectionRecord.vue";
import AddCollectionPlan from "@/views/crm/changeManage/components/AddCollectionPlan.vue";
export default {
  name: "CollectionRecord",
  components: {
    AddCollectionRecord,
    AddCollectionPlan,
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      currentId: "",
      dialogTitle: "",
      dialogVisible: false,
      planDialogVisible: false,
      planDialogTitle: "",
    };
  },

  created() {
    this.getClassTypeList();
  },
  methods: {
    handleAddPlan() {
      this.currentId = "";
      this.planDialogTitle = "配置回款计划";
      this.planDialogVisible = true;
    },
    handleEdit(row) {
      this.currentId = row;
      this.dialogTitle = "编辑回款记录";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加回款记录";
      this.dialogVisible = true;
    },
    async getClassTypeList() {
      this.listLoading = true;
      const res = await getClassTypeList();
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .value {
    color: #199fff;
    margin-right: 20px;
  }
  .title {
    color: #333;
    font-weight: 550;
  }
  .actions {
    margin-left: auto;
  }
}
.placeholder {
  padding: 20px 0;
  text-align: center;
}
.term {
  border: 1px solid #eee;
  border-bottom: none;
  &-header {
    display: flex;
    align-items: center;
    color: #666;
    padding: 16px;
    background-color: #f2f6fc;
    .info-item {
      padding: 0 10px;
    }
  }
}
</style>
