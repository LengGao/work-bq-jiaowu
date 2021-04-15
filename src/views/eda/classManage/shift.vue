<template>
  <div>
    <div class="head_remind">
      *本模块展示所有的班级数据，方便教务老师管理班级的日常工作。
    </div>

    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>
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
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column
            label="编号"
            show-overflow-tooltip
            min-width="90"
            prop="classroom_id"
          >
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="班级名称"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="staff_name"
            label="班主任"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="student_number"
            label="班级人数"
            min-width="110"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="项目名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="batchConfirm(row.classroom_id)"
                  >转至此班</el-button
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
  </div>
</template>

<script>
import { getClassList, batchchangestudents } from "@/api/eda";
export default {
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        keyword: "",
      },
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "班级名称、班主任",
          },
        },
      ],
    };
  },

  created() {
    this.getClassList();
  },

  methods: {
    // 批量转班
    batchConfirm(id) {
      this.$confirm("确定要将学生转至此班吗?", { type: "warning" })
        .then(() => {
          this.batchchangestudents(id);
        })
        .catch(() => {});
    },
    async batchchangestudents(new_classroom_id) {
      const query = JSON.parse(this.$route.query?.json || "{}");
      const data = {
        ...query,
        new_classroom_id,
      };
      const res = await batchchangestudents(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$router.back();
      }
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

<style lang="scss" scoped>
/deep/.el-table__header th,
.el-table__header tr {
  background-color: #f8f8f8;
  color: #909399;
}

.main {
  padding: 20px;
  margin: 20px;
  background: #fff;
}
.head_remind {
  padding: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #909399;
  width: 100%;
  border-bottom: 15px solid #f2f6fc;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userTable {
  margin-top: 20px;
}
</style>
