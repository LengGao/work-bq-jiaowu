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
      <el-form-item label="回款日期" prop="date1">
        <el-date-picker
          class="input"
          type="date"
          placeholder="选择日期"
          v-model="formData.date1"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="回款期次" prop="region">
        <el-select
          class="input"
          v-model="formData.region"
          placeholder="请选择回款期次"
        >
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-button type="text" style="margin-left: 10px" title="配置回款计划"
          >配置</el-button
        >
      </el-form-item>
      <el-form-item label="回款金额" prop="title">
        <el-input
          class="input"
          v-model="formData.title"
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
      <el-form-item label="备注" prop="resource">
        <el-input
          style="width: 550px"
          v-model="formData.title"
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
import { updateClassType, createClassType } from "@/api/institution";
import { payWays } from "@/utils";
export default {
  name: "institutionDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      cityOptions: [],
      payWays,
      formData: {
        title: "",
        items: [],
        remark: "",
        options: [
          {
            label: "",
            id: 1,
          },
        ],
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
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
        title: this.formData.title,
        remark: this.formData.remark,
        has_question: +this.formData.items.includes(1),
        has_video: +this.formData.items.includes(2),
        has_live: +this.formData.items.includes(3),
        has_teach: +this.formData.items.includes(4),
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateClassType : createClassType;
      this.addLoading = true;
      const res = await api(data).catch(() => {
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
      this.formData.items = [];
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