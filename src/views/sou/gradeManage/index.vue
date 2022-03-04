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
            prop="category_name"
            label="所属分类"
            min-width="200"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_count"
            label="关联订单数"
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
      :category-options="categoryOptions"
      @success="getGradeList"
    />
  </section>
</template>

<script>
import AddGrade from "./components/AddGrade";
import { getGradeList, delGrade, updateGrade, getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "gradeManage",
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
        category_id: [],
      },
      searchOptions: [
        {
          key: "category_id",
          type: "cascader",
          attrs: {
            placeholder: "所属分类",
            props: { checkStrictly: true },
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "search_box",
          attrs: {
            placeholder: "届别名称",
          },
        },
      ],
      dialogVisible: false,
      editData: {},
      categoryOptions: [],
    };
  },
  created() {
    this.getGradeList();
    this.getCateList();
  },
  methods: {
    // 获取分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = this.categoryOptions =
          cloneOptions(res.data, "category_name", "category_id", "son");
      }
    },
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
    async handleUpdateSort({ id, title, sort, category_id }) {
      const data = {
        id,
        title,
        sort,
        category_id,
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
        category_id: data.category_id.pop(),
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
</style>

