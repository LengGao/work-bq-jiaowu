<template>
  <div>
    <el-form label-width="0" :model="formData" ref="formData">
      <el-table
        ref="multipleTable"
        :data="formData.users"
        style="width: 100%"
        :header-cell-style="{ 'text-align': 'center' }"
        :cell-style="{ 'text-align': 'center' }"
        height="534"
      >
        <el-table-column label="序号" width="70" type="index">
        </el-table-column>
        <el-table-column label="用户名" min-width="140">
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :prop="`users[${index}].nickname`"
              :rules="[{ required: true, message: '请输入', trigger: 'blur' }]"
            >
              <el-input
                v-model="row.nickname"
                placeholder="请输入用户姓名"
                maxlength="30"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="手机号码" min-width="140">
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :prop="`users[${index}].mobile`"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                {
                  validator: validataPhone,
                },
              ]"
            >
              <el-input
                v-model="row.mobile"
                placeholder="请输入手机号码"
                maxlength="30"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="登录密码" min-width="140">
          <template slot-scope="{ row, $index: index }">
            <el-form-item
              :prop="`users[${index}].password`"
              :rules="[
                { required: true, message: '请输入', trigger: 'blur' },
                {
                  min: 6,
                  max: 20,
                  message: '长度在 6 到 20 个字符',
                  trigger: 'blur',
                },
              ]"
            >
              <el-input
                show-password
                v-model="row.password"
                placeholder="请输入登录密码"
                maxlength="30"
              />
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="是否超管" min-width="100">
          <template slot-scope="{ row }">
            <el-switch
              v-model="row.is_master"
              active-color="#2798ee"
              inactive-color="#eaeefb"
              :active-value="1"
              :inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="100">
          <template slot-scope="{ $index: index }">
            <el-button type="text" @click="handleAdd">添加</el-button>
            <el-button
              type="text"
              @click="handleDel(index)"
              :disabled="formData.users.length < 2"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <div class="actions">
      <el-button @click="handlePrev">上一步</el-button>
      <el-button class="cancel" @click="hanldeClose">取 消</el-button>
      <el-button
        type="primary"
        :loading="addLoading"
        @click="submitForm('formData')"
        >保 存</el-button
      >
    </div>
  </div>
</template>

<script>
import { batchCreateInstitutionUser } from "@/api/institution";
export default {
  name: "AddInstitutionUser",
  props: {
    institutionId: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      formData: {
        institution_id: this.institutionId,
        users: [
          {
            nickname: "",
            mobile: "",
            password: "",
            is_master: 0,
          },
        ],
      },
      rules: {
        nickname: [{ required: true, message: "请输入", trigger: "blur" }],
        mobile: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            validator: this.validataPhone,
          },
        ],
      },
      addLoading: false,
    };
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  methods: {
    handleAdd() {
      this.formData.users.push({
        nickname: "",
        mobile: "",
        password: "",
        is_master: 0,
      });
    },
    handleDel(index) {
      this.formData.users.splice(index, 1);
    },
    hanldeClose() {
      this.$emit("close");
    },
    handlePrev() {
      this.$emit("prev");
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit();
        }
      });
    },
    async submit() {
      const data = { ...this.formData };
      this.addLoading = true;
      const res = await batchCreateInstitutionUser(data).catch(() => {
        this.addLoading = false;
      });
      this.addLoading = false;
      if (res.code === 0) {
        this.$message.success(res.message);
        this.visible = false;
        this.hanldeClose();
      }
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
/deep/.el-table td {
  padding: 12px 0 0;
}
.actions {
  display: flex;
  margin-top: 16px;
  .cancel {
    margin-left: auto;
  }
}
</style>