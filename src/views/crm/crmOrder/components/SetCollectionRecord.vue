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
import { payWays } from "@/utils";
export default {
  name: "SetCollectionRecord",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    staffOptions: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      visible: this.value,
      payWays,
      formData: {
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
    handleOpen() {
      if ("pay_date" in this.data) {
        this.formData = { ...this.data };
      }
    },
    disabledDate(e) {
      return e.getTime() > Date.now();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit("on-success", { ...this.formData, pay_status: 1 });
          this.hanldeCancel();
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