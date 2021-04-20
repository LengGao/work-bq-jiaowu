<template>
  <!--录制视频弹框-->
  <el-dialog
    title="录制视频"
    :visible.sync="visible"
    width="1100px"
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
        prop="fileName"
        label="视频名称"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="fileSize"
        label="文件大小"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="duration"
        label="视频时长"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="startTime"
        label="开始录制时间"
        min-width="180"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="endTime"
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
            <a :href="row.url" v-if="row.url" target="_blank"
              ><el-button type="text">下载</el-button></a
            >
            <span v-else>--</span>
          </div>
        </template>
      </el-table-column>
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