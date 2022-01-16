<template>
  <div class="college-student">
    <div class="head_remind">*本模块主要展示最近学历报名的学生。</div>
    <div class="college-student-container">
      <div class="tree-list">
        <el-tree
          :data="treeData"
          :props="defaultProps"
          ref="tree"
          highlight-current
          @node-click="onNodeClick"
        >
        </el-tree>
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
              prop="staff_name"
              label="所属老师"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>
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
              prop="staff_name"
              label="所属老师"
              show-overflow-tooltip
              min-width="100"
            ></el-table-column>

            <el-table-column
              prop="book_fee_status"
              label="教材费"
              show-overflow-tooltip
              min-width="80"
            >
            <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.book_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" v-if="row.book_fee_status == 0" class="red">
                  未缴
                </el-button>
            </template>
            </el-table-column>
            <el-table-column
              prop="platform_fee_status"
              label="平台费"
              show-overflow-tooltip
              min-width="80"
            >
           <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.platform_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" v-if="row.platform_fee_status == 0" class="red">
                  未缴
                </el-button>
            </template>
            </el-table-column>
            <el-table-column
              prop="service_fee_status"
              label="教务服务费"
              show-overflow-tooltip
              min-width="90"
            >
            <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.service_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" v-if="row.service_fee_status == 0" class="red">
                  未缴
              </el-button>
            </template>
            </el-table-column>
             <el-table-column
              prop="paper_teach_fee_status"
              label="论文指导费"
              show-overflow-tooltip
              min-width="90"
            >
            <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.paper_teach_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" v-if="row.paper_teach_fee_status == 0" class="red">
                  未缴
                </el-button>
            </template>
            </el-table-column>
            <el-table-column
              prop="paper_reply_fee_status"
              label="论文答辩费"
              show-overflow-tooltip
              min-width="90"
            >
            <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.paper_reply_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" class="red" v-if="row.paper_reply_fee_status == 0">
                  未缴
                </el-button>
            </template>
            </el-table-column>
            <el-table-column
              prop="paper_handle_fee_status"
              label="论文处理费"
              show-overflow-tooltip
              min-width="90"
            >
            <template slot-scope=" { row } ">
              <el-button type="text" v-if="row.paper_handle_fee_status == 1" class="green">
                  已缴
                </el-button>
              <el-button type="text" class="red" v-if="row.paper_handle_fee_status == 0">
                  未缴
                </el-button>
            </template>
            </el-table-column>
              <el-table-column
              prop="create_time"
              label="创建时间"
              show-overflow-tooltip
              min-width="160"
            ></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="100">
              <template slot-scope="{ row }">
                <el-button type="text" @click="toOrderDetail(row.order_id)">
                  订单详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="table_bottom">
          <div>
            <el-button @click="openResetDialog">
              补齐费用
            </el-button>
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
     <PayDialog
        v-model="ResetDialogflag"
        :ids="checkedIds"
        @on-success="getEduList"
    />
  </div>
</template>

