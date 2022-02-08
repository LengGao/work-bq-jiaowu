<template>
  <section>
    <div class="head_remind">*方便教务按届别来管理学员</div>
    <div class="mainPart">
      <!--搜索模块-->
      <header>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="openAddDialog()"
            >添加届别</el-button
          >
        </div>
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
        >
          <el-table-column type="selection" width="45"> </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            show-overflow-tooltip
            width="70"
          >
          </el-table-column>
          <el-table-column
            prop="title"
            label="届别名称"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            width="200"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.sort"
                class="input"
                maxlength="30"
                placeholder="请输入排序"
                @blur="handleUpdateSort(row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="160">
            <template slot-scope="{ row }">
              <el-button type="text" @click="delConfirm(row.id)"
                >删除</el-button
              >
              <el-button type="text" @click="openAddDialog(row)"
                >编辑</el-button
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
    </div>
    <AddGrade
      v-model="dialogVisible"
      :edit-data="editData"
      @success="getGradeList"
    />
  </section>
</template>

<script>
import AddGrade from "./components/AddGrade";
import { getGradeList, delGrade, updateGrade } from "@/api/sou";
export default {
  name: "eduOpenClass",
  components: {
    AddGrade,
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
            placeholder: "届别名称",
          },
        },
      ],
      dialogVisible: false,
      editData: {},
    };
  },
  activated() {
    this.getGradeList();
  },
  created() {
    this.getGradeList();
  },
  methods: {
    // 添加，编辑
    openAddDialog(row = {}) {
      this.editData = row;
      this.dialogVisible = true;
    },
    // 删除
    delConfirm(id) {
      this.$confirm("确定要删除该届别吗？", "提醒", {
        type: "warning",
      })
        .then(() => {
          this.delGrade(id);
        })
        .catch(() => {});
    },
    async delGrade(id) {
      const data = { id };
      const res = await delGrade(data);
      if (res.code === 0) {
        this.getGradeList();
      }
    },
    // 修改排序
    async handleUpdateSort({ id, title, sort }) {
      const data = {
        id,
        title,
        sort,
      };
      const res = await updateGrade(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getGradeList();
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getGradeList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.pageNum = 1;
      this.getGradeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getGradeList();
    },
    async getGradeList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getGradeList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.mainPart {
  padding: 20px;
}
header {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
}
</style>

