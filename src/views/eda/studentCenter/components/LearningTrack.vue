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
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          label="序号"
          type="index"
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="create_time"
          label="操作时间"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="description"
          label="操作详情"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
      </el-table>
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
    };
  },
  created() {
    this.studentBehaviorRecord();
  },
  methods: {
    linkTo(id) {
      console.log(id);
    },
    //教材发放列表
    async studentBehaviorRecord() {
      const data = {
        uid: this.uid,
      };
      this.listLoading = true;
      const res = await studentBehaviorRecord(data);
      this.listLoading = false;
      this.listData = res.data.list;
    },
  },
};
</script>

<style>
</style>