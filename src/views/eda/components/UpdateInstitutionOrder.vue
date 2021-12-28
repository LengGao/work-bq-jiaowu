<template>
  <el-dialog
    title="更换订单所属机构"
    :visible.sync="visible"
    width="450px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @open="handleOpen"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="机构名称" prop="institution_id">
        <el-select
          v-model="formData.institution_id"
          filterable
          clearable
          placeholder="请选择机构"
        >
          <el-option
            v-for="item in institutionOptions"
            :key="item.institution_id"
            :label="item.institution_name"
            :value="item.institution_id"
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
import { changeOrderOrgId } from "@/api/eda";
import { switchList } from "@/api/crm";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    orderIds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        institution_id: "",
      },
      rules: {
        institution_id: [
          { required: true, message: "请选择", trigger: "blur" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      institutionOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.switchList();
    },
    async switchList() {
      const res = await switchList();
      this.institutionOptions = [
        {
          institution_id: 0,
          institution_name: "清除为非机构订单",
        },
      ].concat(res.data.list);
    },
    async submit() {
      const from_organization_id = this.formData.institution_id;
      const data = {
        from_organization_id,
        order_id_arr: this.orderIds,
      };
      this.addLoading = true;
      const res = await changeOrderOrgId(data).catch(() => {
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
      this.formData.institution_id = "";
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