<template>
  <!--排课详情弹框-->
  <el-dialog
    title="排课详情"
    :visible.sync="visible"
    width="800px"
    class="course-dialog"
    @open="getClassOurList"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
  >
    <el-table
      :data="listData"
      style="width: 100%"
      class="min_table"
      :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" width="60" type="index"> </el-table-column>
      <el-table-column
        prop="period"
        label="上课时间"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="attendance_num"
        label="出勤人数"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="absenteeism_num"
        label="缺勤人数"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="rate"
        label="出勤率"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        label="操作"
        fixed="right"
        min-width="200"
        max-width="200"
      >
        <template slot-scope="{ row }">
          <div class="operation_btn">
            <el-button type="text">考勤统计</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getClassOurList } from "@/api/eda";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
    },
  },
  data() {
    return {
      visible: this.value,
      listData: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    hanldeCancel() {
      this.$emit("input", false);
    },
    // 班级考勤列表-排课详情
    async getClassOurList() {
      const data = {
        arrange_id: this.id,
      };
      const res = await getClassOurList(data);
      this.listData = res.data;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>