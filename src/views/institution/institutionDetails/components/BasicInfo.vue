<template>
  <div class="basic-container">
    <!-- 基本信息 -->
    <div class="basic-info">
      <div>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          label-width="100px"
          class="info-form"
        >
          <el-form-item
            label="机构名称"
            prop="surname"
            :rules="[
              { required: isEdit, message: '请输入机构名称', trigger: 'blur' },
            ]"
          >
            <el-input
              v-if="isEdit"
              v-model="ruleForm.surname"
              placeholder="请输入机构名称"
            ></el-input>
            <span v-else>{{ datas.surname || "--" }}</span>
          </el-form-item>
          <el-form-item label="机构地址">
            <el-cascader
              filterable
              clearable
              v-if="isEdit"
              v-model="city1"
              placeholder="请选机构地址"
              class="w-100"
              :options="cityOptions"
              @change="handleCityChange($event, 1)"
            >
            </el-cascader>
            <span v-else>{{
              datas.city
                ? (CodeToText[datas.province] || "") + CodeToText[datas.city]
                : "--"
            }}</span>
          </el-form-item>
          <el-form-item label="开通服务">
            <el-input
              v-model="ruleForm.id_card_number"
              v-if="isEdit"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ datas.id_card_number | filterIdCard }}</span>
          </el-form-item>
          <el-form-item label="小程序名称">
            <el-input
              v-model="ruleForm.wechat"
              v-if="isEdit"
              placeholder="请输入小程序名称"
            ></el-input>
            <span v-else>{{ datas.wechat || "--" }}</span>
          </el-form-item>
          <el-form-item label="H5网校名称">
            <el-input
              v-model="ruleForm.wechat"
              v-if="isEdit"
              placeholder="请输入小程序名称"
            ></el-input>
            <span v-else>{{ datas.wechat || "--" }}</span>
          </el-form-item>
        </el-form>
      </div>
      <div class="info-actions">
        <el-button v-show="isEdit === false" @click="handleEdit"
          >编辑</el-button
        >
        <el-button v-show="isEdit === true" @click="resetForm('ruleForm')"
          >取消</el-button
        >
        <el-button
          v-show="isEdit === true"
          type="primary"
          @click="submitForm('ruleForm')"
          >保存</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { provinceAndCityData, CodeToText } from "element-china-area-data";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import { updateStudentBasicInfo } from "@/api/eda";
import { getfieldinfo } from "@/api/etm";
export default {
  name: "BasicInfo",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      isEdit: false,
      CodeToText,
      cityOptions: provinceAndCityData,
      ruleForm: {
        surname: "",
        mobile: "",
        second_mobile: "",
        id_card_number: "",
        wechat: "",
        qq: "",
        email: "",
        sex: "",
        birthday: "",
        culture: "",
        province: "", // 籍贯
        city: "",
        location: "",
        sources: "",
        from_organization_id: "",
        tips: "",
        is_graduate: "",
        online_course: "",
      },
      city1: "",
    };
  },
  created() {},
  methods: {
    // 修改基本信息
    async updateStudentBasicInfo() {
      let from_organization_id = this.ruleForm.from_organization_id;
      if (Array.isArray(this.ruleForm.from_organization_id)) {
        from_organization_id =
          this.ruleForm.from_organization_id[
            this.ruleForm.from_organization_id.length - 1
          ];
      }
      console.log(this.ruleForm);
      const data = {
        ...this.ruleForm,
        id: this.datas.id,
        from_organization_id,
      };
      const res = await updateStudentBasicInfo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-basic-success");
        this.isEdit = false;
      }
    },
    // 选择城市 1：籍贯 2：常驻地
    handleCityChange(val, type) {
      if (type === 1) {
        this.ruleForm.province = val[0];
        this.ruleForm.city = val[1];
      } else {
        this.ruleForm.location = val[1];
      }
    },

    handleEdit() {
      this.isEdit = true;
      this.initDatas();
    },
    initDatas() {
      for (const key in this.ruleForm) {
        this.ruleForm[key] = this.datas[key];
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log(valid);
        if (valid) {
          this.updateStudentBasicInfo();
        }
      });
    },
    resetForm(formName) {
      this.isEdit = false;
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.basic-container {
  .basic-info {
    .info-actions {
      display: flex;
      margin-bottom: 16px;
    }
    .w-100 {
      width: 100%;
    }
    .info-form {
      display: flex;
      flex-wrap: wrap;
      .el-form-item {
        width: 300px;
      }
      .desc {
        width: 100%;
      }
    }
  }
}
</style>
