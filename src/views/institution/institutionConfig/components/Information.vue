<template>
  <div class="mainwrap">
    <el-form
      :label-position="labelPosition"
      label-width="90px"
      :model="formData"
    >
      <el-form-item label="机构名称">
        <el-input
          class="input-width"
          v-model="formData.institution_name"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="机构地址" class="addrens">
        <el-cascader
          placeholder="请选择地址"
          filterable
          clearable
          size="large"
          class="w-180"
          :options="cityOptions"
          v-model="selectedOptions"
          @change="handleChange"
          :props="{
            value: 'id',
            label: 'name',
            children: 'child',
          }"
        >
        </el-cascader>
        <el-input
          class="w-170"
          placeholder="请输入详细地址"
          v-model="formData.address"
        ></el-input>
      </el-form-item>
      <el-form-item label="开通服务" prop="type">
        <el-checkbox-group v-model="type">
          <el-checkbox :label="1" disabled> 小程序</el-checkbox>
          <el-checkbox :label="2" disabled>H5</el-checkbox>
          <el-checkbox :label="3" disabled>东培学堂</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="小程序名称">
        <el-input
          class="input-width"
          placeholder="请输入"
          v-model="formData.app_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="H5网校名称">
        <el-input
          class="input-width"
          placeholder="请输入"
          v-model="formData.h5_name"
        ></el-input>
      </el-form-item>
      <el-form-item label="H5网校连接">
        <el-input
          class="input-width"
          v-model="formData.h5_url"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getInstitutionDetail" class="reset">取 消</el-button>
        <el-button @click="modifyInstitutionConfig" type="primary"
          >保 存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getInstitutionDetail,
  modifyInstitutionConfig,
  getRegionOptions,
} from "@/api/institution";
export default {
  name: "Information",
  data() {
    return {
      labelPosition: "right",
      formData: {
        institution_name: "",
        address: "",
        h5_url: "",
        h5_name: "",
        app_name: "",
        province: "",
        city: "",
        area: "",
      },
      type: [3],
      cityOptions: [],
      selectedOptions: [],
    };
  },
  created() {
    this.getInstitutionDetail();
    this.getRegionOptions();
  },
  methods: {
    handleChange(value) {
      this.formData.province = value[0];
      this.formData.city = value[1];
      this.formData.area = value[2];
    },
    async modifyInstitutionConfig() {
      const { institution_name, h5_url, ...rest } = this.formData;
      const data = {
        institution_id: this.$route.query.institution_id,
        ...rest,
      };
      const res = await modifyInstitutionConfig(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.getInstitutionDetail();
      }
    },
    async getRegionOptions() {
      const res = await getRegionOptions();
      this.cityOptions = res.data;
    },
    async getInstitutionDetail() {
      const data = {
        institution_id: this.$route.query.institution_id,
      };
      const res = await getInstitutionDetail(data);
      for (const key in this.formData) {
        this.formData[key] = res.data[key] || "";
      }
      res.data.h5 && this.type.push(2);
      res.data.small_program && this.type.push(1);
      res.data.province && this.selectedOptions.push(res.data.province);
      res.data.city && this.selectedOptions.push(res.data.city);
      res.data.area && this.selectedOptions.push(res.data.area);
    },
  },
};
</script>

<style lang="scss" scoped>
.input-width {
  width: 400px;
}
.w-180 {
  width: 200px;
}
.w-170 {
  width: 190px;
  margin-left: 10px;
}
.reset {
  margin-right: 30px;
}
</style>
