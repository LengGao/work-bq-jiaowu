<template>
  <div>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <Title text="回款计划"></Title>
      <el-form-item label="回款类型" prop="type">
        <el-checkbox-group
          v-model="formData.type"
          @change="handleCheckboxChange"
        >
          <el-checkbox
            :label="value"
            name="type"
            v-for="(name, value) in planTypeMap"
            :key="value"
            >{{ name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-table
        class="plan-table"
        :data="formData.tableData"
        :header-cell-style="{
          'text-align': 'center',
          'background-color': '#f8f8f8',
        }"
      >
        <el-table-column
          label="序号"
          show-overflow-tooltip
          min-width="50"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column
          label="回款类型"
          show-overflow-tooltip
          min-width="80"
          align="center"
        >
          <template slot-scope="{ row }">
            <span>
              {{ planTypeMap[row.type] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="所属年份"
          show-overflow-tooltip
          min-width="120"
          align="center"
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              class="table-form-item"
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].year`"
            >
              <el-select v-model="row.year" placeholder="请选择" filterable>
                <el-option
                  v-for="item in yearOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款日期"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              class="table-form-item"
              :rules="[
                { required: true, message: `请选择`, trigger: 'change' },
              ]"
              :prop="`tableData[${index}].day`"
            >
              <el-date-picker
                class="input"
                type="date"
                placeholder="选择日期"
                v-model="row.day"
                value-format="yyyy-MM-dd"
                :picker-options="{
                  disabledDate: disabledDate,
                }"
              ></el-date-picker>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="计划回款金额"
          align="center"
          min-width="160"
          show-overflow-tooltip
        >
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              class="table-form-item"
              :rules="[{ required: true, message: `请输入`, trigger: 'blur' }]"
              :prop="`tableData[${index}].money`"
            >
              <el-input
                v-model="row.money"
                placeholder="请输入"
                type="number"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center"
          min-width="100"
        >
          <template slot-scope="{ row, $index: index }">
            <el-button
              @click="handleDelRow(index)"
              class="btn"
              type="text"
              :disabled="formData.tableData.length <= 1"
              icon="el-icon-remove-outline"
            ></el-button>
            <el-button
              @click="handleAddRow(row.type)"
              class="btn"
              type="text"
              icon="el-icon-circle-plus-outline"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <Title text="回款信息"></Title>
      <el-form-item prop="pay_day" label="回款日期">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.pay_day"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item
        label="回款计划"
        prop="pay_plan_ids"
        :rules="[
          {
            required: true,
            message: `请选择`,
            trigger: 'change',
          },
        ]"
      >
        <el-select
          class="input"
          v-model="formData.pay_plan_ids"
          placeholder="请选择回款计划"
          clearable
          multiple
        >
          <el-option
            v-for="item in formData.tableData"
            :key="item.temp_id"
            :label="`${planTypeMap[item.type]} ${item.year} ￥${(
              +item.money || 0
            ).toFixed(2)}`"
            :value="item.temp_id"
          >
          </el-option>
        </el-select>
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

      <el-form-item label="回款凭证">
        <ImgListUpload v-model="formData.receipt_file" />
      </el-form-item>
    </el-form>

    <span class="dialog-footer">
      <span class="tips"
        >*回款时必须保证回款金额等于所选回款计划的总金额，如不相等请先修改回款计划</span
      >
      <el-button @click="$emit('prev')">上一步</el-button>
      <el-button @click="submitForm('formData', true)">预览合同</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
    <PreviewContract v-model="previewDialog" :data="previewContractData" />
  </div>
</template>

<script>
import { createOrder, getCustomfieldOptions, getPlanTypeList } from "@/api/crm";
import { getPlanYearOptions, currentYear } from "@/utils/date";
import ImgListUpload from "@/components/imgListUpload";
import PreviewContract from "./PreviewContract";
export default {
  name: "PaymentCollectionInfo",
  props: {
    orderInfoParams: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    ImgListUpload,
    PreviewContract,
  },
  data() {
    return {
      tempId: 1,
      formData: {
        type: [],
        tableData: [],
        pay_day: "",
        pay_money: "",
        pay_type: "",
        pay_plan_ids: [],
        receipt_file: [],
      },
      rules: {
        type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
        pay_day: [{ required: true, message: "请选择", trigger: "change" }],
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      planOptions: [],
      payMethodOptions: [],
      yearOptions: getPlanYearOptions(),
      previewDialog: false,
      previewContractData: {},
      planTypeMap: {},
    };
  },
  created() {
    this.getCustomfieldOptions();
    this.getPlanTypeList();
  },
  methods: {
    async getPlanTypeList() {
      const res = await getPlanTypeList();
      if (res.code === 0) {
        this.planTypeMap = res.data;
      }
    },
    handleCheckboxChange(checked) {
      checked = checked || [];
      const types = this.formData.tableData.map((item) => item.type);
      types.forEach((type, index) => {
        if (!checked.includes(type)) {
          this.handleDelRow(index);
        }
      });
      checked.forEach((type) => {
        if (!types.includes(type)) {
          this.handleAddRow(type);
        }
      });
    },
    disabledDate(e) {
      return Date.now() - 86400000 > e.getTime();
    },
    handleDelRow(index) {
      this.formData.tableData.splice(index, 1);
    },
    getTempId() {
      return this.tempId++;
    },
    handleAddRow(type) {
      this.formData.tableData.push({
        temp_id: this.getTempId(),
        type,
        year: currentYear,
        day: "",
        money: "",
      });
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
    // 报名缴费
    async createOrder(isPreview) {
      const { tableData, type, pay_plan_ids, receipt_file, ...restParams } =
        this.formData;

      const data = {
        ...this.orderInfoParams,
        ...restParams,
        order_token: Date.now(),
        pay_plan_ids: (pay_plan_ids || []).join(","),
        receipt_file: receipt_file.map((item) => item.response.data.data.url),
        pay_plan: tableData,
      };
      if (isPreview) {
        // 预览合同
        this.previewContractData = data;
        this.previewDialog = true;
        return;
      }
      const res = await createOrder(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.hanldeCancel();
      }
    },
    submitForm(formName, isPreview) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.createOrder(isPreview);
        }
      });
    },
    hanldeCancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 240px;
}
.plan-table {
  margin-bottom: 20px;
  border: 1px solid #ededed;
  border-bottom: none;
  .table-form-item {
    // margin-bottom: 6px;
  }
  .btn {
    margin-top: -10px;
    padding: 6px 0;
    font-size: 20px;
  }
}
.dialog-footer {
  display: flex;
  align-items: center;
  .tips {
    color: red;
    margin-right: auto;
  }
}
/deep/.el-form-item {
  margin-right: 30px;
}
.block {
  width: 100%;
  /deep/.el-form-item__content {
    width: 80%;
  }
}
</style>
