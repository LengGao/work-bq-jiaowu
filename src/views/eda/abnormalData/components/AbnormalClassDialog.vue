<template>
  <el-dialog
    title="异常详情"
    :visible.sync="visible"
    width="800px"
    class="live-dialog"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
    top="5vh"
  >
    <el-table
      ref="multipleTable"
      :data="list"
      style="width: 100%"
      class="min_table"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{ 'text-align': 'center' }"
      height="600"
    >
      <el-table-column
        label="ID"
        show-overflow-tooltip
        min-width="70"
        align="center"
        prop="id"
      >
      </el-table-column>
      <el-table-column
        prop="intent_id"
        label="意向ID"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="学生姓名"
        min-width="130"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="手机号码"
        min-width="130"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        fixed="right"
        min-width="240"
      >
        <template slot-scope="{ row }">
          <el-button type="text" @click="actionConfirm(row.id)">保留</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { classRemoveStudent } from "@/api/eda";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    actionConfirm(id) {
      this.$confirm("确定要保留此条数据吗?", { type: "warning" })
        .then(() => {
          this.classRemoveStudent(id);
        })
        .catch(() => {});
    },
    async classRemoveStudent(id) {
      const data = { id };
      const res = await classRemoveStudent(data);
      if (res.code === 0) {
        this.$emit("on-success");
        this.$message.success(res.message);
        this.visible = false;
      }
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.live-dialog {
}
</style>