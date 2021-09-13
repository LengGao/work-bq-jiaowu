<template>
  <div class="class-type">
    <div class="head_remind">*管理入驻机构销售课程的班型</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button type="primary" @click="handleAdd">添加班型</el-button>
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
            label="班型ID"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="id"
          >
          </el-table-column>
          <el-table-column
            label="班型名称"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="title"
          >
          </el-table-column>
          <el-table-column
            prop="has_question"
            label="题库"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <svg-icon
                :icon-class="row.has_question === 1 ? 'yes' : 'not'"
              ></svg-icon>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_video"
            label="录播"
            min-width="80"
            align="center"
          >
            <template slot-scope="{ row }">
              <svg-icon
                :icon-class="row.has_video === 1 ? 'yes' : 'not'"
              ></svg-icon>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_live"
            label="直播"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <svg-icon
                :icon-class="row.has_live === 1 ? 'yes' : 'not'"
              ></svg-icon>
            </template>
          </el-table-column>
          <el-table-column
            prop="has_teach"
            label="面授"
            min-width="80"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <svg-icon
                :icon-class="row.has_teach === 1 ? 'yes' : 'not'"
              ></svg-icon>
            </template>
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注信息"
            align="center"
            min-width="200"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="sort"
            label="排序"
            align="center"
            min-width="80"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                type="number"
                v-model="row.sort"
                @blur="updateClassTypeSort(row)"
              >
              </el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="是否启用"
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
                @change="updateClassTypeStatus(row)"
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
              <el-button type="text" @click="handleEdit(row)">编辑</el-button>
              <el-button type="text" @click="deleteConfirm(row.id)"
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
    </div>
    <ClassTypeDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :detailData="currentData"
      @on-success="getClassTypeList"
    />
  </div>
</template>

<script>
import {
  getClassTypeList,
  deleteClassType,
  updateClassTypeStatus,
  updateClassTypeSort,
} from "@/api/institution";
import ClassTypeDialog from "./components/ClassTypeDialog";
export default {
  name: "classTypeList",
  components: {
    ClassTypeDialog,
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
            placeholder: "班型名称",
          },
        },
      ],
      dialogVisible: false,
      dialogTitle: "",
      currentData: {},
    };
  },

  created() {
    this.getClassTypeList();
  },
  methods: {
    async updateClassTypeSort({ id, sort }) {
      const data = {
        id,
        sort,
      };
      const res = await updateClassTypeSort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
      }
      this.getClassTypeList();
    },
    async updateClassTypeStatus(row) {
      const data = {
        status: row.status,
        id: row.id,
      };
      const res = await updateClassTypeStatus(data).catch(() => {
        row.status = row.status === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    // 删除机构
    deleteConfirm(id) {
      this.$confirm("确定要删除此班型吗?", { type: "warning" })
        .then(() => {
          this.deleteClassType(id);
        })
        .catch(() => {});
    },
    async deleteClassType(id) {
      const data = { id };
      const res = await deleteClassType(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getClassTypeList();
      }
    },
    handleEdit(row) {
      this.currentData = row;
      this.dialogTitle = "编辑班型";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentData = {};
      this.dialogTitle = "添加班型";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassTypeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassTypeList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getClassTypeList();
    },
    async getClassTypeList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassTypeList(data);
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
.container {
  padding: 20px;
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
</style>
