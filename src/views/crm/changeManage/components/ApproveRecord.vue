<template>
  <div class="approve-record">
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
