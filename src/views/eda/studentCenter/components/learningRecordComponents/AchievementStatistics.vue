<template>
  <div class="achievement-statistics">
    <Title text="成绩统计" />
    <SearchList
      :options="searchOptions"
      :data="searchData"
      @on-search="handleSearch"
    />
    <!--表格-->
    <div class="userTable">
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
          label="ID"
          show-overflow-tooltip
          min-width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="subject_name"
          label="考试科目"
          min-width="110"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_type_name"
          label="科目性质"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_score"
          label="试卷满分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="max_score"
          label="最高成绩"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_result"
          label="考试状态"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span :style="{ color: examMap[row.exam_result].color }">{{
              examMap[row.exam_result].text
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div>
              <el-button type="text" @click="openDialog(row.id)"
                >历史成绩</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
    <HistoricalAchievements
      v-model="dialogVisible"
      :sid="currentId"
      :uid="uid"
    />
  </div>
</template>

<script>
import HistoricalAchievements from "./HistoricalAchievements";
import { getSubjectListByUser } from "@/api/eda";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "AchievementStatistics",
  components: {
    HistoricalAchievements,
  },
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
      searchData: {
        cate_id: [],
        exam_type: "",
        search_box: "",
      },
      searchOptions: [
        {
          key: "cate_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            clearable: true,
            options: [],
          },
        },
        {
          key: "exam_type",
          type: "select",
          options: [
            {
              label: "必考",
              value: 1,
            },
            {
              label: "选考",
              value: 2,
            },
          ],
          attrs: {
            placeholder: "科目性质",
            clearable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "考试科目名称",
          },
        },
      ],
      dialogVisible: false,
      currentId: "",
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
  created() {
    this.getCateList();
    this.getSubjectListByUser();
  },
  methods: {
    openDialog(id) {
      this.currentId = id;
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.cate_id.pop(),
      };
      this.getSubjectListByUser();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getSubjectListByUser();
    },
    async getSubjectListByUser() {
      const data = {
        uid: this.uid,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getSubjectListByUser(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.achievement-statistics {
}
</style>