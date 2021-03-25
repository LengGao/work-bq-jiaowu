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
          prop="classroom_id"
        >
        </el-table-column>
        <el-table-column
          prop="classroom_name"
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
          prop="project_name"
          label="科目性质"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="staff_name"
          label="试卷满分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="最高成绩"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="考试状态"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
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
            @pageChange="getClassList"
          />
        </div>
      </div>
    </div>
    <HistoricalAchievements v-model="dialogVisible" :id="currentId" />
  </div>
</template>

<script>
import HistoricalAchievements from "./HistoricalAchievements";
import { getClassList } from "@/api/eda";
export default {
  name: "AchievementStatistics",
  components: {
    HistoricalAchievements,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        category_id: [],
        project_id: "",
        keyboard: "",
      },
      searchOptions: [
        {
          key: "project_id",
          type: "select",
          options: [],
          attrs: {
            placeholder: "科目性质",
            clearable: true,
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          attrs: {
            placeholder: "考试状态",
            clearable: true,
          },
        },
        {
          key: "keyboard",
          attrs: {
            placeholder: "考试科目名称",
          },
        },
      ],
      dialogVisible: false,
      currentId: "",
    };
  },
  created() {
    this.getClassList();
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
      };
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },
    async getClassList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang='scss' scoped>
.achievement-statistics {
}
</style>