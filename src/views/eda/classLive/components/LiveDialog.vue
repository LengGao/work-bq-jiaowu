<template>
  <!--直播弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="800px"
    class="live-dialog"
    @open="handleOpen"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
  >
    <el-form
      label-width="80px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
      class="question-bank-form"
    >
      <el-form-item label="直播名称" prop="live_class_name">
        <el-input
          v-model="formData.live_class_name"
          placeholder="请输入直播名称"
          type="text"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="任课老师" prop="teacher_id">
        <el-select
          class="w-100"
          v-model="formData.teacher_id"
          filterable
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in teacherOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属分类" prop="cate_id">
        <el-cascader
          class="w-100"
          filterable
          clearable
          :props="{ checkStrictly: true }"
          v-model="formData.cate_id"
          placeholder="请选择所属分类"
          :options="typeOptions"
          @change="handleTypeChange"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="所属课程" prop="course_id">
        <el-select
          class="w-100"
          :disabled="!formData.cate_id"
          v-model="formData.course_id"
          filterable
          clearable
          placeholder="请选择"
          @change="handleCourseChange"
        >
          <el-option
            v-for="item in courseOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="关联班级" prop="class_id">
        <el-select
          :disabled="!formData.course_id"
          v-model="formData.class_id"
          class="w-100"
          filterable
          multiple
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in classOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
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
  classLiveInfo,
  updateClassLive,
  createClassLive,
  getTeacherSelect,
  getCourseSelect,
  getClassroomSelect,
} from "@/api/eda";
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
      formData: {
        live_class_name: "",
        cate_id: "",
        course_id: "",
        class_id: [],
        teacher_id: "",
      },
      rules: {
        live_class_name: [
          { required: true, message: "请输入直播名称", trigger: "blur" },
        ],
        teacher_id: [{ required: true, message: "请选择", trigger: "change" }],
        course_id: [{ required: true, message: "请选择", trigger: "change" }],
        class_id: [
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
      courseOptions: [],
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
        this.classLiveInfo();
      }
      this.getTeacherSelect();
    },
    // 选择分类时
    handleTypeChange(val) {
      this.formData.course_id = "";
      this.formData.class_id = [];
      val && val.length && this.getCourseSelect([...val].pop());
    },
    // 选择课程时
    handleCourseChange(val) {
      this.formData.class_id = [];
      val && this.getClassroomSelect(val);
    },
    // 获取教师
    async getTeacherSelect() {
      const res = await getTeacherSelect();
      if (res.code === 0) {
        this.teacherOptions = res.data;
      }
    },
    // 获取课程
    async getCourseSelect(cate_id) {
      const data = { cate_id };
      const res = await getCourseSelect(data);
      if (res.code === 0) {
        this.courseOptions = res.data;
      }
    },
    // 获取班级
    async getClassroomSelect(course_id) {
      const data = { course_id };
      const res = await getClassroomSelect(data);
      if (res.code === 0) {
        this.classOptions = res.data;
      }
    },
    // 直播详情
    async classLiveInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await classLiveInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        this.formData.class_id = res.data.class_id
          .split(",")
          .map((item) => +item);
        this.getCourseSelect(res.data.cate_id);
        this.getClassroomSelect(res.data.course_id);
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
      const api = this.id ? updateClassLive : createClassLive;
      this.addLoading = true;
      const res = await api(data).catch(() => {
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
  .question-bank-form {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-form-item {
      width: 48%;
    }
  }
}
</style>