<template>
  <!--引用详情弹窗-->
  <el-dialog
    title="引用详情"
    :visible.sync="visible"
    width="1100px"
    @open="handleOpen"
    :close-on-click-modal="false"
    top="5vh"
    class="video-list-dialog"
    @closed="hanldeCancel"
  >
    <!--表格-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        style="width: 100%"
        class="min_table"
        :header-cell-style="{
          'text-align': 'center',
          background: '#f8f8f8',
        }"
        :cell-style="{ 'text-align': 'center' }"
        height="550"
      >
        <el-table-column
          prop="classroom_name"
          label="班级名称"
          min-width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="chapter_name"
          label="章节名称"
          min-width="90"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="{ row }">
            <el-button type="text" @click="toClassVideo(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getVideoUsingDetail } from "@/api/sou";
export default {
  name: "UsageTimesDialog",
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
      listData: [],
      listLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    toClassVideo(row) {
      this.visible = false;
      this.$router.push({
        name: "classVideo",
        query: { id: row.classroom_id, chapterName: row.chapter_name },
      });
    },
    handleOpen() {
      this.getVideoUsingDetail();
    },
    async getVideoUsingDetail() {
      const data = {
        id: this.id,
      };
      this.listLoading = true;
      const res = await getVideoUsingDetail(data);
      this.listLoading = false;
      this.listData = res.data.list;
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>