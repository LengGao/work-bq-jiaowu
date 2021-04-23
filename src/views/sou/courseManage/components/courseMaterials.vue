<template>
  <!-- 课程资料列表 -->
  <div class="rule">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="openAdd">添加课程资料</el-button>
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
        <el-table-column width="50" type="selection"> </el-table-column>
        <el-table-column
          label="资料编号"
          show-overflow-tooltip
          min-width="90"
          prop="course_file_id"
        >
        </el-table-column>
        <el-table-column
          prop="file_name"
          label="资料名称"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="suffix"
          label="文件格式"
          min-width="110"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="size"
          label="文件大小"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>{{ row.size | filterFileSize }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button
                type="text"
                :loading="row.loading"
                @click="handleDownload(row)"
                >下载</el-button
              >
              <el-button type="text" @click="openEdit(row.course_file_id)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteConfirm(row.course_file_id)"
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
    <CourseMaterialsDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getCourseMaterialList"
    />
  </div>
</template>

<script>
import { downloadBaseUrl } from "@/api/eda";
import { download } from "@/utils/index";
import CourseMaterialsDialog from "./courseMaterialsDialog";
import { getCourseMaterialList, deleteCourseMaterial } from "@/api/sou";
export default {
  name: "courseMaterials",
  components: {
    CourseMaterialsDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        cate_id: [],
        fileName: "",
      },
      searchOptions: [
        {
          key: "fileName",
          attrs: {
            placeholder: "资料名称",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加资料",
      dialogVisible: false,
    };
  },

  created() {
    this.getCourseMaterialList();
  },

  methods: {
    async handleDownload(row) {
      row.loading = true;
      download(row.oss_url, row.file_name + "." + row.suffix);
      row.loading = false;
    },
    // 删除课程资料
    deleteConfirm(id) {
      this.$confirm("确定要删除此资料吗?", { type: "warning" })
        .then(() => {
          this.deleteCourseMaterial(id);
        })
        .catch(() => {});
    },
    async deleteCourseMaterial(course_file_id) {
      const data = {
        course_file_id,
      };
      const res = await deleteCourseMaterial(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getCourseMaterialList();
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑资料";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加资料";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getCourseMaterialList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getCourseMaterialList();
    },
    // 课程资料列表
    async getCourseMaterialList() {
      const data = {
        course_id: this.$route.query?.course_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getCourseMaterialList(data);
      this.listLoading = false;
      this.listData = res.data.data.map((item) => ({
        ...item,
        loading: false,
      }));
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.rule {
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
.table_bottom {
  text-align: right;
}
</style>
