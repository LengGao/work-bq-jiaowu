<template>
  <el-dialog
    title="二次开发"
    :visible.sync="visible"
    width="450px"
    @open="getStaffList"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="老师名称" prop="staff_id">
        <el-select
          class="input"
          v-model="formData.staff_id"
          placeholder="请选择"
          clearable
          filterable
        >
          <el-option
            v-for="item in staffOptions"
            :key="item.staff_id"
            :value="item.staff_id"
            :label="item.staff_name"
          >
            <span style="float: left">{{ item.staff_name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.group_name
            }}</span>
          </el-option>
        </el-select>
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
import { getStaffList } from "@/api/set";
import { secondDevelop } from "@/api/crm";
export default {
  name: "ResetDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    uids: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        staff_id: "",
      },
      rules: {
        staff_id: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      staffOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      this.detaiLoading = true;
      const res = await getStaffList(data).catch(() => {});
      this.detaiLoading = false;
      if (res.code === 0) {
        this.staffOptions = res.data.list;
      }
    },
    async secondDevelop() {
      const data = {
        staff_id: this.formData.staff_id,
        uid_arr: this.uids,
      };
      this.addLoading = true;
      const res = await secondDevelop(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },

    async submit() {
      this.secondDevelop();
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    resetForm(formName) {
      this.formData.staff_id = "";
      this.$refs[formName].resetFields();
      this.hanldeCancel();
    },
    hanldeCancel() {
      this.$emit("input", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>