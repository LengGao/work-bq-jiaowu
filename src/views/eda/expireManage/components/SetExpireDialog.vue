<template>
  <el-dialog
    :title="`设置到期`"
    :visible="value"
    width="400px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="到期日期" prop="dateType">
        <el-radio-group v-model="formData.dateType">
          <el-radio label="1">选择周期</el-radio>
          <el-radio label="2">指定日期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label=" ">
        <el-select
          v-if="formData.dateType == 1"
          v-model="formData.dateRange"
          placeholder="请选择周期"
        >
          <el-option
            :label="item.label"
            v-for="item in dateRangeOptions"
            :key="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-else
          type="date"
          placeholder="选择日期"
          v-model="formData.date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >保 存</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addGrade, updateGrade } from "@/api/sou";
export default {
  name: "SetExpireDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    ids: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      addLoading: false,
      dateRangeOptions: [
        {
          label: "一年",
          value: 1,
        },
        {
          label: "两年",
          value: 2,
        },
        {
          label: "三年",
          value: 3,
        },
        {
          label: "四年",
          value: 4,
        },
        {
          label: "永久",
          value: 5,
        },
      ],
      formData: {
        dateType: "1",
        dateRange: "",
        date: "",
      },
      rules: {
        dateType: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },

  methods: {
    handleOpen() {},

    async submit() {
      const data = {
        ...this.formData,
      };
      this.addLoading = true;
      const res = await addGrade(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("success");
        this.hanldeClose();
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
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>


