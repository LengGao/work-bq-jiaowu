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
          width="90"
        ></el-table-column>
        <el-table-column
          prop="type_name"
          label="学历形式"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="school_name"
          label="院校名称"
          show-overflow-tooltip
          min-width="160"
        ></el-table-column>
        <el-table-column
          prop="level_name"
          label="层次名称"
          show-overflow-tooltip
          min-width="90"
        ></el-table-column>
        <el-table-column
          prop="major_name"
          label="专业名称"
          show-overflow-tooltip
          min-width="140"
        ></el-table-column>
        <el-table-column
          prop="school_system"
          label="学制"
          show-overflow-tooltip
          width="70"
        ></el-table-column>
        <el-table-column
          prop="price"
          label="总学费"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="lowest_price"
          label="最低学费"
          show-overflow-tooltip
          min-width="90"
        >
          <template slot-scope="{ row }">
            <span>￥{{ row.lowest_price }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="project_name"
          label="关联项目"
          show-overflow-tooltip
          min-width="240"
        >
          <template slot-scope="{ row }">
            <span>{{ row.project_name || "--" }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          show-overflow-tooltip
          width="90"
        >
          <template slot-scope="{ row }">
            <el-input
              type="number"
              @mousewheel.native.prevent
              v-model="row.sort"
              placeholder="请输入"
              maxlength="10"
              size="small"
              style="width: 80px"
              @blur="updateUniversityMajorDetailSort(row)"
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
              @change="updateUniversityMajorDetailStatus(row)"
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
    <MajorDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      :options1="options1"
      :options2="options2"
      :options3="options3"
      :options4="options4"
      @on-success="getUniversityMajorDetailList"
    />
  </div>
</template>

<script>
import MajorDialog from "./MajorDialog.vue";
import {
  getUniversityMajorDetailList,
  delUniversityMajorDetail,
  updateUniversityMajorDetailStatus,
  updateUniversityMajorDetailSort,
  getUniversityTypeOptions,
  getUniversityOptions,
  getUniversityLevelOptions,
  getUniversityMajorOptions,
} from "@/api/sou";
export default {
  name: "UniversityMajorDetail",
  components: {
    MajorDialog,
  },
  data() {
    return {
      searchOptions: [
        {
          key: "type_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "学历形式",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "school_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "院校名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "level_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "层次名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "major_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "专业名称",
            clearable: true,
            filterable: true,
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
      dialogTitle: "添加院校专业",
      dialogVisible: false,
      //options： 1 院校专业 2 院校 3层次 4 专业
      options1: [],
      options2: [],
      options3: [],
      options4: [],
    };
  },
  created() {
    this.getUniversityMajorDetailList();
    this.getOptions();
  },
  methods: {
    // 获取搜索选项
    async getOptions() {
      const apis = [
        getUniversityTypeOptions,
        getUniversityOptions,
        getUniversityLevelOptions,
        getUniversityMajorOptions,
      ];
      const resArr = await Promise.all(
        apis.map((item) => item().catch(() => ({ code: 1 })))
      );
      resArr.forEach((item, index) => {
        if (item.code === 0) {
          this.searchOptions[index].options = item.data;
          this[`options${index + 1}`] = item.data;
        }
      });
    },
    //删除
    delConfirm(id) {
      this.$confirm("确定要删除此院校专业吗?", "提示", {
        type: "warning",
      })
        .then(() => {
          this.delUniversityMajorDetail(id);
        })
        .catch(() => {});
    },
    async delUniversityMajorDetail(id) {
      const data = { id };
      const res = await delUniversityMajorDetail(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUniversityMajorDetailList();
      }
    },
    // 修改排序
    async updateUniversityMajorDetailSort(row) {
      const data = {
        id: row.id,
        sort: row.sort,
      };
      const res = await updateUniversityMajorDetailSort(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getUniversityMajorDetailList();
      }
    },
    // 修改状态
    async updateUniversityMajorDetailStatus(row) {
      const data = {
        id: row.id,
        status: row.status,
      };
      const res = await updateUniversityMajorDetailStatus(data).catch(() => {
        row.status = row.status ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
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
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = { ...data };
      this.getUniversityMajorDetailList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getUniversityMajorDetailList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getUniversityMajorDetailList();
    },
    // 获取列表
    async getUniversityMajorDetailList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getUniversityMajorDetailList(data);
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