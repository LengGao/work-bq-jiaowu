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
          prop="user_realname"
          label="学生姓名"
          show-overflow-tooltip
          min-width="80"
        ></el-table-column>

        <el-table-column
          prop="telphone"
          label="手机号码"
          min-width="100"
          column-key="course_id"
          show-overflow-tooltip
        ></el-table-column>

        <el-table-column
          prop="create_time"
          label="注册时间"
          min-width="200"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="项目名称"
          min-width="300"
          prop="project"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          label="报考科目"
          min-width="150"
          prop="subject_count"
          show-overflow-tooltip
        >
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="200">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="toAllResults(row.uid)"
                >全部成绩</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <el-button @click="exportData">导出数据</el-button>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getGradeListByUser,
  exportUserGrade,
  getProjectSelect,
  getClassRoomSelect,
} from "@/api/exa";
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
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目",
            clearable: true,
          },
        },
        {
          key: "class_id",
          type: "select",
          options: [],
          optionValue: "classroom_id",
          optionLabel: "classroom_name",
          attrs: {
            placeholder: "所属班级",
            clearable: true,
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "学生姓名/手机号码",
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        type: 0,
        date: "",
        project_id: "",
        class_id: "",
        search_box: "",
      },
    };
  },
  created() {
    this.getGradeListByUser();
    this.getProjectSelect();
    this.getClassRoomSelect();
  },
  methods: {
    exportData() {
      this.exportUserGrade();
    },
    toAllResults(uid) {
      this.$router.push({
        path: "/exa/allResult",
        query: {
          uid: uid,
        },
      });
    },
    // 导出成绩按学员
    async exportUserGrade() {
      const data = {
        ...this.searchData,
      };
      console.log(this.searchData);
      const res = await exportUserGrade(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 获取班级下拉
    async getClassRoomSelect(category_id) {
      const data = { category_id };
      const res = await getClassRoomSelect(data);
      if (res.code === 0) {
        this.classOptions = res.data;
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取项目下拉
    async getProjectSelect(category_id = "") {
      const data = {
        category_id,
      };
      const res = await getProjectSelect(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
      }
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getGradeListByUser();
    },
    handleSearch(data) {
      console.log(data);
      const times = data.date || ["", ""];
      delete data.date;
      this.pageNum = 1;
      this.searchData = {
        ...data,
        start_time: times[0],
        end_time: times[1],
      };
      this.getGradeListByUser();
    },

    // 获学员列表
    async getGradeListByUser() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      delete data.date;
      this.listLoading = true;
      const res = await getGradeListByUser(data);
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
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
