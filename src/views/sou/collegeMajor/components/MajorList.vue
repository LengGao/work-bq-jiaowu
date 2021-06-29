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
          prop="uid"
          label="ID"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="学历形式"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="排序"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              v-model="row.sort"
              placeholder="请输入"
              maxlength="10"
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
              v-if="row.free"
              v-model="row.free"
              :active-value="2"
              :inactive-value="1"
            >
            </el-switch>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="140">
          <template slot-scope="{ row }">
            <div style="display: flex; justify-content: center">
              <el-button type="text" @click="openEdit(row.id)">编辑</el-button>
              <el-button type="text">删除</el-button>
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
    <EditMajorDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
    />
  </div>
</template>

<script>
import EditMajorDialog from "./EditMajorDialog";
export default {
  name: "EducationType",
  components: {
    EditMajorDialog,
  },
  data() {
    return {
      searchOptions: [
        {
          key: "student_type",
          type: "select",
          options: [],
          attrs: {
            placeholder: "学历形式",
            clearable: true,
          },
        },
        {
          key: "院校名称",
          type: "select",
          options: [],
          attrs: {
            placeholder: "学历形式",
            clearable: true,
          },
        },
        {
          key: "层次名称",
          type: "select",
          options: [],
          attrs: {
            placeholder: "学历形式",
            clearable: true,
          },
        },
        {
          key: "专业名称",
          type: "select",
          options: [],
          attrs: {
            placeholder: "学历形式",
            clearable: true,
          },
        },
      ],
      searchData: {
        keyword: "",
      },
      listData: [{ id: 1 }],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      //添加、编辑
      currentId: "",
      dialogTitle: "添加院校专业",
      dialogVisible: false,
    };
  },
  methods: {
    openEdit(id) {
      this.dialogTitle = "编辑院校专业";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加院校专业";
      this.dialogVisible = true;
    },
    handleSearch() {
      this.pageNum = 1;
    },
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handlePageChange(val) {
      this.pageNum = val;
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