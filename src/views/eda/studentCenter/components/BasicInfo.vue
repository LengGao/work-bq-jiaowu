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
          <el-form-item label="微信昵称">
            <el-input :value="datas.wechat" v-if="isEdit" disabled></el-input>
            <span v-else>{{ datas.wechat || "--" }}</span>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input
              v-model="ruleForm.mobile"
              v-if="isEdit"
              placeholder="请输入"
            ></el-input>
            <span v-else>{{ datas.mobile | filterPhone }}</span>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input
              v-model="ruleForm.id_card_number"
              v-if="isEdit"
              placeholder="请输入"
              disabled
            ></el-input>
            <span v-else>{{ datas.id_card_number | filterIdCard }}</span>
          </el-form-item>
          <el-form-item label="客户来源">
            <el-select
              filterable
              clearable
              v-if="isEdit"
              v-model="ruleForm.sources"
              placeholder="请选择客户来源"
              class="w-100"
            >
              <el-option
                v-for="(item, index) in channelOptions"
                :label="item"
                :value="item"
                :key="index"
              ></el-option>
            </el-select>
            <span v-else>{{ datas.sources || "--" }}</span>
          </el-form-item>
          <el-form-item label="学员性别">
            <el-radio-group v-if="isEdit" v-model="ruleForm.sex" class="w-100">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
            <span v-else>{{ sexMap[datas.sex] }}</span>
          </el-form-item>
          <el-form-item label="客户地区">
            <el-cascader
              filterable
              clearable
              v-if="isEdit"
              v-model="city1"
              placeholder="请选择客户地区"
              class="w-100"
              :options="cityOptions"
              @change="handleCityChange"
            >
            </el-cascader>
            <span v-else>{{
              datas.city
                ? (CodeToText[datas.province] || "") + CodeToText[datas.city]
                : "--"
            }}</span>
          </el-form-item>
          <el-form-item label="文化程度">
            <el-select
              v-if="isEdit"
              v-model="ruleForm.culture"
              placeholder="请选择文化程度"
              class="w-100"
              filterable
              clearable
            >
              <el-option
                v-for="(item, index) in educationOptions"
                :label="item.label"
                :value="item.label"
                :key="index"
              ></el-option>
            </el-select>
            <span v-else>{{ datas.culture || "--" }}</span>
          </el-form-item>
          <el-form-item label="所属老师">
            <template v-if="isEdit">
              <el-input
                style="width: 80%; margin-right: 10px"
                :value="datas.admin_name"
                disabled
              ></el-input>
              <el-button @click="updateTeacherDialog = true" type="text"
                >变更</el-button
              >
            </template>
            <span v-else>{{ datas.admin_name || "--" }}</span>
          </el-form-item>
          <el-form-item label="共享老师">
            <template v-if="isEdit">
              <el-input
                style="width: 80%; margin-right: 10px"
                :value="datas.union_staff_name"
                disabled
              ></el-input>
              <el-button @click="updateShareTeacherDialog = true" type="text"
                >变更</el-button
              >
            </template>

            <span v-else>{{ datas.union_staff_name || "--" }}</span>
          </el-form-item>
          <el-form-item
            label="机构名称"
            :rules="[
              { required: isEdit, message: '请选择', trigger: 'change' },
            ]"
          >
            <!-- <el-cascader
              filterable
              clearable
              v-if="isEdit"
              v-model="ruleForm.from_organization_id"
              placeholder="请选择机构"
              class="w-100"
              :options="selectOptions"
            >
            </el-cascader> -->
            <span>{{ datas.from_organization_name || "--" }}</span>
          </el-form-item>
          <el-form-item label="客户性质">
            <span>{{ datas.customer_type || "--" }}</span>
          </el-form-item>
          <el-form-item label="客户标签" prop="tags" class="block">
            <el-tag
              class="customer-tag"
              type="info"
              v-for="(item, index) in tags"
              :key="index"
              >{{ item.title }}
            </el-tag>
            <template v-if="isEdit">
              <el-input
                class="tag-input"
                v-focus
                v-if="inputVisible"
                v-model="tagName"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="inputVisible = true"
                >新建标签</el-button
              >
            </template>
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
    <FollowUpRecord class="record" v-if="$attrs.uid" v-bind="$attrs" />
    <UpdateTeacher
      v-model="updateTeacherDialog"
      :ids="[datas.id]"
      :is-crm="'cid' in $route.query"
      @on-success="$parent.getStudentBasicDetail"
    />
    <UpdateShareTeacher
      v-model="updateShareTeacherDialog"
      :uid="datas.uid"
      :id="datas.id"
      @on-success="$parent.getStudentBasicDetail"
    />
  </div>
