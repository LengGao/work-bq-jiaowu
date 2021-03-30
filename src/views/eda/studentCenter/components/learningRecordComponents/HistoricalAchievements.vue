<template>
  <!--历史成绩-->
  <el-dialog
    title="历史成绩"
    :visible.sync="visible"
    width="900px"
    top="30px"
    @open="handleOpen"
    @closed="hanldeCancel"
    class="historical-achievements"
  >
    <div class="info">
      <span>学生姓名：{{ historyData.user_realname }}</span>
      <span>考试科目：{{ historyData.subject_name }}</span>
      <span>试卷满分：{{ historyData.total_score }}</span>
    </div>
    <el-table
      ref="multipleTable"
      :data="historyData.list"
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
        v-for="(item, index) in historyData.title_field"
        :key="index"
        :label="item.title"
        :min-width="item.prop === 'update_time' ? 140 : 110"
        show-overflow-tooltip
      >
        <template slot-scope="{ row }">
          <span
            :style="{ color: examMap[row.exam_result].color }"
            v-if="item.prop === 'exam_result_name'"
            >{{ examMap[row.exam_result].text }}</span
          >
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer">
      <el-button @click="hanldeCancel">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getHistoryGradeList } from "@/api/eda";
export default {
  name: "HistoricalAchievements",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: [String, Number],
      default: "",
    },
    sid: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      historyData: {
        list: [],
        title_field: [],
      },
      listLoading: false,
      examMap: {
        1: {
          text: "合格",
          color: "#43D152",
        },
        2: {
          text: "不合格",
          color: "#FD6500",
        },
        3: {
          text: "已过期",
          color: "#909399",
        },
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getHistoryGradeList();
    },

    //仓库教材
    async getHistoryGradeList() {
      const data = {
        uid: this.uid,
        sid: this.sid,
      };
      this.listLoading = true;
      const res = await getHistoryGradeList(data).catch(() => {
        this.listLoading = false;
      });
      this.listLoading = false;
      if (res.code === 0) {
        this.historyData = res.data;
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
  /deep/.el-dialog__body {
    min-height: 400px;
  }
  .info {
    margin-bottom: 16px;
    span {
      margin-right: 30px;
    }
  }
}
</style>