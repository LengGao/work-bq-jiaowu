<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="750px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
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
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回款期次" prop="region">
        <el-select
          class="input"
          v-model="formData.plan_id"
          placeholder="请选择回款期次"
          clearable
        >
          <el-option
            v-for="(item, index) in planOptions"
            :key="item.id"
            :label="`第${index + 1}期 ${item.day} ￥${(
              +item.money || 0
            ).toFixed(2)}`"
            :value="item.id"
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
            v-for="item in payWays"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
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
import { payLogCreate } from "@/api/crm";
import { payWays } from "@/utils";
import AddCollectionPlan from "./AddCollectionPlan";
export default {
  name: "AddCollectionRecord",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    orderId: {
      type: [String, Number],
      default: "",
    },
    planOptions: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    AddCollectionPlan,
  },
  data() {
    return {
      visible: this.value,
      payWays,
      formData: {
        plan_id: "",
        tips: "",
        pay_date: "",
        pay_money: "",
        pay_type: "",
      },
      rules: {
        pay_money: [{ required: true, message: "请输入", trigger: "blur" }],
        pay_date: [{ required: true, message: "请选择", trigger: "change" }],
        pay_type: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {},
    addOption() {
      this.formData.options.push({
        label: "",
        id: Date.now(),
      });
    },
    delOption(index) {
      this.formData.options.splice(index, 1);
    },
    async submit() {
      const data = {
        ...this.formData,
        order_id: this.orderId,
      };
      this.addLoading = true;
      const res = await payLogCreate(data).catch(() => {
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
</style>