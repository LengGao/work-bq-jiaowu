<template>
  <div class="approve-record">
    <el-table
      :data="data.step_list"
      style="width: 100%"
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
        prop="finish_time"
      >
      </el-table-column>
      <el-table-column
        prop="staff_name"
        label="处理人"
        min-width="80"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="verify_type"
        label="审批类型"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag size="small" :type="verifyTypeMap[row.verify_type || 0].type">
            {{ verifyTypeMap[row.verify_type || 0].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="执行操作"
        align="center"
        min-width="100"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <el-tag
            size="small"
            v-if="row.status"
            :type="verifyStatusMap[row.status].type"
          >
            {{ verifyStatusMap[row.status].text }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="备注信息"
        align="center"
        min-width="100"
        prop="tips"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ApproveRecord",
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      verifyTypeMap: {
        0: {
          text: "新订单",
          type: "success",
        },
        1: {
          text: "申请退款",
          type: "warning",
        },
        2: {
          text: "申请作废",
          type: "danger",
        },
      },
      verifyStatusMap: {
        0: {
          text: "待审核",
          type: "info",
        },
        1: {
          text: "待审核",
          type: "info",
        },
        2: {
          text: "（多人）审核中",
          type: "primary",
        },
        3: {
          text: "审核通过",
          type: "success",
        },
        8: {
          text: "已撤销审核",
          type: "info",
        },
        9: {
          text: "驳回不通过",
          type: "danger",
        },
      },
    };
  },
};
</script>
