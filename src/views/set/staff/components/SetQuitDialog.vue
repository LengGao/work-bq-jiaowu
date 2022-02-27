<template>
  <el-dialog
    title="一键离职"
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
      <el-form-item label="数据接收人" prop="receive_staff">
        <el-select
          v-model="formData.receive_staff"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            :label="item.staff_name"
            v-for="item in staffOptions"
            :key="item.staff_id"
            :value="item.staff_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="离职日期" prop="leave_date">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="formData.leave_date"
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
import { oneKeyEnd } from "@/api/set";
import { getAdminSelect } from "@/api/eda";
export default {
  name: "SetQuitDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    staffId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      addLoading: false,
      staffOptions: [],
      formData: {
        receive_staff: "",
        leave_date: null,
      },
      rules: {
        receive_staff: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
    };
  },

  methods: {
    handleOpen() {
      this.getAdminSelect();
    },
    // 获取员工
    async getAdminSelect() {
      const res = await getAdminSelect();
      if (res.code === 0) {
        this.staffOptions = res.data.filter(
          (item) => item.staff_id != this.staffId
        );
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        staff_id: this.staffId,
      };
      this.addLoading = true;
      const res = await oneKeyEnd(data).catch(() => {
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
        receive_staff: "",
        leave_date: null,
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>


