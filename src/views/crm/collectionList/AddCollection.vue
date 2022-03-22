<template>
  <div class="add-collection">
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="回款信息"></Title>
      <el-form-item label="所属老师" prop="staff_id">
        <el-select
          v-model="formData.staff_id"
          filterable
          placeholder="请选择所属老师"
          @change="onStaffChange"
        >
          <el-option
            v-for="item in staffOptions"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回款类型" prop="type">
        <el-select
          v-model="formData.type"
          placeholder="请选择回款类型"
          class="input"
          filterable
        >
          <el-option
            v-for="(label, value) in expenseType"
            :key="value"
            :label="label"
            :value="value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属年份" prop="year">
        <el-select v-model="formData.year" placeholder="请选择" filterable>
          <el-option
            v-for="item in yearOptions"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="回款金额" prop="total_money">
        <el-input
          class="input"
          :value="totalInputMoney"
          type="number"
          disabled
        />
      </el-form-item>
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
          >
            <el-table-column
              type="selection"
              width="45"
              fixed="left"
              reserve-selection
            >
            </el-table-column>
            <el-table-column
              prop="surname"
              label="学生姓名"
              min-width="80"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="项目名称"
              show-overflow-tooltip
              min-width="200"
              prop="project_name"
            >
            </el-table-column>
            <el-table-column
              prop="jiebie_name"
              label="届别名称"
              min-width="100"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              label="订单金额"
              show-overflow-tooltip
              min-width="120"
              prop="order_money"
            >
              <template slot-scope="{ row }">
                <span>{{ row.order_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="学费金额"
              show-overflow-tooltip
              min-width="120"
              prop="order_money"
            >
              <template slot-scope="{ row }">
                <span>{{ row.order_money | moneyFormat }} </span>
              </template>
            </el-table-column>
            <el-table-column
              label="其他金额"
              show-overflow-tooltip
              min-width="120"
              prop="order_money"
            >
              <template slot-scope="{ row }">
                <span>{{ row.order_money | moneyFormat }} </span>
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
          <el-table
            :data="formData.checkedOrderData"
            :header-cell-style="{
              'text-align': 'center',
              'background-color': '#f8f8f8',
            }"
            :cell-style="{ 'text-align': 'center' }"
            height="500"
          >
            <el-table-column
              show-overflow-tooltip
              min-width="80"
              prop="surname"
            >
              <template slot="header">
                <span>已选（{{ formData.checkedOrderData.length }}）</span>
              </template>
            </el-table-column>
            <el-table-column min-width="120" prop="pay_money">
              <template slot="header">
                <div
                  title="双击复制（同时编辑多个时有效）"
                  class="header-copy"
                  @dblclick="handleHeaderDblclick('pay_money')"
                >
                  <span>回款金额</span>
                  <i class="el-icon-document-copy"></i>
                </div>
              </template>
              <template slot-scope="{ row, $index: index }">
                <el-form-item
                  :rules="[
                    { required: true, message: `请输入`, trigger: 'blur' },
                  ]"
                  :prop="`checkedOrderData[${index}].pay_money`"
                >
                  <el-input
                    v-model="row.pay_money"
                    placeholder="请输入"
                    type="number"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="回款日期" min-width="120" align="center">
              <template slot-scope="{ row, $index: index }">
                <el-form-item
                  :rules="[
                    { required: true, message: `请选择`, trigger: 'change' },
                  ]"
                  :prop="`checkedOrderData[${index}].pay_day`"
                >
                  <el-date-picker
                    style="width: 100%"
                    type="date"
                    placeholder="选择日期"
                    v-model="row.pay_day"
                    value-format="yyyy-MM-dd"
                    :picker-options="{
                      disabledDate: disabledDate,
                    }"
                  ></el-date-picker>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="支付方式" min-width="120" align="center">
              <template slot-scope="{ row, $index: index }">
                <el-form-item
                  :rules="[
                    { required: true, message: `请选择`, trigger: 'change' },
                  ]"
                  :prop="`checkedOrderData[${index}].pay_type`"
                >
                  <el-select
                    v-model="row.pay_type"
                    placeholder="请选择支付方式"
                    filterable
                    style="width: 100%"
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
              </template>
            </el-table-column>
            <el-table-column label="回款凭证" min-width="160" align="center">
              <template slot-scope="{ row, $index: index }">
                <el-form-item
                  :rules="[
                    { required: true, message: `请上传`, trigger: 'change' },
                  ]"
                  :prop="`checkedOrderData[${index}].receipt_file`"
                >
                  <el-select
                    v-show="false"
                    multiple
                    v-model="row.receipt_file"
                  ></el-select>
                  <ImgListUpload
                    size="mini"
                    style="height: 40px"
                    v-model="row.receipt_file"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip min-width="80" fixed="right">
              <template slot="header">
                <el-button
                  type="text"
                  style="color: red"
                  @click="hadleResetOrder"
                  >清空</el-button
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
    <div class="footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >确 定</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  addReceivable,
  getCustomfieldOptions,
  getCrmOrderList,
  getProject,
} from "@/api/crm";
import { getStaffList } from "@/api/set";
import { getCateList, getGradeOptions } from "@/api/sou";
import { getShortcuts, getPlanYearOptions } from "@/utils/date";
import { accAdd } from "@/utils";
import ImgListUpload from "@/components/imgListUpload";
import { mapGetters } from "vuex";
export default {
  name: "addInCrmCollection",
  components: {
    ImgListUpload,
  },
  data() {
    return {
      addLoading: false,
      formData: {
        staff_id: "",
        year: "",
        type: "",
        checkedOrderData: [],
      },
      rules: {
        type: [{ required: true, message: "请选择", trigger: "change" }],
        year: [{ required: true, message: "请选择", trigger: "change" }],
        staff_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      payMethodOptions: [],
      staffOptions: [],
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
          type: "select",
          width: 150,
          options: [],
          optionValue: "category_id",
          optionLabel: "category_name",
          attrs: {
            placeholder: "所属分类（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "project_id",
          type: "select",
          options: [],
          optionValue: "project_id",
          optionLabel: "project_name",
          attrs: {
            placeholder: "所属项目（多选）",
            clearable: true,
            filterable: true,
            multiple: true,
            "collapse-tags": true,
          },
        },
        {
          key: "jiebie_id",
          type: "select",
          options: [],
          optionValue: "id",
          optionLabel: "category_name,title",
          attrs: {
            placeholder: "届别名称",
            clearable: true,
            filterable: true,
          },
        },
        {
          key: "user_name",
          width: 600,
          attrs: {
            placeholder: "输入多个姓名时，可用空格隔开",
            type: "textarea",
            autosize: { minRows: 1, maxRows: 4 },
          },
        },
      ],
      yearOptions: getPlanYearOptions(),
    };
  },
  computed: {
    ...mapGetters(["expenseType"]),
    totalInputMoney() {
      return this.formData.checkedOrderData.reduce(
        (p, c) => accAdd(p, c.pay_money),
        0
      );
    },
  },
  created() {
    this.getCustomfieldOptions();
    this.getStaffList();
  },
  methods: {
    // 所属老师
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.staffOptions = res.data.list;
    },
    // 双击表头复制指定金额
    handleHeaderDblclick(field) {
      let value = "";
      this.formData.checkedOrderData.forEach((item) => {
        if (value !== "") {
          item[field] = value;
        } else {
          value = item[field];
        }
      });
    },
    // 获取届别选项
    async getGradeOptions() {
      const res = await getGradeOptions();
      if (res.code === 0) {
        this.searchOptions[3].options = res.data;
      }
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    onStaffChange() {
      this.hadleResetOrder();
      this.handlePageChange(1);
      this.getProject();
      this.getGradeOptions();
      this.getCateList();
    },
    // 右侧已选删除
    handleRemoveOrder(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.formData.checkedOrderData.splice(index, 1);
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
      this.formData.checkedOrderData = selection;
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
        staff_id: this.formData.staff_id,
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
      this.listData = res.data.list.map((item) => ({
        ...item,
        pay_money: "",
        pay_date: "",
        pay_type: "",
        receipt_file: [],
      }));
      this.listTotal = res.data.total;
      this.panelData = res.data.count || {};
    },
    // 获取项目下拉
    async getProject() {
      const res = await getProject();
      if (res.code === 0) {
        this.searchOptions[2].options = res.data;
      }
    },
    // 获取所属分类
    async getCateList() {
      const res = await getCateList();
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
    async submit() {
      const data = {
        ...this.formData,
      };
      data.arr_receivable = this.formData.checkedOrderData.map((item) => {
        if (item.pay_money > item.order_money) {
          this.$message.error(
            `客户 ${item.user_name} 的本次回款金额大于订单金额`
          );
          throw new Error("error");
        }
        return {
          order_id: item.order_id,
          pay_money: item.pay_money,
          pay_date: item.pay_date,
          pay_type: item.pay_type,
          receipt_file: item.receipt_file.map(
            (item) => item.response.data.data.url
          ),
        };
      });
      this.addLoading = true;
      const res = await addReceivable(data).catch(() => {});
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
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
      this.formData = {
        staff_id: "",
        total_money: "",
        pay_type: "",
        pay_date: "",
        note: "",
        year: "",
        type: "",
        receipt_file: [],
      };
      this.hadleResetOrder();
      this.pageNum = 1;
      this.pageSize = 20;
      this.$refs.searchList.handleReset();
      this.listData = [];
    },
    hanldeCancel() {
      this.$router.replace({
        name: "collectionList",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add-collection {
  padding: 16px;
  .input {
    width: 217px;
  }
  .tables {
    display: flex;
    justify-content: space-between;
    /deep/.el-table {
      border: 1px solid #efefef;
      border-bottom: none;
    }
    .header-copy {
      cursor: pointer;
      i {
        margin-left: 2px;
      }
    }
    .order-table {
      width: 49%;
      .table_bottom {
        padding-bottom: 0;
      }
    }
    .checked-table {
      width: 50%;
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
    }
  }
  .footer {
    padding: 30px 0;
    text-align: center;
    button {
      margin-left: 30px;
    }
  }
}
</style>