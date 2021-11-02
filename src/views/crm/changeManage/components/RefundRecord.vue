<template>
  <div class="refund-record">
    <div class="header">
      <div>
        <span class="title">应退金额：</span>
        <span class="value">￥1000.00 </span>
      </div>
      <div>
        <span class="title">已退金额：</span>
        <span class="value">￥1000.00 </span>
      </div>
      <div>
        <span class="title">未退金额：</span>
        <span class="value">￥1000.00 </span>
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
        label="操作时间"
        show-overflow-tooltip
        min-width="160"
        align="center"
        prop="title"
      >
      </el-table-column>
      <el-table-column
        prop="has_question"
        label="处理人"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="执行操作"
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
    </el-table>
  </div>
</template>

<script>
import { getClassTypeList } from "@/api/institution";
export default {
  name: "performanceTargets",
  data() {
    return {
      listData: [],
      listLoading: false,
    };
  },

  created() {
    this.getClassTypeList();
  },
  methods: {
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
}
</style>
