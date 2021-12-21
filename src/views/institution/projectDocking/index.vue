<template>
  <div class="institution-account">
    <div class="head_remind">*查看机构项目对接人</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </div>
      <!--表格-->
      <div class="userTable">
        <el-table
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
            label="项目名称"
            show-overflow-tooltip
            min-width="220"
            align="left"
            prop="project_name"
            fixed="left"
          >
          </el-table-column>
          <el-table-column
            label="分类名称"
            show-overflow-tooltip
            min-width="80"
            align="center"
            fixed="left"
            prop="category_name"
          >
          </el-table-column>

          <el-table-column
            v-for="(item, index) in listColumnData"
            :key="index"
            :label="item.title"
            align="left"
            min-width="160"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>对接人：</span>
              <span class="btn-edu" @click="openChangeDialog(row.edu[index])">{{
                row.edu[index].staff_name || "无"
              }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
    <el-dialog
      title="项目对接"
      :visible.sync="visible"
      width="400px"
      center
      @close="onChangeDialogClose"
    >
      <div>
        <span>对接人：</span>
        <el-select
          v-model="currentData.staff_id"
          placeholder="请选择"
          filterable
          clearable
          multiple
          @change="isChange = true"
        >
          <el-option
            v-for="item in eduStaffOptions"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id + ''"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span
              style="
                float: right;
                color: #8492a6;
                font-size: 13px;
                margin: 0 15px 0 10px;
              "
              >{{ item.department_name }}</span
            >
          </el-option>
        </el-select>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getProjectEduList,
  getStaffSelect,
  modifyProjectEdu,
} from "@/api/institution";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils";
export default {
  name: "projectDocking",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        category_id: [],
        project_name: "",
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
          key: "project_name",
          attrs: {
            placeholder: "项目名称",
          },
        },
      ],
      eduStaffOptions: [],
      listColumnData: [],
      visible: false,
      currentData: {},
      isChange: false,
    };
  },

  created() {
    this.getProjectEduList();
    this.getStaffSelect(2);
    this.getCateList();
  },
  methods: {
    onChangeDialogClose() {
      if (!this.isChange) {
        return;
      }
      this.isChange = false;
      this.modifyProjectEdu();
    },
    openChangeDialog(row) {
      if (typeof row.staff_id === "string") {
        row.staff_id = row.staff_id ? row.staff_id.split(",") : [];
      }
      console.log(row.staff_id);
      this.currentData = row;
      this.visible = true;
    },
    linkTo(name, query) {
      this.$router.push({
        name,
        query,
      });
    },
    async modifyProjectEdu() {
      const data = {
        project_id: this.currentData.project_id,
        department_id: this.currentData.department_id,
        arr_staff: this.currentData.staff_id,
      };
      const res = await modifyProjectEdu(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        // 设置选中的人名
        this.currentData.staff_name = this.eduStaffOptions
          .filter((item) =>
            this.currentData.staff_id.includes(item.staff_id + "")
          )
          .map((item) => item.staff_name)
          .join(",");
      }
    },
    async getStaffSelect(status) {
      const data = {
        status,
      };
      const res = await getStaffSelect(data);
      if (res.code === 0) {
        this.eduStaffOptions = res.data;
      }
    },
    // 获取教材分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[0].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        category_id: data.category_id.pop(),
      };
      this.getProjectEduList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getProjectEduList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectEduList();
    },
    async getProjectEduList() {
      this.checkedIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getProjectEduList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      if (res.data.list.length) {
        this.listColumnData = res.data.list[0].edu;
      }
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
  .red {
    color: #fd6584;
  }
}
.client_head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.btn-edu {
  color: gray;
  cursor: pointer;
  &:hover {
    color: #52adf1;
  }
}
</style>
