<template>
  <!-- 考试科目 -->
  <div class="subject">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="openAdd">添加科目</el-button>
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
          label="ID"
          show-overflow-tooltip
          min-width="90"
          prop="id"
        >
        </el-table-column>
        <el-table-column
          prop="category_name"
          label="所属分类"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="subject_name"
          label="考试科目"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="exam_type"
          label="科目性质"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="total_score"
          label="考试总分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pass_score"
          label="合格分数"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="credit_hour"
          label="科目学分"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="cost"
          label="补考费用"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="student_number"
          label="是否启用"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              @change="updateSubjectStatus(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="deleteConfirm(row.id)"
                >删除</el-button
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
    <SubjectDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :typeOptions="typeOptions"
      :id="currentId"
      @on-success="getSubjectList"
    />
  </div>
</template>

<script>
import SubjectDialog from "./SubjectDialog";

import { getSubjectList, deleteSubject, updateSubjectStatus } from "@/api/exa";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "Subject",
  components: {
    SubjectDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
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
          key: "search_box",
          attrs: {
            placeholder: "考试科目名称",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加科目",
      dialogVisible: false,
      typeOptions: [],
    };
  },

  created() {
    this.getSubjectList();
    this.getCateList();
  },

  methods: {
    //修改科目状态
    async updateSubjectStatus(row) {
      const data = {
        id: row.id,
        status: row.status ? 1 : 0,
      };
      const res = await updateSubjectStatus(data);
      if (res.code === 0) {
        row.status = row.status ? 1 : 0;
        this.$message.success(res.message);
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑科目";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加科目";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        cate_id: data.cate_id.pop(),
      };
      this.getSubjectList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getSubjectList();
    },
    // 删除科目
    deleteConfirm(id) {
      this.$confirm("确定要删除此科目吗?", { type: "warning" })
        .then(() => {
          this.deleteSubject(id);
        })
        .catch(() => {});
    },
    async deleteSubject(id) {
      const data = {
        id,
      };
      const res = await deleteSubject(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getSubjectList();
      }
    },
    // 科目列表
    async getSubjectList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getSubjectList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.typeOptions = cloneOptions(
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

<style lang="scss" scoped>
.subject {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .client_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userTable {
    margin-top: 20px;
  }
}
</style>
