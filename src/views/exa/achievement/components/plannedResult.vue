<template>
  <section>
    <header>
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
    </header>

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
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        class="min_table"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>

        <el-table-column
          prop="plan_name"
          label="考试计划"
          min-width="240"
          column-key="course_id"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_start_time"
          label="考试日期"
          min-width="200"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <div v-if="row.exam_start_time == row.exam_end_time">
              {{ row.exam_end_time }}
            </div>
            <span v-else>{{
              row.exam_start_time + " 至 " + row.exam_end_time
            }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="enroll_num"
          label="报考人数"
          min-width="80"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          label="登记人数"
          prop="grade_num"
          min-width="100"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toAchieveDetail(row)"
                >成绩详情</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { cloneOptions } from "@/utils/index";
import { getPlanList } from "@/api/exa";
import { getCateList } from "@/api/sou";

export default {
  data() {
    return {
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
          },
        },
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            checkStrictly: true,
            placeholder: "所属分类",
            clearable: true,
            options: [],
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学员姓名/手机号码",
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
        date: "",
        search_box: "",
      },
    };
  },
  created() {
    this.getPlanList();
    this.getCateList();
  },
  methods: {
    toAchieveDetail(ab) {
      console.log(ab.id);
      this.$router.push({
        path: "/exa/achieveDetails",
        query: {
          id: ab.id,
        },
      });
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getPlanList();
    },
    handleSearch(data) {
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.category_id?.pop() || 0,
        exam_start_time: times[0],
        exam_end_time: times[1],
      };
      this.getPlanList();
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取教材分类
    async getPlanList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getPlanList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}
.table_bottom {
  text-align: right;
}
</style>
