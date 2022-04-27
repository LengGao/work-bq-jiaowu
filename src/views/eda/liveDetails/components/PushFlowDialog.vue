<template>
  <!--推流弹框-->
  <el-dialog
    title="推流详情"
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
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="start_time"
        label="推流时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="end_time"
        label="断流时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="推流时长"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
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