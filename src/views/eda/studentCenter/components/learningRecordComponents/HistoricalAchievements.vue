<template>
  <!--历史成绩-->
  <el-dialog
    title="历史成绩"
    :visible.sync="visible"
    width="700px"
    top="30px"
    @open="handleOpen"
    @closed="hanldeCancel"
    class="historical-achievements"
  >
    <div class="info">
      <span>考试科目：发达范德萨范德萨范德萨怪怪的</span>
      <span>试卷满分：100</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="listData"
      style="width: 100%"
      class="min_table"
      v-loading="listLoading"
      element-loading-text="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="#fff"
      :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column
        prop="classroom_name"
        label="更新时间"
        min-width="110"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="考试性质"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="project_name"
        label="单选题"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="staff_name"
        label="多选题"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="student_number"
        label="考试总分"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="student_number"
        label="成绩状态"
        min-width="110"
        show-overflow-tooltip
      ></el-table-column>
    </el-table>
    <span slot="footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getstoragebook } from "@/api/sou";
export default {
  name: "HistoricalAchievements",
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
    handleOpen() {
      this.getstoragebook();
    },

    //仓库教材
    async getstoragebook() {
      const data = {};
      this.listLoading = true;
      const res = await getstoragebook(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.data;
      }
    },

    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.historical-achievements {
  .info {
    margin-bottom: 10px;
    span {
      margin-right: 30px;
    }
  }
}
</style>