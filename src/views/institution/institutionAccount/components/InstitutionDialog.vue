<template>
  <!--添加编辑机构弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="600px"
    @open="handleOpen"
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
      <el-form-item label="机构名称" prop="institution_name">
        <el-input
          v-model="formData.institution_name"
          placeholder="请输入机构名称"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="机构地址">
        <div class="address">
          <el-cascader
            clearable
            filterable
            :props="props"
            v-model="formData.city"
            placeholder="请选机构地址"
            class="w-100"
            :options="cityOptions"
          >
          </el-cascader>
          <el-input
            class="detailed"
            v-model="formData.address"
            placeholder="请输入详细地址"
            maxlength="40"
          />
        </div>
      </el-form-item>
      <el-form-item label="开通服务">
        <el-checkbox-group v-model="formData.items">
          <el-checkbox :label="1">小程序</el-checkbox>
          <el-checkbox :label="2">H5</el-checkbox>
          <el-checkbox :label="3" disabled>东培学堂</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="小程序名称" prop="app_name">
        <el-input
          v-model="formData.app_name"
          placeholder="请输入小程序名称"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="H5网校名称" prop="h5_name">
        <el-input
          v-model="formData.h5_name"
          placeholder="请输入H5网校名称"
          maxlength="30"
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
import {
  modifyInstitution,
  createInstitution,
  getRegionOptions,
  getInstitutionDetail,
} from "@/api/institution";
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
      formData: {
        institution_name: "",
        items: [3],
        address: "",
        app_name: "",
        h5_name: "",
        city: [],
      },
      rules: {
        institution_name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        app_name: [{ required: true, message: "请输入", trigger: "blur" }],
        h5_name: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      props: {
        value: "id",
        label: "name",
        children: "child",
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      !this.cityOptions.length && this.getRegionOptions();
      this.id && this.getInstitutionDetail();
    },
    async getInstitutionDetail() {
      const data = { institution_id: this.id };
      const res = await getInstitutionDetail(data);
      if (res.code === 0) {
        this.formData.institution_name = res.data.institution_name;
        this.formData.city = [res.data.province, res.data.city, res.data.area];
        this.formData.address = res.data.address;
        this.formData.app_name = res.data.app_name;
        this.formData.h5_name = res.data.h5_name;
        this.formData.institution_name = res.data.institution_name;
        !!res.data.h5 && this.formData.items.push(2);
        !!res.data.small_program && this.formData.items.push(1);
      }
    },
    async getRegionOptions(id = 1) {
      const data = { id };
      const res = await getRegionOptions(data);
      if (res.code === 0) {
        this.cityOptions = res.data;
      }
    },
    async submit() {
      const data = {
        institution_name: this.formData.institution_name,
        province: this.formData.city[0] || "",
        city: this.formData.city[1] || "",
        area: this.formData.city[2] || "",
        address: this.formData.address,
        app_name: this.formData.app_name,
        h5_name: this.formData.h5_name,
        h5: +this.formData.items.includes(2),
        small_program: +this.formData.items.includes(1),
      };
      if (this.id) {
        data.institution_id = this.id;
      }
      const api = this.id ? modifyInstitution : createInstitution;
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
        this.formData[k] = Array.isArray(this.formData[k]) ? [] : "";
      }
      this.formData.items = [3];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
</style>