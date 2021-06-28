<template>
  <!--添加编辑章节弹窗-->
  <el-dialog
    title="迁移学员"
    :visible.sync="visible"
    width="450px"
    @open="getAdminSelect"
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
      <el-form-item label="老师名称" prop="admin_id">
        <el-select v-model="formData.admin_id" placeholder="请选择">
          <el-option
            v-for="item in teacherList"
            :key="item.staff_id"
            :label="item.staff_name"
            :value="item.staff_id"
          >
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
import { moveUserToNewStaff, getAdminSelect } from "@/api/eda";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        admin_id: "",
      },
      rules: {
        admin_id: [{ required: true, message: "请选择", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      teacherList: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    async getAdminSelect() {
      this.detaiLoading = true;
      const res = await getAdminSelect().catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        this.teacherList = res.data;
      }
    },
    async submit() {
      const data = {
        new_staff_id: this.formData.admin_id,
        origin_staff_id: this.id,
      };
      this.addLoading = true;
      const res = await moveUserToNewStaff(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.resetForm("formData");
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
      for (const k in this.formData) {
        this.formData[k] = "";
      }
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