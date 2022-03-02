<template>
  <div class="institution-user-manage">
    <div class="client_head">
      <!--搜索模块-->
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div>
        <el-button type="primary" @click="handleAdd">添加用户</el-button>
      </div>
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
      >
        <el-table-column
          label="用户ID"
          show-overflow-tooltip
          min-width="70"
          align="center"
          prop="id"
        >
        </el-table-column>

        <el-table-column
          prop="nickname"
          label="用户姓名"
          min-width="160"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号码"
          min-width="140"
          align="center"
        >
          <template slot-scope="{ row }">
            <PartiallyHidden :value="row.mobile" />
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          min-width="140"
          align="center"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          label="是否超管"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.is_master"
              active-color="#2798ee"
              inactive-color="#eaeefb"
              :active-value="1"
              :inactive-value="0"
              @change="modifyInstitutionUserOther(row, 'is_master')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="账号状态"
          align="center"
          min-width="100"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.status"
              active-color="#2798ee"
              inactive-color="#eaeefb"
              :active-value="1"
              :inactive-value="0"
              @change="modifyInstitutionUserOther(row, 'status')"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="160"
        >
          <template slot-scope="{ row }">
            <el-button type="text" @click="handleEdit(row.id)">编辑</el-button>
            <el-button type="text" @click="deleteConfirm(row, 'is_deleted')"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="table_bottom">
        <page
          :data="listTotal"
          :curpage="pageNum"
          @pageChange="handlePageChange"
          @pageSizeChange="handleSizeChange"
        />
      </div>
    </div>
    <InstitutionUserDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getInstitutionUserList"
    />
  </div>
</template>

<script>
import InstitutionUserDialog from "./components/InstitutionUserDialog";
import {
  getInstitutionUserList,
  modifyInstitutionUserOther,
} from "@/api/institution";
export default {
  name: "institutionUser",
  components: {
    InstitutionUserDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        search_box: "",
      },
      searchOptions: [
        {
          key: "search_box",
          attrs: {
            placeholder: "用户姓名",
          },
        },
      ],
      dialogVisible: false,
      dialogTitle: "",
      currentId: "",
    };
  },

  created() {
    this.getInstitutionUserList();
  },
  methods: {
    // 删除用户
    deleteConfirm(...params) {
      this.$confirm("确定要删除此用户吗?", { type: "warning" })
        .then(() => {
          this.modifyInstitutionUserOther(...params);
        })
        .catch(() => {});
    },
    async modifyInstitutionUserOther(row, type) {
      const data = {
        keyword: type,
        state: row[type] || +(type === "is_deleted"),
        id: row.id,
      };
      const res = await modifyInstitutionUserOther(data).catch(() => {
        row[type] = row[type] === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
        type === "is_deleted" && this.getInstitutionUserList();
      }
    },
    handleEdit(id) {
      this.currentId = id;
      this.dialogTitle = "编辑用户";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加用户";
      this.dialogVisible = true;
    },
    toDetails(row) {
      this.$router.push({
        name: "institutionDetails",
        query: {
          id: row.id,
        },
      });
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getInstitutionUserList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getInstitutionUserList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getInstitutionUserList();
    },
    async getInstitutionUserList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        institution_id: this.$route.query.institution_id || "",
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getInstitutionUserList(data);
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
.institution-user-manage {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
