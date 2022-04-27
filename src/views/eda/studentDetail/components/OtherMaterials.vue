<template>
  <div class="other-materials">
    <div class="header">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <el-button type="primary" @click="openAdd">上传资料</el-button>
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
        height="570"
      >
        <el-table-column
          label="资料编号"
          show-overflow-tooltip
          min-width="90"
          prop="id"
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
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="160">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="handleOpenInWindow(row)"
                >预览</el-button
              >
              <el-button type="text" @click="openEdit(row.id, row.file_name)"
                >编辑</el-button
              >
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
    <OtherMaterialsDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :file-name="currentName"
       :uid="uid"
      @on-success="getUserFileList"
    />
  </div>
</template>

<script>
import OtherMaterialsDialog from "./OtherMaterialsDialog";
import { getUserFileList, deleteUserFile } from "@/api/eda";
export default {
  name: "OtherMaterials",
  components: {
    OtherMaterialsDialog,
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
        search_box: "",
      },
      searchOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "资料名称",
          },
        },
      ],
      currentId: "",
      currentName: "",
      dialogTitle: "上传资料",
      dialogVisible: false,
    };
  },

  created() {
    this.getUserFileList();
  },

  methods: {
    async handleOpenInWindow(row) {
      window.open(row.oss_url);
    },
    // 删除课程资料
    deleteConfirm(id) {
      this.$confirm("确定要删除此资料吗?", { type: "warning" })
        .then(() => {
          this.deleteUserFile(id);
        })
        .catch(() => {});
    },
    async deleteUserFile(id) {
      const data = {
        id,
      };
      const res = await deleteUserFile(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUserFileList();
      }
    },
    openEdit(id, name) {
      this.dialogTitle = "编辑资料";
      this.currentId = id;
      this.currentName = name;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.currentName = "";
      this.dialogTitle = "添加资料";
      this.dialogVisible = true;
    },
    // 搜索
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getUserFileList();
    },
    // 分页
    handlePageChange(val) {
      this.pageNum = val;
      this.getUserFileList();
    },
    // 课程资料列表
    async getUserFileList() {
      const data = {
        uid: this.uid,
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getUserFileList(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        loading: false,
      }));
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.other-materials {
  /deep/.el-table__header th,
  .el-table__header tr {
    background-color: #f8f8f8;
    color: #909399;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .userTable {
    margin-top: 20px;
  }
}
</style>
