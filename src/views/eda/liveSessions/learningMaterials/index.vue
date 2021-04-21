<template>
  <div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="openAdd">添加资料</el-button>
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
            min-width="70"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            prop="data_name"
            label="资料名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="extension"
            label="文件格式"
            min-width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="size"
            label="文件大小"
            min-width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="140">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="openEdit(row.id)"
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
      <!-- 弹框 -->
      <LearningMaterialsDialog
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        @on-success="getLiveDataList"
      />
    </section>
  </div>
</template>

<script>
import { getLiveDataList, deleteLiveData } from "@/api/eda";
import LearningMaterialsDialog from "./components/LearningMaterialsDialog";
export default {
  components: {
    LearningMaterialsDialog,
  },
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
            placeholder: "资料名称",
          },
        },
      ],
      currentId: "",
      dialogVisible: false,
      dialogTitle: "",
      typeOptions: [],
    };
  },

  created() {
    this.getLiveDataList();
  },
  methods: {
    // 删除资料
    deleteConfirm(id) {
      this.$confirm("确定要删除此资料吗?", { type: "warning" })
        .then(() => {
          this.deleteLiveData(id);
        })
        .catch(() => {});
    },
    async deleteLiveData(id) {
      const data = { id };
      const res = await deleteLiveData(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getLiveDataList();
      }
    },

    openEdit(id) {
      this.currentId = id;
      this.dialogTitle = "编辑资料";
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加资料";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getLiveDataList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getLiveDataList();
    },

    async getLiveDataList() {
      const data = {
        live_id: this.$route.query.live_id || "",
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getLiveDataList(data);
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
.table_bottom {
  text-align: right;
}
</style>
