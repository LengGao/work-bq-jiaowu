<template>
  <section>
    <div class="head_remind">
      *本模块主要用来规范合同订立行为，加强对合同使用的监督，防范和降低合同签订带来的风险。
    </div>
    <section class="mainwrap">
      <div class="client_head">
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
        <el-button type="primary" @click="addTemplatebtn">添加模板</el-button>
      </div>

      <!--表格-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="light"
          stripe
          style="width: 100%"
          :header-cell-style="{ 'text-align': 'center' }"
          :cell-style="{ 'text-align': 'center' }"
          class="min_table"
        >
          <el-table-column
            prop="id"
            label="id"
            min-width="150"
            column-key="id"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="template_code"
            label="模板code"
            min-width="150"
            column-key="ID"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="template_name"
            label="合同名称"
            min-width="200"
            column-key="template_name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="department_name"
            label="所属部门"
            min-width="200"
            column-key="template_name"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="update_time"
            label="上传时间"
            min-width="200"
            column-key="update_time"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="template_url"
            label="合同模板"
            fixed="right"
            min-width="100"
          >
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="seetemplate(row)"
                  >查看模板</el-button
                >
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="100">
            <template slot-scope="{ row }">
              <div style="display: flex; justify-content: center">
                <el-button type="text" @click="edittemplate(row)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteConfirm(row.id)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
          <el-pagination background layout="prev, pager, next" :total="1000">
          </el-pagination>
        </el-table>
        <div class="table_bottom">
          <page
            :data="listTotal"
            :curpage="pageNum"
            @pageChange="handlePageChange"
          />
        </div>
      </div>

      <Addtemplate
        v-model="addtempdialog"
        :id="currentId"
        :title="dialogTitle"
        @on-success="templatelist"
        :contractInfo="contractInfo"
        :departMentOptions="departMentOptions"
      />

      <Seetemplate
        v-model="seetempdialog"
        :id="currentId"
        :template_url="template_url"
      />
    </section>
  </section>
</template>

<script>
import { templatelist, templateedit, templatedel } from "@/api/system";
import { getDepartmentlists } from "@/api/set";
import Addtemplate from "./components/addtemplate";
import Seetemplate from "./components/seetemplate";
export default {
  name: "contracttemp",
  components: {
    Addtemplate,
    Seetemplate,
  },
  data() {
    return {
      contractInfo: {},
      template_url: "",
      currentId: "",
      dialogTitle: "",
      addtempdialog: false,
      seetempdialog: false,
      id: "",
      searchOptions: [
        {
          key: "department_id",
          type: "select",
          width: 220,
          options: [],
          optionValue: "id",
          optionLabel: "title",
          attrs: {
            placeholder: "部门名称",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "keyword",
          attrs: {
            placeholder: "请输入合同名称",
            clearable: true,
          },
        },
      ],
      options: [],
      searchData: {
        keyword: "",
        department_id: [],
      },
      listTotal: 0,
      pageNum: 1,
      listData: [],
      departMentOptions: [],
    };
  },
  created() {
    this.templatelist();
    this.getDepartmentlists();
  },
  methods: {
    async getDepartmentlists() {
      const res = await getDepartmentlists();
      if (res.code === 0) {
        this.searchOptions[0].options = this.departMentOptions = res.data;
      }
    },
    //搜索功能
    handleSearch(data) {
      console.log(data);
      this.pageNum = 1;
      this.searchData = {
        ...data,
        department_id: data.department_id?.join(",") || "",
      };
      this.templatelist();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.templatelist();
    },
    addTemplatebtn() {
      this.contractInfo = {};
      this.dialogTitle = "添加模板";
      this.addtempdialog = true;
      this.currentId = "";
    },
    seetemplate(row) {
      console.log(row);
      this.seetempdialog = true;
      this.template_url = row.template_url;
    },
    // 合同模板列表接口
    async templatelist() {
      const data = {
        page: this.pageNum,
        ...this.searchData,
      };
      const res = await templatelist(data);
      console.log(res.data.data);
      this.listData = res.data.data;
      this.listTotal = res.data.total;
    },

    edittemplate(row) {
      this.dialogTitle = "编辑模板";
      this.addtempdialog = true;
      // this.currentId = id
      this.contractInfo = row;
    },

    // seetemplate(id) {
    //   this.currentId = id
    //   this.seetempdialog = true
    // },

    deleteConfirm(id) {
      this.$confirm("此操作将永久删除该通知, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.templatedel(id);
        })
        .catch(() => {});
    },

    // 删除模板接口
    async templatedel(id) {
      const data = {
        id,
      };
      const res = await templatedel(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.templatelist();
      }
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
/deep/.el-form-item {
  margin-bottom: 10px;
}
/deep/.el-dialog__header {
  background: #f1f1f1;
}
/deep/.el-form-item__content {
  width: 50%;
}
/deep/.el-radio__input.is-checked + .el-radio__label {
  margin-right: 10px;
}
/deep/.search-lise .search-item[data-v-a11328ce] {
  width: 280px;
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
  margin-bottom: 20px;
}
.table_bottom {
  text-align: right;
  margin-top: 40px;
}

:host ::ng-deep {
  --viewer-pdf-sidenav-width: 100px;
}
</style>
