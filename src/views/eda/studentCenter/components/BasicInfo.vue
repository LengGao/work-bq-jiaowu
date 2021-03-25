<template>
  <!-- 基本信息 -->
  <div class="basic-info">
    <div class="info-header">
      <el-button v-show="isEdit === false" @click="handleEdit">编辑</el-button>
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
    <div>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="100px"
        class="info-form"
      >
        <el-form-item
          label="客户姓名"
          prop="surname"
          :rules="[
            { required: isEdit, message: '请输入客户名称', trigger: 'blur' },
          ]"
        >
          <el-input
            v-if="isEdit"
            v-model="ruleForm.surname"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.surname || "--" }}</span>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input
            v-model="ruleForm.mobile"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.mobile || "--" }}</span>
        </el-form-item>
        <el-form-item label="备用号码">
          <el-input
            v-model="ruleForm.second_mobile"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.second_mobile || "--" }}</span>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input
            v-model="ruleForm.id_card_number"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.id_card_number || "--" }}</span>
        </el-form-item>
        <el-form-item label="微信">
          <el-input
            v-model="ruleForm.wechat"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.wechat || "--" }}</span>
        </el-form-item>
        <el-form-item label="学员性别">
          <el-radio-group v-if="isEdit" v-model="ruleForm.sex" class="w-100">
            <el-radio label="男" :value="1"></el-radio>
            <el-radio label="女" :value="2"></el-radio>
          </el-radio-group>
          <span v-else>{{ sexMap[datas.sex] }}</span>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-date-picker
            v-if="isEdit"
            class="w-100"
            type="date"
            placeholder="选择日期"
            v-model="ruleForm.birthday"
          ></el-date-picker>
          <span v-else>{{ datas.birthday || "--" }}</span>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input
            v-model="ruleForm.qq"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.qq || "--" }}</span>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="ruleForm.email"
            v-if="isEdit"
            placeholder="请输入"
          ></el-input>
          <span v-else>{{ datas.email || "--" }}</span>
        </el-form-item>

        <el-form-item label="文化程度">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.culture"
            placeholder="请选择文化程度"
            class="w-100"
          >
            <el-option
              v-for="(item, index) in educationOptions"
              :label="item.label"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
          <span v-else>{{ datas.culture || "--" }}</span>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-cascader
            v-if="isEdit"
            v-model="city1"
            placeholder="请选择籍贯"
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
        <el-form-item label="常住地">
          <el-cascader
            v-if="isEdit"
            v-model="city2"
            placeholder="请选择常住地"
            class="w-100"
            @change="handleCityChange($event, 2)"
            :options="cityOptions"
          >
          </el-cascader>
          <span v-else>{{ CodeToText[datas.location] || "--" }}</span>
        </el-form-item>
        <el-form-item label="渠道来源">
          <el-select
            v-if="isEdit"
            v-model="ruleForm.sources"
            placeholder="请选择渠道来源"
            class="w-100"
          >
            <el-option
              v-for="(item, index) in sourcesOptions"
              :label="item.label"
              :value="item.value"
              :key="index"
            ></el-option>
          </el-select>
          <span v-else>{{ datas.sources || "--" }}</span>
        </el-form-item>
        <el-form-item label="所属机构">
          <el-cascader
            v-if="isEdit"
            v-model="ruleForm.from_organization_id"
            placeholder="请选择机构"
            class="w-100"
            :options="selectOptions"
          >
          </el-cascader>
          <span v-else>{{ datas.from_organization_name }}</span>
        </el-form-item>
        <el-form-item label="所属老师">
          <el-input
            v-model="ruleForm.admin_name"
            v-if="isEdit"
            disabled
          ></el-input>
          <span v-else>{{ datas.admin_name || "--" }}</span>
        </el-form-item>

        <el-form-item label="备注信息" class="desc">
          <el-input
            v-if="isEdit"
            type="textarea"
            placeholder="请输入"
            v-model="ruleForm.tips"
          ></el-input>
          <span v-else>{{ datas.tips || "--" }}</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { provinceAndCityData, CodeToText } from "element-china-area-data";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import { updateStudentBasicInfo } from "@/api/eda";
export default {
  name: "basicInfo",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isEdit: false,
      sexMap: {
        0: "保密",
        1: "男",
        2: "女",
      },
      CodeToText,
      sourcesOptions: [
        {
          label: "百度推广",
          value: "百度推广",
        },
        {
          label: "上门咨询",
          value: "上门咨询",
        },
        {
          label: "老学员介绍",
          value: "老学员介绍",
        },
        {
          label: "机构推荐",
          value: "机构推荐",
        },
      ],
      educationOptions: [
        {
          label: "高中毕业",
          value: "高中毕业",
        },
        {
          label: "大专毕业",
          value: "大专毕业",
        },
        {
          label: "本科毕业",
          value: "本科毕业",
        },
        {
          label: "研究生毕业",
          value: "研究生毕业",
        },
      ],
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
      },
      selectOptions: [],
      city2: "",
      city1: "",
    };
  },
  created() {
    this.getInstitutionSelectData();
  },
  methods: {
    // 修改基本信息
    async updateStudentBasicInfo() {
      let from_organization_id = this.ruleForm.from_organization_id;
      if (Array.isArray(this.ruleForm.from_organization_id)) {
        from_organization_id = this.ruleForm.from_organization_id[
          this.ruleForm.from_organization_id.length - 1
        ];
      }
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
      console.log(this.ruleForm);
      console.log(val, type);
    },
    // 机构下拉
    async getInstitutionSelectData() {
      const data = { list: true };
      const res = await getInstitutionSelectData(data);
      if (res.code === 0) {
        this.selectOptions = cloneOptions(
          res.data,
          "institution_name",
          "institution_id",
          "children"
        );
      }
    },
    handleEdit() {
      this.isEdit = true;
      this.initDatas();
    },
    initDatas() {
      for (const key in this.ruleForm) {
        this.ruleForm[key] = this.datas[key] || "";
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
.basic-info {
  .info-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
  }
  .w-100 {
    width: 100%;
  }
  .info-form {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 400px;
    }
    .desc {
      width: 600px;
    }
  }
}
</style>
