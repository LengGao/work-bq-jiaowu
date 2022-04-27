<template>
  <div class="education-type">
    <!--搜索模块-->
    <div class="education-type-header">
      <SearchList
        :options="searchOptions"
        :data="searchData"
        @on-search="handleSearch"
      />
      <div class="actions">
        <el-button type="primary" @click="openAdd">添加</el-button>
      </div>
    </div>

    <!--列表-->
    <div class="userTable">
      <el-table
        :data="listData"
        v-loading="listLoading"
        element-loading-text="loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="#fff"
        tooltip-effect="light"
        stripe
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
      >
        <el-table-column
          prop="id"
          label="ID"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="院校名称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              @mousewheel.native.prevent
              v-model="row.sort"
              placeholder="请输入"
              maxlength="10"
              size="small"
              style="width: 100px"
              @blur="updateUniversitySort(row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="student_number"
          label="是否启用"
          min-width="110"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <el-switch
              @change="updateUniversityStatus(row)"
              v-model="row.status"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="140">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openEdit(row.id)">编辑</el-button>
              <el-button type="text" @click="delConfirm(row.id)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table_bottom">
      <page
        :data="listTotal"
        :curpage="pageNum"
        @pageSizeChange="handleSizeChange"
        @pageChange="handlePageChange"
      />
    </div>
    <UniversityConfigureDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getUniversityList"
    />
  </div>
</template>

<script>
import UniversityConfigureDialog from "./UniversityConfigureDialog.vue";
import {
  getUniversityList,
  delUniversity,
  updateUniversityStatus,
  updateUniversitySort,
} from "@/api/sou";
export default {
  name: "UniversityConfigure",
  components: {
    UniversityConfigureDialog,
  },
  data() {
    return {
      searchOptions: [
        {
          key: "keyword",
          attrs: {
            placeholder: "院校名称",
          },
        },
      ],
      searchData: {
        keyword: "",
      },
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      //添加、编辑
      currentId: "",
      dialogTitle: "添加院校",
      dialogVisible: false,
    };
  },
  created() {
    this.getUniversityList();
  },
  methods: {
    //删除
    delConfirm(id) {
      this.$confirm("确定要删除此院校吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.delUniversity(id);
        })
        .catch(() => {});
    },
    async delUniversity(id) {
      const data = { id };
      const res = await delUniversity(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUniversityList();
      }
    },
    // 修改排序
    async updateUniversitySort(row) {
      const data = {
        id: row.id,
        sort: row.sort,
      };
      const res = await updateUniversitySort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUniversityList();
      }
    },
    // 修改状态
    async updateUniversityStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateUniversityStatus(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    openEdit(id) {
      this.dialogTitle = "编辑院校";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加院校";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = { ...data };
      this.getUniversityList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getUniversityList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getUniversityList();
    },
    // 获取列表
    async getUniversityList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getUniversityList(data);
      this.listLoading = false;
      if (res.code === 0) {
        this.listData = res.data.list;
        this.listTotal = res.data.total;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.education-type {
  &-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>