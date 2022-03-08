<template>
  <el-dialog
    title="退款作废"
    :visible="value"
    width="600px"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
  >
    <Title text="订单信息"></Title>
    <div class="order-info">
      <div class="order-info-item">订单编号：555555</div>
    </div>
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      inline
      ref="formData"
    >
      <el-form-item label="到期类型" prop="dateType">
        <el-radio-group v-model="formData.dateType">
          <el-radio label="1">选择周期</el-radio>
          <el-radio label="2">指定日期</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="到期日期" prop="expire_time">
        <el-select
          v-if="formData.dateType == 1"
          v-model="formData.expire_time"
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
          v-model="formData.expire_time"
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
import { updateProjectUserExpireTime } from "@/api/eda";
export default {
  name: "RefundDialog",
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
          label: "五年",
          value: 5,
        },
        {
          label: "永久",
          value: "-1",
        },
      ],
      formData: {
        dateType: "1",
        expire_time: "",
      },
      rules: {
        dateType: [{ required: true, message: "请选择", trigger: "change" }],
        expire_time: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },

  methods: {
    handleOpen() {},

    async submit() {
      const { expire_time } = this.formData;
      const data = {
        expire_time,
        id_arr: this.ids,
      };
      this.addLoading = true;
      const res = await updateProjectUserExpireTime(data).catch(() => {
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
      this.formData = {
        dateType: "1",
        expire_time: "",
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>


