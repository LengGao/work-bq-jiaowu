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
    <h4 class="table-title">班级引用：</h4>
    <div class="table">
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
    <h4 class="table-title">课程引用：</h4>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="courseImportData"
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
      >
        <el-table-column
          prop="course_name"
          label="课程名称"
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
            <el-button type="text" @click="toConfigureCourses(row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <h4 class="table-title">公开课引用：</h4>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="publicImportData"
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
      >
        <el-table-column
          prop="live_class_name"
          label="公开课名称"
          min-width="300"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="100">
          <template slot-scope="{ row }">
            <el-button type="text" @click="toClassVideo(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
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
      courseImportData: [],
      publicImportData: [],
      listLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    toConfigureCourses(row) {
      this.visible = false;
      this.$router.push({
        path: "/sou/configureCourses",
        query: {
          chapter_name: row.chapter_name,
          course_name: row.course_name,
          course_id: row.course_id,
        },
      });
    },
    toClassVideo(row) {
      this.visible = false;
      this.$router.push({
        name: "classVideo",
        query: {
          id: row.classroom_id,
          chapterName: row.chapter_name,
          classRoomName: row.classroom_name,
        },
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
      this.listData = res.data.classroom_using_list;
      this.courseImportData = res.data.course_using_list;
      this.publicImportData = res.data.public_class_using_list;
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-title {
  margin-bottom: 16px;
}
.table {
  margin-bottom: 16px;
}
</style>