<script>
import PartiallyHidden from "@/components/PartiallyHidden/index";
import PayDialog from "./components/PayDialog";
import {
  getEduList,
  getAdminSelect,
  getTreeCategory,
  exportEduList,
} from "@/api/eda";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions, download } from "@/utils/index";
import { getShortcuts } from "@/utils/date";
import { batchUpdateFee } from "@/api/eda";
export default {
  name: "collegeStudentList",
  components: {
    PartiallyHidden,
    PayDialog,
  },
  data() {
    return {
      ResetDialogflag:false,
      searchData: {
        keyword: "",
        from_organization_id: "",
        admin_id: "",
        date: "",
        book_fee_status:"",
        platform_fee_status:"",
        service_fee_status:"",
        paper_teach_fee_status:"",
        paper_reply_fee_status:"",
        paper_handle_fee_status:"",
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
          width:150,
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
          width:120,
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
          key: "book_fee_status",
          type: "select",
          width: 110,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "教材费",
          },
        },
        {
          key: "platform_fee_status",
          type: "select",
          width: 110,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "平台费",
          },
        },
        {
          key: "service_fee_status",
          type: "select",
          width: 130,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "教务服务费",
          },
        },
        {
          key: "paper_teach_fee_status",
          type: "select",
          width: 130,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "论文指导费",
          },
        },
        {
          key: "paper_reply_fee_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "论文答辩费",
          },
        },
        {
          key: "paper_handle_fee_status",
          type: "select",
          width: 120,
          options: [
            {
              value: 0,
              label: "未缴",
            },
            {
              value: 1,
              label: "已缴",
            },
          ],
          attrs: {
            clearable: true,
            placeholder: "论文处理费",
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
      exportLoading: false,
    };
  },
  created() {
    this.getTreeCategory();
    this.getEduList();
    this.getInstitutionSelectData();
    this.getAdminSelect();
  },
  methods: {
    handleSeletChange(selection) {
      this.checkedIds = selection.map((item) => item.id);
    },
    openResetDialog() {
      if (!this.checkedIds.length) {
        this.$message.warning("请选择学生");
        return;
      }
      this.ResetDialogflag = true;
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
        console.log(res);
        download(res.data.url, "学历列表");
        this.$message.success(res.message);
      }
    },
    onNodeClick(data) {
      console.log(data);
      const {
        type_id = "",
        university_id = "",
        level_id = "",
        major_id = "",
        title,
      } = data;
      this.treeParams = { type_id, university_id, level_id, major_id };
      this.getEduList();
    },
    async getTreeCategory() {
      const res = await getTreeCategory();
      if (res.code === 0) {
        this.treeData = [
          {
            title: "全部",
          },
        ].concat(res.data);
      }
    },
    // 获取所属老师
    async getAdminSelect() {
      this.detaiLoading = true;
      const res = await getAdminSelect().catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
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
    // 缴费变化
     alreadyOpenone(id,book_fee_status,platform_fee_status,service_fee_status,paper_teach_fee_status,paper_reply_fee_status,paper_handle_fee_status) {
      this.$confirm("您确定要修改该状态吗?", { type: "warning" })
        .then(() => {
          this.batchUpdateFee(
            id,
            book_fee_status = !book_fee_status,
            platform_fee_status,service_fee_status,paper_teach_fee_status,paper_reply_fee_status,paper_handle_fee_status
            );
        })
        .catch(() => {});
    },

    alreadyOpentwo(id,book_fee_status,platform_fee_status,service_fee_status,paper_teach_fee_status,paper_reply_fee_status,paper_handle_fee_status) {
      this.$confirm("您确定要修改该状态吗?", { type: "warning" })
        .then(() => {
          this.batchUpdateFee(
            id,
            platform_fee_status == !platform_fee_status,
            book_fee_status,service_fee_status,paper_teach_fee_status,paper_reply_fee_status,paper_handle_fee_status
            );
        })
        .catch(() => {});
    },

      async batchUpdateFee(id,book_fee_status,platform_fee_status,service_fee_status,paper_teach_fee_status,paper_reply_fee_status,paper_handle_fee_status) {
      const data = { 
        id_arr:[id],
        book_fee_status,
        platform_fee_status,
        service_fee_status,
        paper_teach_fee_status,
        paper_reply_fee_status,
        paper_handle_fee_status,
       };
       console.log(data);
      const res = await batchUpdateFee(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getEduList();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.college-student {
  &-container {
    padding: 20px;
    display: flex;
    .tree-list {
      width: 260px;
      flex-shrink: 0;
      border-right: 1px solid #eee;
      margin-right: 20px;
      height: 80vh;
      overflow-y: auto;
    }
    .table-list {
      flex: 1;
      overflow: hidden;
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
.green{
  color: #41cb00;
}
.red{
  color: #ee5f00;
}
</style>