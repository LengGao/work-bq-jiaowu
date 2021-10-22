<template>
  <!--添加员工弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="500px"
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
      <el-form-item label="用户头像">
        <ImageUpload width="100" height="100" v-model="formData.cover">
          <p slot="tips">1. 支持jpg、png等格式； 2. 推荐尺寸200*200或者1:1</p>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="用户姓名" prop="nickname">
        <el-input
          v-model="formData.nickname"
          placeholder="请输入用户姓名"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          type="number"
          v-model="formData.mobile"
          placeholder="请输入手机号码"
        />
      </el-form-item>
      <el-form-item
        label="登录密码"
        prop="password"
        :rules="[
          { required: !id, message: '请输入', trigger: 'blur' },
          {
            min: 6,
            max: 20,
            message: '长度在 6 到 20 个字符',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model="formData.password"
          placeholder="请输入登录密码"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="部门" prop="role_id">
        <el-cascader
          :options="options"
          placeholder="请选择部门"
          clearable
          filterable
          :props="{
            value: 'id',
            label: 'title',
            children: 'child',
            checkStrictly: true,
          }"
          v-model="formData.role_id"
        ></el-cascader>
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
  modifyInstitutionUser,
  createInstitutionUser,
  getInstitutionUserInfo,
} from "@/api/set";
import ImageUpload from "@/components/ImgUpload";
export default {
  name: "AddStaffDialog",
  components: {
    ImageUpload,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      default: () => [],
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      visible: this.value,
      cityOptions: [],
      formData: {
        cover: "",
        nickname: "",
        mobile: "",
        password: "",
        role_id: "",
      },
      rules: {
        role_id: [{ required: true, message: "请选择", trigger: "change" }],
        nickname: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            validator: this.validataPhone,
          },
        ],
      },
      addLoading: false,
      detaiLoading: false,
      props: {
        value: "id",
        label: "name",
        children: "child",
      },
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    validataPhone(rule, value, callback) {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    },
    handleOpen() {
      this.id && this.getInstitutionUserInfo();
    },
    async getInstitutionUserInfo() {
      const data = { id: this.id };
      const res = await getInstitutionUserInfo(data);
      if (res.code === 0) {
        this.formData.cover = res.data.cover;
        this.formData.nickname = res.data.nickname;
        this.formData.mobile = res.data.mobile;
        this.formData.password = res.data.password;
        this.formData.role_id = res.data.role_id;
      }
    },
    async submit() {
      const data = {
        ...this.formData,
        role_id: Array.isArray(this.formData.role_id)
          ? [...this.formData.role_id].pop()
          : this.formData.role_id,
      };
      if (this.id) {
        data.id = this.id;
      } else {
        data.institution_id = this.$route.query.institution_id;
      }
      const api = this.id ? modifyInstitutionUser : createInstitutionUser;
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

<style lang="scss" scoped>
.address {
  display: flex;
  .detailed {
    margin-left: 20px;
    flex: 1;
  }
}
</style>