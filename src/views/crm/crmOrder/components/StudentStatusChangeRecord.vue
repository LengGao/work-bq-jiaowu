<template>
  <!--列表-->
  <div class="userTable">
    <el-table
      ref="multipleTable"
      :data="listData"
      :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index" width="70"> </el-table-column>
      <el-table-column
        prop="type_name"
        label="异动类型"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="apply_time"
        label="申请时间"
        min-width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="apply_reason"
        label="申请原因"
        min-width="140"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="status_name"
        label="办理状态"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag :type="statusMap[row.status]" size="small">{{
            row.status_name
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="origin_major_name"
        label="原专业"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="new_major_name"
        label="新专业"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="transact_time"
        label="办理日期"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="approve_time"
        label="审批日期"
        min-width="100"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注信息"
        min-width="140"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StudentStatusChangeRecord",
  props: {
    listData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      statusMap: {
        1: "info",
        2: "warning",
        3: "success",
        4: "danger",
      },
    };
  },
};
</script>

<style lang="less" scoped>
</style>