</template>

<script>
import FollowUpRecord from "./FollowUpRecord";
import UpdateShareTeacher from "@/views/eda/components/UpdateShareTeacher.vue";
import UpdateTeacher from "@/views/eda/components/UpdateTeacher.vue";
import { provinceAndCityData, CodeToText } from "element-china-area-data";
import { getInstitutionSelectData } from "@/api/sou";
import { cloneOptions } from "@/utils/index";
import { updateStudentBasicInfo } from "@/api/eda";
import { getCustomfieldOptions } from "@/api/crm";
export default {
  name: "basicInfo",
  props: {
    datas: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    FollowUpRecord,
    UpdateTeacher,
    UpdateShareTeacher,
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
      educationOptions: [
        {
          value: 1,
          label: "初中及以下",
        },
        {
          value: 2,
          label: "中专/中技",
        },
        {
          value: 3,
          label: "高中",
        },
        {
          value: 4,
          label: "高中",
        },
        {
          value: 5,
          label: "大专",
        },
        {
          value: 6,
          label: "本科",
        },
        {
          value: 7,
          label: "研究生及以上",
        },
      ],
      cityOptions: provinceAndCityData,
      ruleForm: {
        surname: "",
        mobile: "",
        id_card_number: "",
        sex: "",
        culture: "",
        province: "", // 籍贯
        city: "",
        sources: "",
        from_organization_id: "",
        tips: "",
        is_graduate: "",
        online_course: "",
      },
      selectOptions: [],
      city2: "",
      city1: "",
      channelOptions: [],
      inputVisible: false,
      tags: [],
      tagName: "",
      updateTeacherDialog: false,
      updateShareTeacherDialog: false,
    };
  },
  watch: {
    "datas.tags"(val) {
      this.tags = val.split(",").map((item, index) => ({
        title: item,
        id: index,
      }));
    },
  },
  created() {
    this.getCustomfieldOptions();
    this.getInstitutionSelectData();
  },
  methods: {
    handleInputConfirm() {
      let title = this.tagName;
      if (title) {
        this.tags.push({
          title,
          checked: true,
        });
      }
      this.inputVisible = false;
      this.tagName = "";
    },
    // 获取客户来源
    async getCustomfieldOptions() {
      const data = {
        field_name: "customer_source",
      };
      const res = await getCustomfieldOptions(data);
      if (res.code === 0) {
        this.coustomFrom = res.data.field_content;
        this.channelOptions = res.data.field_content;
      }
    },
    // 修改基本信息
    async updateStudentBasicInfo() {
      let from_organization_id = this.ruleForm.from_organization_id;
      if (Array.isArray(this.ruleForm.from_organization_id)) {
        from_organization_id =
          this.ruleForm.from_organization_id[
            this.ruleForm.from_organization_id.length - 1
          ];
      }
      const data = {
        ...this.ruleForm,
        id: this.datas.id,
        from_organization_id,
        tags: this.tags.map((item) => item.title).join(","),
      };
      const res = await updateStudentBasicInfo(data);
      if (res.code === 0) {
        this.$message.success(res.message);
        this.$emit("on-basic-success");
        this.isEdit = false;
      }
    },
    // 选择城市
    handleCityChange(val) {
      this.ruleForm.province = val[0];
      this.ruleForm.city = val[1];
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
  display: flex;
  .basic-info {
    width: 50%;
    flex-shrink: 0;
    padding-right: 20px;
    border-right: 1px solid #ccc;
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
      justify-content: space-between;
      .el-form-item {
        width: 340px;
      }
      .desc {
        width: 100%;
      }
    }
  }
  .record {
    padding-left: 20px;
    flex: 1;
  }
  .customer-tag {
    margin-right: 6px;
  }
}
</style>
