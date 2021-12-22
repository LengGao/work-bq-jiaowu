<template>
  <!--添加员工弹窗-->
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="720px"
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
      inline
    >
      <el-form-item label="用户姓名" prop="staff_name">
        <el-input
          class="w-217"
          v-model="formData.staff_name"
          placeholder="请输入用户姓名"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="用户头像">
        <ImageUpload
          class="avatar"
          width="80"
          height="80"
          v-model="formData.head_photo"
        >
          <div slot="tips">
            <p>1. 支持jpg、png等格式；</p>
            <p>2. 推荐尺寸200*200或者1:1</p>
          </div>
        </ImageUpload>
      </el-form-item>
      <el-form-item label="手机号码" prop="account">
        <el-input
          class="w-217"
          type="number"
          v-model="formData.account"
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
          class="w-217"
          v-model="formData.password"
          placeholder="请输入登录密码"
          maxlength="30"
        />
      </el-form-item>
      <el-form-item label="所属部门" prop="department_id">
        <el-select
          class="input"
          v-model="formData.department_id"
          placeholder="请选择部门"
          clearable
          filterable
        >
          <el-option
            v-for="item in groupOptions"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          >
            <span style="float: left">{{ item.title }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.group_tree
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门主管" prop="is_director">
        <el-radio-group v-model="formData.is_director">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="所属角色" prop="role_ids">
        <el-select
          multiple
          filterable
          clearable
          v-model="formData.role_ids"
          placeholder="请选择所属角色"
        >
          <el-option
            v-for="item in roleOptions"
            :key="item.role_id"
            :label="item.role_name"
            :value="item.role_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="人员数据范围">
        <el-select
          multiple
          clearable
          v-model="formData.user_ids"
          filterable
          placeholder="请选择"
        >
          <el-option
            v-for="(item, index) in userAuthOptions"
            :key="index"
            :label="item.staff_name"
            :value="item.staff_id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门数据范围">
        <el-select
          class="input"
          v-model="formData.group_ids"
          placeholder="请选择"
          clearable
          filterable
          multiple
        >
          <el-option
            v-for="item in groupOptions"
            :key="item.id"
            :value="item.id"
            :label="item.title"
          >
            <span style="float: left">{{ item.title }}</span>
            <span
              style="
                float: right;
                color: #8492a6;
                font-size: 13px;
                margin: 0 18px;
              "
              >{{ item.group_tree }}</span
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
  modifyStaff,
  addStaff,
  getStaffinfo,
  getRoleSelectData,
  getStaffList,
  switchGroupList,
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
        head_photo: "",
        staff_name: "",
        account: "",
        password: "",
        department_id: "",
        is_director: "",
        role_ids: [],
        user_ids: [],
        group_ids: [],
      },
      rules: {
        is_director: [{ required: true, message: "请选择", trigger: "change" }],
        role_ids: [{ required: true, message: "请选择", trigger: "change" }],
        department_id: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        staff_name: [{ required: true, message: "请输入", trigger: "blur" }],
        account: [
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
      roleOptions: [],
      userAuthOptions: [],
      groupOptions: [],
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    async switchGroupList() {
      const res = await switchGroupList();
      if (res.code === 0) {
        this.groupOptions = res.data || [];
      }
    },
    async getStaffList() {
      const data = {
        limit: 99999,
      };
      const res = await getStaffList(data);
      this.userAuthOptions = res.data.list;
    },
    async getRoleSelectData() {
      const res = await getRoleSelectData();
      if (res.code === 0) {
        this.roleOptions = res.data;
      }
    },
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
      this.getStaffList();
      this.getRoleSelectData();
      this.switchGroupList();
      this.id && this.getStaffinfo();
    },
    async getStaffinfo() {
      const data = { id: this.id };
      const res = await getStaffinfo(data);
      if (res.code === 0) {
        for (const k in this.formData) {
          if (!["password"].includes(k)) {
            this.formData[k] = res.data[k] ?? "";
          }
        }
      }
    },
    async submit() {
      const data = {
        ...this.formData,
      };
      if (this.id) {
        data.id = this.id;
      } else {
        data.institution_id = this.$route.query.institution_id;
      }
      const api = this.id ? modifyStaff : addStaff;
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
      this.formData.group_ids = [];
      this.formData.user_ids = [];
      this.formData.role_ids = [];
      this.$emit("input", false);
    },
    hanldeCancel() {
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.w-217 {
  width: 217px;
}
.avatar {
  display: flex;
  /deep/.upload-tips {
    align-self: flex-end;
    margin: 0 0 20px 10px;
  }
}
</style>