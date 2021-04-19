<template>
  <!--直播弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="400px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="70px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="直播名称" prop="title">
        <el-input
          class="w-100"
          v-model="formData.title"
          placeholder="请输入直播名称"
          type="text"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="所属分类" prop="category_id">
        <el-cascader
          class="w-100"
          filterable
          clearable
          :props="{ checkStrictly: true }"
          v-model="formData.category_id"
          placeholder="请选择所属分类"
          :options="typeOptions"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="关联班级">
        <el-select
          v-model="formData.type"
          class="w-100"
          filterable
          multiple
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任课老师">
        <el-select
          v-model="formData.type1"
          class="w-100"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in teacherOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
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
      ageStart: "",
      ageEnd: "",
      workYear: "",
      eduValue: "",
      formData: {
        cate_id: "",
        rule_name: "",
        city: "",
        subject_id_str: [],
      },
      rules: {
        rule_name: [
          { required: true, message: "请输入直播名称", trigger: "blur" },
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
      },
      addLoading: false,
      detaiLoading: false,
      classOptions: [],
      teacherOptions: [],
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
      if (this.id) {
        this.getRuleDetail();
      }
    },
    // 选择分类时
    handleTypeChange(val) {
      this.formData.subject_id_str = [];
      //   val && val.length && this.getSelectForPlan([...val].pop());
    },
    // 直播详情
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
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        cate_id: Array.isArray(this.formData.cate_id)
          ? [...this.formData.cate_id].pop()
          : this.formData.cate_id,
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
.live-dialog {
  .w-100 {
    width: 100%;
  }
}
</style>