<template>
  <div class="learning-track">
    <!--学习轨迹-->
    <div class="userTable">
      <el-table
        ref="multipleTable"
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        style="width: 100%"
        class="min_table"
        :header-cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="description"
          label="操作详情"
          min-width="300"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        :="10"
        @pageChange="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { studentBehaviorRecord } from "@/api/eda";
export default {
  name: "learningTrack",
  props: {
    uid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
    };
  },
  created() {
    this.studentBehaviorRecord();
  },
  methods: {
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.studentBehaviorRecord();
    },
    async studentBehaviorRecord() {
      const data = {
        uid: this.uid,
        page: this.pageNum,
      };
      this.listLoading = true;
      const res = await studentBehaviorRecord(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style>
</style>