<template>
  <el-dialog
    title="添加机构回款"
    :visible.sync="visible"
    width="90%"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    top="3vh"
    class="add-collection"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="开课信息"></Title>
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
            :key="item.institution_id"
            :label="item.institution_name"
            :value="item.institution_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="pay_day" label="回款日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_day"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回款金额" prop="pay_money">
        <el-input
          class="input"
          v-model="formData.pay_money"
          type="number"
          placeholder="请输入回款金额"
        />
      </el-form-item>
      <el-form-item label="支付方式" prop="pay_type">
        <el-select
          v-model="formData.pay_type"
          placeholder="请选择支付方式"
          class="input"
          filterable
        >
          <el-option
            v-for="item in payMethodOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注信息" prop="tips" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.tips"
          placeholder="请输入内容"
        />
      </el-form-item>
      <Title text="关联订单"></Title>
      <div class="tables">
        <div class="order-table">
          <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
          />
          <el-table
            :data="listData"
            v-loading="listLoading"
            element-loading-text="loading"
            element-loading-spinner="el-icon-loading"
            element-loading-background="#fff"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            @selection-change="handleOrderTableChange"
            row-key="order_id"
            ref="multipleTable"
            height="500"
            @row-click="toggleSelection"
          >
            <el-table-column type="selection" width="45" reserve-selection>
            </el-table-column>
            <el-table-column
              label="创建时间"
              show-overflow-tooltip
              min-width="150"
              prop="create_time"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="客户姓名"
              min-width="110"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="项目名称"
              show-overflow-tooltip
              min-width="150"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              label="订单金额"
              show-overflow-tooltip
              min-width="150"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span> ￥{{ row.order_money || 0 }} </span>
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
        <div class="checked-table">
          <div class="money-total">
            <span>回款总金额：<span class="price">￥60000</span></span>
            <span>已填金额合计：<span class="price">￥60000</span></span>
          </div>
          <el-table
            :data="checkedOrderData"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="500"
          >
            <el-table-column
              show-overflow-tooltip
              min-width="150"
              prop="create_time"
            >
              <template slot="header">
                <span>已选学生：{{ checkedOrderData.length }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="订单金额"
              min-width="110"
              show-overflow-tooltip
            >
            </el-table-column>

            <el-table-column
              label="已回款金额"
              show-overflow-tooltip
              min-width="150"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span> ￥{{ row.order_money || 0 }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="本次回款金额"
              show-overflow-tooltip
              min-width="200"
              prop="project_name"
            >
              <template slot="header">
                <div class="header-money">
                  <el-input
                    v-model="formData.money"
                    size="mini"
                    placeholder="本次回款金额"
                  />
                  <div class="header-money-actions">
                    <span class="btn-distribution">分配</span>
                    <span class="btn-fill">填充</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
              <template slot="header">
                <el-button type="text" @click="hadleResetOrder"
                  >批量删除</el-button
                >
              </template>
              <template slot-scope="{ $index }">
                <el-button @click="handleRemoveOrder($index)" type="text"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import {
  orderOpen,
  switchList,
  getCustomfieldOptions,
  getCrmOrderList,
} from "@/api/crm";
import { getproject } from "@/api/eda";
import { getShortcuts } from "@/utils/date";
import { getCateList } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    userInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      addLoading: false,
      formData: {
        from_organization_id: "",
      },
      rules: {
        selectProject: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        selectMajor: [{ required: true, message: "请选择", trigger: "change" }],
        type: [{ required: true, message: "请选择", trigger: "change" }],
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        title: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      payMethodOptions: [],
      institutionOptions: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        keyword: "",
      },
      searchOptions: [
        {
          key: "date",
          type: "datePicker",
          attrs: {
            value: "",
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            pickerOptions: {
              shortcuts: getShortcuts([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
            },
          },
        },
        {
          key: "category_id",
          type: "cascader",
          width: 150,
          attrs: {
            placeholder: "所属分类（多选）",
            clearable: true,
            props: {
              multiple: true,
              checkStrictly: true,
            },
            "collapse-tags": true,
            filterable: true,
            options: [],
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          width: 150,
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          width: 150,
          key: "keyword",
          attrs: {
            placeholder: "订单名称",
          },
        },
      ],
      checkedOrderData: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getCustomfieldOptions();
      this.switchList();
      this.getproject();
      this.getCateList();
    },
    onOrgChange() {
      this.hadleResetOrder();
      this.handlePageChange(1);
    },
    // 右侧已选删除
    handleRemoveOrder(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.checkedOrderData.splice(index, 1);
    },
    // 右侧已选清空
    hadleResetOrder() {
      this.$refs.multipleTable.clearSelection();
    },
    // 切换列表选择状态
    toggleSelection(row) {
      this.$refs.multipleTable.toggleRowSelection(row);
    },
    handleOrderTableChange(selection) {
      this.checkedOrderData = selection || [];
    },
    handleSearch(data) {
      this.pageNum = 1;
      this.searchData = {
        ...data,
      };
      this.getCrmOrderList();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getCrmOrderList();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getCrmOrderList();
    },
    async getCrmOrderList() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        from_org: this.formData.from_organization_id,
        ...this.searchData,
        date: Array.isArray(this.searchData.date)
          ? this.searchData.date.join(" - ")
          : "",
        project_id: Array.isArray(this.searchData.project_id)
          ? this.searchData.project_id.join(",")
          : "",
        category_id: Array.isArray(this.searchData.category_id)
          ? this.searchData.category_id.join(",")
          : "",
      };
      this.listLoading = true;
      const res = await getCrmOrderList(data);
      this.listLoading = false;
      this.listData = res.data.list;
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },
    // 获取项目下拉
    async getproject() {
      const res = await getproject();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取所属分类
    async getCateList() {
      const data = { list: true };
      const res = await getCateList(data);
      if (res.code === 0) {
        this.searchOptions[1].attrs.options = cloneOptions(
          res.data,
          "category_name",
          "category_id",
          "son"
        );
      }
    },
    // 获取支付方式
    async getCustomfieldOptions() {
      const data = {
        field_name: "payment_method",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.payMethodOptions = res.data.field_content;
      }
    },
    // 获取机构
    async switchList() {
      const res = await switchList();
      this.institutionOptions = res.data.list;
    },
    async submit() {
      const data = {};
      this.addLoading = true;
      const res = await orderOpen(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 217px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
.tables {
  display: flex;
  justify-content: space-between;
  /deep/.el-table {
    border: 1px solid #efefef;
    border-bottom: none;
  }
  .order-table {
    width: 53.5%;
    .table_bottom {
      padding-bottom: 0;
    }
  }
  .checked-table {
    width: 45.5%;
    .money-total {
      text-align: right;
      padding: 16px 0;
      & > span {
        margin-left: 40px;
        .price {
          color: #fd6552;
        }
      }
    }
    .header-money {
      display: flex;
      align-items: center;
      &-actions {
        width: 60px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        .btn-fill {
          color: #fcc850;
          cursor: pointer;
        }
        .btn-distribution {
          color: #43d100;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.select-project {
  .el-cascader-panel {
    & > .el-scrollbar:first-child {
      .el-checkbox {
        display: none;
      }
    }
    .el-cascader-node[aria-owns] {
      .el-checkbox {
        width: 14px;
        span {
          display: none;
        }
      }
    }
  }
}
.add-collection {
  .el-dialog__body {
    padding: 10px 16px 0;
  }
}
</style>