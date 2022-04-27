<template>
  <el-dialog
    title="转交工单"
    :visible="value"
    width="400px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @close="hanldeClose"
    @open="hanldeOpen"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
    >
      <el-form-item label="处理人员" prop="staff_id">
        <el-select
          v-model="formData.staff_id"
          placeholder="请选择"
          clearable
          filterable
          style="width: 100%"
        >
          <el-option
            v-for="item in staffOptions"
            :key="item.staff_id"
            :value="item.staff_id"
            :label="item.staff_name"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.department_name
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注信息">
        <el-input
          class="remark"
          type="textarea"
          v-model="formData.message"
          placeholder="请输入备注信息"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >提 交</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { deliverWorkorder, getStaffSelect } from "@/api/set";
export default {
  name: "TransferWorkOrder",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      addLoading: false,
      staffOptions: [],
      formData: {
        staff_id: "",
        message: "",
      },
      rules: {
        staff_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
    };
  },

  methods: {
    hanldeOpen() {
      this.getStaffSelect();
    },
    async getStaffSelect() {
      const res = await getStaffSelect();
      if (res.code === 0) {
        this.staffOptions = res.data;
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        id: this.$route.query.id,
      };
      this.addLoading = true;
      const res = await deliverWorkorder(data).catch(() => {
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
        staff_id: "",
        message: "",
      };
    },
    hanldeClose() {
      this.$emit("input", false);
    },
  },
};
</script>


