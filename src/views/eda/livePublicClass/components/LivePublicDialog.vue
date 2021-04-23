<template>
  <!--公开课直播弹框-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="830px"
    top="50px"
    class="public-live-dialog"
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
      class="public-live-form"
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
      <el-form-item label="上课时间" class="large" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['12:00:00']"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="直播简介" class="large" prop="live_class_common">
        <el-input
          v-model="formData.live_class_common"
          type="textarea"
          maxlength="100"
          :autosize="{ minRows: 3, maxRows: 4 }"
          placeholder="请输入简介"
          show-word-limit
        >
        </el-input>
      </el-form-item>
      <el-form-item label="直播封面" prop="live_class_icon">
        <!--input 验证用 -->
        <el-input v-show="false" v-model="formData.live_class_icon" />
        <UploadImg
          width="280"
          height="130"
          v-model="formData.live_class_icon"
        />
      </el-form-item>
      <el-form-item label="图文详情" class="edit" prop="live_class_detail">
        <!--input 验证用 -->
        <el-input v-show="false" v-model="formData.live_class_detail" />
        <quill-editor
          v-model="formData.live_class_detail"
          :options="editorOption"
          ref="myQuillEditor"
          style="height: 200px"
        >
        </quill-editor>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import editorOption from "@/utils/quill-config";
import {
  classLiveInfo,
  updatePublicLive,
  createPublicLive,
  getTeacherSelect,
  getCourseSelect,
} from "@/api/eda";
import UploadImg from "@/components/ImgUpload/index.vue";
export default {
  name: "QuestionBankDialog",
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
  components: {
    UploadImg,
    quillEditor,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        live_class_name: "",
        cate_id: "",
        teacher_id: "",
        course_id: "",
        date: [],
        live_class_common: "",
        live_class_detail: "",
        live_class_icon: "",
      },
      rules: {
        live_class_detail: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        live_class_common: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        live_class_name: [
          { required: true, message: "请输入直播名称", trigger: "blur" },
        ],
        live_class_icon: [
          { required: true, message: "请上传", trigger: "change" },
        ],
        teacher_id: [{ required: true, message: "请选择", trigger: "change" }],
        course_id: [{ required: true, message: "请选择", trigger: "change" }],
        date: [
          {
            required: true,
            message: "请选择",
            type: "array",
            trigger: "change",
          },
        ],
        cate_id: [{ required: true, message: "请选择", trigger: "change" }],
      },
      addLoading: false,
      detaiLoading: false,
      editorOption,
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
    // 规则详情
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
        this.formData.date = res.data.live_start_time
          ? [res.data.live_start_time, res.data.live_end_time]
          : [];
        this.getCourseSelect(res.data.cate_id);
      }
    },
    // 选择分类时
    handleTypeChange(val) {
      this.formData.course_id = "";
      val && val.length && this.getCourseSelect([...val].pop());
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
    async submit() {
      const date = this.formData.date;
      const data = {
        ...this.formData,
        cate_id: Array.isArray(this.formData.cate_id)
          ? [...this.formData.cate_id].pop()
          : this.formData.cate_id,
        live_start_time: date[0],
        live_end_time: date[1],
      };
      delete data.date;
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updatePublicLive : createPublicLive;
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
.public-live-dialog {
  .w-100 {
    width: 100%;
  }
  /deep/.el-dialog__body {
    height: 750px;
    overflow-y: auto;
  }
  .public-live-form {
    display: flex;
    flex-wrap: wrap;

    .el-form-item {
      width: calc(100% / 2);
      &.large {
        width: 100%;
      }
      &.edit {
        width: 100%;
        /deep/.el-form-item__content {
          height: 300px;
        }
      }
    }
  }
}
/deep/.el-dialog__body {
  padding: 30px 50px 30px 20px;
}
.dialog-footer {
  padding: 30px;
}
</style>
