<template>
  <!--推流弹框-->
  <el-dialog
    title="推流详情"
    :visible.sync="visible"
    width="600px"
    class="Live-statistics-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="hanldeCancel"
  >
    <el-table
      ref="multipleTable"
      :data="detailData"
      style="width: 100%"
      class="min_table"
      v-loading="detaiLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="course_name"
        label="推流时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="断流时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="推流时长"
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
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      detaiLoading: false,
      detailData: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      if (this.id) {
        this.getRuleDetail();
      }
    },
    async getRuleDetail() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getRuleDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.detailData = res.data;
      }
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>