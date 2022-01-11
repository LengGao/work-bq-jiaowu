<template>
  <div>
    <section>
      <!--搜索模块-->
      <header>
        <el-form
          label-width="100px"
          :model="formData"
          :rules="rules"
          inline
          ref="formData"
        >
          <el-form-item label="机构名称" prop="from_organization_id">
            <el-select
              v-model="formData.from_organization_id"
              filterable
              clearable
              placeholder="请选择机构"
              @change="onOrgChange"
            >
              <el-option
                v-for="item in institutionOptions"
                :key="item.from_organization_id"
                :label="item.institution_name"
                :value="item.from_organization_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目类型" prop="type">
            <el-select
              v-model="formData.type"
              placeholder="请选择项目"
              @change="onOrgChange"
            >
              <el-option label="单项目" value="1"> </el-option>
              <el-option label="多项目" value="2"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目名称" prop="project_id">
            <el-select
              v-model="formData.project_id"
              filterable
              clearable
              placeholder="请选择项目"
              @change="onProjectChange"
            >
              <el-option
                v-for="item in projectOptions"
                :key="item.project_ids"
                :label="item.project_name"
                :value="item.project_ids"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="formData.type == 1" label="项目价格" prop="price">
            <el-select
              v-model="formData.price"
              filterable
              clearable
              placeholder="请选择价格"
            >
              <el-option
                v-for="item in classTypeOptions"
                :key="item.id"
                :label="`${item.title}：￥${item.price}`"
                :value="item.price"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-else label="项目价格" prop="price">
            <el-input v-model="formData.price" placeholder="请输入价格" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :loading="restLoading"
              @click="submitForm('formData')"
              >重 设</el-button
            >
          </el-form-item>
        </el-form>
        <SearchList
          :options="searchOptions"
          :data="searchData"
          @on-search="handleSearch"
        />
      </header>
      <!--列表-->
      <div class="userTable">
        <el-table
          ref="multipleTable"
          :data="listData"
          v-loading="listLoading"
          element-loading-text="loading"
          element-loading-spinner="el-icon-loading"
          element-loading-background="#fff"
          :header-cell-style="{ 'text-align': 'center', background: '#f8f8f8' }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleSelection"
        >
          <el-table-column
            :selectable="(row) => row.ban_selected !== 1"
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            prop="order_id"
            label="订单ID"
            show-overflow-tooltip
            min-width="70"
          >
          </el-table-column>
          <el-table-column
            prop="user_name"
            label="客户姓名"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="category_name"
            label="所属分类"
            min-width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="order_money"
            label="订单金额"
            min-width="100"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.order_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="pay_money"
            label="回款金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.pay_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="overdue_money"
            label="欠缴金额"
            min-width="90"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.overdue_money | moneyFormat }}
            </template>
          </el-table-column>
          <el-table-column
            prop="receivable_num"
            label="回款总数"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="booked_num"
            label="入账总数"
            min-width="90"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            min-width="160"
            show-overflow-tooltip
          >
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
    </section>
  </div>
</template>

<script>
import {
  getProjectOrder,
  getOrgName,
  getOrgClassType,
  modifyProjectOrder,
  getOrderProject,
} from "@/api/crm";
export default {
  name: "resetProjectPrice",
  data() {
    return {
      listData: [],
      listLoading: false,
      pageNum: 1,
      pageSize: 20,
      listTotal: 0,
      orderActionDialog: false,
      institutionOptions: [],
      projectOptions: [],
      classTypeOptions: [],
      formData: {
        project_id: "",
        from_organization_id: "",
        price: "",
        type: "1",
      },
      rules: {
        price: [{ required: true, message: "请选择", trigger: "change" }],
        project_id: [{ required: true, message: "请选择", trigger: "change" }],
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      restLoading: false,
      selection: [],
      searchData: {
        str_user_name: "",
      },
      searchOptions: [
        {
          key: "str_user_name",
          attrs: {
            placeholder: "客户姓名",
          },
        },
      ],
    };
  },
  created() {
    this.getOrgName();
  },
  methods: {
    handleSelection(selection) {
      this.selection = selection;
    },
    async modifyProjectOrder() {
      const data = {
        arr_order_id: this.selection.map((item) => item.order_id),
        price: this.formData.price,
        institution_id: this.formData.from_organization_id,
        project_id: this.formData.project_id,
      };
      this.restLoading = true;
      const res = await modifyProjectOrder(data).catch(() => {});
      this.restLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getProjectOrder();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.selection.length) {
            this.$message.warning("请选择订单");
            return;
          }
          this.modifyProjectOrder();
        }
      });
    },
    onOrgChange() {
      this.formData.project_id = "";
      this.formData.price = "";
      this.listData = [];
      this.listTotal = 0;
      this.pageNum = 1;
      this.getOrderProject();
    },
    onProjectChange() {
      this.formData.price = "";
      this.pageNum = 1;
      this.listData = [];
      this.listTotal = 0;
      this.getProjectOrder();
      if (this.formData.type == 1) {
        this.getOrgClassType();
      }
    },
    // 获取列表
    async getOrderProject() {
      const data = {
        institution_id: this.formData.from_organization_id,
        type: this.formData.type,
      };
      const res = await getOrderProject(data);
      if (res.code === 0) {
        this.projectOptions = res.data;
      }
    },
    async getOrgClassType() {
      const data = {
        institution_id: this.formData.from_organization_id,
        project_id: this.formData.project_id,
      };
      const res = await getOrgClassType(data);
      this.classTypeOptions = res.data;
    },
    async getOrgName() {
      const data = { state: 0 };
      const res = await getOrgName(data);
      this.institutionOptions = res.data;
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getProjectOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getProjectOrder();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getProjectOrder();
    },
    async getProjectOrder() {
      this.selection = [];
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        institution_id: this.formData.from_organization_id,
        project_id: this.formData.project_id,
        str_user_name: this.searchData.str_user_name,
      };
      this.listLoading = true;
      const res = await getProjectOrder(data).catch(() => {});
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
.approve-status {
  &::before {
    display: inline-block;
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #fd6500;
    vertical-align: middle;
    margin-right: 2px;
  }
  &--success::before {
    background-color: #43d100;
  }
  &--wait::before {
    background-color: #199fff;
  }
  &--none::before {
    background-color: #999;
  }
}
</style>
