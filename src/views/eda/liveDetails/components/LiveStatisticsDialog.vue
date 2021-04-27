<template>
  <!--观看详情弹框-->
  <el-dialog
    title="观看详情"
    :visible.sync="visible"
    width="600px"
    class="Live-statistics-dialog"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
  >
    <el-table
      ref="multipleTable"
      :data="datas"
      style="width: 100%"
      class="min_table"
      height="400"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="createdTime"
        label="加入时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="lastModified"
        label="离开时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="play_duration"
        label="观看时长"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { getRuleDetail } from "@/api/exa";
export default {
  name: "LiveStatisticsDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    datas: {
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
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>