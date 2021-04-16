<template>
  <div>
    <div class="head_remind">*本模块展示所有的班级直播。</div>
    <section class="mainwrap">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="openAdd">添加直播</el-button>
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
            prop="classroom_id"
          >
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="直播名称"
            min-width="220"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="直播班级"
            min-width="120"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="project_name"
            label="课程类型"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="course_name"
            label="课程名称"
            min-width="180"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="staff_name"
            label="状态"
            min-width="110"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span class="live-status">无直播</span>
              <span class="live-status live-status-active">无直播</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="240">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text">开始直播</el-button>
                <el-button type="text">直播场次</el-button>
                <el-button type="text" @click="openEdit(row.classroom_id)"
                  >编辑</el-button
                >
                <el-button type="text">删除</el-button>
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
      <!--弹框-->
      <!-- <AddClass
        v-model="dialogVisible"
        :title="dialogTitle"
        :id="currentId"
        :typeOptions="typeOptions"
        @on-success="getClassList"
      /> -->
    </section>
  </div>
</template>

<script>
import { getClassList } from "@/api/eda";
// import AddClass from "./components/AddClass";
export default {
  components: {},
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        project_id: "",
        keyword: "",
      },
      searchOptions: [
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "课程类型",
            clearable: true,
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "课程名称",
            clearable: true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "直播名称/直播直播",
          },
        },
      ],
      currentId: "",
      dialogTitle: "添加直播",
      dialogVisible: false,
    };
  },

  created() {
    this.getClassList();
  },
  methods: {
    openEdit(id) {
      this.dialogTitle = "编辑直播";
      this.currentId = id;
      this.dialogVisible = true;
    },
    openAdd() {
      this.currentId = "";
      this.dialogTitle = "添加直播";
      this.dialogVisible = true;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getClassList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getClassList();
    },
    async getClassList() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getClassList(data);
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
  .live-status {
    color: #999999;
    &::before {
      display: inline-block;
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: #999999;
      vertical-align: middle;
      margin-right: 4px;
    }
    &-active {
      color: #00c297;
      &::before {
        background-color: #00c297;
      }
    }
  }
}
.table_bottom {
  text-align: right;
}
</style>
