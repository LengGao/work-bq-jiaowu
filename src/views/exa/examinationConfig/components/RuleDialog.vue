<template>
  <!--规则弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="1100px"
    class="subject-dialog"
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
      <Title text="基本信息" />
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属分类" prop="cate_id">
            <el-cascader
              filterable
              clearable
              :props="{ checkStrictly: true }"
              style="width: 100%"
              v-model="formData.cate_id"
              placeholder="请选择所属分类"
              :options="typeOptions"
              @change="handleTypeChange"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="规则名称" prop="rule_name">
            <el-input
              maxlength="30"
              placeholder="请输入规则名称"
              v-model="formData.rule_name"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="考试科目" prop="subject_id_str">
            <el-select
              clearable
              multiple
              :disabled="!formData.cate_id"
              style="width: 100%"
              v-model="formData.subject_id_str"
              placeholder="请选择"
            >
              <el-option
                v-for="item in subjectOptions"
                :key="item.id"
                :label="item.subject_name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="报考城市" prop="city">
            <el-cascader
              filterable
              clearable
              style="width: 100%"
              v-model="formData.city"
              placeholder="请选择城市"
              :options="cityOptions"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="24" :xs="24" :sm="24" :xl="24">
          <el-form-item label="备注信息">
            <el-input
              type="textarea"
              maxlength="200"
              placeholder="请输入备注信息"
              v-model="formData.comment"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <Title text="资料审核" />
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="个人照片" prop="photo_limit">
            <el-radio-group v-model="formData.photo_limit">
              <el-radio
                :key="item.id"
                :label="item.id"
                v-for="item in photoRadios"
                >{{ item.name }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="身份证件" prop="id_card_limit">
            <el-radio-group v-model="formData.id_card_limit">
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">中国公民</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="籍贯生源" prop="place_limit">
            <el-radio-group v-model="formData.place_limit">
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">本地生源</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="年龄要求" prop="age_limit">
            <el-radio-group
              v-model="formData.age_limit"
              @change="
                ageStart = '';
                ageEnd = '';
              "
            >
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">
                年满
                <el-input
                  maxlength="3"
                  v-model="ageStart"
                  style="width: 60px"
                ></el-input>
                周岁 不超过
                <el-input
                  maxlength="3"
                  v-model="ageEnd"
                  style="width: 60px"
                ></el-input>
                周岁
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="学历要求" prop="edu_limit">
            <el-radio-group
              v-model="formData.edu_limit"
              @change="eduValue = ''"
            >
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">
                <el-select v-model="eduValue" placeholder="文化程度">
                  <el-option
                    v-for="item in eduOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="工作年限" prop="work_limit">
            <el-radio-group
              v-model="formData.work_limit"
              @change="workYear = ''"
            >
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">
                从事相关工作满
                <el-input
                  maxlength="3"
                  v-model="workYear"
                  style="width: 60px"
                ></el-input>
                年
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="个人健康" prop="health_limit">
            <el-radio-group v-model="formData.health_limit">
              <el-radio :label="0">无限制</el-radio>
              <el-radio :label="1">身体状态良好</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
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
import { provinceAndCityData } from "element-china-area-data";
import {
  updateRule,
  createRule,
  getRuleDetail,
  getRuleSelect,
  getSelectForPlan,
} from "@/api/exa";
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
    typeOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      visible: this.value,
      cityOptions: provinceAndCityData,
      ageStart: "",
      ageEnd: "",
      workYear: "",
      eduValue: "",
      formData: {
        cate_id: "",
        rule_name: "",
        city: "",
        subject_id_str: [],
        comment: "",
        photo_limit: "",
        id_card_limit: "",
        place_limit: "",
        age_limit: "",
        edu_limit: "",
        work_limit: "",
        health_limit: "",
      },
      rules: {
        rule_name: [
          { required: true, message: "请输入规则名称", trigger: "blur" },
        ],
        city: [{ required: true, message: "请选择", trigger: "change" }],
        subject_id_str: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
            type: "array",
          },
        ],
        cate_id: [{ required: true, message: "请选择", trigger: "change" }],
        photo_limit: [{ required: true, message: "请选择", trigger: "change" }],
        id_card_limit: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        place_limit: [{ required: true, message: "请选择", trigger: "change" }],
        age_limit: [{ required: true, message: "请选择", trigger: "change" }],
        edu_limit: [{ required: true, message: "请选择", trigger: "change" }],
        work_limit: [{ required: true, message: "请选择", trigger: "change" }],
        health_limit: [
          { required: true, message: "请选择", trigger: "change" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      photoRadios: [],
      eduOptions: [],
      subjectOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // dialog 打开时
    handleOpen() {
      setTimeout(() => {
        this.$refs["formData"].resetFields();
      });
      this.getRuleSelect();
      if (this.id) {
        this.getRuleDetail();
      }
    },
    // 选择分类时
    handleTypeChange(val) {
      this.formData.subject_id_str = [];
      val && val.length && this.getSelectForPlan([...val].pop());
    },
    // 获取科目选项
    async getSelectForPlan(id, subject_id_str) {
      const data = {
        cate_id: id,
      };
      const res = await getSelectForPlan(data);
      if (res.code === 0) {
        this.subjectOptions = res.data.subject;
        this.formData.subject_id_str = subject_id_str || [];
        console.log(this.formData.subject_id_str);
      }
    },
    // 获取选项
    async getRuleSelect() {
      const data = {};
      const res = await getRuleSelect(data);
      if (res.code === 0) {
        this.photoRadios = res.data.photoArr;
        this.eduOptions = res.data.eduArr;
      }
    },
    // 规则详情
    async getRuleDetail() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getRuleDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        this.getSelectForPlan(
          res.data.cate_id,
          res.data.subject_id_arr.map((item) => item * 1)
        );

        // 单选
        const age_limit = res.data.age_limit;
        if (age_limit) {
          const arr = age_limit.split(",");
          this.formData.age_limit = 1;
          this.ageStart = arr[0];
          this.ageEnd = arr[1];
        } else {
          this.formData.age_limit = 0;
        }

        this.formData.work_limit = res.data.work_limit ? 1 : 0;
        this.workYear = res.data.work_limit || "";
        this.formData.edu_limit = res.data.edu_limit ? 1 : 0;
        this.eduValue = res.data.edu_limit || "";
        this.formData.city = [res.data.province, res.data.city];
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        cate_id: Array.isArray(this.formData.cate_id)
          ? [...this.formData.cate_id].pop()
          : this.formData.cate_id,
        age_limit: this.formData.age_limit ? [this.ageStart, this.ageEnd] : 0,
        work_limit: this.formData.work_limit ? this.workYear : 0,
        edu_limit: this.formData.edu_limit ? this.eduValue : 0,
        province: this.formData.city[0],
        city: this.formData.city[1],
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateRule : createRule;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(`考试科目${this.id ? "编辑" : "新增"}成功`);
        this.resetForm("formData");
        this.$emit("on-success");
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.age_limit && (!this.ageStart || !this.ageEnd)) {
            this.$message.error("请输入年龄要求！");
            return false;
          }
          if (this.formData.edu_limit && !(this.eduValue + "")) {
            this.$message.error("请选择文化程度！");
            return false;
          }
          if (this.formData.work_limit && !this.workYear) {
            this.$message.error("请输入工作年限！");
            return false;
          }
          this.submit();
        }
      });
    },
    resetForm(formName) {
      for (const k in this.formData) {
        this.formData[k] = "";
      }
      this.ageStart = "";
      this.ageEnd = "";
      this.workYear = "";
      this.eduValue = "";
      this.formData.cate_id = 1;
      setTimeout(() => {
        this.formData.cate_id = "";
      }, 10);
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