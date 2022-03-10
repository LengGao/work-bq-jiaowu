<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近职称报名的学生。</div>
    <div class="college-student-container">
    <div class="tree-list" :style="{ width: isTreeOpen ? '280px' : '0px'}">
        <el-tree
            :data="treeData"
            :props="defaultProps"
            ref="tree"
            highlight-current
            @node-click="onNodeClick"
        >
        <div class="custom-tree-node" slot-scope="{ node, data }"  @mouseover="onMouseover(data)" @mouseleave="onMouseleave(data)">
            <span class="row-node-label">{{ node.label }}</span>
            <span v-show="data.show" class="tree-node-row-icons">
                <i class="el-icon-edit" title="编辑" @click.stop="openEdit(data)"></i>
                <!-- <i class="el-icon-sort" title="排序" type="primary" @click.stop="handleSort(data)"></i> -->
            </span>
        </div>
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

    <EditGradeDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :currentNode="currentNode"
    />

  </div>
</template>
<script>

import EditGradeDialog from '@/components/editGradeDialog/index.vue'
import { updateCategorySort, updateCategory } from "@/api/sou";
import { getTreeCategory, getGradeList, getSessionSort } from "@/api/crm";
import { getproject } from "@/api/eda";

export default {
  name: "ProfessionalList",
  components: { EditGradeDialog },
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
          return `${data.title} (${data.count})`;
        },
      },
      treeData: [],
      treeParams: {},
      isTreeOpen: true,
      dialogVisible: false,
      dialogTitle: '',
      currentNode: {}
    };
  },
  created() {
    this.getTreeCategory();
    this.getGradeList();
    this.getproject();
  },
  methods: {
    onMouseleave(data) {
        this.$set(data, 'show', false)
    },
    onMouseover(data) {
        this.$set(data, 'show', true)
    },
    openEdit(data) {
        const {count, jiebie_id, title, type_id } = data
        this.currentNode = {count, jiebie_id, title, type_id}
        this.dialogTitle = `编辑届别`
        this.dialogVisible = true;
    },
    handleSort(data) {
        this.dialogTitle = `编辑届别`
    },
    handleToggle() {
      this.isTreeOpen = !this.isTreeOpen;
    },
    onNodeClick(data) {;
      let   params = {}, 
            title = data.title || '', 
            jId = data.jiebie_id || '', 
            cId = data.category_id || ''
            
      if (title === '全部') {
          return;
      } else if (title === '未分级') {
          params = {category_id: cId, jiebie_id: jId}
      } else if (jId) {
          params = {jiebie_id: jId} 
      } else {
          params = {category_id: cId}
      }
      this.treeParams = params
      this.getGradeList();
    },
    async getTreeCategory() {
      const res = await getTreeCategory();
      if (res.code === 0) {
        const list = res.data.list.map(item => {
            item.show = false
            return item
        })
        this.treeData = [
          {
            title: "全部",
            count: res.data.total,
          },
        ].concat(list);
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
      this.getGradeList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getGradeList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getGradeList();
    },
    // 获取列表
    async getGradeList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getGradeList(data);
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
    .custom-tree-node {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
  }
}
</style>