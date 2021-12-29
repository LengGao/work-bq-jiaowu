<template>
  <el-dialog
    title="添加机构返点"
    :visible.sync="visible"
    width="90%"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    top="3vh"
    class="add-collection"
  >
    <el-form
      label-width="110px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
     
      <Title text="关联订单"></Title>
       <SearchList
            :options="searchOptions"
            :data="searchData"
            @on-search="handleSearch"
            ref="searchList"
          />
      <div class="tables">
        <div class="order-table">
          <el-table
            key="1"
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
            height="470"
            @row-click="toggleSelection"
          >
            <el-table-column type="selection" width="45" reserve-selection>
            </el-table-column>
            <el-table-column
              label="学生姓名"
              show-overflow-tooltip
              min-width="100"
              prop="create_time"
            >
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="所属机构"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="学历形式"
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              label="院校名称"
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span>{{ row.outstanding_amount | moneyFormat }} </span>
              </template>
            </el-table-column>
             <el-table-column
              label="层次名称"
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
            </el-table-column>
             <el-table-column
              label="专业名称"
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
            </el-table-column>
             <el-table-column
              label="学历形式"
              show-overflow-tooltip
              min-width="创建时间"
              prop="project_name"
            >
            </el-table-column>
          </el-table>
          <div class="table_bottom">
            <page
              :data="listTotal"
              :curpage="pageNum"
              @pageChange="handlePageChange"
            />
            <!-- @pageSizeChange="handleSizeChange" -->
          </div>
        </div>
        <div class="checked-table">
            <el-table
            :data="checkedOrderData"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="470"
          >
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              prop="user_name"
            >
              <template slot="header">
                <span>已选学生：{{ checkedOrderData.length }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="订单金额"
              show-overflow-tooltip
              min-width="150"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span>{{ row.order_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="返点比例"
              show-overflow-tooltip
              min-width="100"
              prop="project_name"
            >
              <template slot-scope="{ row }">
                <span>{{ row.pay_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="本次回款金额"
              show-overflow-tooltip
              min-width="180"
              prop="project_name"
              fixed="right"
            >
              <template slot="header">
                <div class="header-money">
                  <el-input
                    v-model="totalMoney"
                    size="mini"
                    type="number"
                    placeholder="返点金额"
                    style="padding: 0"
                  />
                  <div class="header-money-actions">
                    <span
                      class="btn-distribution"
                      @click="handleComputedMoney(1)"
                      >分配</span
                    >
                    <span class="btn-fill" @click="handleComputedMoney(0)"
                      >填充</span
                    >
                  </div>
                </div>
              </template>
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.currentMoney"
                  size="mini"
                  type="number"
                  placeholder="回款金额"
                />
              </template>
            </el-table-column>
            <el-table-column
              show-overflow-tooltip
              min-width="100"
              fixed="right"
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

     <Title text="返点信息"></Title>
      <!-- <el-form-item label="机构名称" prop="from_organization_id">
        <el-select
          v-model="formData.from_organization_id"
          filterable
          clearable
          placeholder="请选择机构"
          @change="onOrgChange"
          :disabled="!!id"
        >
          <el-option
            v-for="item in institutionOptions"
            :key="item.from_organization_id"
            :label="item.institution_name"
            :value="item.from_organization_id"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="机构名称" prop="total_money">
        <el-input
          class="input"
          v-model="formData.total_money"
          type="number"
          placeholder="机构名称"
          @input="onInput"
        />
      </el-form-item>
      <!-- <el-form-item prop="pay_date" label="回款日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_date"
          value-format="yyyy-MM-dd"
          :picker-options="{
            disabledDate: disabledDate,
          }"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item label="应返点金额" prop="total_money">
        <el-input
          class="input"
          v-model="formData.total_money"
          type="number"
          placeholder="应返点金额"
          @input="onInput"
        />
      </el-form-item>
      <el-form-item label="申请返点金额" prop="total_money">
        <el-input
          class="input"
          v-model="formData.total_money"
          type="number"
          placeholder="申请返点金额"
          @input="onInput"
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

      <el-form-item label="备注信息" prop="note" class="block">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.note"
          placeholder="请输入内容"
        />
      </el-form-item>

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
  addReceivable,
  getOrgName,
  getCustomfieldOptions,
  getOrder,
  getCategory,
  getProject,
  getReceivableInfo,
  getExcelOrgReceivable,
} from "@/api/crm";
import { getShortcuts } from "@/utils/date";
import { accSub, download } from "@/utils";
export default {
  name: "AddCustomeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      accSub,
      visible: this.value,
      addLoading: false,
      formData: {
        from_organization_id: "",
        total_money: "",
        pay_type: "",
        pay_date: "",
        note: "",
      },
      rules: {
        total_money: [{ required: true, message: "请输入", trigger: "blur" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
        from_organization_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      payMethodOptions: [],
      institutionOptions: [],
      listData: [],
      listLoading: false,
      pageNum: 1,
      listTotal: 0,
      searchData: {
        date: "",
        user_name: "",
        arr_project: [],
      },
      searchOptions: [
        {
          key: "from_organization_id",
          type: "select",
          width: 120,
          optionValue: "from_organization_id",
          optionLabel: "institution_name",
          options: [],
          attrs: {
            placeholder: "所属机构",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "staff_id",
          type: "select",
          width: 120,
          options: [],
          optionValue: "staff_id",
          optionLabel: "staff_name",
          attrs: {
            placeholder: "学历形式",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "check_state",
          type: "select",
          width: 120,
          options: [],
          optionValue: "check_state",
          optionLabel: "title",
          attrs: {
            clearable: true,
            placeholder: "院校名称",
          },
        },
        {
          key: "check_state",
          type: "select",
          width: 120,
          options: [],
          optionValue: "check_state",
          optionLabel: "title",
          attrs: {
            clearable: true,
            placeholder: "层次名称",
          },
        },
        {
          key: "check_state",
          type: "select",
          width: 120,
          options: [],
          optionValue: "check_state",
          optionLabel: "title",
          attrs: {
            clearable: true,
            placeholder: "专业名称",
          },
        },
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
          key: "user_name",
          attrs: {
            placeholder: "姓名/手机号码",
          },
        },
      ],
      checkedOrderData: [],
      totalMoney: "",
      downloadLoading: false,
      //再次回款
      againListData: [],
      againListLoading: false,
      againData: {},
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {
    totalInputMoney() {
      if (this.id) {
        return this.againListData.reduce((p, c) => p + c.currentMoney * 1, 0);
      }
      return this.checkedOrderData.reduce((p, c) => p + c.currentMoney * 1, 0);
    },
  },
  methods: {
    handleOpen() {
      this.getCustomfieldOptions();
      this.getOrgName();
      if (this.id) {
        this.getReceivableInfo();
      }
    },
    handleExport() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          console.log(this.searchData);
          if (this.searchData.arr_project.length != 1) {
            this.$message.warning("请选择单个项目！");
            return;
          }
          this.getExcelOrgReceivable();
        }
      });
    },
    async getExcelOrgReceivable() {
      const data = {
        ...this.formData,
        project_id: this.searchData.arr_project[0],
      };
      this.downloadLoading = true;
      const res = await getExcelOrgReceivable(data).catch(() => {});
      this.downloadLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.$emit("on-success");
        download(res.data.url);
      }
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    onInput(val) {
      this.totalMoney = val;
    },
    // 回款详情数据
    async getReceivableInfo() {
      const data = {
        log_id: this.id,
      };
      this.againListLoading = true;
      const res = await getReceivableInfo(data).catch(() => {});
      this.againListLoading = false;
      if (res.code === 0) {
        this.againData = res.data.data;
        this.formData.from_organization_id = res.data?.data?.organization_id;
        this.againListData = res.data.list.map((item) => ({
          ...item,
          currentMoney: 0,
        }));
      }
    },
    handleComputedMoney(isDistribution) {
      const data = this.id ? this.againListData : this.checkedOrderData;
      const leng = data.length;
      const totalMoney = this.totalMoney;
      if (leng && totalMoney) {
        let value = totalMoney;
        if (isDistribution) {
          value = (totalMoney / leng + "").split(".")[0];
        }
        data.forEach((item) => {
          item.currentMoney = value;
        });
      }
    },
    onOrgChange() {
      this.hadleResetOrder();
      this.handlePageChange(1);
      this.getProject();
      this.getCategory();
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
      this.checkedOrderData = [...selection];
    },
    handleSearch(data) {
      this.pageNum = 1;
      const date = data.date || ["", ""];
      delete data.date;
      this.searchData = {
        ...data,
        start_date: date[0],
        end_date: date[1],
      };
      this.getOrder();
    },
    handleSizeChange(size) {
      this.pageNum = 1;
      this.pageSize = size;
      this.getOrder();
    },
    handlePageChange(val) {
      this.pageNum = val;
      this.getOrder();
    },
    async getOrder() {
      const data = {
        page: this.pageNum,
        limit: this.pageSize,
        from_organization_id: this.formData.from_organization_id,
        ...this.searchData,
      };
      this.listLoading = true;
      const res = await getOrder(data);
      this.listLoading = false;
      this.listData = res.data.list.map((item) => ({
        ...item,
        currentMoney: 0,
      }));
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },
    // 获取项目下拉
    async getProject() {
      const data = { from_organization_id: this.formData.from_organization_id };
      const res = await getProject(data);
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取所属分类
    async getCategory() {
      const data = { from_organization_id: this.formData.from_organization_id };
      const res = await getCategory(data);
      if (res.code === 0) {
        this.searchOptions[1].options = res.data;
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
    async getOrgName() {
      const res = await getOrgName();
      this.institutionOptions = res.data;
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.arr_receivable = this.againListData.map(
          ({ currentMoney: pay_money, order_id }) => ({ order_id, pay_money })
        );
      } else {
        data.arr_receivable = this.checkedOrderData.map((item) => {
          if (+item.currentMoney > +item.order_money) {
            this.$message.error(
              `客户 ${item.user_name} 的本次回款金额大于订单金额`
            );
            throw new Error("error");
          }
          return {
            order_id: item.order_id,
            pay_money: item.currentMoney,
          };
        });
      }
      this.addLoading = true;
      const res = await addReceivable(data).catch(() => {
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
      if (this.id) {
        this.againListData = [];
      } else {
        this.hadleResetOrder();
        this.pageNum = 1;
        this.pageSize = 20;
        this.totalMoney = "";
        this.$refs.searchList.handleReset();
        this.listData = [];
      }
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
    // border: 1px solid #efefef;
    border-bottom: none;
  }
  .again-table {
    flex: 1;
  }
  .order-table {
    width: 55%;
    border: 1px solid #efefef;
    margin-bottom: 20px;
    .table_bottom {
      padding-bottom: 0;
    }
  }
  .checked-table {
    border: 1px solid #efefef;
    width: 44%;
    margin-bottom: 20px;
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
      padding: 0;
      &-actions {
        width: 40px;
        flex-shrink: 0;
        font-size: 12px;
        font-weight: normal;
        display: flex;
        flex-direction: column;
        line-height: 1.5;
        padding: 0;
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
.el-dialog__footer{
  padding-top: 0;
}
.el-pagination{
  padding: 0 5px 10px 0;
}
.el-textarea{
  width: 91%;
}
</style>