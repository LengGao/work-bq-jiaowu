<template>
  <!--添加仓库弹框-->
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="visible"
    width="500px"
    class="add-warehouse"
    @open="handleOpen"
    @closed="resetForm('ruleForm')"
  >
    <el-form
      v-loading="detailLoading"
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-col :lg="20" :sm="20" :xs="20" :md="20">
          <el-form-item label="仓库名称" prop="storage_name">
            <el-input
              maxlength="30"
              placeholder="请输入仓库名称"
              v-model.trim="formData.storage_name"
              class="input-width"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="20" :sm="20" :xs="20" :md="20">
          <el-form-item label="关联机构" prop="organization_id">
            <el-cascader
              clearable
              filterable
              style="width: 100%"
              placeholder="请选择关联机构"
              v-model="formData.organization_id"
              :options="selectData"
            ></el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hanldeCancel">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('ruleForm')"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { addstorage, getStorageById, editstorage } from "@/api/sou";
export default {
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
    selectData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        storage_name: "",
        organization_id: "",
      },
      rules: {
        storage_name: [
          { required: true, message: "请输入仓库名称", trigger: "blur" },
        ],
        organization_id: [
          { required: true, message: "请选择机构", trigger: "change" },
        ],
      },
      addLoading: false,
      detailLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      if (this.id) {
        this.getStorageById();
      }
    },
    async getStorageById() {
      const data = {
        storage_id: this.id,
      };
      this.detailLoading = true;
      const res = await getStorageById(data).catch(() => {
        this.detailLoading = false;
      });
      this.detailLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        organization_id: Array.isArray(this.formData.organization_id)
          ? [...this.formData.organization_id].pop()
          : this.formData.organization_id,
      };
      if (this.id) {
        data.storage_id = this.id;
      }
      const api = this.id ? editstorage : addstorage;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(`仓库${this.id ? "编辑" : "新增"}成功`);
        this.hanldeCancel();
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