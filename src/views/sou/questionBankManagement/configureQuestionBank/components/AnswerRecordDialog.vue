<template>
  <el-dialog
    title="考试记录"
    :visible.sync="visible"
    width="900px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="$emit('input', false)"
    top="10vh"
  >
    <!--答题记录-->
    <div class="userTable">
      <el-table
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        :header-cell-style="{ 'text-align': 'center' }"
        height="500"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="nickname"
          label="学员姓名"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="130"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile || ''" />
          </template>
        </el-table-column>
        <el-table-column
          prop="mark"
          label="考试成绩"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="use_time"
          label="考试用时"
          min-width="100"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="test_time"
          label="考试时间"
          min-width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column label="操作" min-width="100" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" @click="openDetail(row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        @pageChange="handlePageChange"
      />
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="exportQuestion">导 出</el-button>
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
    <a href="" ref="download" download=""></a>
    <AnswerRecordDetailDialog
      v-model="AnswerRecordDetailDialogVisible"
      :id="currentId"
    />
  </el-dialog>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { exportQuestion, getResults } from "@/api/sou";
import AnswerRecordDetailDialog from "./AnswerRecordDetailDialog";
export default {
  name: "AnswerRecordDialog",
  props: {
    chapterId: {
      type: [String, Number],
      default: "",
    },
    value: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    PartiallyHidden,
    AnswerRecordDetailDialog,
  },
  data() {
    return {
      visible: this.value,
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      AnswerRecordDetailDialogVisible: false,
      currentId: "",
    };
  },
  watch: {
    value(val) {
      val && (this.visible = val);
    },
  },
  methods: {
    openDetail(id) {
      this.currentId = id;
      this.AnswerRecordDetailDialogVisible = true;
    },
    hanldeCancel() {
      this.visible = false;
    },
    handleOpen() {
      this.getResults();
    },
    async exportQuestion() {
      const data = { chapter_id: this.chapterId };
      const res = await exportQuestion(data);
      if (res.code === 0) {
        this.$refs.download.href = res.data.url;
        this.$refs.download.click();
      }
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getResults();
    },
    async getResults() {
      const data = {
        chapter_id: this.chapterId,
        page: this.pageNum,
      };
      this.listLoading = true;
      const res = await getResults(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="less" scoped>
.actions {
  text-align: right;
  margin-bottom: 16px;
}
</style>