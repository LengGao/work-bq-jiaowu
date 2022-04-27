<template>
  <!--添加编辑章节弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="540px"
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
      <el-form-item
        :label="`${chapterType == 1 ? '章节' : '试卷'}名称`"
        prop="name"
      >
        <el-input
          v-model="formData.name"
          :placeholder="`请输入${chapterType == 1 ? '章节' : '试卷'}名称`"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item
        :label="`${chapterType == 1 ? '章节' : '试卷'}排序`"
        prop="sort"
      >
        <el-input
          type="number"
          @mousewheel.native.prevent
          v-model="formData.sort"
          placeholder="请输入"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item
        v-if="chapterType == 3"
        label="开启时间"
        prop="time"
        :rules="[{ required: true, message: '请选择', trigger: 'change' }]"
      >
        <el-date-picker
          v-model="formData.time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm"
        >
        </el-date-picker>
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
  updateTopicChapter,
  addTopicChapter,
  getTopicChapterInfo,
} from "@/api/sou";
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
    chapterType: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        name: "",
        sort: "",
        topic_course_id: this.$route.query.topic_course_id,
        chapter_type: "",
        question_bank_id: this.$route.query.id,
        time: [],
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },

  methods: {
    handleOpen() {
      if (this.id) {
        this.getTopicChapterInfo();
      } else {
        this.formData.question_bank_id = this.$route.query.id;
        this.formData.topic_course_id = this.$route.query.topic_course_id;
        this.formData.chapter_type = this.chapterType;
      }
    },

    async getTopicChapterInfo() {
      const data = {
        id: this.id,
      };
      this.detaiLoading = true;
      const res = await getTopicChapterInfo(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          if (k in res.data) {
            this.formData[k] = res.data[k];
          }
        }
        this.formData.name = res.data.chapter_name;
        res.data.start_time && this.formData.time.push(res.data.start_time);
        res.data.end_time && this.formData.time.push(res.data.end_time);
      }
    },
    async submit() {
      const { time, ...restParams } = this.formData;
      const data = {
        ...restParams,
        is_timing: 0,
      };
      if (this.chapterType == 3) {
        data.start_time = time[0];
        data.end_time = time[1];
        data.is_timing = 1;
      }
      if (this.id) {
        data.id = this.id;
      }
      const api = this.id ? updateTopicChapter : addTopicChapter;
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
      this.formData.time = [];
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