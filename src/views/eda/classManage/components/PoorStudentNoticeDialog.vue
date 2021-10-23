<template>
  <!--差生提醒弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="550px"
    :close-on-click-modal="false"
    @closed="resetForm('formData')"
    @open="handleOpen"
  >
    <el-form
      label-width="100px"
      :model="formData"
      :rules="rules"
      ref="formData"
      v-loading="detaiLoading"
    >
      <el-form-item label="学员姓名" prop="uid_arr">
        <el-select
          v-model="formData.uid_arr"
          multiple
          placeholder="请选择学员"
          style="width: 100%"
          filterable
          clearable
        >
          <el-option
            v-for="item in studentOptions"
            :key="item.uid"
            :label="item.user_realname"
            :value="item.uid"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通知标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入通知标题"
          maxlength="120"
        />
      </el-form-item>
      <el-form-item label="通知详情" prop="content">
        <el-input
          v-model="formData.content"
          placeholder="请输入通知详情"
          maxlength="120"
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
  createClassroomMessage,
  updateClassroomMessage,
  getClassroomMessageUserSelect,
} from "@/api/message";
export default {
  name: "classNoticeDialog",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      formData: {
        title: "",
        content: "",
        uid_arr: [],
      },
      rules: {
        uid_arr: [{ required: true, message: "请选择", trigger: "change" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      addLoading: false,
      detaiLoading: false,
      studentOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleOpen() {
      this.getClassroomMessageUserSelect();
      if (this.data.id) {
        for (const k in this.formData) {
          this.formData[k] = this.data[k] || "";
        }
      }
    },
    async getClassroomMessageUserSelect() {
      const data = {
        classroom_id: this.$route.query.id,
      };
      const res = await getClassroomMessageUserSelect(data);
      if (res.code === 0) {
        this.studentOptions = res.data;
      }
    },
    async submit() {
      let data = {};
      let api = null;
      if (this.data.id) {
        data = {
          ...this.formData,
          id: this.data.id,
        };
        api = updateClassroomMessage;
      } else {
        data = {
          ...this.formData,
          type: 3,
          classroom_id: this.$route.query.id,
        };
        api = createClassroomMessage;
      }
      this.addLoading = true;
      const res = await api(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
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
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>