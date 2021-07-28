<template>
  <el-dialog
    title="异常详情"
    :visible.sync="visible"
    width="1200px"
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
        prop="intent_id"
        label="ID"
        min-width="100"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="班级名称"
        show-overflow-tooltip
        min-width="160"
        align="left"
        prop="classroom_name"
      >
      </el-table-column>
      <el-table-column
        label="课程名称"
        show-overflow-tooltip
        min-width="200"
        align="left"
        prop="course_name"
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
          <el-button type="text" @click="actionConfirm(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { intentRemoveData } from "@/api/eda";
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
    actionConfirm(row) {
      this.$confirm("确定要删除此条数据吗?", { type: "warning" })
        .then(() => {
          this.intentRemoveData(row);
        })
        .catch(() => {});
    },
    async intentRemoveData(row) {
      const data = {
        student_id: row.student_id,
        intent_id: row.intent_id,
      };
      const res = await intentRemoveData(data);
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