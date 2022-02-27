<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近职称报名的学生。</div>
    <div class="college-student-container">
      <div
        class="tree-list"
        :style="{
          width: isTreeOpen ? '280px' : '0px',
        }"
      >
        <el-tree
          title
          :data="treeData"
          :props="defaultProps"
          ref="tree"
          highlight-current
          @node-click="onNodeClick"
        >
        </el-tree>
        <div class="tree-list-toggle" @click="handleToggle">
          <i :class="`el-icon-caret-${isTreeOpen ? 'left' : 'right'}`"></i>
        </div>
      </div>
      <div class="table-list">
        <!--搜索模块-->
        <div class="college-student-search">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
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
            style="width: 100%"
            :header-cell-style="{
              'text-align': 'center',
              background: '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="640"
          >
            <el-table-column
              prop="user_realname"
              label="学生姓名"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-button type="text" @click="toStudentDetail(row.uid)">
                  {{ row.user_realname }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="telphone"
              label="手机号码"
              min-width="130"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <PartiallyHidden :value="row.telphone" />
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="届别名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="project_ids_name"
              label="报名项目"
              show-overflow-tooltip
              min-width="180"
            ></el-table-column>
            <el-table-column
              prop="category_name"
              label="所属分类"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="institution_name"
              label="所属机构"
              show-overflow-tooltip
              min-width="130"
            ></el-table-column>
            <el-table-column
              prop="staff_name"
              label="所属老师"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="class_name"
              label="所属班级"
              show-overflow-tooltip
              min-width="180"
            ></el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="160">
              <template slot-scope="{ row }">
                <el-button type="text" @click="toStudentDetail(row.uid)">
                  学生详情
                </el-button>
                <el-button type="text" @click="toOrderDetail(row.order_id)">
                  订单详情
                </el-button>
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
      </div>
    </div>
  </div>
</template>
<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import { getOrderListForNot6, getproject, getJiebieSelect } from "@/api/eda";
export default {
  name: "ProfessionalList",
  components: {
    PartiallyHidden,
  },
  data() {
    return {
      ResetDialogflag: false,
      searchData: {
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
            placeholder: "所属项目",
            clearable: true,
            filterable: true,
          },
        },

        {
          key: "keyword",
          attrs: {
            placeholder: "学生姓名",
          },
        },
      ],
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      defaultProps: {
        children: "child",
        label: (data) => {
          return data.title === "全部"
            ? data.title
            : `${data.title} (${data.count})`;
        },
      },
      treeData: [],
      treeParams: {},
      isTreeOpen: true,
    };
  },
  created() {
    this.getJiebieSelect();
    this.getOrderListForNot6();
    this.getproject();
  },
  methods: {
    handleToggle() {
      this.isTreeOpen = !this.isTreeOpen;
    },
    onNodeClick(data) {
      const { category_id = "", jiebie_id = "" } = data;
      console.log(jiebie_id);
      this.treeParams = {
        jiebie_id,
        category_id,
      };
      this.getOrderListForNot6();
    },
    async getJiebieSelect() {
      const res = await getJiebieSelect();
      if (res.code === 0) {
        this.treeData = [
          {
            title: "全部",
          },
        ].concat(res.data);
      }
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[0].options = res.data;
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getOrderListForNot6();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getOrderListForNot6();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrderListForNot6();
    },
    // 获取列表
    async getOrderListForNot6() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getOrderListForNot6(data);
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
.college-student {
  .head_remind {
    padding: 0 20px 20px 20px;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    color: #909399;
    width: 100%;
    border-bottom: 15px solid #f2f6fc;
  }
  &-container {
    padding: 20px;
    display: flex;
    .tree-list {
      flex-shrink: 0;
      border-right: 1px solid #eee;
      position: relative;
      transition: width 0.3s;
      &-toggle {
        position: absolute;
        overflow: hidden;
        right: 0;
        top: 50%;
        line-height: 80px;
        transform: translateY(-50%);
        width: 12px;
        background-color: #e4e7ed;
        cursor: pointer;
        z-index: 10px;
        i {
          transform: translateX(-1px);
          color: #c0c4cc;
        }
      }
    }
    .table-list {
      flex: 1;
      overflow: hidden;
      position: relative;
      z-index: 10;
      padding-left: 20px;
      background-color: #fff;
    }
  }
}
</style>