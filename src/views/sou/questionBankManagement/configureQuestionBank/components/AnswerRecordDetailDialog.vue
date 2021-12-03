<template>
  <el-dialog
    title="考试详情"
    :visible.sync="visible"
    width="80%"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="$emit('input', false)"
    top="10vh"
    append-to-body
    class="test-detail"
  >
    <div class="test-info">
      <div class="test-info-item">
        <span class="name">试卷名称</span>
        <span class="value">{{ questionData.chapter_name }}</span>
      </div>
      <div class="test-info-item">
        <span class="name">学生姓名</span>
        <span class="value">{{ questionData.nickname }}</span>
      </div>
      <div class="test-info-item">
        <span class="name">考试成绩</span>
        <span class="value">{{ questionData.mark }}</span>
      </div>
      <div class="test-info-item">
        <span class="name">考试用时</span>
        <span class="value">{{ questionData.use_time }}</span>
      </div>
      <div class="test-info-item">
        <span class="name">考试时间</span>
        <span class="value">{{ questionData.test_time }}</span>
      </div>
    </div>
    <div class="userTable">
      <el-table
        :data="listData"
        tooltip-effect="light"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        stripe
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#F8F8F8',
        }"
        height="550"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="90"
        ></el-table-column>
        <el-table-column
          prop="topic_description"
          label="题干"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span
              v-html="row.topic_description"
              class="topic-description"
            ></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="题型"
          min-width="90"
          align="center"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="true_answer"
          label="正确答案"
          min-width="80"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="user_answer"
          label="用户答案"
          min-width="80"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="mark"
          label="得分"
          min-width="80"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="answer_time"
          label="答题时间"
          min-width="160"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="options_A"
          label="选项A"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-html="row.options_A"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_B"
          label="选项B"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-html="row.options_B"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_C"
          label="选项C"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-html="row.options_C"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_D"
          label="选项D"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-html="row.options_D"></span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_E"
          label="选项E"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.options_E" v-html="row.options_E"></span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_F"
          label="选项F"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.options_F" v-html="row.options_F"></span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="options_G"
          label="选项G"
          min-width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span v-if="row.options_G" v-html="row.options_G"></span>
            <span v-else>无</span>
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
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getResultsDetail } from "@/api/sou";
export default {
  name: "AnswerRecordDetailDialog",
  props: {
    id: {
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
  },
  data() {
    return {
      visible: this.value,
      listData: [],
      listLoading: false,
      questionData: {},
    };
  },
  watch: {
    value(val) {
      val && (this.visible = val);
    },
  },
  methods: {
    hanldeCancel() {
      this.visible = false;
    },
    handleOpen() {
      this.getResultsDetail();
    },
    async getResultsDetail() {
      const data = {
        id: this.id,
      };
      this.listLoading = true;
      const res = await getResultsDetail(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.questionData = res.data.data;
    },
  },
};
</script>

<style lang="less" >
.test-detail {
  .el-dialog__body {
    padding-top: 10px;
  }
  .test-info {
    display: flex;
    align-items: center;
    &-item {
      margin-right: 30px;
      padding: 16px 0;
      .name {
        color: #909399;
        margin-right: 8px;
      }
      .value {
        color: #666;
      }
    }
  }
  .topic-description img {
    height: 40px;
  }
}
</style>
