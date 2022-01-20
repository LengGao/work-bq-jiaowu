<template>
  <div class="institution-account">
    <div class="head_remind">*管理第三方入驻机构的账号信息</div>
    <div class="container">
      <div class="client_head">
        <!--搜索模块-->
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <div>
          <el-button @click="openDockingDialog">学生对接</el-button>
          <el-button type="primary" @click="handleAdd">添加机构</el-button>
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
          @selection-change="handleSeletChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            label="机构ID"
            show-overflow-tooltip
            min-width="70"
            align="center"
            prop="institution_id"
          >
          </el-table-column>
          <el-table-column
            label="机构LOGO"
            show-overflow-tooltip
            min-width="160"
            align="center"
            prop="institution_id"
          >
            <template slot-scope="{ row }">
              <img v-if="row.logo" :src="row.logo" alt="" />
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column
            label="机构名称"
            show-overflow-tooltip
            min-width="200"
            align="left"
            prop="institution_name"
          >
          </el-table-column>
          <el-table-column
            prop="balance"
            label="账户余额"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span :class="{ red: row.balance > 0 }">￥{{ row.balance }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="classroom_name"
            label="开通小程序"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.small_program"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="modifyInstitutionOther(row, 'small_program')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="first_time"
            label="开通H5"
            min-width="100"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.h5"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="modifyInstitutionOther(row, 'h5')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="授权小程序"
            show-overflow-tooltip
            min-width="100"
            align="center"
            prop="institution_id"
          >
            <template slot-scope="{ row }">
              <el-tag
                :type="row.applet_config_status ? 'success' : 'danger'"
                size="small"
                >{{ row.applet_config_status ? "是" : "否" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            label="授权公众号"
            show-overflow-tooltip
            min-width="100"
            align="center"
            prop="institution_id"
          >
            <template slot-scope="{ row }">
              <el-tag
                :type="row.wechat_config_status ? 'success' : 'danger'"
                size="small"
                >{{ row.wechat_config_status ? "是" : "否" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="account_num"
            label="账号数量"
            align="center"
            min-width="80"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="last_sign_time"
            label="最近登录时间"
            align="center"
            min-width="140"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="是否启用"
            align="center"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-switch
                v-model="row.account_status"
                active-color="#2798ee"
                inactive-color="#eaeefb"
                :active-value="1"
                :inactive-value="0"
                @change="modifyInstitutionOther(row, 'account_status')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            align="center"
            min-width="330"
          >
            <template slot-scope="{ row }">
              <el-button
                type="text"
                @click="
                  linkTo('institutionUser', {
                    institution_id: row.institution_id,
                  })
                "
                >用户</el-button
              >
              <el-button
                type="text"
                @click="
                  linkTo('institutionConfig', {
                    institution_id: row.institution_id,
                  })
                "
                >配置</el-button
              >
              <el-button type="text" @click="linkTo('institutionDetails', row)"
                >详情</el-button
              >
              <el-button type="text" @click="openRecharge(row)">充值</el-button>
              <el-button type="text" @click="handleEdit(row.institution_id)"
                >编辑</el-button
              >
              <el-button type="text" @click="deleteConfirm(row.institution_id)"
                >删除</el-button
              >
              <el-button
                type="text"
                @click="getInstitutionToken(row.institution_id)"
                >登录后台</el-button
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
    <InstitutionDialog
      v-model="dialogVisible"
      :title="dialogTitle"
      :id="currentId"
      @on-success="getInstitutionList"
    />
    <RechargeDialog
      v-model="rechargeDialogVisible"
      :detailData="currentData"
      @on-success="getInstitutionList"
    />
    <DockingDialog
      v-model="dockingDialog"
      :ids="checkedIds"
      @on-success="getInstitutionList"
    />
  </div>
</template>

<script>
import {
  getInstitutionList,
  modifyInstitutionOther,
  deletedInstitution,
  getInstitutionToken,
} from "@/api/institution";
import { getShortcuts } from "@/utils/date";
import PartiallyHidden from "@/components/PartiallyHidden/index";
import InstitutionDialog from "./components/InstitutionDialog";
import DockingDialog from "./components/DockingDialog";
import RechargeDialog from "./components/RechargeDialog";
export default {
  name: "institutionAccount",
  components: {
    PartiallyHidden,
    InstitutionDialog,
    RechargeDialog,
    DockingDialog,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      searchData: {
        keyword: "",
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
          key: "keyword",
          attrs: {
            placeholder: "机构名称/负责人/手机号码",
          },
        },
      ],
      dialogVisible: false,
      dialogTitle: "",
      currentId: "",
      rechargeDialogVisible: false,
      currentData: {},
      checkedIds: [],
      dockingDialog: false,
    };
  },

  created() {
    this.getInstitutionList();
  },
  methods: {
    handleSeletChange(selection) {
      this.checkedIds = selection.map((item) => item.institution_id);
    },
    openDockingDialog() {
      if (!this.checkedIds.length) {
        this.$message.warning("请选择机构");
        return;
      }
      this.dockingDialog = true;
    },
    async getInstitutionToken(institution_id) {
      const data = { institution_id };
      const res = await getInstitutionToken(data);
      if (res.code === 0) {
        let params = "";
        for (const key in res.data) {
          params += `${key}=${res.data[key]}&`;
        }
        const url = `https://store.beiqujy.com/#/?${params.slice(0, -1)}`;
        window.open(url);
      }
    },
    // 删除机构
    deleteConfirm(institution_id) {
      this.$confirm("确定要删除此机构吗?", { type: "warning" })
        .then(() => {
          this.deletedInstitution(institution_id);
        })
        .catch(() => {});
    },
    async deletedInstitution(institution_id) {
      const data = { institution_id };
      const res = await deletedInstitution(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getInstitutionList();
      }
    },
    async modifyInstitutionOther(row, type) {
      const data = {
        keyword: type,
        state: row[type],
        institution_id: row.institution_id,
      };
      const res = await modifyInstitutionOther(data).catch(() => {
        row[type] = row[type] === 1 ? 0 : 1;
      });
      if (res.code === 0) {
        this.$message.success(res.message);
      }
    },
    openRecharge(row) {
      this.currentData = row;
      this.rechargeDialogVisible = true;
    },
    handleEdit(institution_id) {
      this.currentId = institution_id;
      this.dialogTitle = "编辑机构";
      this.dialogVisible = true;
    },
    handleAdd() {
      this.currentId = "";
      this.dialogTitle = "添加机构";
      this.dialogVisible = true;
    },
    linkTo(name, query) {
      this.$router.push({
        name,
        query,
      });
    },

    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      this.searchData = {
        keyword: data.keyword || "",
        start_time: date[0],
        end_time: date[1],
      };
      this.getInstitutionList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getInstitutionList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getInstitutionList();
    },

    async getInstitutionList() {
      this.checkedIds = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getInstitutionList(data);
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
</style>
