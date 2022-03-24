<template>
  <el-dialog
    title="添加回款记录"
    :visible="value"
    width="80%"
    top="5vh"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="handleClose"
    class="add-collection-dialog"
  >
    <Title
      text="回款计划"
      style="display: flex; justify-content: space-between"
    >
      <span style="color: red; font-size: 14px">
        *回款时必须保证回款金额等于所选回款计划的总金额，如不相等请先修改回款计划</span
      >
    </Title>
    <div class="tables">
      <div class="plan-table">
        <el-table
          :data="planTableData"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
          @selection-change="handleOrderTableChange"
          ref="multipleTable"
          row-key="id"
          max-height="400"
        >
          <el-table-column
            type="selection"
            width="45"
            fixed="left"
            reserve-selection
            :selectable="disableRow"
          >
          </el-table-column>
          <el-table-column label="回款类型" min-width="100" align="center">
            <template slot-scope="{ row }">
              <el-select
                v-if="row.edit"
                v-model="row.type"
                placeholder="请选择"
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
              <span v-else>{{ expenseType[row.type] || "" }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属年份" min-width="120" align="center">
            <template slot-scope="{ row }">
              <el-select
                v-if="row.edit"
                v-model="row.year"
                placeholder="请选择"
                filterable
              >
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <span v-else>{{ row.year }}</span>
            </template>
          </el-table-column>
          <el-table-column label="计划回款日期" min-width="140" align="center">
            <template slot-scope="{ row }">
              <el-date-picker
                v-if="row.edit"
                style="width: 160px"
                type="date"
                placeholder="选择日期"
                v-model="row.day"
                value-format="yyyy-MM-dd"
                :picker-options="{
                  disabledDate: disabledPlanDate,
                }"
              ></el-date-picker>
              <span v-else>{{ row.day }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="计划回款金额"
            align="center"
            min-width="140"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <el-input
                v-if="row.edit"
                v-model="row.money"
                placeholder="请输入"
                type="number"
              />
              <span v-else>{{ row.money | moneyFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="已回款金额"
            align="center"
            min-width="120"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              <span>{{ row.pay_money | moneyFormat }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" min-width="120">
            <template
              slot-scope="{ row, $index: index }"
              v-if="!+row.pay_money"
            >
              <template v-if="row.edit">
                <el-button
                  type="text"
                  @click.stop="handlePlanCancel(row, index)"
                  >取消</el-button
                >
                <el-button
                  type="text"
                  :loading="row.loading"
                  @click="handleSavePlan(row)"
                  >保存</el-button
                >
              </template>
              <el-button v-else type="text" @click.stop="row.edit = true"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="plan-add" @click="handleAddPlan">
          <el-button type="text">+添加回款计划</el-button>
        </div>
      </div>
      <div class="checked-table">
        <el-table
          :data="checkedPlanData"
          :header-cell-style="{
            'text-align': 'center',
            'background-color': '#f8f8f8',
          }"
          :cell-style="{ 'text-align': 'center' }"
          max-height="400"
        >
          <el-table-column
            show-overflow-tooltip
            min-width="200"
            prop="user_name"
          >
            <template slot="header">
              <span>已选计划：{{ checkedPlanData.length }}</span>
            </template>
            <template slot-scope="{ row }">
              <span
                >{{ `${row.year}年 ${expenseType[row.type]} `
                }}{{ row.money | moneyFormat }}
              </span>
            </template>
          </el-table-column>

          <el-table-column show-overflow-tooltip min-width="80" fixed="right">
            <template slot="header">
              <el-button type="text" style="padding: 0" @click="hadleResetOrder"
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
    <Title text="回款记录"></Title>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      inline
    >
      <el-form-item label="回款日期" prop="pay_date">
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
      <el-form-item label="回款凭证" prop="receipt_file">
        <el-select
          v-show="false"
          multiple
          v-model="formData.receipt_file"
        ></el-select>
        <ImgListUpload v-model="formData.receipt_file" />
      </el-form-item>
      <el-form-item label="备注" prop="tips">
        <el-input
          style="width: 550px"
          v-model="formData.tips"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
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
  payLogCreate,
  getCustomfieldOptions,
  createOrderPayPlan,
  updateOrderPayPlan,
} from "@/api/crm";
import ImgListUpload from "@/components/imgListUpload";
import { getPlanYearOptions, currentYear } from "@/utils/date";
import { mapGetters } from "vuex";
import { accAdd } from "@/utils";
export default {
  name: "AddCollectionRecord",
  components: {
    ImgListUpload,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderId: {
      type: [String, Number],
      default: "",
    },
    planData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["expenseType"]),
  },
  data() {
    return {
      payMethodOptions: [],
      formData: {
        tips: "",
        pay_date: "",
        pay_money: "",
        pay_type: "",
        receipt_file: [],
      },
      rules: {
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
        receipt_file: [
          { required: true, message: "请上传", trigger: "change" },
        ],
      },
      addLoading: false,
      checkedPlanData: [],
      typeOptions: [
        {
          value: 1,
          label: "学费",
        },
        {
          value: 2,
          label: "报考费",
        },
        {
          value: 3,
          label: "教材费",
        },
        {
          value: 4,
          label: "平台费",
        },
        {
          value: 5,
          label: "考前辅导费",
        },
        {
          value: 6,
          label: "教务服务费",
        },
        {
          value: 7,
          label: "论文指导费",
        },
        {
          value: 8,
          label: "论文答辩费",
        },
      ],
      yearOptions: getPlanYearOptions(),
      planTableData: [],
    };
  },
  watch: {
    planData() {
      this.initPlanTableData();
    },
    checkedPlanData(data) {
      if (data) {
        let totalMoney = 0;
        data.forEach((item) => {
          totalMoney = accAdd(totalMoney, item.money);
        });
        this.formData.pay_money = totalMoney;
      }
    },
  },
  created() {
    this.initPlanTableData();
  },
  methods: {
    initPlanTableData() {
      this.planTableData = this.planData.map((item) => ({
        ...item,
        edit: false,
        loading: false,
      }));
    },
    // 修改计划
    async updateOrderPayPlan(row) {
      const { id, type, year, day, money } = row;
      const data = {
        id,
        type,
        year,
        day,
        money,
      };
      row.loading = true;
      const res = await updateOrderPayPlan(data).catch(() => {});
      row.loading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("refresh");
      }
    },
    // 新增计划
    async createOrderPayPlan(row) {
      const { edit, add, loading, id, ...restParams } = row;
      const data = {
        data: JSON.stringify([restParams]),
        order_id: this.orderId,
      };
      row.loading = true;
      const res = await createOrderPayPlan(data).catch(() => {});
      row.loading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("refresh");
      }
    },
    handleSavePlan(row) {
      const requireItem = {
        type: "",
        year: "",
        day: "",
        money: "",
      };
      for (const key in requireItem) {
        if (!row[key]) {
          this.$message.error("请完善计划数据后再保存！");
          return;
        }
      }

      if (row.add) {
        // 新增
        this.createOrderPayPlan(row);
      } else {
        // 编辑
        this.updateOrderPayPlan(row);
      }
    },
    handlePlanCancel(row, index) {
      if (row.add) {
        this.planTableData.splice(index, 1);
      } else {
        row.edit = false;
        this.$emit("refresh");
      }
    },
    handleAddPlan() {
      this.planTableData.push({
        type: "",
        year: currentYear,
        day: "",
        money: "",
        add: true,
        loading: false,
        id: Date.now(),
        edit: true,
      });
      this.$nextTick(() => {
        const el = document.querySelector(
          ".plan-table .el-table__body-wrapper"
        );
        el.scrollTop = 1000000;
      });
    },
    disableRow(row) {
      return !+row.pay_money && !row.add;
    },
    handleOpen() {
      this.getCustomfieldOptions();
    },
    // 右侧已选删除
    handleRemoveOrder(index) {
      this.$refs.multipleTable.selection.splice(index, 1);
      this.checkedPlanData.splice(index, 1);
    },
    // 右侧已选清空
    hadleResetOrder() {
      this.$refs.multipleTable.clearSelection();
    },
    handleOrderTableChange(selection) {
      this.checkedPlanData = [...selection];
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
    disabledPlanDate(e) {
      return Date.now() - 86400000 > e.getTime();
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    async submit() {
      const planIdArr = this.checkedPlanData.map((item) => item.id);
      if (!planIdArr.length) {
        this.$message.error("请选择回款计划");
        return;
      }
      const data = {
        ...this.formData,
        plan_id: planIdArr.join(","),
        receipt_file: this.formData.receipt_file.map(
          (item) => item.response.data.data.url
        ),
        order_id: this.orderId,
      };
      this.addLoading = true;
      const res = await payLogCreate(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-success");
        this.handleClose();
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
        tips: "",
        pay_date: "",
        pay_money: "",
        pay_type: "",
        receipt_file: [],
      };
      this.hadleResetOrder();
    },
    handleClose() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="less" scoped>
.add-collection-dialog {
  .input {
    width: 217px;
  }
  .tables {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    .plan-table {
      flex: 1;
      margin-right: 16px;
      border: 1px solid #ededed;
      .plan-add {
        margin: 14px 30px;
        border: 1px dashed #ddd;
        text-align: center;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
          border-color: #199fff;
        }
      }
    }
    .checked-table {
      width: 350px;
      border: 1px solid #ededed;
    }
  }
}
</style>