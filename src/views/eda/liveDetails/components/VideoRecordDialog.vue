<template>
  <!--录制视频弹框-->
  <el-dialog
    title="录制视频"
    :visible.sync="visible"
    width="1100px"
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
        label="视频名称"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="文件大小"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="视频时长"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="开始录制时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="结束录制时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="course_name"
        label="操作"
        min-width="180"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <div style="display: flex; justify-content: center">
            <el-button type="text">下载</el-button>
          </div>
        </template>
      </el-table-column>
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