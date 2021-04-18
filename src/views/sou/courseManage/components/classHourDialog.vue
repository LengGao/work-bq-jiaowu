<template>
  <!--添加编辑课时弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="450px"
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
      <el-form-item label="章节名称" prop="video_chapter_id">
        <el-select
          v-model="formData.video_chapter_id"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in chapterOptions"
            :key="item.video_chapter_id"
            :label="item.video_chapter_name"
            :value="item.video_chapter_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="课时名称" prop="video_class_name">
        <el-input
          v-model="formData.video_class_name"
          placeholder="请输入课时名称"
          maxlength="20"
        />
      </el-form-item>
      <el-form-item label="课时排序" prop="video_class_sort">
        <el-input
          type="number"
          v-model="formData.video_class_sort"
          placeholder="序号越大越靠前"
          maxlength="10"
        />
      </el-form-item>
      <el-form-item label="上传视频" prop="media_id">
        <!-- 用来更新验证用 不显示 -->
        <el-input v-show="false" v-model="formData.media_id"></el-input>
        <AliyunUpload
          :defaultFiles="defaultFiles"
          :on-success="handleUploadSuccess"
          @on-remove="handleVideoRemove"
        />
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
  editvideoclass,
  addvideoclass,
  getvideoclassDetail,
  getvideochapterList,
} from "@/api/sou";
import AliyunUpload from "@/components/AliyunUpload/index";
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
  },
  components: {
    AliyunUpload,
  },
  data() {
    return {
      visible: this.value,
      formData: {
        video_chapter_id: "",
        video_class_name: "",
        video_chapter_profile: "",
        video_class_sort: "",
        media_id: "",
        media_name: "",
      },
      defaultFiles: [],
      rules: {
        video_class_name: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        video_class_sort: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        video_chapter_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        media_id: [{ required: true, message: "请上传", trigger: "change" }],
      },
      chapterOptions: [],
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
    handleVideoRemove() {
      this.formData.media_name = "";
      this.formData.media_id = "";
    },
    handleOpen() {
      this.getvideochapterList();
      if (this.id) {
        this.getvideoclassDetail();
      }
    },
    handleUploadSuccess(data) {
      const filename = data.file.name;
      this.formData.media_id = data.videoId;
      this.formData.media_name = filename;
    },
    //获取详情
    async getvideoclassDetail() {
      const data = {
        video_class_id: this.id,
      };
      this.detaiLoading = true;
      const res = await getvideoclassDetail(data).catch(() => {
        this.detaiLoading = false;
      });
      this.detaiLoading = false;
      if (res.code === 0) {
        for (const k in this.formData) {
          this.formData[k] = res.data[k];
        }
        const media_id = res.data.media_int_id;
        this.formData.media_id = media_id;
        this.defaultFiles = [
          {
            name: res.data.media_name,
            id: media_id,
          },
        ];
      }
    },
    // 章节选项
    async getvideochapterList() {
      const data = {
        video_collection_id: this.$route.query?.video_collection_id || "",
      };
      const res = await getvideochapterList(data);
      this.chapterOptions = res.data.data;
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.video_class_id = this.id;
      } else {
        data.video_collection_id = this.$route.query?.video_collection_id || "";
      }
      const api = this.id ? editvideoclass : addvideoclass;
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$emit("on-success", this.formData.video_chapter_id);
        this.$message.success(res.message);
        this.resetForm("formData");
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
      this.defaultFiles = [];
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