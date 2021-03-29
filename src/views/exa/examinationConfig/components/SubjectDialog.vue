<template>
  <!--科目弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="800px"
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
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="所属分类" prop="cate_id">
            <el-cascader
              style="width: 100%"
              v-model="formData.cate_id"
              placeholder="请选择所属分类"
              :options="typeOptions"
            >
            </el-cascader>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="科目名称" prop="subject_name">
            <el-input
              maxlength="30"
              placeholder="请输入科目名称"
              v-model="formData.subject_name"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="考试总分" prop="total_score">
            <el-input
              maxlength="10"
              placeholder="请输入考试总分"
              v-model="formData.total_score"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="合格分数">
            <el-input
              maxlength="10"
              placeholder="请输入合格分数"
              v-model="formData.pass_score"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="科目性质" prop="exam_type">
            <el-select
              style="width: 100%"
              v-model="formData.exam_type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in examOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="科目学分" prop="credit_hour">
            <el-input
              maxlength="10"
              placeholder="请输入科目学分"
              v-model="formData.credit_hour"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="补考费用" prop="cost">
            <el-input
              maxlength="10"
              placeholder="请输入补考费用"
              v-model="formData.cost"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :lg="12" :xs="12" :sm="12" :xl="12">
          <el-form-item label="成绩有效期" prop="period">
            <el-radio-group v-model="formData.period" @change="periodYear = ''">
              <el-radio :label="0">永久</el-radio>
              <el-radio :label="1">
                不超过
                <el-input
                  maxlength="3"
                  style="width: 60px"
                  v-model="periodYear"
                ></el-input>
                年
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="custom-subject">
        <el-form-item
          :label="'考评项目' + (index + 1)"
          v-for="(item, index) in customSubject"
          :key="index"
        >
          <el-input
            style="width: 210px; margin-right: 10px"
            placeholder="请输入"
            v-model="item.value"
          ></el-input>
          <el-button type="small" @click="handleDelSubject(index)"
            >删除</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            icon="el-icon-plus"
            @click="handleAddSubject"
            >添加考评项目</el-button
          >
        </el-form-item>
      </div>
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
import { updateSubject, createSubject, getSubjectDetail } from "@/api/exa";
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
      periodYear: "",
      formData: {
        cate_id: "",
        subject_name: "",
        total_score: "",
        pass_score: "",
        exam_type: "",
        credit_hour: "",
        cost: "",
        period: 0,
      },
      rules: {
        period: [{ required: true, message: "请选择", trigger: "change" }],
        cate_id: [{ required: true, message: "请选择", trigger: "change" }],
        subject_name: [
          { required: true, message: "请输入科目名称", trigger: "blur" },
        ],
        total_score: [
          { required: true, message: "请输入考试总分", trigger: "blur" },
        ],
        credit_hour: [
          { required: true, message: "请输入科目学分", trigger: "blur" },
        ],
        cost: [{ required: true, message: "请输入补考费用", trigger: "blur" }],
        exam_type: [
          { required: true, message: "请选择科目性质", trigger: "change" },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      examOptions: [
        {
          label: "必考",
          value: 1,
        },
        {
          label: "选考",
          value: 2,
        },
      ],
      customSubject: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    // 删除自定义科目
    handleDelSubject(index) {
      this.customSubject.splice(index, 1);
    },
    // 添加自定义科目
    handleAddSubject() {
      this.customSubject.push({
        value: "",
      });
    },
    handleOpen() {
      if (this.id) {
        this.getSubjectDetail();
      }
    },
    async getSubjectDetail() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getSubjectDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        // 单选
        this.periodYear = res.data.period || "";
        this.formData.period = res.data.period ? 1 : 0;
        // 自定义考试科目
        this.customSubject = Object.values(
          res.data.sub_subject_arr
        ).map((item) => ({ value: item }));
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        cate_id: Array.isArray(this.formData.cate_id)
          ? [...this.formData.cate_id].pop()
          : this.formData.cate_id,
        sub_subject: this.customSubject.map((item) => item.value),
        period: this.formData.period ? this.periodYear : this.formData.period,
      };
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateSubject : createSubject;
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
          if (this.formData.period && !this.periodYear) {
            this.$message.error("请输入成绩有效期！");
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
      this.formData.period = 0;
      this.formData.cate_id = 1;
      this.customSubject = [];
      this.periodYear = "";
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
.subject-dialog {
  .custom-subject {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    /deep/.el-form-item {
      width: calc(100% / 2);
    }
  }
}
</style>