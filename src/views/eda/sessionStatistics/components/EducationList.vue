<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近学历报名的学生。</div>
    <div class="college-student-container">
      <div
        class="tree-list"
        :style="{
          width: isTreeOpen ? '280px' : '0px',
        }"
      >
        <el-tree
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
            @selection-change="handleSeletChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column
              prop="surname"
              label="学生姓名"
              min-width="90"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <el-button type="text" @click="toStudentDetail(row.uid)">
                  {{ row.surname }}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="mobile"
              label="手机号码"
              min-width="130"
              show-overflow-tooltip
            >
              <template slot-scope="{ row }">
                <PartiallyHidden :value="row.mobile" />
              </template>
            </el-table-column>

            <el-table-column
              prop="from_institution_name"
              label="推荐机构"
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
              prop="jiebie_name"
              label="届别名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="type_name"
              label="学历形式"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="university_name"
              label="院校名称"
              show-overflow-tooltip
              min-width="180"
            ></el-table-column>
            <el-table-column
              prop="level_name"
              label="层次名称"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="major_name"
              label="专业名称"
              show-overflow-tooltip
              min-width="150"
            ></el-table-column>
            <el-table-column
              prop="transaction_type_name"
              label="异动类型"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="transaction_status_name"
              label="办理状态"
              show-overflow-tooltip
              min-width="100"
            >
              <template slot-scope="{ row }">
                <el-tag
                  v-if="row.transaction_status_id"
                  :type="statusMap[row.transaction_status_id]"
                  size="small"
                  >{{ row.transaction_status_name }}</el-tag
                >
                <span v-else>{{ row.transaction_status_name }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="create_time"
              label="创建时间"
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="160">
              <template slot-scope="{ row }">
                <el-button type="text" @click="toOrderDetail(row.order_id)">
                  订单详情
                </el-button>
                <el-button
                  type="text"
                  v-if="row.transaction_status_id === 1"
                  @click="cancelTransaction(row.transaction_id)"
                >
                  撤回异动
                </el-button>
                <el-button
                  type="text"
                  v-if="[0, 3, 4].includes(row.transaction_status_id)"
                  @click="openChangeDialog(row)"
                >
                  学籍异动
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_bottom">
          <div>
            <el-button @click="openGradeDialog">修改届别</el-button>
            <el-button @click="exportEduList" :loading="exportLoading">
              导出数据
            </el-button>
          </div>
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageSizeChange="handleSizeChange"
            @pageChange="handlePageChange"
          />
        </div>
      </div>
    </div>
    <UpdateOrderGrade
      v-model="gradeDialogflag"
      :order-ids="checkedOrderIds"
      @on-success="getEduList"
    />
    <StudentStatusChange
      v-model="changeDialogflag"
      :data="checkedOrder"
      @on-success="getEduList"
    />
  </div>
</template>
<script>
import UpdateOrderGrade from "@/views/eda/components/UpdateOrderGrade";
import StudentStatusChange from "@/views/eda/components/StudentStatusChange";
import {
  getEduList,
  getAdminSelect,
  getTreeCategory,
  exportEduList,
} from "@/api/eda";
import { getInstitutionSelectData, cancelTransaction } from "@/api/sou";
import { cloneOptions, download } from "@/utils/index";
import { getShortcuts } from "@/utils/date";
export default {
  name: "EducationList",
  components: {
    UpdateOrderGrade,
    StudentStatusChange,
  },
  data() {
    return {
      searchData: {
        keyword: "",
        from_organization_id: "",
        admin_id: "",
        date: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "from_organization_id",
          type: "cascader",
          width: 150,
          attrs: {
            placeholder: "推荐机构",
            filterable: true,
            clearable: true,
            options: [],
          },
        },
        {
          key: "admin_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "所属老师",
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
      exportLoading: false,
      gradeDialogflag: false,
      checkedOrderIds: [],
      checkedIds: [],
      isTreeOpen: true,
      checkedOrder: {},
      changeDialogflag: false,
      statusMap: {
        1: "info",
        2: "warning",
        3: "success",
        4: "danger",
      },
    };
  },
  created() {
    this.getTreeCategory();
    this.getEduList();
    this.getInstitutionSelectData();
    this.getAdminSelect();
  },
  methods: {
    async cancelTransaction(id) {
      const data = { id };
      const res = await cancelTransaction(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getEduList();
      }
    },
    handleToggle() {
      this.isTreeOpen = !this.isTreeOpen;
    },
    openChangeDialog(row) {
      this.checkedOrder = row;
      this.changeDialogflag = true;
    },
    openGradeDialog() {
      if (!this.checkedOrderIds.length) {
        this.$message.warning("请选择学生");
        return;
      }
      this.gradeDialogflag = true;
    },
    handleSeletChange(selection) {
      this.checkedIds = [];
      this.checkedOrderIds = [];
      selection.forEach((item) => {
        this.checkedIds.push(item.id);
        this.checkedOrderIds.push(item.order_id);
      });
    },

    async exportEduList() {
      const data = {
        ...this.searchData,
        ...this.treeParams,
      };
      this.exportLoading = true;
      const res = await exportEduList(data).catch();
      this.exportLoading = false;
      if (res.code === 0) {
        download(res.data.url, "学历列表");
        this.$message.success(res.message);
      }
    },
    onNodeClick(data) {
      const {
        type_id = "",
        university_id = "",
        level_id = "",
        major_id = "",
        jiebie_id = "",
      } = data;
      this.treeParams = {
        jiebie_id,
        type_id,
        university_id,
        level_id,
        major_id,
      };
      this.getEduList();
    },
    async getTreeCategory() {
      const res = await getTreeCategory();
      if (res.code === 0) {
        this.treeData = [
          {
            title: "全部",
            count: res.data.total,
          },
        ].concat(res.data.list);
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      const res = await getAdminSelect();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取机构
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
        from_organization_id: Array.isArray(data.from_organization_id)
          ? data.from_organization_id.pop()
          : data.from_organization_id,
        date: data.date.length ? data.date.join(" - ") : "",
      };
      this.getEduList();
    },
    handleSizeChange(size) {
      this.pageSize = size;
      this.getEduList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getEduList();
    },
    // 获取列表
    async getEduList() {
      this.checkedIds = [];
      this.checkedOrderIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
        ...this.treeParams,
      };
      this.listLoading = true;
      const res = await getEduList(data);
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
  .copy-number {
    color: #199fff;
    cursor: pointer;
    margin-left: 8px;
  }
  .table_bottom {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0;
  }
}
.green {
  color: #41cb00;
}
.red {
  color: #ee5f00;
}
</style>